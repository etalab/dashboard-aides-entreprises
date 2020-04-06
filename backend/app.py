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


logging.basicConfig()
logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)

columns_siret = ['siren', 'nic', 'siret', 'statutdiffusionetablissement', 'datecreationetablissement', 'trancheeffectifsetablissement', 'anneeeffectifsetablissement', 'activiteprincipaleregistremetiersetablissement', 'datederniertraitementetablissement', 'etablissementsiege', 'nombreperiodesetablissement', 'complementadresseetablissement', 'numerovoieetablissement', 'indicerepetitionetablissement', 'typevoieetablissement', 'libellevoieetablissement', 'codepostaletablissement', 'libellecommuneetablissement', 'libellecommuneetrangeretablissement', 'distributionspecialeetablissement', 'codecommuneetablissement', 'codecedexetablissement', 'libellecedexetablissement', 'codepaysetrangeretablissement', 'libellepaysetrangeretablissement', 'complementadresse2etablissement', 'numerovoie2etablissement', 'indicerepetition2etablissement', 'typevoie2etablissement', 'libellevoie2etablissement', 'codepostal2etablissement', 'libellecommune2etablissement', 'libellecommuneetranger2etablissement', 'distributionspeciale2etablissement', 'codecommune2etablissement', 'codecedex2etablissement', 'libellecedex2etablissement', 'codepaysetranger2etablissement', 'libellepaysetranger2etablissement', 'datedebut', 'etatadministratifetablissement', 'enseigne1etablissement', 'enseigne2etablissement', 'enseigne3etablissement', 'denominationusuelleetablissement', 'activiteprincipaleetablissement', 'nomenclatureactiviteprincipaleetablissement', 'caractereemployeuretablissement', 'longitude', 'latitude', 'geo_score', 'geo_type', 'geo_adresse', 'geo_id', 'geo_ligne', 'geo_l4', 'geo_l5', 'codecommuneetablissementstring', 'typecom', 'reg', 'dep', 'arr', 'tncc', 'ncc', 'nccenr', 'libelle', 'can', 'comparent']

columns_effectif = ['siret', 'daterecuperationeffectif', 'effectif']

columns_aide = ['code_application', 'numero_sequentiel', 'mois', 'siren', 'nom1', 'nom2', 'effectif', 'montant', 'devise', 'date_dp', 'date_paiement', 'siret', 'reg', 'dep', 'codecommuneetablissementstring', 'activiteprincipaleetablissement', 'count_siren_nb', 'montant_modifie', 'delta_effectif', 'delta_effectif_global','classe_effectif']

columns_stat = ['id_stat', 'dimension', 'sous_dimension', 'valeur_sous_dimension', 'total_siret', 'delta_effectif_total', 'delta_effectif_percent_mean']

@app.route('/')
def index():
    app.logger.info("yes")
    return render_template('home.html')

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
        #aide = getobjectsjson(data, columns_aide)
        return "toto"
        #return jsonify(aide)
        
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

@app.route('/aide/codeinsee/<string:codecommuneetablissementstring>', methods=['GET'])
def getaidefromcodeinsee(codecommuneetablissementstring):
    # GET a specific data by id
    if request.method == 'GET':
        data = Aide.query.filter(Aide.codecommuneetablissementstring == codecommuneetablissementstring).all()
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
        data = db.session.query(Aide.codecommuneetablissementstring, db.func.sum(Aide.montant_modifie), db.func.count(Aide.siren), db.func.sum(Aide.delta_effectif), db.func.avg(Aide.delta_effectif_percent)).filter(Aide.dep == dep).group_by(Aide.codecommuneetablissementstring).all()
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
