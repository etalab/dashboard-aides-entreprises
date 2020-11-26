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

columns_classeeffectif = ['denomination', 'libelle', 'libelle_long','color']


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


@app.route('/sectionnace17', methods=['GET'])
def getSectionNace17():
    # GET a specific data by id
    if request.method == 'GET':
        my_query = "SELECT distinct code_section_nace17, libelle, color from nace17;"
        data = db.session.execute(my_query).fetchall()
        app.logger.info(data)
        dataJson = []
        for i in range(len(data)):
            dataDict = {}
            dataDict['code_section_nace17'] = str(data[i][0]) 
            dataDict['libelle_section_nace17'] = str(data[i][1]) 
            dataDict['color_section'] = str(data[i][2])
            dataJson.append(dataDict)

        return jsonify(dataJson)



@app.route('/categoriejuridique', methods=['GET'])
def getCategorieJuridique():
    # GET a specific data by id
    if request.method == 'GET':
        my_query = "SELECT code, libelle, color from categoriejuridique;"
        data = db.session.execute(my_query).fetchall()
        app.logger.info(data)
        dataJson = []
        for i in range(len(data)):
            dataDict = {}
            dataDict['code'] = str(data[i][0]) 
            dataDict['libelle'] = str(data[i][1]) 
            dataDict['color'] = str(data[i][2])
            dataJson.append(dataDict)

        return jsonify(dataJson)


@app.route('/classeeffectif', methods=['GET'])
def getClasseEffectifs():
    # GET a specific data by id
    if request.method == 'GET':
        my_query = "SELECT denomination, libelle, color from classeeffectif;"
        data = db.session.execute(my_query).fetchall()
        app.logger.info(data)
        dataJson = []
        for i in range(len(data)):
            dataDict = {}
            dataDict['denomination'] = str(data[i][0]) 
            dataDict['libelle'] = str(data[i][1]) 
            dataDict['color'] = str(data[i][2])
            dataJson.append(dataDict)

        return jsonify(dataJson)


#### API Section APE (test) #####

@app.route('/stat/aide', methods=['GET'])
def getStatAideNationalSectionAPE():
    # GET a specific data by id
    if request.method == 'GET':
        my_query = "SELECT SUM(A.montant) AS TotalMontant, COUNT(A.siren) AS TotalSiren, COUNT(DISTINCT A.siren) AS TotalUniqueSiren FROM aide A;"
        
        my_query_2 = "SELECT code_section, SUM(TotalMontant) AS SectionTotalMontant, SUM(TotalSiren) AS SectionTotalSiren, SUM(TotalUniqueSiren) AS SectionTotalUniqueSiren, libelle_section FROM (SELECT SUM(A.montant) AS TotalMontant, COUNT(A.siren) AS TotalSiren, COUNT(DISTINCT A.siren) AS TotalUniqueSiren, N.code_section, N.libelle_section FROM aide AS A LEFT JOIN (select distinct libelle_division, code_division, code_section, libelle_section from naf) AS N ON SUBSTR(A.activiteprincipaleetablissement,1,2) = N.code_division GROUP BY SUBSTR(A.activiteprincipaleetablissement,1,2), N.libelle_section, N.code_section ORDER BY TotalSiren DESC) AS divquery GROUP BY code_section, libelle_section ORDER BY SectionTotalSiren DESC;"

        my_query_3 = "SELECT * FROM (SELECT A.classe_effectif, SUM(A.montant) AS TotalMontant, COUNT(A.siren) AS TotalSiren, COUNT(DISTINCT A.siren) AS TotalUniqueSiren, C.libelle FROM aide AS A LEFT JOIN classeeffectif C ON A.classe_effectif = C.denomination WHERE A.classe_effectif IS NOT NULL GROUP BY A.classe_effectif, C.libelle) tbl WHERE totalsiren > 2 ORDER BY classe_effectif;"

        my_query_4 = "SELECT * FROM (SELECT SUBSTR(A.categoriejuridiqueunitelegale,1,2) AS code_categorie_juridique, SUM(A.montant) AS TotalMontant, COUNT(A.siren) AS TotalSiren, COUNT(DISTINCT A.siren) AS TotalUniqueSiren, C.libelle FROM aide AS A LEFT JOIN categoriejuridique C ON SUBSTR(A.categoriejuridiqueunitelegale,1,2) = C.code WHERE A.categoriejuridiqueunitelegale IS NOT NULL GROUP BY SUBSTR(A.categoriejuridiqueunitelegale,1,2), C.libelle) tbl WHERE totalsiren > 2 ORDER BY totalmontant DESC;"

        data = db.session.execute(my_query).fetchall()
        data2 = db.session.execute(my_query_2).fetchall()
        data3 = db.session.execute(my_query_3).fetchall()
        data4 = db.session.execute(my_query_4).fetchall()
        app.logger.info(data)
        dataJson = []
        for i in range(len(data)):
            dataDict = {}
            dataDict['montant'] = str(data[i][0]) 
            dataDict['nombre'] = str(data[i][1]) 
            dataDict['nombre_siren'] = str(data[i][2]) 
            dataDict['kpi_top_10_naf'] = []
            dataDict['kpi_classe_effectif'] = []
            dataDict['kpi_categorie_juridique'] = []
            autresmontant = 0
            autresnombre = 0
            autresnombresiren = 0
            for j in range(len(data2)):
                if(j < 10):
                    dataDict2 = {}
                    dataDict2['section_naf'] = str(data2[j][0]) 
                    dataDict2['montant'] = str(data2[j][1]) 
                    dataDict2['nombre'] = str(data2[j][2])
                    dataDict2['nombre_siren'] = str(data2[j][3])
                    dataDict2['libelle_section_naf'] = str(data2[j][4]) 
                    dataDict['kpi_top_10_naf'].append(dataDict2)
                else:
                    autresmontant = autresmontant + data2[j][1]
                    autresnombre = autresnombre + data2[j][2] 
                    autresnombresiren = autresnombresiren + data2[j][3] 
            dataDict2 = {}
            dataDict2['section_naf'] = "Autres" 
            dataDict2['montant'] = str(autresmontant)
            dataDict2['nombre'] = str(autresnombre)
            dataDict2['nombre_siren'] = str(autresnombresiren)
            dataDict2['libelle_section_naf'] = "Autres sections NAF"
            dataDict['kpi_top_10_naf'].append(dataDict2)

            autresmontant = 0
            autresnombre = 0
            autresnombresiren = 0
            for k in range(len(data3)):
                if((k < 4) | (str(data3[k][0]) == 'NN')):
                    dataDict3 = {}
                    dataDict3['classe_effectif'] = str(data3[k][0]) 
                    dataDict3['montant'] = str(data3[k][1]) 
                    dataDict3['nombre'] = str(data3[k][2])
                    dataDict3['nombre_siren'] = str(data3[k][3])
                    dataDict3['libelle_classe_effectif'] = str(data3[k][4]) 
                    dataDict['kpi_classe_effectif'].append(dataDict3)
                else:
                    autresmontant = autresmontant + data3[k][1]
                    autresnombre = autresnombre + data3[k][2] 
                    autresnombresiren = autresnombresiren + data3[k][3] 
            dataDict3 = {}
            dataDict3['classe_effectif'] = "Autres" 
            dataDict3['montant'] = str(autresmontant)
            dataDict3['nombre'] = str(autresnombre)
            dataDict3['nombre_siren'] = str(autresnombresiren)
            dataDict3['libelle_classe_effectif'] = "Autres Classes d'Effectifs"
            dataDict['kpi_classe_effectif'].append(dataDict3)

            autresmontant = 0
            autresnombre = 0
            autresnombresiren = 0
            for l in range(len(data4)):
                if(l<3):   
                    dataDict4 = {}
                    dataDict4['code_cat_juridique'] = str(data4[l][0]) 
                    dataDict4['montant'] = str(data4[l][1]) 
                    dataDict4['nombre'] = str(data4[l][2])
                    dataDict4['nombre_siren'] = str(data4[l][3])
                    dataDict4['libelle_cat_juridique'] = str(data4[l][4]) 
                    dataDict['kpi_categorie_juridique'].append(dataDict4)
                else:
                    autresmontant = autresmontant + data4[l][1]
                    autresnombre = autresnombre + data4[l][2] 
                    autresnombresiren = autresnombresiren + data4[l][3] 
            dataDict4 = {}
            dataDict4['code_cat_juridique'] = "Autres" 
            dataDict4['montant'] = str(autresmontant)
            dataDict4['nombre'] = str(autresnombre)
            dataDict4['nombre_siren'] = str(autresnombresiren)
            dataDict4['libelle_cat_juridique'] = "Autres Catégories Juridiques"
            dataDict['kpi_categorie_juridique'].append(dataDict4)

            dataJson.append(dataDict)
        return jsonify(dataJson)


@app.route('/stat/aide/reg', methods=['GET'])
def getStatAideRegionalSectionAPE():
    # GET a specific data by id
    if request.method == 'GET':
        my_query = "SELECT A.reg, SUM(A.montant) AS TotalMontant, COUNT(A.siren) AS TotalSiren, COUNT(DISTINCT A.siren) AS TotalUniqueSiren, R.libelle FROM aide AS A LEFT JOIN region AS R ON A.reg = R.reg GROUP BY A.reg, R.libelle;"
        data = db.session.execute(my_query).fetchall()
        app.logger.info(data)
        dataJson = []
        for i in range(len(data)):
            dataDict = {}
            dataDict['reg'] = str(data[i][0]) 
            dataDict['montant'] = str(data[i][1]) 
            dataDict['nombre'] = str(data[i][2])
            dataDict['nombre_siren'] = str(data[i][3])
            dataDict['libelle'] = str(data[i][4]) 

            my_query_2 = "SELECT code_section, SUM(TotalMontant) AS SectionTotalMontant, SUM(TotalSiren) AS SectionTotalSiren, SUM(TotalUniqueSiren) AS SectionTotalUniqueSiren, libelle_section FROM (SELECT SUM(A.montant) AS TotalMontant, COUNT(A.siren) AS TotalSiren, COUNT(DISTINCT A.siren) AS TotalUniqueSiren, N.code_section, N.libelle_section FROM aide AS A LEFT JOIN (select distinct libelle_division, code_division, code_section, libelle_section from naf) AS N ON SUBSTR(A.activiteprincipaleetablissement,1,2) = N.code_division WHERE A.reg = '"+str(data[i][0])+"' GROUP BY SUBSTR(A.activiteprincipaleetablissement,1,2), N.libelle_section, N.code_section ORDER BY TotalSiren DESC) AS divquery GROUP BY code_section, libelle_section ORDER BY SectionTotalSiren DESC;"

            my_query_3 = "SELECT * FROM (SELECT A.classe_effectif, SUM(A.montant) AS TotalMontant, COUNT(A.siren) AS TotalSiren, COUNT(DISTINCT A.siren) AS TotalUniqueSiren, C.libelle FROM aide AS A LEFT JOIN classeeffectif C ON A.classe_effectif = C.denomination WHERE A.classe_effectif IS NOT NULL AND A.reg = '"+str(data[i][0])+"' GROUP BY A.classe_effectif, C.libelle) tbl WHERE totalsiren > 2 ORDER BY classe_effectif;"
            
            my_query_4 = "SELECT * FROM (SELECT SUBSTR(A.categoriejuridiqueunitelegale,1,2) AS code_categorie_juridique, SUM(A.montant) AS TotalMontant, COUNT(A.siren) AS TotalSiren, COUNT(DISTINCT A.siren) AS TotalUniqueSiren, C.libelle FROM aide AS A LEFT JOIN categoriejuridique C ON SUBSTR(A.categoriejuridiqueunitelegale,1,2) = C.code WHERE A.categoriejuridiqueunitelegale IS NOT NULL AND A.reg = '"+str(data[i][0])+"' GROUP BY SUBSTR(A.categoriejuridiqueunitelegale,1,2), C.libelle) tbl WHERE totalsiren > 2 ORDER BY totalmontant DESC;"

            data2 = db.session.execute(my_query_2).fetchall()
            data3 = db.session.execute(my_query_3).fetchall()
            data4 = db.session.execute(my_query_4).fetchall()

            dataDict['kpi_top_10_naf'] = []
            dataDict['kpi_classe_effectif'] = []
            dataDict['kpi_categorie_juridique'] = []

            autresmontant = 0
            autresnombre = 0
            autresnombresiren = 0
            for j in range(len(data2)):
                if(j < 10):
                    dataDict2 = {}
                    dataDict2['section_naf'] = str(data2[j][0]) 
                    dataDict2['montant'] = str(data2[j][1]) 
                    dataDict2['nombre'] = str(data2[j][2])
                    dataDict2['nombre_siren'] = str(data2[j][3])
                    dataDict2['libelle_section_naf'] = str(data2[j][4]) 
                    dataDict['kpi_top_10_naf'].append(dataDict2)
                else:
                    autresmontant = autresmontant + data2[j][1]
                    autresnombre = autresnombre + data2[j][2]           
                    autresnombresiren = autresnombresiren + data2[j][3]           
            dataDict2 = {}
            dataDict2['section_naf'] = "Autres" 
            dataDict2['montant'] = str(autresmontant)
            dataDict2['nombre'] = str(autresnombre)
            dataDict2['nombre_siren'] = str(autresnombresiren)
            dataDict2['libelle_section_naf'] = "Autres sections NAF"
            dataDict['kpi_top_10_naf'].append(dataDict2)
            

            autresmontant = 0
            autresnombre = 0
            autresnombresiren = 0
            for k in range(len(data3)):
                if((k < 4) | (str(data3[k][0]) == 'NN')):
                    dataDict3 = {}
                    dataDict3['classe_effectif'] = str(data3[k][0]) 
                    dataDict3['montant'] = str(data3[k][1]) 
                    dataDict3['nombre'] = str(data3[k][2])
                    dataDict3['nombre_siren'] = str(data3[k][3])
                    dataDict3['libelle_classe_effectif'] = str(data3[k][4]) 
                    dataDict['kpi_classe_effectif'].append(dataDict3)
                else:
                    autresmontant = autresmontant + data3[k][1]
                    autresnombre = autresnombre + data3[k][2] 
                    autresnombresiren = autresnombresiren + data3[k][3] 
            dataDict3 = {}
            dataDict3['classe_effectif'] = "Autres" 
            dataDict3['montant'] = str(autresmontant)
            dataDict3['nombre'] = str(autresnombre)
            dataDict3['nombre_siren'] = str(autresnombresiren)
            dataDict3['libelle_classe_effectif'] = "Autres Classes d'Effectifs"
            dataDict['kpi_classe_effectif'].append(dataDict3)


            autresmontant = 0
            autresnombre = 0
            autresnombresiren = 0
            for l in range(len(data4)):
                if(l<3):   
                    dataDict4 = {}
                    dataDict4['code_cat_juridique'] = str(data4[l][0]) 
                    dataDict4['montant'] = str(data4[l][1]) 
                    dataDict4['nombre'] = str(data4[l][2])
                    dataDict4['nombre_siren'] = str(data4[l][3])
                    dataDict4['libelle_cat_juridique'] = str(data4[l][4]) 
                    dataDict['kpi_categorie_juridique'].append(dataDict4)
                else:
                    autresmontant = autresmontant + data4[l][1]
                    autresnombre = autresnombre + data4[l][2] 
                    autresnombresiren = autresnombresiren + data4[l][3] 
            dataDict4 = {}
            dataDict4['code_cat_juridique'] = "Autres" 
            dataDict4['montant'] = str(autresmontant)
            dataDict4['nombre'] = str(autresnombre)
            dataDict4['nombre_siren'] = str(autresnombresiren)
            dataDict4['libelle_cat_juridique'] = "Autres Catégories Juridiques"
            dataDict['kpi_categorie_juridique'].append(dataDict4)

            dataJson.append(dataDict)
        return jsonify(dataJson)


@app.route('/stat/aide/dep', methods=['GET'])
def getStatAideDepartementalSectionAPE():
    # GET a specific data by id
    if request.method == 'GET':
        my_query = "SELECT A.dep, SUM(A.montant) AS TotalMontant, COUNT(A.siren) AS TotalSiren, COUNT(DISTINCT A.siren) AS TotalUniqueSiren, D.libelle FROM aide AS A LEFT JOIN departement AS D ON A.dep = D.dep GROUP BY A.dep, D.libelle;"
        data = db.session.execute(my_query).fetchall()
        app.logger.info(data)
        dataJson = []
        for i in range(len(data)):
            dataDict = {}
            dataDict['dep'] = str(data[i][0]) 
            dataDict['montant'] = str(data[i][1]) 
            dataDict['nombre'] = str(data[i][2])
            dataDict['nombre_siren'] = str(data[i][3])
            dataDict['libelle'] = str(data[i][4]) 


            my_query_2 = "SELECT code_section, SUM(TotalMontant) AS SectionTotalMontant, SUM(TotalSiren) AS SectionTotalSiren, SUM(TotalUniqueSiren) AS SectionTotalUniqueSiren, libelle_section FROM (SELECT SUM(A.montant) AS TotalMontant, COUNT(A.siren) AS TotalSiren, COUNT(DISTINCT A.siren) AS TotalUniqueSiren, N.code_section, N.libelle_section FROM aide AS A LEFT JOIN (select distinct libelle_division, code_division, code_section, libelle_section from naf) AS N ON SUBSTR(A.activiteprincipaleetablissement,1,2) = N.code_division WHERE A.dep = '"+str(data[i][0])+"' GROUP BY SUBSTR(A.activiteprincipaleetablissement,1,2), N.libelle_section, N.code_section ORDER BY TotalSiren DESC) AS divquery GROUP BY code_section, libelle_section ORDER BY SectionTotalSiren DESC;"

            my_query_3 = "SELECT * FROM (SELECT A.classe_effectif, SUM(A.montant) AS TotalMontant, COUNT(A.siren) AS TotalSiren, COUNT(DISTINCT A.siren) AS TotalUniqueSiren, C.libelle FROM aide AS A LEFT JOIN classeeffectif C ON A.classe_effectif = C.denomination WHERE A.classe_effectif IS NOT NULL AND A.dep = '"+str(data[i][0])+"' GROUP BY A.classe_effectif, C.libelle) tbl WHERE totalsiren > 2 ORDER BY classe_effectif;"

            my_query_4 = "SELECT * FROM (SELECT SUBSTR(A.categoriejuridiqueunitelegale,1,2) AS code_categorie_juridique, SUM(A.montant) AS TotalMontant, COUNT(A.siren) AS TotalSiren, COUNT(DISTINCT A.siren) AS TotalUniqueSiren, C.libelle FROM aide AS A LEFT JOIN categoriejuridique C ON SUBSTR(A.categoriejuridiqueunitelegale,1,2) = C.code WHERE A.categoriejuridiqueunitelegale IS NOT NULL AND A.dep = '"+str(data[i][0])+"' GROUP BY SUBSTR(A.categoriejuridiqueunitelegale,1,2), C.libelle) tbl WHERE totalsiren > 2 ORDER BY totalmontant DESC;"

            data2 = db.session.execute(my_query_2).fetchall()
            data3 = db.session.execute(my_query_3).fetchall()
            data4 = db.session.execute(my_query_4).fetchall()

            dataDict['kpi_top_10_naf'] = []
            dataDict['kpi_classe_effectif'] = []
            dataDict['kpi_categorie_juridique'] = []


            autresmontant = 0
            autresnombre = 0
            autresnombresiren = 0
            for j in range(len(data2)):
                if(j < 10):
                    dataDict2 = {}
                    dataDict2['section_naf'] = str(data2[j][0]) 
                    dataDict2['montant'] = str(data2[j][1]) 
                    dataDict2['nombre'] = str(data2[j][2])
                    dataDict2['nombre_siren'] = str(data2[j][3])
                    dataDict2['libelle_section_naf'] = str(data2[j][4]) 
                    dataDict['kpi_top_10_naf'].append(dataDict2)
                else:
                    autresmontant = autresmontant + data2[j][1]
                    autresnombre = autresnombre + data2[j][2]           
                    autresnombresiren = autresnombresiren + data2[j][3]           
            dataDict2 = {}
            dataDict2['section_naf'] = "Autres" 
            dataDict2['montant'] = str(autresmontant)
            dataDict2['nombre'] = str(autresnombre)
            dataDict2['nombre_siren'] = str(autresnombresiren)
            dataDict2['libelle_section_naf'] = "Autres sections NAF"
            dataDict['kpi_top_10_naf'].append(dataDict2)

            autresmontant = 0
            autresnombre = 0
            autresnombresiren = 0
            for k in range(len(data3)):
                if((k < 4) | (str(data3[k][0]) == 'NN')):
                    dataDict3 = {}
                    dataDict3['classe_effectif'] = str(data3[k][0]) 
                    dataDict3['montant'] = str(data3[k][1]) 
                    dataDict3['nombre'] = str(data3[k][2])
                    dataDict3['nombre_siren'] = str(data3[k][3])
                    dataDict3['libelle_classe_effectif'] = str(data3[k][4]) 
                    dataDict['kpi_classe_effectif'].append(dataDict3)
                else:
                    autresmontant = autresmontant + data3[k][1]
                    autresnombre = autresnombre + data3[k][2] 
                    autresnombresiren = autresnombresiren + data3[k][3] 
            dataDict3 = {}
            dataDict3['classe_effectif'] = "Autres" 
            dataDict3['montant'] = str(autresmontant)
            dataDict3['nombre'] = str(autresnombre)
            dataDict3['nombre_siren'] = str(autresnombresiren)
            dataDict3['libelle_classe_effectif'] = "Autres Classes d'Effectifs"
            dataDict['kpi_classe_effectif'].append(dataDict3)


            autresmontant = 0
            autresnombre = 0
            autresnombresiren = 0
            for l in range(len(data4)):
                if(l<3):   
                    dataDict4 = {}
                    dataDict4['code_cat_juridique'] = str(data4[l][0]) 
                    dataDict4['montant'] = str(data4[l][1]) 
                    dataDict4['nombre'] = str(data4[l][2])
                    dataDict4['nombre_siren'] = str(data4[l][3])
                    dataDict4['libelle_cat_juridique'] = str(data4[l][4]) 
                    dataDict['kpi_categorie_juridique'].append(dataDict4)
                else:
                    autresmontant = autresmontant + data4[l][1]
                    autresnombre = autresnombre + data4[l][2] 
                    autresnombresiren = autresnombresiren + data4[l][3] 
            dataDict4 = {}
            dataDict4['code_cat_juridique'] = "Autres" 
            dataDict4['montant'] = str(autresmontant)
            dataDict4['nombre'] = str(autresnombre)
            dataDict4['nombre_siren'] = str(autresnombresiren)
            dataDict4['libelle_cat_juridique'] = "Autres Catégories Juridiques"
            dataDict['kpi_categorie_juridique'].append(dataDict4)

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



################## Reports ##############

@app.route('/stat/report', methods=['GET'])
def getStatReportsNationalSectionAPE():
    # GET a specific data by id
    if request.method == 'GET':
        my_query = "SELECT SUM(R.montant) AS TotalMontant, SUM(R.nombre) AS TotalSiren FROM report R;"
        
        my_query_2 = "SELECT R.code_section, SUM(R.montant) as montant, SUM(R.nombre) as nombre, N.libelle_section from report R LEFT JOIN (SELECT DISTINCT code_section, libelle_section from naf) N ON N.code_section = R.code_section GROUP BY R.code_section, N.libelle_section ORDER BY montant DESC;"

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

@app.route('/stat/report/reg', methods=['GET'])
def getStatReportReg():
    # GET a specific data by id
    if request.method == 'GET':

        my_query = "SELECT R.reg, SUM(R.montant) AS TotalMontant, SUM(R.nombre) AS TotalSiren, REG.libelle FROM report R LEFT JOIN region AS REG ON R.reg = REG.reg GROUP BY R.reg, REG.libelle;"

        data = db.session.execute(my_query).fetchall()
        app.logger.info(data)
        dataJson = []
        for i in range(len(data)):
            dataDict = {}
            dataDict['reg'] = str(data[i][0]) 
            dataDict['montant'] = str(data[i][1]) 
            dataDict['nombre'] = str(data[i][2])
            dataDict['libelle'] = str(data[i][3]) 


            my_query_2 = "SELECT R.code_section, SUM(R.montant) as montant, SUM(R.nombre) as nombre, N.libelle_section from report R LEFT JOIN (SELECT DISTINCT code_section, libelle_section from naf) N ON N.code_section = R.code_section WHERE R.reg = '"+str(data[i][0])+"' GROUP BY R.code_section, N.libelle_section ORDER BY montant DESC;"

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


@app.route('/stat/report/dep', methods=['GET'])
def getStatReportDepartementalSectionAPE():
    # GET a specific data by id
    if request.method == 'GET':


        my_query = "SELECT R.dep, SUM(R.montant) AS TotalMontant, SUM(R.nombre) AS TotalSiren, D.libelle FROM report R LEFT JOIN departement AS D ON R.dep = D.dep GROUP BY R.dep, D.libelle;"

        data = db.session.execute(my_query).fetchall()
        app.logger.info(data)
        dataJson = []
        for i in range(len(data)):
            dataDict = {}
            dataDict['dep'] = str(data[i][0]) 
            dataDict['montant'] = str(data[i][1]) 
            dataDict['nombre'] = str(data[i][2])
            dataDict['libelle'] = str(data[i][3]) 

            my_query_2 = "SELECT R.code_section, SUM(R.montant) as montant, SUM(R.nombre) as nombre, N.libelle_section from report R LEFT JOIN (SELECT DISTINCT code_section, libelle_section from naf) N ON N.code_section = R.code_section WHERE R.dep = '"+str(data[i][0])+"' GROUP BY R.code_section, N.libelle_section ORDER BY montant DESC;"

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



@app.route('/lastupdate/report', methods=['GET'])
def getLastUpdateDateReport():
    if request.method == 'GET':
        my_query = "select MAX(last_update) FROM report;"
        data = db.session.execute(my_query).fetchall()
        for i in range(len(data)):
            lastupdate = str(data[i][0])
        return str(lastupdate)

@app.route('/lastupdatehtml/report', methods=['GET'])
def getLastUpdateHtmlReport():
    if request.method == 'GET':
        my_query = "select MAX(last_update) FROM report;"
        data = db.session.execute(my_query).fetchall()
        for i in range(len(data)):
            lastupdate = str(data[i][0])
            lastupdate = datetime.datetime.strptime(lastupdate, "%Y-%m-%d").strftime("%d/%m/%Y")
        return "Données au "+str(lastupdate)



################## PGE ##############

@app.route('/stat/pge', methods=['GET'])
def getStatPGEsNationalSectionAPE():
    # GET a specific data by id
    if request.method == 'GET':
        my_query = "SELECT SUM(P.montant) AS TotalMontant, SUM(P.nombre) AS TotalSiren FROM pgenaf P;"
        
        my_query_2 = "SELECT P.code_section, SUM(P.montant) as montant, SUM(P.nombre) as nombre, N.libelle_section from pgenaf P LEFT JOIN (SELECT DISTINCT code_section, libelle_section from naf) N ON N.code_section = P.code_section GROUP BY P.code_section, N.libelle_section ORDER BY montant DESC;"

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

@app.route('/stat/pge/reg', methods=['GET'])
def getStatPGEReg():
    # GET a specific data by id
    if request.method == 'GET':

        my_query = "SELECT P.reg, SUM(P.montant) AS TotalMontant, SUM(P.nombre) AS TotalSiren, REG.libelle FROM pgenaf P LEFT JOIN region AS REG ON P.reg = REG.reg GROUP BY P.reg, REG.libelle;"

        data = db.session.execute(my_query).fetchall()
        app.logger.info(data)
        dataJson = []
        for i in range(len(data)):
            dataDict = {}
            dataDict['reg'] = str(data[i][0]) 
            dataDict['montant'] = str(data[i][1]) 
            dataDict['nombre'] = str(data[i][2])
            dataDict['libelle'] = str(data[i][3]) 


            my_query_2 = "SELECT P.code_section, SUM(P.montant) as montant, SUM(P.nombre) as nombre, N.libelle_section from pgenaf P LEFT JOIN (SELECT DISTINCT code_section, libelle_section from naf) N ON N.code_section = P.code_section WHERE P.reg = '"+str(data[i][0])+"' GROUP BY P.code_section, N.libelle_section ORDER BY montant DESC;"

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


@app.route('/stat/pge/dep', methods=['GET'])
def getStatPGEDepartementalSectionAPE():
    # GET a specific data by id
    if request.method == 'GET':


        my_query = "SELECT P.dep, SUM(P.montant) AS TotalMontant, SUM(P.nombre) AS TotalSiren, D.libelle FROM pgenaf P LEFT JOIN departement AS D ON P.dep = D.dep GROUP BY P.dep, D.libelle;"

        data = db.session.execute(my_query).fetchall()
        app.logger.info(data)
        dataJson = []
        for i in range(len(data)):
            dataDict = {}
            dataDict['dep'] = str(data[i][0]) 
            dataDict['montant'] = str(data[i][1]) 
            dataDict['nombre'] = str(data[i][2])
            dataDict['libelle'] = str(data[i][3]) 

            my_query_2 = "SELECT P.code_section, SUM(P.montant) as montant, SUM(P.nombre) as nombre, N.libelle_section from pgenaf P LEFT JOIN (SELECT DISTINCT code_section, libelle_section from naf) N ON N.code_section = P.code_section WHERE P.dep = '"+str(data[i][0])+"' GROUP BY P.code_section, N.libelle_section ORDER BY montant DESC;"

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



@app.route('/lastupdate/pge', methods=['GET'])
def getLastUpdateDatePGE():
    if request.method == 'GET':
        my_query = "select MAX(last_update) FROM pgenaf;"
        data = db.session.execute(my_query).fetchall()
        for i in range(len(data)):
            lastupdate = str(data[i][0])
        return str(lastupdate)

@app.route('/lastupdatehtml/pge', methods=['GET'])
def getLastUpdateHtmlPGE():
    if request.method == 'GET':
        my_query = "select MAX(last_update) FROM pgenaf;"
        data = db.session.execute(my_query).fetchall()
        for i in range(len(data)):
            lastupdate = str(data[i][0])
            lastupdate = datetime.datetime.strptime(lastupdate, "%Y-%m-%d").strftime("%d/%m/%Y")
        return "Données au "+str(lastupdate)




################## ACTIVITE PARTIELLE ##############

@app.route('/stat/activitepartielle', methods=['GET'])
def getStatActivitePartielleNationalSectionNACE17():
    # GET a specific data by id
    if request.method == 'GET':
        my_query = "select sum(A.nombre_demandes_deposees) AS TOTAL_NOMBRE_DEMANDES_DEPOSEES,sum(A.nombre_salaries_concernes) AS TOTAL_NOMBRE_SALARIES_CONCERNES,sum(A.nombre_heures_demandees) AS TOTAL_NOMBRE_HEURES_DEMANDEES from activitepartielle A;"

    
        my_query_2 = "select A.code_section_nace17, sum(A.nombre_demandes_deposees) AS TOTAL_NOMBRE_DEMANDES_DEPOSEES,sum(A.nombre_salaries_concernes) AS TOTAL_NOMBRE_SALARIES_CONCERNES,sum(A.nombre_heures_demandees) AS TOTAL_NOMBRE_HEURES_DEMANDEES, N.libelle from activitepartielle A LEFT JOIN nace17 N ON N.code_section_nace17 = A.code_section_nace17 GROUP BY A.code_section_nace17, N.libelle ORDER BY TOTAL_NOMBRE_SALARIES_CONCERNES DESC;"

        data = db.session.execute(my_query).fetchall()
        data2 = db.session.execute(my_query_2).fetchall()
        app.logger.info(data)
        dataJson = []
        for i in range(len(data)):
            dataDict = {}
            dataDict['nombre_demandes_deposees'] = str(data[i][0]) 
            dataDict['nombre_salaries_concernes'] = str(data[i][1]) 
            dataDict['nombre_heures_demandees'] = str(data[i][2]) 
            dataDict['kpi_top_10_nace17'] = []
            autresdemandes = 0
            autressalaries = 0
            autresheures = 0
            for j in range(len(data2)):
                if(j < 10):
                    dataDict2 = {}
                    dataDict2['code_section_nace17'] = str(data2[j][0]) 
                    dataDict2['nombre_demandes_deposees'] = str(data2[j][1]) 
                    dataDict2['nombre_salaries_concernes'] = str(data2[j][2])
                    dataDict2['nombre_heures_demandees'] = str(data2[j][3])
                    dataDict2['libelle_section_nace17'] = str(data2[j][4]) 
                    dataDict['kpi_top_10_nace17'].append(dataDict2)
                else:
                    autresdemandes = autresdemandes + data2[j][1]
                    autressalaries = autressalaries + data2[j][2]   
                    autresheures = autresheures + data2[j][3]         
            dataDict2 = {}
            dataDict2['code_section_nace17'] = "Autres" 
            dataDict2['nombre_demandes_deposees'] = str(autresdemandes)
            dataDict2['nombre_salaries_concernes'] = str(autressalaries)
            dataDict2['nombre_heures_demandees'] = str(autresheures)
            dataDict2['libelle_section_nace17'] = "Autres sections NACE 17"
            dataDict['kpi_top_10_nace17'].append(dataDict2)

            dataJson.append(dataDict)
        return jsonify(dataJson)

@app.route('/stat/activitepartielle/reg', methods=['GET'])
def getStatActivitePartielleReg():
    # GET a specific data by id
    if request.method == 'GET':

        my_query = "select A.reg, sum(A.nombre_demandes_deposees) AS TOTAL_NOMBRE_DEMANDES_DEPOSEES,sum(A.nombre_salaries_concernes) AS TOTAL_NOMBRE_SALARIES_CONCERNES,sum(A.nombre_heures_demandees) AS TOTAL_NOMBRE_HEURES_DEMANDEES, R.libelle from activitepartielle A LEFT JOIN region R ON R.reg = A.reg GROUP BY A.reg, R.libelle;"

        data = db.session.execute(my_query).fetchall()
        app.logger.info(data)
        dataJson = []
        for i in range(len(data)):
            dataDict = {}
            dataDict['reg'] = str(data[i][0]) 
            dataDict['nombre_demandes_deposees'] = str(data[i][1]) 
            dataDict['nombre_salaries_concernes'] = str(data[i][2])
            dataDict['nombre_heures_demandees'] = str(data[i][3])
            dataDict['libelle'] = str(data[i][4]) 

            my_query_2 = "select A.code_section_nace17, sum(A.nombre_demandes_deposees) AS TOTAL_NOMBRE_DEMANDES_DEPOSEES,sum(A.nombre_salaries_concernes) AS TOTAL_NOMBRE_SALARIES_CONCERNES,sum(A.nombre_heures_demandees) AS TOTAL_NOMBRE_HEURES_DEMANDEES, N.libelle from activitepartielle A LEFT JOIN nace17 N ON N.code_section_nace17 = A.code_section_nace17 WHERE A.reg = '"+str(data[i][0])+"' GROUP BY A.code_section_nace17, N.libelle ORDER BY TOTAL_NOMBRE_SALARIES_CONCERNES DESC;"

            data2 = db.session.execute(my_query_2).fetchall()

            dataDict['kpi_top_10_nace17'] = []

            autresdemandes = 0
            autressalaries = 0
            autresheures = 0
            for j in range(len(data2)):
                if(j < 10):
                    dataDict2 = {}
                    dataDict2['code_section_nace17'] = str(data2[j][0]) 
                    dataDict2['nombre_demandes_deposees'] = str(data2[j][1]) 
                    dataDict2['nombre_salaries_concernes'] = str(data2[j][2])
                    dataDict2['nombre_heures_demandees'] = str(data2[j][3])
                    dataDict2['libelle_section_nace17'] = str(data2[j][4]) 
                    dataDict['kpi_top_10_nace17'].append(dataDict2)
                else:
                    autresdemandes = autresdemandes + data2[j][1]
                    autressalaries = autressalaries + data2[j][2]      
                    autresheures = autresheures + data2[j][3]               
            dataDict2 = {}
            dataDict2['code_section_nace17'] = "Autres" 
            dataDict2['nombre_demandes_deposees'] = str(autresdemandes)
            dataDict2['nombre_salaries_concernes'] = str(autressalaries)
            dataDict2['nombre_heures_demandees'] = str(autresheures)
            dataDict2['libelle_section_nace17'] = "Autres sections NACE 17"
            dataDict['kpi_top_10_nace17'].append(dataDict2)

            dataJson.append(dataDict)
        return jsonify(dataJson)


@app.route('/stat/activitepartielle/dep', methods=['GET'])
def getStatActivitePartielleDepartementalSectionNACE17():
    # GET a specific data by id
    if request.method == 'GET':

        dataJson = []
        return jsonify(dataJson)



@app.route('/lastupdate/activitepartielle', methods=['GET'])
def getLastUpdateDateActivitePartielle():
    if request.method == 'GET':
        my_query = "select MAX(last_update) FROM activitepartielle;"
        data = db.session.execute(my_query).fetchall()
        for i in range(len(data)):
            lastupdate = str(data[i][0])
        return str(lastupdate)

@app.route('/lastupdatehtml/activitepartielle', methods=['GET'])
def getLastUpdateHtmlActivitePartielle():
    if request.method == 'GET':
        my_query = "select MAX(last_update) FROM activitepartielle;"
        data = db.session.execute(my_query).fetchall()
        for i in range(len(data)):
            lastupdate = str(data[i][0])
            lastupdate = datetime.datetime.strptime(lastupdate, "%Y-%m-%d").strftime("%d/%m/%Y")
        return "Données au "+str(lastupdate)



################## ACTIVITE PARTIELLE 2 ##############

@app.route('/stat/activitepartielle2', methods=['GET'])
def getStatActivitePartielle2NationalSectionNACE17():
    # GET a specific data by id
    if request.method == 'GET':
        my_query = "select sum(A.nombre_demandes_deposees) AS TOTAL_NOMBRE_DEMANDES_DEPOSEES,sum(A.nombre_salaries_concernes) AS TOTAL_NOMBRE_SALARIES_CONCERNES,sum(A.nombre_heures_demandees) AS TOTAL_NOMBRE_HEURES_DEMANDEES from activitepartielle A;"

    
        my_query_2 = "select DISTINCT A.mois from activitepartielle A ORDER BY A.mois;"

        my_query_3 = "SELECT A.code_section_nace17, N.libelle FROM activitepartielle A LEFT JOIN nace17 N ON N.code_section_nace17 = A.code_section_nace17 GROUP BY A.code_section_nace17, N.libelle ORDER BY SUM(A.nombre_salaries_concernes) DESC;"

        data = db.session.execute(my_query).fetchall()
        data2 = db.session.execute(my_query_2).fetchall()
        data3 = db.session.execute(my_query_3).fetchall()
        app.logger.info(data)
        dataJson = []
        for i in range(len(data)):
            dataDict = {}
            dataDict['nombre_demandes_deposees'] = str(data[i][0]) 
            dataDict['nombre_salaries_concernes'] = str(data[i][1]) 
            dataDict['nombre_heures_demandees'] = str(data[i][2]) 
            dataDict['mois'] = []
            
            for j in range(len(data2)):
                dataDict2 = {}
                dataDict2[str(data2[j][0])] = []
                
                autresdemandes = 0
                autressalaries = 0
                autresheures = 0
                for k in range(len(data3)):
                    my_query_4 = "select sum(A.nombre_demandes_deposees) AS TOTAL_NOMBRE_DEMANDES_DEPOSEES,sum(A.nombre_salaries_concernes) AS TOTAL_NOMBRE_SALARIES_CONCERNES,sum(A.nombre_heures_demandees) AS TOTAL_NOMBRE_HEURES_DEMANDEES from activitepartielle A WHERE A.code_section_nace17 = '"+str(data3[k][0])+"' AND mois = '"+str(data2[j][0])+"';"
                    data4 = db.session.execute(my_query_4).fetchall()
                    if(k < 10):
                        dataDict3 = {}
                        dataDict3['nombre_demandes_deposees'] = str(data4[0][0])
                        dataDict3['nombre_salaries_concernes'] = str(data4[0][1])
                        dataDict3['nombre_heures_demandees'] = str(data4[0][2])
                        dataDict3['code_section_nace17'] = str(data3[k][0])
                        dataDict3['libelle_section_nace17'] = str(data3[k][1])
                        dataDict2[str(data2[j][0])].append(dataDict3)
                    else:
                        autresdemandes = autresdemandes + data4[0][0]
                        autressalaries = autressalaries + data4[0][1]      
                        autresheures = autresheures + data4[0][2]  
                dataDict3 = {}
                dataDict3['nombre_demandes_deposees'] = str(autresdemandes)
                dataDict3['nombre_salaries_concernes'] = str(autressalaries)
                dataDict3['nombre_heures_demandees'] = str(autresheures)
                dataDict3['code_section_nace17'] = "Autres"
                dataDict3['libelle_section_nace17'] = "Autres sections NACE 17"
                dataDict2[str(data2[j][0])].append(dataDict3)

                dataDict['mois'].append(dataDict2)


            dataJson.append(dataDict)
        return jsonify(dataJson)

@app.route('/stat/activitepartielle2/reg', methods=['GET'])
def getStatActivitePartielle2Reg():
    # GET a specific data by id
    if request.method == 'GET':
        my_query = "select sum(A.nombre_demandes_deposees) AS TOTAL_NOMBRE_DEMANDES_DEPOSEES,sum(A.nombre_salaries_concernes) AS TOTAL_NOMBRE_SALARIES_CONCERNES,sum(A.nombre_heures_demandees) AS TOTAL_NOMBRE_HEURES_DEMANDEES, A.reg, R.libelle from activitepartielle A LEFT JOIN region R ON R.reg = A.reg GROUP BY A.reg, R.libelle ORDER BY R.libelle;"

    
        my_query_2 = "select DISTINCT A.mois from activitepartielle A ORDER BY A.mois;"

        my_query_3 = "SELECT A.code_section_nace17, N.libelle FROM activitepartielle A LEFT JOIN nace17 N ON N.code_section_nace17 = A.code_section_nace17 GROUP BY A.code_section_nace17, N.libelle ORDER BY SUM(A.nombre_salaries_concernes) DESC;"

        data = db.session.execute(my_query).fetchall()
        data2 = db.session.execute(my_query_2).fetchall()
        data3 = db.session.execute(my_query_3).fetchall()
        app.logger.info(data)
        dataJson = []
        for i in range(len(data)):
            dataDict = {}
            dataDict['nombre_demandes_deposees'] = str(data[i][0]) 
            dataDict['nombre_salaries_concernes'] = str(data[i][1]) 
            dataDict['nombre_heures_demandees'] = str(data[i][2]) 
            dataDict['reg'] = str(data[i][3]) 
            dataDict['libelle'] = str(data[i][4]) 
            dataDict['mois'] = []
            
            for j in range(len(data2)):
                dataDict2 = {}
                dataDict2[str(data2[j][0])] = []
                
                autresdemandes = 0
                autressalaries = 0
                autresheures = 0
                for k in range(len(data3)):
                    my_query_4 = "select sum(A.nombre_demandes_deposees) AS TOTAL_NOMBRE_DEMANDES_DEPOSEES,sum(A.nombre_salaries_concernes) AS TOTAL_NOMBRE_SALARIES_CONCERNES,sum(A.nombre_heures_demandees) AS TOTAL_NOMBRE_HEURES_DEMANDEES from activitepartielle A WHERE A.code_section_nace17 = '"+str(data3[k][0])+"' AND mois = '"+str(data2[j][0])+"' AND reg = '"+str(data[i][3])+"';"
                    data4 = db.session.execute(my_query_4).fetchall()
                    if(k < 10):
                        dataDict3 = {}
                        dataDict3['nombre_demandes_deposees'] = str(data4[0][0])
                        dataDict3['nombre_salaries_concernes'] = str(data4[0][1])
                        dataDict3['nombre_heures_demandees'] = str(data4[0][2])
                        dataDict3['code_section_nace17'] = str(data3[k][0])
                        dataDict3['libelle_section_nace17'] = str(data3[k][1])
                        dataDict2[str(data2[j][0])].append(dataDict3)
                    else:
                        if(data4[0][0] != None):
                            autresdemandes = autresdemandes + data4[0][0]
                        if(data4[0][1] != None):
                            autressalaries = autressalaries + data4[0][1]    
                        if(data4[0][2]):  
                            autresheures = autresheures + data4[0][2]  
                dataDict3 = {}
                dataDict3['nombre_demandes_deposees'] = str(autresdemandes)
                dataDict3['nombre_salaries_concernes'] = str(autressalaries)
                dataDict3['nombre_heures_demandees'] = str(autresheures)
                dataDict3['code_section_nace17'] = "Autres"
                dataDict3['libelle_section_nace17'] = "Autres sections NACE 17"
                dataDict2[str(data2[j][0])].append(dataDict3)

                dataDict['mois'].append(dataDict2)


            dataJson.append(dataDict)
        return jsonify(dataJson)



@app.route('/stat/activitepartielle2/dep', methods=['GET'])
def getStatActivitePartielle2DepartementalSectionNACE17():
    # GET a specific data by id
    if request.method == 'GET':

        dataJson = []
        return jsonify(dataJson)



@app.route('/lastupdate/activitepartielle2', methods=['GET'])
def getLastUpdateDateActivitePartielle2():
    if request.method == 'GET':
        my_query = "select MAX(last_update) FROM activitepartielle;"
        data = db.session.execute(my_query).fetchall()
        for i in range(len(data)):
            lastupdate = str(data[i][0])
        return str(lastupdate)

@app.route('/lastupdatehtml/activitepartielle2', methods=['GET'])
def getLastUpdateHtmlActivitePartielle2():
    if request.method == 'GET':
        my_query = "select MAX(last_update) FROM activitepartielle;"
        data = db.session.execute(my_query).fetchall()
        for i in range(len(data)):
            lastupdate = str(data[i][0])
            lastupdate = datetime.datetime.strptime(lastupdate, "%Y-%m-%d").strftime("%d/%m/%Y")
        return "Données au "+str(lastupdate)




################## ACTIVITE PARTIELLE 3 ##############

@app.route('/stat/activitepartielle3', methods=['GET'])
def getStatactivitepartielle3NationalSectionNACE17():
    # GET a specific data by id
    if request.method == 'GET':
        my_query = "select sum(A.nombre_demandes_deposees) AS TOTAL_NOMBRE_DEMANDES_DEPOSEES,sum(A.nombre_salaries_concernes) AS TOTAL_NOMBRE_SALARIES_CONCERNES,sum(A.nombre_heures_demandees) AS TOTAL_NOMBRE_HEURES_DEMANDEES from activitepartielle A;"

    
        my_query_2 = "select DISTINCT A.mois from activitepartielle A ORDER BY A.mois;"

        my_query_3 = "SELECT A.code_section_nace17, N.libelle FROM activitepartielle A LEFT JOIN nace17 N ON N.code_section_nace17 = A.code_section_nace17 GROUP BY A.code_section_nace17, N.libelle ORDER BY SUM(A.nombre_salaries_concernes) DESC;"

        data = db.session.execute(my_query).fetchall()
        data2 = db.session.execute(my_query_2).fetchall()
        data3 = db.session.execute(my_query_3).fetchall()
        app.logger.info(data)
        dataJson = []
        for i in range(len(data)):
            dataDict = {}
            dataDict['nombre_demandes_deposees'] = str(data[i][0]) 
            dataDict['nombre_salaries_concernes'] = str(data[i][1]) 
            dataDict['nombre_heures_demandees'] = str(data[i][2]) 
            dataDict['nace17'] = []
            mylist = []
            cpt = 0
            for k in range(len(data3)):
                dataDict2 = {}
                if(k < 5):
                    dataDict2['code_section_nace17'] = str(data3[k][0])
                    mylist.append(str(data3[k][0]))
                    dataDict2['libelle'] = str(data3[k][1])
                    dataDict2["data"] = []
                    for j in range(len(data2)):
                        my_query_4 = "select sum(A.nombre_demandes_deposees) AS TOTAL_NOMBRE_DEMANDES_DEPOSEES,sum(A.nombre_salaries_concernes) AS TOTAL_NOMBRE_SALARIES_CONCERNES,sum(A.nombre_heures_demandees) AS TOTAL_NOMBRE_HEURES_DEMANDEES from activitepartielle A WHERE A.code_section_nace17 = '"+str(data3[k][0])+"' AND mois = '"+str(data2[j][0])+"';"
                        data4 = db.session.execute(my_query_4).fetchall()
                        dataDict3 = {}
                        dataDict3['nombre_demandes_deposees'] = str(data4[0][0])
                        dataDict3['nombre_salaries_concernes'] = str(data4[0][1])
                        dataDict3['nombre_heures_demandees'] = str(data4[0][2])
                        dataDict3['mois'] = str(data2[j][0])
                        dataDict2["data"].append(dataDict3)
                    dataDict['nace17'].append(dataDict2)
                else:
                    if(cpt == 0):
                        cpt = 1
                        dataDict2['code_section_nace17'] = "Autres"
                        mylist.append(str(data3[k][0]))
                        dataDict2['libelle'] = "Autres section NACE 17"
                        dataDict2["data"] = []
                        for j in range(len(data2)):
                            mystr = ''
                            for el in mylist:
                                mystr = mystr+"A.code_section_nace17 != '"+el+"' AND "
                            my_query_4 = "select sum(A.nombre_demandes_deposees) AS TOTAL_NOMBRE_DEMANDES_DEPOSEES,sum(A.nombre_salaries_concernes) AS TOTAL_NOMBRE_SALARIES_CONCERNES,sum(A.nombre_heures_demandees) AS TOTAL_NOMBRE_HEURES_DEMANDEES from activitepartielle A WHERE "+mystr+"mois = '"+str(data2[j][0])+"';"
                            data4 = db.session.execute(my_query_4).fetchall()

                            dataDict3 = {}
                            dataDict3['nombre_demandes_deposees'] = str(data4[0][0])
                            dataDict3['nombre_salaries_concernes'] = str(data4[0][1])
                            dataDict3['nombre_heures_demandees'] = str(data4[0][2])
                            dataDict3['mois'] = str(data2[j][0])
                            dataDict2["data"].append(dataDict3)
                                            
                        dataDict['nace17'].append(dataDict2)


            dataJson.append(dataDict)
        return jsonify(dataJson)

@app.route('/stat/activitepartielle3/reg', methods=['GET'])
def getStatactivitepartielle3Reg():
    # GET a specific data by id
    if request.method == 'GET':
        my_query = "select sum(A.nombre_demandes_deposees) AS TOTAL_NOMBRE_DEMANDES_DEPOSEES,sum(A.nombre_salaries_concernes) AS TOTAL_NOMBRE_SALARIES_CONCERNES,sum(A.nombre_heures_demandees) AS TOTAL_NOMBRE_HEURES_DEMANDEES, A.reg, R.libelle from activitepartielle A LEFT JOIN region R ON R.reg = A.reg GROUP BY A.reg, R.libelle ORDER BY R.libelle;"

    
        my_query_2 = "select DISTINCT A.mois from activitepartielle A ORDER BY A.mois;"

        my_query_3 = "SELECT A.code_section_nace17, N.libelle FROM activitepartielle A LEFT JOIN nace17 N ON N.code_section_nace17 = A.code_section_nace17 GROUP BY A.code_section_nace17, N.libelle ORDER BY SUM(A.nombre_salaries_concernes) DESC;"

        data = db.session.execute(my_query).fetchall()
        data2 = db.session.execute(my_query_2).fetchall()
        data3 = db.session.execute(my_query_3).fetchall()
        app.logger.info(data)
        dataJson = []
        for i in range(len(data)):
            dataDict = {}
            dataDict['nombre_demandes_deposees'] = str(data[i][0]) 
            dataDict['nombre_salaries_concernes'] = str(data[i][1]) 
            dataDict['nombre_heures_demandees'] = str(data[i][2]) 
            dataDict['reg'] = str(data[i][3]) 
            dataDict['libelle'] = str(data[i][4]) 
            dataDict['nace17'] = []
            mylist = []
            cpt = 0
            for k in range(len(data3)):
                if(k < 5):
                    dataDict2 = {}
                    dataDict2['code_section_nace17'] = str(data3[k][0])
                    mylist.append(str(data3[k][0]))
                    dataDict2['libelle'] = str(data3[k][1])
                    dataDict2["data"] = []
                    for j in range(len(data2)):
                        my_query_4 = "select sum(A.nombre_demandes_deposees) AS TOTAL_NOMBRE_DEMANDES_DEPOSEES,sum(A.nombre_salaries_concernes) AS TOTAL_NOMBRE_SALARIES_CONCERNES,sum(A.nombre_heures_demandees) AS TOTAL_NOMBRE_HEURES_DEMANDEES from activitepartielle A WHERE A.code_section_nace17 = '"+str(data3[k][0])+"' AND mois = '"+str(data2[j][0])+"' AND reg = '"+str(data[i][3])+"';"
                        data4 = db.session.execute(my_query_4).fetchall()
                        dataDict3 = {}
                        dataDict3['nombre_demandes_deposees'] = str(data4[0][0])
                        dataDict3['nombre_salaries_concernes'] = str(data4[0][1])
                        dataDict3['nombre_heures_demandees'] = str(data4[0][2])
                        dataDict3['mois'] = str(data2[j][0])
                        dataDict2["data"].append(dataDict3)
                    dataDict['nace17'].append(dataDict2)

                else:
                    if(cpt == 0):
                        cpt = 1
                        dataDict2 = {}
                        dataDict2['code_section_nace17'] = "Autres"
                        mylist.append(str(data3[k][0]))
                        dataDict2['libelle'] = "Autres sections NACE 17"
                        dataDict2["data"] = []
                        for j in range(len(data2)):
                            mystr = ''
                            for el in mylist:
                                mystr = mystr+"A.code_section_nace17 != '"+el+"' AND "
                            my_query_4 = "select sum(A.nombre_demandes_deposees) AS TOTAL_NOMBRE_DEMANDES_DEPOSEES,sum(A.nombre_salaries_concernes) AS TOTAL_NOMBRE_SALARIES_CONCERNES,sum(A.nombre_heures_demandees) AS TOTAL_NOMBRE_HEURES_DEMANDEES from activitepartielle A WHERE "+mystr+"mois = '"+str(data2[j][0])+"' AND reg = '"+str(data[i][3])+"';"
                            data4 = db.session.execute(my_query_4).fetchall()

                            dataDict3 = {}
                            dataDict3['nombre_demandes_deposees'] = str(data4[0][0])
                            dataDict3['nombre_salaries_concernes'] = str(data4[0][1])
                            dataDict3['nombre_heures_demandees'] = str(data4[0][2])
                            dataDict3['mois'] = str(data2[j][0])
                            dataDict2["data"].append(dataDict3)
                                            
                        dataDict['nace17'].append(dataDict2)


            dataJson.append(dataDict)
        return jsonify(dataJson)


@app.route('/stat/activitepartielle3/dep', methods=['GET'])
def getStatactivitepartielle3DepartementalSectionNACE17():
    # GET a specific data by id
    if request.method == 'GET':

        dataJson = []
        return jsonify(dataJson)



@app.route('/lastupdate/activitepartielle3', methods=['GET'])
def getLastUpdateDateactivitepartielle3():
    if request.method == 'GET':
        my_query = "select MAX(last_update) FROM activitepartielle;"
        data = db.session.execute(my_query).fetchall()
        for i in range(len(data)):
            lastupdate = str(data[i][0])
        return str(lastupdate)

@app.route('/lastupdatehtml/activitepartielle3', methods=['GET'])
def getLastUpdateHtmlactivitepartielle3():
    if request.method == 'GET':
        my_query = "select MAX(last_update) FROM activitepartielle;"
        data = db.session.execute(my_query).fetchall()
        for i in range(len(data)):
            lastupdate = str(data[i][0])
            lastupdate = datetime.datetime.strptime(lastupdate, "%Y-%m-%d").strftime("%d/%m/%Y")
        return "Données au "+str(lastupdate)




################## CPSTI ##############

@app.route('/stat/cpsti', methods=['GET'])
def getStatCPSTINationalSectionAPE():
    # GET a specific data by id
    if request.method == 'GET':
        my_query = "SELECT SUM(C.montant) AS TotalMontant, SUM(C.nombre) AS TotalSiren FROM cpsti C;"
        
        my_query_2 = "SELECT C.code_section, SUM(C.montant) as montant, SUM(C.nombre) as nombre, N.libelle_section from cpsti C LEFT JOIN (SELECT DISTINCT code_section, libelle_section from naf) N ON N.code_section = C.code_section GROUP BY C.code_section, N.libelle_section ORDER BY montant DESC;"

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

@app.route('/stat/cpsti/reg', methods=['GET'])
def getStatCPSTIReg():
    # GET a specific data by id
    if request.method == 'GET':

        my_query = "SELECT C.reg, SUM(C.montant) AS TotalMontant, SUM(C.nombre) AS TotalSiren, REG.libelle FROM cpsti C LEFT JOIN region AS REG ON C.reg = REG.reg GROUP BY C.reg, REG.libelle;"

        data = db.session.execute(my_query).fetchall()
        app.logger.info(data)
        dataJson = []
        for i in range(len(data)):
            dataDict = {}
            dataDict['reg'] = str(data[i][0]) 
            dataDict['montant'] = str(data[i][1]) 
            dataDict['nombre'] = str(data[i][2])
            dataDict['libelle'] = str(data[i][3]) 


            my_query_2 = "SELECT C.code_section, SUM(C.montant) as montant, SUM(C.nombre) as nombre, N.libelle_section from cpsti C LEFT JOIN (SELECT DISTINCT code_section, libelle_section from naf) N ON N.code_section = C.code_section WHERE C.reg = '"+str(data[i][0])+"' GROUP BY C.code_section, N.libelle_section ORDER BY montant DESC;"

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


@app.route('/stat/cpsti/dep', methods=['GET'])
def getStatCPSTIDepartementalSectionAPE():
    # GET a specific data by id
    if request.method == 'GET':


        my_query = "SELECT C.dep, SUM(C.montant) AS TotalMontant, SUM(C.nombre) AS TotalSiren, D.libelle FROM cpsti C LEFT JOIN departement AS D ON C.dep = D.dep GROUP BY C.dep, D.libelle;"

        data = db.session.execute(my_query).fetchall()
        app.logger.info(data)
        dataJson = []
        for i in range(len(data)):
            dataDict = {}
            dataDict['dep'] = str(data[i][0]) 
            dataDict['montant'] = str(data[i][1]) 
            dataDict['nombre'] = str(data[i][2])
            dataDict['libelle'] = str(data[i][3]) 

            my_query_2 = "SELECT C.code_section, SUM(C.montant) as montant, SUM(C.nombre) as nombre, N.libelle_section from cpsti C LEFT JOIN (SELECT DISTINCT code_section, libelle_section from naf) N ON N.code_section = C.code_section WHERE C.dep = '"+str(data[i][0])+"' GROUP BY C.code_section, N.libelle_section ORDER BY montant DESC;"

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



@app.route('/lastupdate/cpsti', methods=['GET'])
def getLastUpdateDateCPSTI():
    if request.method == 'GET':
        my_query = "select MAX(last_update) FROM cpsti;"
        data = db.session.execute(my_query).fetchall()
        for i in range(len(data)):
            lastupdate = str(data[i][0])
        return str(lastupdate)

@app.route('/lastupdatehtml/cpsti', methods=['GET'])
def getLastUpdateHtmlCPSTI():
    if request.method == 'GET':
        my_query = "select MAX(last_update) FROM cpsti;"
        data = db.session.execute(my_query).fetchall()
        for i in range(len(data)):
            lastupdate = str(data[i][0])
            lastupdate = datetime.datetime.strptime(lastupdate, "%Y-%m-%d").strftime("%d/%m/%Y")
        return "Données au "+str(lastupdate)




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
    app.run(host='0.0.0.0',port=5050)
