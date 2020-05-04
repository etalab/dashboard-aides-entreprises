import pandas as pd
import os, sys
import datetime
from xlsx2csv import Xlsx2csv
import requests
import json
import time
import configparser


config = configparser.ConfigParser()
config.read('./config.ini')


print("Assurez-vous d'avoir placer le fichier du jour au format XLSX dans ../data/aides/XLSX")

daytoprocess = sys.argv[1]


Xlsx2csv("../data/aides/xlsx/"+daytoprocess+".XLSX", outputencoding="utf-8").convert("../data/aides/csv/"+daytoprocess+".csv")

print("CSV généré")

df = pd.read_csv("../data/aides/csv/"+daytoprocess+".csv", dtype={"Période":str,"SIREN":str,"Cde postal": str,"Pays":str,"Montant":float,"Dev.":str,"Date paiement":str})
df = df.dropna(subset=['SIREN'])

print("Dataframe aide chargé")

print(str(df.shape[0])+" lignes")

df['mois'] = df['Période'].apply(lambda x: x.split("-")[0])
df['volet'] = df['Période'].apply(lambda x: x.split("-")[1])
df = df.rename(columns={'SIREN': 'siren'})

print("Premiers enrichissements ok")

print("Loading dataframe siren")

dfsiren = pd.read_csv("../data/extracts/extract-siren-siege.csv", dtype={'siren': str, 'siret': str, 'reg':str,'dep':str,'codecommuneetablissement':str, 'trancheeffectifsetablissement':str})

print("Dataframe siren loaded")

print(str(dfsiren.shape[0])+" lignes, "+str(dfsiren.siren.nunique())+" unique siren")

print("Merging aides avec siren")

result = pd.merge(df,dfsiren,on='siren',how='left')

print("Vérification de la taille : "+str(result.shape[0])+", doit correspondre à :"+str(df.shape[0]))

print("Nombre de siret non trouvé : "+str(result[result['siret'].isna()].shape[0])+", soit : "+str(result[result['siret'].isna()].shape[0] / result.shape[0] * 100)+"%")

print("Remplacement des tranche effectifs etablissements au mauvais format")

result['trancheeffectifsetablissement'] = result['trancheeffectifsetablissement'].apply(lambda x: '01' if x == '1.0' else '02' if x == '2.0' else '03' if x == '3.0' else x)


del dfsiren

# ICI
print("Get catégorie juridique")
dfjur = pd.read_csv("../data/extracts/siren-juridique.csv",dtype={'siren':str,'categoriejuridiqueunitelegale':str})
result = pd.merge(result,dfjur,on='siren',how='left')
print("Ok")

del dfjur

resultna = result[result['siret'].isna()]

resultna.to_csv("../data/aides/aides-na-"+daytoprocess+".csv",index=False)

print("Fichier des siret non trouvés sauvegardés ici : ../data/aides/aides-na-"+daytoprocess+".csv")



print("Loading effectif mars")

dfeff_mars = pd.read_csv("../data/effectifs/effectifs-siren-2020-03.csv", dtype={'siren': str})

dfeff_mars = dfeff_mars.rename(columns={'effectif':'effectif_mars'})

print("Loading effectif février")

dfeff_fev = pd.read_csv("../data/effectifs/effectifs-siren-2020-02.csv", dtype={'siren': str})

dfeff_fev = dfeff_fev.rename(columns={'effectif':'effectif_fev'})

print("Merging aides avec effectif mars")

result = pd.merge(result,dfeff_mars,on='siren',how='left')

print("Merging aides avec effectif février")

result = pd.merge(result,dfeff_fev,on='siren',how='left')

print("Loading effectif 2019")

dfeff_2019 = pd.read_csv("../data/effectifs/EMA2019.csv.20200410114006", header=None, sep=";",dtype={0:str})

dfeff_2019 = dfeff_2019.rename(columns={0:'siren',1:'effectif_2019'})

print("Merging aides avec effectif 2019")

result2 = pd.merge(result,dfeff_2019,on='siren',how='left')

print("Mise à jour de la tranche effectif au plus précis : février meilleur que 2019 meilleur que base SIRENE")

result2['classe_effectif_mars'] = result2['effectif_mars'].apply(lambda x: None if x != x else '00' if x == 0 else '01' if x <= 2 else '02' if x <= 5 else '03' if x <= 9 else '11' if x <= 19 else '12' if x <= 49 else '21' if x <= 99 else '22' if x <= 199 else '31' if x <= 249 else '32' if x <= 499 else '41' if x <= 999 else '42' if x <= 1999 else '51' if x <= 4999 else '52' if x <= 9999 else '53')


result2['classe_effectif_fev'] = result2['effectif_fev'].apply(lambda x: None if x != x else '00' if x == 0 else '01' if x <= 2 else '02' if x <= 5 else '03' if x <= 9 else '11' if x <= 19 else '12' if x <= 49 else '21' if x <= 99 else '22' if x <= 199 else '31' if x <= 249 else '32' if x <= 499 else '41' if x <= 999 else '42' if x <= 1999 else '51' if x <= 4999 else '52' if x <= 9999 else '53')

result2['classe_effectif_2019'] = result2['effectif_2019'].apply(lambda x: None if x != x else '00' if x == 0 else '01' if x <= 2 else '02' if x <= 5 else '03' if x <= 9 else '11' if x <= 19 else '12' if x <= 49 else '21' if x <= 99 else '22' if x <= 199 else '31' if x <= 249 else '32' if x <= 499 else '41' if x <= 999 else '42' if x <= 1999 else '51' if x <= 4999 else '52' if x <= 9999 else '53')

result2['classe_effectif_Tranche'] = result2['trancheeffectifsetablissement'].apply(lambda x: None if x != x else x)

result2['classe_effectif'] = result2['classe_effectif_mars']

ress = []
i = 0
for index, row in result2.iterrows():
    i = i + 1
    if(i%100000 == 0):
        print(i)
    res = {}
    res = row
    if(res['classe_effectif'] == None):
        if(res['classe_effectif_fev'] == None):
            if(res['classe_effectif_2019']== None):
                if(res['classe_effectif_Tranche'] == None):
                    res['classe_effectif'] = None
                else:
                    res['classe_effectif'] = res['classe_effectif_Tranche']
            else:
                res['classe_effectif'] = res['classe_effectif_2019']
        else:
            res['classe_effectif'] = res['classe_effectif_fev']
    else:
        res['classe_effectif'] = res['classe_effectif']
    ress.append(res)

result3 = pd.DataFrame(ress)

print("Tranche effectif mise à jour")

print("Préparation du dataframe final pour l'aide")

result3['numero_sequentiel'] = result3['siren']+"-"+result3['mois']+"-"+result3['volet']+"-"+result3['Date paiement']
result3['date_dp'] = None
result3['nom1'] = None
result3['nom2'] = None
result3['count_siren_nb'] = None
result3['montant_modifie'] = None
result3['delta_effectif'] = None
result3['delta_effectif_percent'] = None



result3['date_paiement'] = result3['Date paiement'].apply(lambda x: datetime.datetime.strptime(x,'%m-%d-%y').strftime('%Y-%m-%d'))

dfaide = result3[['volet','numero_sequentiel','mois','siren','nom1','nom2','effectif_mars','Montant','Dev.','date_dp','date_paiement','siret','reg','dep','codecommuneetablissement','activiteprincipaleetablissement','count_siren_nb','montant_modifie','delta_effectif','delta_effectif_percent','classe_effectif','categoriejuridiqueunitelegale']]

dfaide.to_csv("../data/aides/aides-"+daytoprocess+".csv",index=False)

print("Fichier aides sauvegardés : ../data/aides/aides-"+daytoprocess+".csv")

print("Récupération des SIREN non diffusibles (peut être long) :")

print(str(resultna.shape[0])+" siren à récupérer via API entreprise")
mydf = []
i = 0
for index, row in resultna.iterrows():
    time.sleep(0.5)
    i = i + 1
    print(str(i)+" - "+row['siren'])
    onerow = {}
    onerow = row
    url = "https://entreprise.api.gouv.fr/v2/entreprises/"+row['siren']+"?non_diffusables=true&recipient=13002526500013&object=%22dashboard%20aides%20aux%20entreprises%22&context=%22dashboard%20aides%20aux%20entreprises%22&token="+config['API']['MON_TOKEN']

    try:
        r = requests.get(url=url)
        mydict = r.json()
        if "etablissement_siege" in mydict:
            if "siret" in mydict['etablissement_siege']:
                row['siret'] = mydict['etablissement_siege']['siret']
            if "naf" in mydict['etablissement_siege']:
                row['activiteprincipaleetablissement'] = mydict['etablissement_siege']['naf']
            if "enseigne" in mydict['etablissement_siege']:
                row['enseigne1etablissement'] = mydict['etablissement_siege']['enseigne']
            if "adresse" in mydict['etablissement_siege']:
                if "code_insee_localite" in mydict['etablissement_siege']['adresse']:
                    row['codecommuneetablissement'] = mydict['etablissement_siege']['adresse']['code_insee_localite']
        if "entreprise" in mydict:
            if "forme_juridique_code" in mydict['entreprise']:
                row['categoriejuridiqueunitelegale'] = mydict['entreprise']['forme_juridique_code']
            if "tranche_effectif_salarie_entreprise" in mydict['entreprise']:
                if "code" in mydict['entreprise']['tranche_effectif_salarie_entreprise']:
                    row['trancheeffectifsetablissement'] = mydict['entreprise']['tranche_effectif_salarie_entreprise']['code']
            if "etat_administratif" in mydict['entreprise']:
                if "value" in mydict['entreprise']['etat_administratif']:
                    row['etatadministratifetablissement'] = mydict['entreprise']['etat_administratif']['value']
    except requests.exceptions.ConnectionError:
        print("Error : "+row['siren'])
    mydf.append(row)


dfaidenaenrichapi = pd.DataFrame(mydf)

dfaidenaenrichapi.to_csv("../data/aides/aides-na-api-"+daytoprocess+".csv",index=False)

print("Fichier des siret non diffusibles enrichis sauvegardé ici : ../data/aides/aides-na-api-"+daytoprocess+".csv")


dfna = pd.read_csv("../data/aides/aides-na-api-"+daytoprocess+".csv", dtype={'siren':str,'Cde postal':str,'siret':str,'trancheeffectifsetablissement': str,'activiteprincipaleetablissement':str,'reg':str,'dep':str,'codecommuneetablissement':str,'categoriejuridiqueunitelegale':str})

print("Loading communes")

dfcom = pd.read_csv("../utils/communes-2019.csv",dtype={'com':str,'reg':str,'dep':str,'arr':str})
dfcom = dfcom.drop_duplicates(subset=['com'],keep='first')
dfcom = dfcom.rename(columns={'com':'codecommuneetablissement'})
dfcom = dfcom[['codecommuneetablissement','reg','dep']]

print("Merging aide na avec communes")

dfna2 = pd.merge(dfna,dfcom,on='codecommuneetablissement',how='left')

dfna2 = dfna2[['Période', 'siren', 'Cde postal', 'Pays', 'Montant', 'Dev.', 
       'Date paiement', 'mois', 'volet', 'siret',
       'trancheeffectifsetablissement', 'etablissementsiege',
       'activiteprincipaleetablissement', 'etatadministratifetablissement',
       'enseigne1etablissement', 'reg_y', 'dep_y', 'codecommuneetablissement',
       'geo_adresse', 'geo_score', 'longitude', 'latitude','categoriejuridiqueunitelegale']]

dfna2 = dfna2.rename(columns={'reg_y':'reg','dep_y':'dep'})

print("récupération des effectifs pour aide na")

result3na = result3[result3['siret'].isna()]

result3na = result3na[['siren','effectif_mars','classe_effectif']]

dfna3 = pd.merge(dfna2,result3na,on='siren',how='left')

print("préparation de aide na")

dfna3['numero_sequentiel'] = dfna3['siren']+"-"+dfna3['mois']+"-"+dfna3['volet']+"-"+dfna3['Date paiement']
dfna3['date_dp'] = None
dfna3['nom1'] = None
dfna3['nom2'] = None
dfna3['count_siren_nb'] = None
dfna3['montant_modifie'] = None
dfna3['delta_effectif'] = None
dfna3['delta_effectif_percent'] = None

dfna3['date_paiement'] = dfna3['Date paiement'].apply(lambda x: datetime.datetime.strptime(x,'%m-%d-%y').strftime('%Y-%m-%d'))

dfaidena = dfna3[['volet','numero_sequentiel','mois','siren','nom1','nom2','effectif_mars','Montant','Dev.','date_dp','date_paiement','siret','reg','dep','codecommuneetablissement','activiteprincipaleetablissement','count_siren_nb','montant_modifie','delta_effectif','delta_effectif_percent','classe_effectif','categoriejuridiqueunitelegale']]

print("Concaténation dataframe aide siret diffusibles et non diffusibles")

dfaidewithoutna = dfaide[dfaide['siret'].notna()]

print("La somme : "+str(dfaidewithoutna.shape[0]+dfaidena.shape[0])+" doit être la même que : "+str(dfaide.shape[0]))

dfaidefinal = dfaidewithoutna.append(dfaidena)

dfaidefinal['activiteprincipaleetablissement'] = dfaidefinal['activiteprincipaleetablissement'].apply(lambda x: str(x).replace(".",""))

dfaidefinal['activiteprincipaleetablissement'] = dfaidefinal['activiteprincipaleetablissement'].apply(lambda x: None if x == 'nan' else x)

dfaidefinal.to_csv("../data/aides/aides-"+daytoprocess+".csv",index=False)

print("Fichier aides final sauvegardés ici :../data/aides/aides-"+daytoprocess+".csv")

print("Statistiques :")
print("---")
print("Effectifs")
print("---")
print("Pourcentage de tranche effectifs manquants dans la base sirene : "+str(result3[result3['trancheeffectifsetablissement'].isna()].shape[0] / result3.shape[0] * 100))

print("Pourcentage d'effectifs manquants acoss mars : "+str(result3[result3['effectif_mars'].isna()].shape[0] / result3.shape[0] * 100))

print("Pourcentage d'effectifs manquants acoss fevrier : "+str(result3[result3['effectif_fevrier'].isna()].shape[0] / result3.shape[0] * 100))

print("Pourcentage d'effectifs manquants acoss 2019 : "+str(result3[result3['effectif_2019'].isna()].shape[0] / result3.shape[0] * 100))

print("Pourcentage d'effectifs globaux manquants : "+str(dfaidefinal[dfaidefinal['classe_effectif'].isna()].shape[0] / dfaidefinal.shape[0] * 100))

print("---")
print("APE")
print("---")
print("Pourcentage d'APE manquant : "+str(dfaidefinal[dfaidefinal['activiteprincipaleetablissement'].isna()].shape[0] / dfaidefinal.shape[0] * 100))

print("---")
print("Géographique")
print("---")

print("Pourcentage de région manquante : "+str(dfaidefinal[dfaidefinal['reg'].isna()].shape[0] / dfaidefinal.shape[0] * 100))
print("Pourcentage de département manquant : "+str(dfaidefinal[dfaidefinal['dep'].isna()].shape[0] / dfaidefinal.shape[0] * 100))
print("Pourcentage de code insee manquant : "+str(dfaidefinal[dfaidefinal['codecommuneetablissement'].isna()].shape[0] / dfaidefinal.shape[0] * 100))

result3[result3['effectif_2019'].isna()][['siren']].to_csv("../data/aides/na/siren-aides-manquants-acoss-effectifs-2019-"+daytoprocess+".csv", index=False)
result3[result3['effectif_fev'].isna()][['siren']].to_csv("../data/aides/na/siren-aides-manquants-acoss-effectifs-fev-"+daytoprocess+".csv", index=False)
result3[result3['effectif_mars'].isna()][['siren']].to_csv("../data/aides/na/siren-aides-manquants-acoss-effectifs-mars-"+daytoprocess+".csv", index=False)
dfaidefinal[dfaidefinal['activiteprincipaleetablissement'].isna()][['siren']].to_csv("../data/aides/na/siren-aides-manquants-ape-"+daytoprocess+".csv", index=False)
dfaidefinal[dfaidefinal['reg'].isna()][['siren']].to_csv("../data/aides/na/siren-aides-manquants-reg-dep-"+daytoprocess+".csv", index=False)
dfaidefinal[dfaidefinal['codecommuneetablissement'].isna()][['siren']].to_csv("../data/aides/na/siren-aides-manquants-codeinsee-"+daytoprocess+".csv", index=False)

print("Fichiers des infos manquants sauvegardés dans ../data/aides/na/")

print("END")