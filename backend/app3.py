from flask import Flask, render_template, request, jsonify,redirect
from flask_cors import CORS
import yaml
from database import db
import random
from flask_sqlalchemy import SQLAlchemy
import sqlalchemy
from sqlalchemy import func, cast
import logging
import datetime

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



################## API V1 ##############$


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

@app.route('/sectionnaf', methods=['GET'])
def getSectionNafs():
    # GET a specific data by id
    if request.method == 'GET':
        my_query = "SELECT distinct code_section, libelle_section, color_section from naf;"
        data = db.session.execute(my_query).fetchall()
        app.logger.info(data)
        dataJson = []
        for i in range(len(data)):
            dataDict = {}
            dataDict['code_section'] = str(data[i][0]) 
            dataDict['libelle_section'] = str(data[i][1]) 
            dataDict['color_section'] = str(data[i][2])
            dataJson.append(dataDict)

        return jsonify(dataJson)


@app.route('/classeeffectif', methods=['GET'])
def getClasseEffectifs():
    # GET a specific data by id
    if request.method == 'GET':
        data = Classeeffectif.query.all()
        classeeffectifs = getobjectsjson(data, columns_classeeffectif)
        return jsonify(classeeffectifs)


#### API Section APE (test) #####

@app.route('/stat/aide', methods=['GET'])
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


@app.route('/stat/aide/reg', methods=['GET'])
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


@app.route('/stat/aide/dep', methods=['GET'])
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


@app.route('/lastupdate', methods=['GET'])
def getLastUpdateDate():
    if request.method == 'GET':
        my_query = "select MAX(date_paiement) FROM aide;"
        data = db.session.execute(my_query).fetchall()
        for i in range(len(data)):
            lastupdate = str(data[i][0])
        return str(lastupdate)

@app.route('/lastupdatehtml', methods=['GET'])
def getLastUpdateHtml():
    if request.method == 'GET':
        my_query = "select MAX(date_paiement) FROM aide;"
        data = db.session.execute(my_query).fetchall()
        for i in range(len(data)):
            lastupdate = str(data[i][0])
            lastupdate = datetime.datetime.strptime(lastupdate, "%Y-%m-%d").strftime("%d/%m/%Y")
        return "Données au "+str(lastupdate)





#### Reports d'échéances #####

@app.route('/stat/report', methods=['GET'])
def getStatReportsNationalSectionAPE():
    # GET a specific data by id
    if request.method == 'GET':
        my_query = "SELECT SUM(R.montant) AS TotalMontant, SUM(R.nombre) AS TotalSiren FROM report R;"
        
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


@app.route('/stat/aide/reg', methods=['GET'])
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


@app.route('/stat/aide/dep', methods=['GET'])
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








'''

################## API V1 ##############

@app.route('/stat/aide/reg/<string:reg>/dep', methods=['GET'])
def getStatAideDepartementalWithRegID(reg):
    # GET a specific data by id
    if request.method == 'GET':
        my_query = "SELECT A.dep, SUM(A.montant) AS TotalMontant, COUNT(A.siren) AS TotalSiren, D.libelle FROM aide AS A LEFT JOIN departement AS D ON A.dep = D.dep WHERE A.reg = '"+reg+"' GROUP BY A.dep, D.libelle;"
        data = db.session.execute(my_query).fetchall()
        app.logger.info(data)
        dataJson = []
        for i in range(len(data)):
            dataDict = {}
            dataDict['dep'] = str(data[i][0]) 
            dataDict['montant'] = str(data[i][1]) 
            dataDict['nombre'] = str(data[i][2])
            dataDict['libelle'] = str(data[i][3]) 

            my_query_2 = "SELECT SUBSTR(A.activiteprincipaleetablissement,1,2) AS divisionape, SUM(A.montant) AS TotalMontant, COUNT(A.siren) AS TotalSiren, N.libelle_division FROM aide AS A LEFT JOIN (select distinct libelle_division, code_division from naf) AS N ON SUBSTR(A.activiteprincipaleetablissement,1,2) = N.code_division WHERE A.reg = '"+reg+"' AND a.dep = '"+str(data[i][0])+"' GROUP BY SUBSTR(A.activiteprincipaleetablissement,1,2), N.libelle_division ORDER BY TotalSiren DESC LIMIT 10;"

            my_query_3 = "SELECT classe_effectif, SUM(A.montant) AS TotalMontant, COUNT(A.siren) AS TotalSiren, C.libelle FROM aide AS A LEFT JOIN classeeffectif AS C ON A.classe_effectif = C.denomination WHERE A.reg = '"+reg+"' AND A.dep = '"+str(data[i][0])+"' GROUP BY classe_effectif, C.libelle;"

            data2 = db.session.execute(my_query_2).fetchall()
            data3 = db.session.execute(my_query_3).fetchall()


            dataDict['kpi_top_10_naf'] = []
            dataDict['kpi_classe_effectif'] = []
            for j in range(len(data2)):
                dataDict2 = {}
                dataDict2['division_naf'] = str(data2[j][0]) 
                dataDict2['montant'] = str(data2[j][1]) 
                dataDict2['nombre'] = str(data2[j][2])
                dataDict2['libelle_division_naf'] = str(data2[j][3]) 
                dataDict['kpi_top_10_naf'].append(dataDict2)
            for k in range(len(data3)):
                dataDict3 = {}
                dataDict3['classe_effectif'] = str(data3[k][0]) 
                dataDict3['montant'] = str(data3[k][1]) 
                dataDict3['nombre'] = str(data3[k][2])
                dataDict3['libelle_classe_effectif'] = str(data3[k][3])
                dataDict['kpi_classe_effectif'].append(dataDict3)

            dataJson.append(dataDict)
        return jsonify(dataJson)


@app.route('/stat/aide', methods=['GET'])
def getStatAideNational():
    # GET a specific data by id
    if request.method == 'GET':
        my_query = "SELECT SUM(A.montant) AS TotalMontant, COUNT(A.siren) AS TotalSiren, SUM(A.delta_effectif) AS TotalDeltaEffectif, AVG(A.delta_effectif_percent) AS AVGDeltaEffectifPercent FROM aide A;"
        
        my_query_2 = "SELECT SUBSTR(A.activiteprincipaleetablissement,1,2) AS divisionape, SUM(A.montant) AS TotalMontant, COUNT(A.siren) AS TotalSiren, SUM(A.delta_effectif) AS TotalDeltaEffectif, AVG(A.delta_effectif_percent) AS AVGDeltaEffectifPercent, N.libelle_division FROM aide AS A LEFT JOIN (select distinct libelle_division, code_division from naf) AS N ON SUBSTR(A.activiteprincipaleetablissement,1,2) = N.code_division GROUP BY SUBSTR(A.activiteprincipaleetablissement,1,2), N.libelle_division ORDER BY TotalSiren DESC LIMIT 10;"

        my_query_3 = "SELECT classe_effectif, SUM(A.montant) AS TotalMontant, COUNT(A.siren) AS TotalSiren, SUM(A.delta_effectif) AS TotalDeltaEffectif, AVG(A.delta_effectif_percent) AS AVGDeltaEffectifPercent FROM aide AS A GROUP BY classe_effectif;"
        
        data = db.session.execute(my_query).fetchall()
        data2 = db.session.execute(my_query_2).fetchall()
        data3 = db.session.execute(my_query_3).fetchall()
        app.logger.info(data)
        dataJson = []
        for i in range(len(data)):
            dataDict = {}
            dataDict['montant'] = str(data[i][0]) 
            dataDict['nombre'] = str(data[i][1]) 
            dataDict['delta_effectif'] = str(data[i][2]) 
            dataDict['delta_effectif_percent'] = str(data[i][3]) 
            dataDict['kpi_top_10_naf'] = []
            dataDict['kpi_classe_effectif'] = []
            for j in range(len(data2)):
                dataDict2 = {}
                dataDict2['division_naf'] = str(data2[j][0]) 
                dataDict2['montant'] = str(data2[j][1]) 
                dataDict2['nombre'] = str(data2[j][2])
                dataDict2['delta_effectif'] = str(data2[j][3]) 
                dataDict2['delta_effectif_percent'] = str(data2[j][4]) 
                dataDict2['libelle_division_naf'] = str(data2[j][5]) 
                dataDict['kpi_top_10_naf'].append(dataDict2)
            for k in range(len(data3)):
                dataDict3 = {}
                dataDict3['classe_effectif'] = str(data3[k][0]) 
                dataDict3['montant'] = str(data3[k][1]) 
                dataDict3['nombre'] = str(data3[k][2])
                dataDict3['delta_effectif'] = str(data3[k][3]) 
                dataDict3['delta_effectif_percent'] = str(data3[k][4]) 
                dataDict['kpi_classe_effectif'].append(dataDict3)
            dataJson.append(dataDict)
        return jsonify(dataJson)


@app.route('/stat/aide/reg', methods=['GET'])
def getStatAideRegional():
    # GET a specific data by id
    if request.method == 'GET':
        my_query = "SELECT A.reg, SUM(A.montant) AS TotalMontant, COUNT(A.siren) AS TotalSiren, SUM(A.delta_effectif) AS TotalDeltaEffectif, AVG(A.delta_effectif_percent) AS AVGDeltaEffectifPercent, R.libelle FROM aide AS A LEFT JOIN region AS R ON A.reg = R.reg GROUP BY A.reg, R.libelle;"
        data = db.session.execute(my_query).fetchall()
        app.logger.info(data)
        dataJson = []
        for i in range(len(data)):
            dataDict = {}
            dataDict['reg'] = str(data[i][0]) 
            dataDict['montant'] = str(data[i][1]) 
            dataDict['nombre'] = str(data[i][2])
            dataDict['delta_effectif'] = str(data[i][3]) 
            dataDict['delta_effectif_percent'] = str(data[i][4]) 
            dataDict['libelle'] = str(data[i][5]) 

            my_query_2 = "SELECT SUBSTR(A.activiteprincipaleetablissement,1,2) AS divisionape, SUM(A.montant) AS TotalMontant, COUNT(A.siren) AS TotalSiren, SUM(A.delta_effectif) AS TotalDeltaEffectif, AVG(A.delta_effectif_percent) AS AVGDeltaEffectifPercent, N.libelle_division FROM aide AS A LEFT JOIN (select distinct libelle_division, code_division from naf) AS N ON SUBSTR(A.activiteprincipaleetablissement,1,2) = N.code_division WHERE A.reg = '"+str(data[i][0])+"' GROUP BY SUBSTR(A.activiteprincipaleetablissement,1,2), N.libelle_division ORDER BY TotalSiren DESC LIMIT 10;"

            my_query_3 = "SELECT classe_effectif, SUM(A.montant) AS TotalMontant, COUNT(A.siren) AS TotalSiren, SUM(A.delta_effectif) AS TotalDeltaEffectif, AVG(A.delta_effectif_percent) AS AVGDeltaEffectifPercent FROM aide AS A WHERE A.reg = '"+str(data[i][0])+"' GROUP BY classe_effectif;"
            
            data2 = db.session.execute(my_query_2).fetchall()
            data3 = db.session.execute(my_query_3).fetchall()


            dataDict['kpi_top_10_naf'] = []
            dataDict['kpi_classe_effectif'] = []
            for j in range(len(data2)):
                dataDict2 = {}
                dataDict2['division_naf'] = str(data2[j][0]) 
                dataDict2['montant'] = str(data2[j][1]) 
                dataDict2['nombre'] = str(data2[j][2])
                dataDict2['delta_effectif'] = str(data2[j][3]) 
                dataDict2['delta_effectif_percent'] = str(data2[j][4]) 
                dataDict2['libelle_division_naf'] = str(data2[j][5]) 
                dataDict['kpi_top_10_naf'].append(dataDict2)
            for k in range(len(data3)):
                dataDict3 = {}
                dataDict3['classe_effectif'] = str(data3[k][0]) 
                dataDict3['montant'] = str(data3[k][1]) 
                dataDict3['nombre'] = str(data3[k][2])
                dataDict3['delta_effectif'] = str(data3[k][3]) 
                dataDict3['delta_effectif_percent'] = str(data3[k][4]) 
                dataDict['kpi_classe_effectif'].append(dataDict3)

            dataJson.append(dataDict)
        return jsonify(dataJson)



@app.route('/stat/aide/reg/<string:reg>/dep', methods=['GET'])
def getStatAideDepartemental(reg):
    # GET a specific data by id
    if request.method == 'GET':
        my_query = "SELECT A.dep, SUM(A.montant) AS TotalMontant, COUNT(A.siren) AS TotalSiren, SUM(A.delta_effectif) AS TotalDeltaEffectif, AVG(A.delta_effectif_percent) AS AVGDeltaEffectifPercent, D.libelle FROM aide AS A LEFT JOIN departement AS D ON A.dep = D.dep WHERE A.reg = '"+reg+"' GROUP BY A.dep, D.libelle;"
        data = db.session.execute(my_query).fetchall()
        app.logger.info(data)
        dataJson = []
        for i in range(len(data)):
            dataDict = {}
            dataDict['dep'] = str(data[i][0]) 
            dataDict['montant'] = str(data[i][1]) 
            dataDict['nombre'] = str(data[i][2])
            dataDict['delta_effectif'] = str(data[i][3]) 
            dataDict['delta_effectif_percent'] = str(data[i][4]) 
            dataDict['libelle'] = str(data[i][5]) 

            my_query_2 = "SELECT SUBSTR(A.activiteprincipaleetablissement,1,2) AS divisionape, SUM(A.montant) AS TotalMontant, COUNT(A.siren) AS TotalSiren, SUM(A.delta_effectif) AS TotalDeltaEffectif, AVG(A.delta_effectif_percent) AS AVGDeltaEffectifPercent, N.libelle_division FROM aide AS A LEFT JOIN (select distinct libelle_division, code_division from naf) AS N ON SUBSTR(A.activiteprincipaleetablissement,1,2) = N.code_division WHERE A.reg = '"+reg+"' AND a.dep = '"+str(data[i][0])+"' GROUP BY SUBSTR(A.activiteprincipaleetablissement,1,2), N.libelle_division ORDER BY TotalSiren DESC LIMIT 10;"

            my_query_3 = "SELECT classe_effectif, SUM(A.montant) AS TotalMontant, COUNT(A.siren) AS TotalSiren, SUM(A.delta_effectif) AS TotalDeltaEffectif, AVG(A.delta_effectif_percent) AS AVGDeltaEffectifPercent FROM aide AS A WHERE A.reg = '"+reg+"' AND A.dep = '"+str(data[i][0])+"' GROUP BY classe_effectif;"

            data2 = db.session.execute(my_query_2).fetchall()
            data3 = db.session.execute(my_query_3).fetchall()


            dataDict['kpi_top_10_naf'] = []
            dataDict['kpi_classe_effectif'] = []
            for j in range(len(data2)):
                dataDict2 = {}
                dataDict2['division_naf'] = str(data2[j][0]) 
                dataDict2['montant'] = str(data2[j][1]) 
                dataDict2['nombre'] = str(data2[j][2])
                dataDict2['delta_effectif'] = str(data2[j][3]) 
                dataDict2['delta_effectif_percent'] = str(data2[j][4]) 
                dataDict2['libelle_division_naf'] = str(data2[j][5]) 
                dataDict['kpi_top_10_naf'].append(dataDict2)
            for k in range(len(data3)):
                dataDict3 = {}
                dataDict3['classe_effectif'] = str(data3[k][0]) 
                dataDict3['montant'] = str(data3[k][1]) 
                dataDict3['nombre'] = str(data3[k][2])
                dataDict3['delta_effectif'] = str(data3[k][3]) 
                dataDict3['delta_effectif_percent'] = str(data3[k][4]) 
                dataDict['kpi_classe_effectif'].append(dataDict3)

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

'''

'''

################### SIRET ##############

@app.route('/siret/<string:siret_id>', methods=['GET'])
def onesiret(siret_id):
    # GET a specific data by id
    if request.method == 'GET':
        data = Siret.query.filter(Siret.siret == siret_id).all()
        siret = getobjectsjson(data, columns_siret)
        return jsonify(siret)


################### EFFECTIF ##############

@app.route('/effectif/<string:siret_id>', methods=['GET'])
def geteffectif(siret_id):
    # GET a specific data by id
    if request.method == 'GET':
        data = Effectif.query.filter(Effectif.siret == siret_id).all()
        effectif = getobjectsjson(data, columns_effectif)
        return jsonify(effectif)

################### AIDE ##############

@app.route('/aide/siren/<string:siren_id>', methods=['GET'])
def getaidefromsiren(siren_id):
    # GET a specific data by id
    if request.method == 'GET':
        app.logger.info(siren_id)
        data = Aide.query.filter(Aide.siren == siren_id).all()
        aide = getobjectsjson(data, columns_aide)
        return jsonify(aide)
        
@app.route('/aide/siret/<string:siret_id>', methods=['GET'])
def getaidefromsiret(siret_id):
    # GET a specific data by id
    if request.method == 'GET':
        data = Aide.query.filter(Aide.siret == siret_id).all()
        aide = getobjectsjson(data, columns_aide)
        return jsonify(aide)

@app.route('/aide/reg/<string:reg>', methods=['GET'])
def getaidefromreg(reg):
    # GET a specific data by id
    if request.method == 'GET':
        data = Aide.query.filter(Aide.reg == str(reg)).all()
        aide = getobjectsjson(data, columns_aide)
        return jsonify(aide)

@app.route('/aide/dep/<string:dep>', methods=['GET'])
def getaidefromdep(dep):
    # GET a specific data by id
    if request.method == 'GET':
        data = Aide.query.filter(Aide.dep == dep).all()
        aide = getobjectsjson(data, columns_aide)
        return jsonify(aide)

@app.route('/aide/codeinsee/<string:codeCommuneEtablissement>', methods=['GET'])
def getaidefromcodeinsee(codeCommuneEtablissement):
    # GET a specific data by id
    if request.method == 'GET':
        data = Aide.query.filter(Aide.codeCommuneEtablissement == codeCommuneEtablissement).all()
        aide = getobjectsjson(data, columns_aide)
        return jsonify(aide)

@app.route('/stat/aide/reg', methods=['GET'])
def getregstat():
    # GET a specific data by id
    if request.method == 'GET':

        data = db.session.query(Aide.reg, db.func.sum(Aide.montant_modifie), db.func.count(Aide.siren), db.func.sum(Aide.delta_effectif), db.func.avg(Aide.delta_effectif_percent)).group_by(Aide.reg).all()
        app.logger.info(data)
        dataJson = []
        for i in range(len(data)):
            dataDict = {}
            dataDict['reg'] = data[i][0] 
            dataDict['montant'] = data[i][1] 
            dataDict['nombre'] = data[i][2] 
            dataDict['delta_effectif'] = data[i][3] 
            dataDict['delta_effectif_percent'] = str(data[i][4]) 
            dataJson.append(dataDict)
        return jsonify(dataJson)

@app.route('/stat/aide/dep', methods=['GET'])
def getdepstat():
    # GET a specific data by id
    if request.method == 'GET':
        data = db.session.query(Aide.dep, db.func.sum(Aide.montant_modifie), db.func.count(Aide.siren), db.func.sum(Aide.delta_effectif), db.func.avg(Aide.delta_effectif_percent)).group_by(Aide.dep).all()
        app.logger.info(data)
        dataJson = []
        for i in range(len(data)):
            dataDict = {}
            dataDict['dep'] = data[i][0] 
            dataDict['montant'] = data[i][1] 
            dataDict['nombre'] = data[i][2] 
            dataDict['delta_effectif'] = data[i][3] 
            dataDict['delta_effectif_percent'] = str(data[i][4]) 
            dataJson.append(dataDict)
        return jsonify(dataJson)

@app.route('/stat/aide/dep/<string:dep>', methods=['GET'])
def getcodeinseestat(dep):
    # GET a specific data by id
    if request.method == 'GET':
        data = db.session.query(Aide.codeCommuneEtablissement, db.func.sum(Aide.montant_modifie), db.func.count(Aide.siren), db.func.sum(Aide.delta_effectif), db.func.avg(Aide.delta_effectif_percent)).filter(Aide.dep == dep).group_by(Aide.codeCommuneEtablissement).all()
        app.logger.info(data)
        dataJson = []
        for i in range(len(data)):
            dataDict = {}
            dataDict['codeinsee'] = data[i][0] 
            dataDict['montant'] = data[i][1] 
            dataDict['nombre'] = data[i][2] 
            dataDict['delta_effectif'] = data[i][3] 
            dataDict['delta_effectif_percent'] = str(data[i][4]) 
            dataJson.append(dataDict)
        return jsonify(dataJson)


@app.route('/stat/aide/ape', methods=['GET'])
def getapestat():
    # GET a specific data by id
    if request.method == 'GET':
        data = db.session.query(Aide.activiteprincipaleetablissement, db.func.sum(Aide.montant_modifie), db.func.count(Aide.siren), db.func.sum(Aide.delta_effectif), db.func.avg(Aide.delta_effectif_percent)).group_by(Aide.activiteprincipaleetablissement).all()
        app.logger.info(data)
        dataJson = []
        for i in range(len(data)):
            dataDict = {}
            dataDict['activiteprincipaleetablissement'] = data[i][0] 
            dataDict['montant'] = data[i][1] 
            dataDict['nombre'] = data[i][2] 
            dataDict['delta_effectif'] = data[i][3] 
            dataDict['delta_effectif_percent'] = str(data[i][4]) 
            dataJson.append(dataDict)
        return jsonify(dataJson)


@app.route('/stat/aide/classeeffectif', methods=['GET'])
def getclasseeffectifstat():
    # GET a specific data by id
    if request.method == 'GET':
        data = db.session.query(Aide.classe_effectif, db.func.sum(Aide.montant_modifie), db.func.count(Aide.siren), db.func.sum(Aide.delta_effectif), db.func.avg(Aide.delta_effectif_percent)).group_by(Aide.classe_effectif).all()
        app.logger.info(data)
        dataJson = []
        for i in range(len(data)):
            dataDict = {}
            dataDict['activiteprincipaleetablissement'] = data[i][0] 
            dataDict['montant'] = data[i][1] 
            dataDict['nombre'] = data[i][2] 
            dataDict['delta_effectif'] = data[i][3] 
            dataDict['delta_effectif_percent'] = str(data[i][4]) 
            dataJson.append(dataDict)
        return jsonify(dataJson)


######## GLOBAL STAT ############


@app.route('/stat/global/reg', methods=['GET'])
def getglobalregstat():
    # GET a specific data by id
    if request.method == 'GET':
        data = db.session.query(Stat.valeur_sous_dimension, Stat.total_siret, Stat.delta_effectif_total, Stat.delta_effectif_percent_mean).filter(Stat.dimension == "geo", Stat.sous_dimension == "reg").all()
        app.logger.info(data)
        dataJson = []
        for i in range(len(data)):
            dataDict = {}
            dataDict['reg'] = data[i][0] 
            dataDict['total_siret'] = data[i][1] 
            dataDict['delta_effectif_total'] = data[i][2] 
            dataDict['delta_effectif_percent_mean'] = data[i][3] 
            dataJson.append(dataDict)
        return jsonify(dataJson)


@app.route('/stat/global/dep', methods=['GET'])
def getglobaldepstat():
    # GET a specific data by id
    if request.method == 'GET':
        data = db.session.query(Stat.valeur_sous_dimension, Stat.total_siret, Stat.delta_effectif_total, Stat.delta_effectif_percent_mean).filter(Stat.dimension == "geo", Stat.sous_dimension == "dep").all()
        app.logger.info(data)
        dataJson = []
        for i in range(len(data)):
            dataDict = {}
            dataDict['dep'] = data[i][0] 
            dataDict['total_siret'] = data[i][1] 
            dataDict['delta_effectif_total'] = data[i][2] 
            dataDict['delta_effectif_percent_mean'] = data[i][3] 
            dataJson.append(dataDict)
        return jsonify(dataJson)

@app.route('/stat/global/dep/<string:codeinsee>', methods=['GET'])
def getglobalcodeinseestat(codeinsee):
    # GET a specific data by id
    if request.method == 'GET':
        data = db.session.query(Stat.valeur_sous_dimension, Stat.total_siret, Stat.delta_effectif_total, Stat.delta_effectif_percent_mean).filter(Stat.dimension == "geo", Stat.sous_dimension == "codeCommuneEtablissement", Stat.valeur_sous_dimension == codeinsee).all()
        app.logger.info(data)
        dataJson = []
        for i in range(len(data)):
            dataDict = {}
            dataDict['codeinsee'] = data[i][0] 
            dataDict['total_siret'] = data[i][1] 
            dataDict['delta_effectif_total'] = data[i][2] 
            dataDict['delta_effectif_percent_mean'] = data[i][3] 
            dataJson.append(dataDict)
        return jsonify(dataJson)


@app.route('/stat/global/classeeffectif', methods=['GET'])
def getglobalclasseeffectifstat():
    # GET a specific data by id
    if request.method == 'GET':
        data = db.session.query(Stat.valeur_sous_dimension, Stat.total_siret, Stat.delta_effectif_total, Stat.delta_effectif_percent_mean).filter(Stat.dimension == "classe_effectif").all()
        app.logger.info(data)
        dataJson = []
        for i in range(len(data)):
            dataDict = {}
            dataDict['classe_effectif'] = data[i][0] 
            dataDict['total_siret'] = data[i][1] 
            dataDict['delta_effectif_total'] = data[i][2] 
            dataDict['delta_effectif_percent_mean'] = data[i][3] 
            dataJson.append(dataDict)
        return jsonify(dataJson)


@app.route('/stat/global/ape', methods=['GET'])
def getglobalapestat():
    # GET a specific data by id
    if request.method == 'GET':
        data = db.session.query(Stat.valeur_sous_dimension, Stat.total_siret, Stat.delta_effectif_total, Stat.delta_effectif_percent_mean).filter(Stat.dimension == "ape").all()
        app.logger.info(data)
        dataJson = []
        for i in range(len(data)):
            dataDict = {}
            dataDict['ape'] = data[i][0] 
            dataDict['total_siret'] = data[i][1] 
            dataDict['delta_effectif_total'] = data[i][2] 
            dataDict['delta_effectif_percent_mean'] = data[i][3] 
            dataJson.append(dataDict)
        return jsonify(dataJson)

'''

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
