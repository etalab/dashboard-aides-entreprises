import pandas as pd
import os, sys
import random

path = "../data/0-brut/"
input_folder = os.listdir(path)


def addEffectif(row):
    cat = random.choices(['0', '1', '2', '3'], [10, 10, 79, 1], k=1)
    if(cat[0] == '0'):
        return 0
    if(cat[0] == '1'):
        return random.randrange(9)+1
    if(cat[0] == '2'):
        return random.randrange(490)+10    
    if(cat[0] == '3'):
        return random.randrange(100000)+500


def modulateEffectif(row):
    if(row['effectif'] == 0):
        return 0
    if((row['effectif'] > 0) & (row['effectif'] < 10)):
        cat2 = random.choices([0,1,2,3,4], [60,25,10,4,1], k=1)
        while(row['effectif']-cat2[0]<0):
            cat2 = random.choices([0,1,2,3,4], [60,25,10,4,1], k=1)
        return row['effectif']-cat2[0] 
    if((row['effectif'] >= 10 ) & (row['effectif'] < 500)):
        cat2 = random.choices([0,2,5,10,20,30,50,100], [40,10,10,10,8,5,5,3], k=1)
        while(row['effectif']-cat2[0]<0):
            cat2 = random.choices([0,1,2,3,4], [60,25,10,4,1], k=1)
        return row['effectif']-cat2[0] 
    if(row['effectif'] >= 500):
        cat2 = random.choices([0,2,5,10,20,30,50,100,200,500,1000,2000,5000,10000,50000], [30,10,10,10,8,5,5,3,2,2,2,2,2,2,2], k=1)
        while(row['effectif']-cat2[0]<0):
            cat2 = random.choices([0,1,2,3,4], [60,25,10,4,1], k=1)
        return row['effectif']-cat2[0] 


for file in input_folder:
   print(file)
   df = pd.read_csv("../data/0-brut/"+file)
   df = df[['siret']]
   df['dateRecuperationEffectif'] = "2020-03-01"
   df["effectif"]= df.apply(addEffectif, axis=1)   
   print("addeffectif ok")

   df['dateRecuperationEffectif2'] = "2020-04-01"
   df["effectif2"]= df.apply(modulateEffectif, axis=1)
   #df2.drop(columns=['dateRecuperationEffectif', 'effectif'])
   #df2.rename(columns={'dateRecuperationEffectif2':'dateRecuperationEffectif','effectif2':'effectif'},inplace=True)
   print("modulateeffectif ok")
   df.to_csv("../data/simu-effectifs/"+file,index=False)
   #df2.to_csv("../data/simu-effectifs/2020-04-01-"+file,index=False)

