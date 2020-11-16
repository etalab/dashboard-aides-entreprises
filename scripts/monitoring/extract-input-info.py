import glob
import pandas as pd
filenames = glob.glob('../../data/aides/aides-2020-*.csv')

arr = []
for filename in filenames:
    print(filename.split("../../data/aides/aides-")[1].split(".csv")[0])
    df = pd.read_csv(filename)
    for dt in df.date_paiement.unique():
        mydict = {}
        df['Montant'] = df['Montant'].astype(float)
        mydict['date_paiement'] = dt
        mydict['nombre'] = df[df['date_paiement'] == dt].shape[0]
        mydict['montant'] = df[df['date_paiement'] == dt]['Montant'].sum()
        mydict['file'] = filename.split("../../data/aides/aides-")[1]
        arr.append(mydict)

df = pd.DataFrame(arr)

df = df.groupby(['date_paiement','file'],as_index=False).sum()

df.to_csv("../../data/stats/stats-files.csv",index=False)


df2 = pd.read_csv('../../data/stats/extract-stats.csv')

df3 = pd.merge(df,df2,on='date_paiement',how='outer')

df3.sort_values(by=['date_paiement'])

arr = []
for index,row in df3.iterrows():
    mydict = row
    if(round(row['nombre_x'],0) == round(row['nombre_y'],0)):
        mydict['isNombreGood'] = True
    else:
        mydict['isSumGood'] = False
    if(round(row['montant_x'],0) == round(row['montant_y'],0)):
        mydict['isSumGood'] = True
    else:
        mydict['isSumGood'] = False
    arr.append(mydict)

df4 = pd.DataFrame(arr)

df4 = df4.sort_values(by=['date_paiement'])

df4.to_csv("../../data/stats/stats-agg.csv",index=False)

df5 = df4[(df4['isNombreGood'] == False) | (df4['isSumGood'] == False)]

df5.to_csv("../../data/stats/stats-agg-errors.csv",index=False)
