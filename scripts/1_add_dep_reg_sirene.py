import pandas as pd
import os, sys

path = "../data/0-brut/"
input_folder = os.listdir(path)

dfcom =  pd.read_csv("../utils/communes-2019.csv")
dfcom = dfcom[dfcom['reg'].notna() & dfcom['dep'].notna()]
dfcom = dfcom.drop_duplicates(subset=['com','reg','dep'])
dfcom.rename(columns={'com':'codeCommuneEtablissementString'},inplace=True)


for file in input_folder:
   print(file)
   df = pd.read_csv("../data/0-brut/"+file)
   df["codeCommuneEtablissementString"]= df["codeCommuneEtablissement"].apply(lambda x: str(x) if len(str(x)) == 5 else str(x) if x != x else "0"+str(x))
   dfmerge = pd.merge(df, dfcom, on='codeCommuneEtablissementString', how='left')
   dfmerge.to_csv("../data/1-enrich/"+file,index=False)