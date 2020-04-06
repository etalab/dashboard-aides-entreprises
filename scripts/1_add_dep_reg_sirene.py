import pandas as pd
import os, sys

path = "../data/0-brut/"
input_folder = os.listdir(path)

dfcom =  pd.read_csv("../utils/communes-2019.csv", dtype={'reg':str, 'dep':str, 'arr':str,'com':str})
dfcom = dfcom[dfcom['reg'].notna() & dfcom['dep'].notna()]
dfcom = dfcom.drop_duplicates(subset=['com','reg','dep'])
dfcom.rename(columns={'com':'codeCommuneEtablissement'},inplace=True)


for file in input_folder:
   print(file)
   lf = []
   for i in range(10):
      val = "geo_siret_0"+str(i)+".csv"
      lf.append(val)
   for i in range(45):
      val = "geo_siret_"+str(i+10)+".csv"
      lf.append(val)
   lf.append("geo_siret_.csv")
   lf.append("geo_siret_2A.csv")
   lf.append("geo_siret_2B.csv")
   if file not in lf:
       df = pd.read_csv("../data/0-brut/"+file, dtype={'codeCommuneEtablissement':str})
       dfmerge = pd.merge(df, dfcom, on='codeCommuneEtablissement', how='left')
       dfmerge.to_csv("../data/1-enrich/"+file,index=False)