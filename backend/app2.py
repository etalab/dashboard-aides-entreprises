from flask import Flask, render_template, request, jsonify,redirect
from flask_cors import CORS
import yaml
from database import db
import random
from flask_sqlalchemy import SQLAlchemy
import sqlalchemy
from sqlalchemy import func, cast
import logging

app = Flask(__name__)
db_config = yaml.load(open('database.yaml'))
app.config['SQLALCHEMY_DATABASE_URI'] = db_config['uri']
db.init_app(app)

CORS(app)

from classes.siret import Siret
from classes.effectif import Effectif
from classes.aide import Aide
from classes.stat import Stat
from classes.region import Region
from classes.departement import Departement
from classes.naf import Naf
from classes.classeeffectif import Classeeffectif


logging.basicConfig()
logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)

columns_siret = ['siren', 'nic', 'siret', 'statutdiffusionetablissement', 'datecreationetablissement', 'trancheeffectifsetablissement', 'anneeeffectifsetablissement', 'activiteprincipaleregistremetiersetablissement', 'datederniertraitementetablissement', 'etablissementsiege', 'nombreperiodesetablissement', 'complementadresseetablissement', 'numerovoieetablissement', 'indicerepetitionetablissement', 'typevoieetablissement', 'libellevoieetablissement', 'codepostaletablissement', 'libellecommuneetablissement', 'libellecommuneetrangeretablissement', 'distributionspecialeetablissement', 'codecommuneetablissement', 'codecedexetablissement', 'libellecedexetablissement', 'codepaysetrangeretablissement', 'libellepaysetrangeretablissement', 'complementadresse2etablissement', 'numerovoie2etablissement', 'indicerepetition2etablissement', 'typevoie2etablissement', 'libellevoie2etablissement', 'codepostal2etablissement', 'libellecommune2etablissement', 'libellecommuneetranger2etablissement', 'distributionspeciale2etablissement', 'codecommune2etablissement', 'codecedex2etablissement', 'libellecedex2etablissement', 'codepaysetranger2etablissement', 'libellepaysetranger2etablissement', 'datedebut', 'etatadministratifetablissement', 'enseigne1etablissement', 'enseigne2etablissement', 'enseigne3etablissement', 'denominationusuelleetablissement', 'activiteprincipaleetablissement', 'nomenclatureactiviteprincipaleetablissement', 'caractereemployeuretablissement', 'longitude', 'latitude', 'geo_score', 'geo_type', 'geo_adresse', 'geo_id', 'geo_ligne', 'geo_l4', 'geo_l5', 'typecom', 'reg', 'dep', 'arr', 'tncc', 'ncc', 'nccenr', 'libelle', 'can', 'comparent']

columns_effectif = ['siret', 'daterecuperationeffectif', 'effectif']

columns_aide = ['code_application', 'numero_sequentiel', 'mois', 'siren', 'nom1', 'nom2', 'effectif', 'montant', 'devise', 'date_dp', 'date_paiement', 'siret', 'reg', 'dep', 'codeCommuneEtablissement', 'activiteprincipaleetablissement', 'count_siren_nb', 'montant_modifie', 'delta_effectif', 'delta_effectif_global','classe_effectif']

columns_stat = ['id_stat', 'dimension', 'sous_dimension', 'valeur_sous_dimension', 'total_siret', 'delta_effectif_total', 'delta_effectif_percent_mean']

columns_region = ['reg', 'cheflieu', 'tncc', 'ncc', 'nccenr', 'libelle']

columns_departement = ['dep', 'reg', 'cheflieu', 'tncc', 'ncc', 'nccenr', 'libelle']

columns_naf = ['code_sous_classe', 'libelle_sous_classe', 'code_sous_classe_short', 'code_classe', 'libelle_classe', 'code_classe_short', 'code_groupe', 'libelle_groupe', 'code_groupe_short', 'code_division', 'libelle_division', 'code_section', 'libelle_section']

columns_classeeffectif = ['denomination', 'libelle', 'libelle_long']


@app.route('/')
def index():
    app.logger.info("yes")
    return render_template('home.html')



################## API V1 ##############

@app.route('/stat/aide/section', methods=['GET'])
def getStatAideNationalSectionAPE():
    # GET a specific data by id
    if request.method == 'GET':
        my_query = "SELECT SUM(A.montant) AS TotalMontant, COUNT(A.siren) AS TotalSiren FROM aide A;"
        
        my_query_2 = "SELECT code_section, SUM(TotalMontant) AS SectionTotalMontant, SUM(TotalSiren) AS SectionTotalSiren, libelle_section FROM (SELECT SUM(A.montant) AS TotalMontant, COUNT(A.siren) AS TotalSiren, N.code_section, N.libelle_section FROM aide AS A LEFT JOIN (select distinct libelle_division, code_division, code_section, libelle_section from naf) AS N ON SUBSTR(A.activiteprincipaleetablissement,1,2) = N.code_division GROUP BY SUBSTR(A.activiteprincipaleetablissement,1,2), N.libelle_section, N.code_section ORDER BY TotalSiren DESC) AS divquery GROUP BY code_section, libelle_section ORDER BY SectionTotalSiren DESC;"

        data = db.session.execute(my_query).fetchall()
        data2 = db.session.execute(my_query_2).fetchall()
        app.logger.info(data)
        dataJson = []
        for i in range(len(data)):
            dataDict = {}
            dataDict['montant'] = str(data[i][0]) 
            dataDict['nombre'] = str(data[i][1]) 
            dataDict['kpi_top_10_naf'] = []
            autresmontant = 0
            autresnombre = 0
            for j in range(len(data2)):
                if(j < 10):
                    dataDict2 = {}
                    dataDict2['section_naf'] = str(data2[j][0]) 
                    dataDict2['montant'] = str(data2[j][1]) 
                    dataDict2['nombre'] = str(data2[j][2])
                    dataDict2['libelle_section_naf'] = str(data2[j][3]) 
                    dataDict['kpi_top_10_naf'].append(dataDict2)
                else:
                    autresmontant = autresmontant + data2[j][1]
                    autresnombre = autresnombre + data2[j][2]           
            dataDict2 = {}
            dataDict2['section_naf'] = "Autres" 
            dataDict2['montant'] = str(autresmontant)
            dataDict2['nombre'] = str(autresnombre)
            dataDict2['libelle_section_naf'] = "Autres sections NAF"
            dataDict['kpi_top_10_naf'].append(dataDict2)

            dataJson.append(dataDict)
        return jsonify(dataJson)


@app.route('/stat/aide/reg/section', methods=['GET'])
def getStatAideRegionalSectionAPE():
    # GET a specific data by id
    if request.method == 'GET':
        my_query = "SELECT A.reg, SUM(A.montant) AS TotalMontant, COUNT(A.siren) AS TotalSiren, R.libelle FROM aide AS A LEFT JOIN region AS R ON A.reg = R.reg GROUP BY A.reg, R.libelle;"
        data = db.session.execute(my_query).fetchall()
        app.logger.info(data)
        dataJson = []
        for i in range(len(data)):
            dataDict = {}
            dataDict['reg'] = str(data[i][0]) 
            dataDict['montant'] = str(data[i][1]) 
            dataDict['nombre'] = str(data[i][2])
            dataDict['libelle'] = str(data[i][3]) 

            my_query_2 = "SELECT code_section, SUM(TotalMontant) AS SectionTotalMontant, SUM(TotalSiren) AS SectionTotalSiren, libelle_section FROM (SELECT SUM(A.montant) AS TotalMontant, COUNT(A.siren) AS TotalSiren, N.code_section, N.libelle_section FROM aide AS A LEFT JOIN (select distinct libelle_division, code_division, code_section, libelle_section from naf) AS N ON SUBSTR(A.activiteprincipaleetablissement,1,2) = N.code_division WHERE A.reg = '"+str(data[i][0])+"' GROUP BY SUBSTR(A.activiteprincipaleetablissement,1,2), N.libelle_section, N.code_section ORDER BY TotalSiren DESC) AS divquery GROUP BY code_section, libelle_section ORDER BY SectionTotalSiren DESC;"

            data2 = db.session.execute(my_query_2).fetchall()

            dataDict['kpi_top_10_naf'] = []

            autresmontant = 0
            autresnombre = 0
            for j in range(len(data2)):
                if(j < 10):
                    dataDict2 = {}
                    dataDict2['section_naf'] = str(data2[j][0]) 
                    dataDict2['montant'] = str(data2[j][1]) 
                    dataDict2['nombre'] = str(data2[j][2])
                    dataDict2['libelle_section_naf'] = str(data2[j][3]) 
                    dataDict['kpi_top_10_naf'].append(dataDict2)
                else:
                    autresmontant = autresmontant + data2[j][1]
                    autresnombre = autresnombre + data2[j][2]           
            dataDict2 = {}
            dataDict2['section_naf'] = "Autres" 
            dataDict2['montant'] = str(autresmontant)
            dataDict2['nombre'] = str(autresnombre)
            dataDict2['libelle_section_naf'] = "Autres sections NAF"
            dataDict['kpi_top_10_naf'].append(dataDict2)

            dataJson.append(dataDict)
        return jsonify(dataJson)


@app.route('/stat/aide/dep/section', methods=['GET'])
def getStatAideDepartementalSectionAPE():
    # GET a specific data by id
    if request.method == 'GET':
        my_query = "SELECT A.dep, SUM(A.montant) AS TotalMontant, COUNT(A.siren) AS TotalSiren, D.libelle FROM aide AS A LEFT JOIN departement AS D ON A.dep = D.dep GROUP BY A.dep, D.libelle;"
        data = db.session.execute(my_query).fetchall()
        app.logger.info(data)
        dataJson = []
        for i in range(len(data)):
            dataDict = {}
            dataDict['dep'] = str(data[i][0]) 
            dataDict['montant'] = str(data[i][1]) 
            dataDict['nombre'] = str(data[i][2])
            dataDict['libelle'] = str(data[i][3]) 


            my_query_2 = "SELECT code_section, SUM(TotalMontant) AS SectionTotalMontant, SUM(TotalSiren) AS SectionTotalSiren, libelle_section FROM (SELECT SUM(A.montant) AS TotalMontant, COUNT(A.siren) AS TotalSiren, N.code_section, N.libelle_section FROM aide AS A LEFT JOIN (select distinct libelle_division, code_division, code_section, libelle_section from naf) AS N ON SUBSTR(A.activiteprincipaleetablissement,1,2) = N.code_division WHERE A.dep = '"+str(data[i][0])+"' GROUP BY SUBSTR(A.activiteprincipaleetablissement,1,2), N.libelle_section, N.code_section ORDER BY TotalSiren DESC) AS divquery GROUP BY code_section, libelle_section ORDER BY SectionTotalSiren DESC;"

            data2 = db.session.execute(my_query_2).fetchall()

            dataDict['kpi_top_10_naf'] = []
            
            autresmontant = 0
            autresnombre = 0
            for j in range(len(data2)):
                if(j < 10):
                    dataDict2 = {}
                    dataDict2['section_naf'] = str(data2[j][0]) 
                    dataDict2['montant'] = str(data2[j][1]) 
                    dataDict2['nombre'] = str(data2[j][2])
                    dataDict2['libelle_section_naf'] = str(data2[j][3]) 
                    dataDict['kpi_top_10_naf'].append(dataDict2)
                else:
                    autresmontant = autresmontant + data2[j][1]
                    autresnombre = autresnombre + data2[j][2]           
            dataDict2 = {}
            dataDict2['section_naf'] = "Autres" 
            dataDict2['montant'] = str(autresmontant)
            dataDict2['nombre'] = str(autresnombre)
            dataDict2['libelle_section_naf'] = "Autres sections NAF"
            dataDict['kpi_top_10_naf'].append(dataDict2)

            dataJson.append(dataDict)
        return jsonify(dataJson)



@app.route('/region', methods=['GET'])
def getRegions():
    # GET a specific data by id
    if request.method == 'GET':
        data = Region.query.all()
        regions = getobjectsjson(data, columns_region)
        return jsonify(regions)


@app.route('/departement', methods=['GET'])
def getDepartements():
    # GET a specific data by id
    if request.method == 'GET':
        data = Departement.query.all()
        departements = getobjectsjson(data, columns_departement)
        return jsonify(departements)


@app.route('/naf', methods=['GET'])
def getNafs():
    # GET a specific data by id
    if request.method == 'GET':
        data = Naf.query.all()
        nafs = getobjectsjson(data, columns_naf)
        return jsonify(nafs)


@app.route('/classeeffectif', methods=['GET'])
def getClasseEffectifs():
    # GET a specific data by id
    if request.method == 'GET':
        data = Classeeffectif.query.all()
        classeeffectifs = getobjectsjson(data, columns_classeeffectif)
        return jsonify(classeeffectifs)

@app.route('/treemap',methods=['GET'])
def getTreemap():
    if request.method == 'GET':

        ape_query = "SELECT COUNT(A.siren) AS TotalSiren, A.activiteprincipaleetablissement, N.libelle_sous_classe, N.code_groupe_short FROM aide AS A LEFT JOIN (SELECT DISTINCT code_sous_classe_short, libelle_sous_classe, code_groupe_short FROM naf) AS N ON A.activiteprincipaleetablissement = N.code_sous_classe_short GROUP BY A.activiteprincipaleetablissement, N.libelle_sous_classe, N.code_groupe_short;"

        apequery = db.session.execute(ape_query).fetchall()

        my_query = "SELECT distinct code_section, libelle_section from naf ORDER BY code_section;"
        data = db.session.execute(my_query).fetchall()
        app.logger.info(data)
        dataJson = []

        

        for i in range(len(data)):
            dataDict = {}
            dataDict['name'] = str(data[i][0])+" - "+str(data[i][1])
            dataDict['children'] = []
           
            my_query_2 = "SELECT distinct code_division, libelle_division from naf WHERE code_section = '"+str(data[i][0])+"' ORDER BY code_division;"

            data2 = db.session.execute(my_query_2).fetchall()

            for j in range(len(data2)):
                dataDict2 = {}
                dataDict2['name'] = str(data2[j][0])+" - "+str(data2[j][1])
                dataDict2['children'] = []
                dataDict['children'].append(dataDict2)

                my_query_3 = "SELECT distinct code_groupe_short, libelle_groupe from naf WHERE code_division = '"+str(data2[j][0])+"'  ORDER BY code_groupe_short;"

                data3 = db.session.execute(my_query_3).fetchall()

                for k in range(len(data3)):
                    dataDict3 = {}
                    dataDict3['name'] = str(data3[k][0])+" - "+str(data3[k][1])
                    dataDict3['children'] = []
                    dataDict2['children'].append(dataDict3)

                    for l in range(len(apequery)):
                        dataDict4 = {}
                        if(str(data3[k][0]) == str(apequery[l][3])):
                            dataDict4['name'] = str(apequery[l][1]+" - "+str(apequery[l][2]))
                            dataDict4['value'] = int(apequery[l][0])
                            dataDict3['children'].append(dataDict4)

            dataJson.append(dataDict)
        return jsonify(dataJson)

        

################## Reports ##############

@app.route('/stat/report', methods=['GET'])
def getStatReport():
    # GET a specific data by id
    if request.method == 'GET':
        my_query = "SELECT SUM(R.montant) AS TotalMontant, SUM(R.nombre) AS TotalSiren FROM report R;"
        
        data = db.session.execute(my_query).fetchall()
      
        app.logger.info(data)
        dataJson = []
        for i in range(len(data)):
            dataDict = {}
            dataDict['montant'] = str(data[i][0]) 
            dataDict['nombre'] = str(data[i][1])            

            dataJson.append(dataDict)
        return jsonify(dataJson)


@app.route('/stat/report/dep', methods=['GET'])
def getStatReportDep():
    # GET a specific data by id
    if request.method == 'GET':
        my_query = "SELECT SUM(R.montant) AS TotalMontant, SUM(R.nombre) AS TotalSiren, R.dep, D.libelle FROM report R LEFT JOIN departement D ON R.dep = D.dep GROUP BY R.dep, D.libelle;"
        
        data = db.session.execute(my_query).fetchall()
      
        app.logger.info(data)
        dataJson = []
        for i in range(len(data)):
            dataDict = {}
            dataDict['montant'] = str(data[i][0]) 
            dataDict['nombre'] = str(data[i][1])  
            dataDict['dep'] = str(data[i][2])     
            dataDict['libelle'] = str(data[i][3])            

            dataJson.append(dataDict)
        return jsonify(dataJson)



@app.route('/stat/report/reg', methods=['GET'])
def getStatReportReg():
    # GET a specific data by id
    if request.method == 'GET':
        my_query = "SELECT SUM(R.montant) AS TotalMontant, SUM(R.nombre) AS TotalSiren, R.reg, D.libelle FROM report R LEFT JOIN region D ON R.reg = D.reg GROUP BY R.reg, D.libelle;"
        
        data = db.session.execute(my_query).fetchall()
      
        app.logger.info(data)
        dataJson = []
        for i in range(len(data)):
            dataDict = {}
            dataDict['montant'] = str(data[i][0]) 
            dataDict['nombre'] = str(data[i][1])  
            dataDict['reg'] = str(data[i][2])     
            dataDict['libelle'] = str(data[i][3])            

            dataJson.append(dataDict)
        return jsonify(dataJson)



####### GENERIC FUNCTIONS #######

def getobjectsjson(data, columns):
    dataJson = []
    for i in range(len(data)):
        dataDict = {}
        j = 0
        for key in columns:
            dataDict[key] = str(data[i]).split('/')[j]
            j = j + 1
        dataJson.append(dataDict)
    return dataJson


######## MAIN ########

if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0')
