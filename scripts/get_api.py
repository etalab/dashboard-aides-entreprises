import pandas as pd
import requests
import json
import multiprocessing
from time import time
import sys, os


if __name__ == '__main__':

    
    df = pd.read_csv(sys.argv[1], dtype={'siren':str,'siret':str, 'Cde postal':str,})

    ts = time()
    print("go")


    mydf = []
    i = 0
    for index, row in df.iterrows():
        i = i + 1
        print(i)
        onerow = {}
        onerow = row
        url = "https://entreprise.api.gouv.fr/v2/entreprises/"+row['siren']+"?non_diffusables=true&recipient=13002526500013&object=%22dashboard%20aides%20aux%20entreprises%22&context=%22dashboard%20aides%20aux%20entreprises%22&token=<MON-TOKEN>"
        
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
                if "tranche_effectif_salarie_entreprise" in mydict['entreprise']:
                    if "code" in mydict['entreprise']['tranche_effectif_salarie_entreprise']:
                        row['trancheeffectifsetablissement'] = mydict['entreprise']['tranche_effectif_salarie_entreprise']['code']
                if "etat_administratif" in mydict['entreprise']:
                    if "value" in mydict['entreprise']['etat_administratif']:
                        row['etatadministratifetablissement'] = mydict['entreprise']['etat_administratif']['value']
        except requests.exceptions.ConnectionError: 
            print("Error : "+row['siren'])
        mydf.append(row)


    df = pd.DataFrame(mydf)

    print(time() - ts)

    df.to_csv(sys.argv[1]+".enrich",index=False)
