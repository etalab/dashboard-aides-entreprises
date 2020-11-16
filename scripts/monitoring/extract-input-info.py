import glob
import pandas as pd
filenames = glob.glob('../../data/aides/aides-2020-*.csv')

arr = []
for filename in filenames:
    mydict = {}
    print(filename.split("../../data/aides/aides-")[1].split(".csv")[0])
    df = pd.read_csv(filename)
    df['Montant'] = df['Montant'].astype(float)
    mydict['date_paiement'] = filename.split("../../data/aides/aides-")[1].split(".csv")[0]
    mydict['nombre'] = df.shape[0]
    mydict['montant'] = df['Montant'].sum()
    arr.append(mydict)

print(arr)

df = pd.DataFrame(arr)

df2 = pd.read_csv('../../data/stats/extract-stats.csv')

df3 = pd.merge(df,df2,on='date_paiement',how='left')

df3.sort_values(by=['date_paiement'])

arr = []
for index,row in df3.iterrows():
    mydict = row
    if(row['nombre_x'] == row['nombre_y']):
        mydict['isNombreGood'] = True
    else:
        mydict['isSumGood'] = False
    if(row['montant_x'] == row['montant_y']):
        mydict['isSumGood'] = True
    else:
        mydict['isSumGood'] = False
    arr.append(mydict)

df4 = pd.DataFrame(arr)

df4.to_csv("../../data/stats/stats-agg.csv",index=False)

