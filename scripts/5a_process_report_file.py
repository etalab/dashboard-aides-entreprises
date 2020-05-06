import pandas as pd
from xlsx2csv import Xlsx2csv
import sys

daytoprocess = sys.argv[1]

print("Convert XLSX to CSV")

Xlsx2csv("../data/reports/xlsx/"+daytoprocess+".xlsx", outputencoding="utf-8").convert("../data/reports/csv/"+daytoprocess+".csv")

print("Load csv")

df = pd.read_csv("../data/reports/csv/"+daytoprocess+".csv", header=3)

print("Drop useless column")

df = df.drop(columns={'Libellé A21'})

dep = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '21', '22', '23', '24', '25', '26', '27', '28', '29', '2A', '2B', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '971', '972', '973', '974', '976', 'ND', 'total']

print("Shape doit être égal à 24 : "+str(df.shape[0]))

print("Concat in one df")

df = df.iloc[:, :-3]

i = 0
j = 0
k = 0
for column in df:
    if((i != 0) & (k < len(dep))):
        if(j % 2 == 1):
            df = df.rename(columns={column: "montant_"+dep[k]})
            j = 0
            k = k + 1
        else:
            df = df.rename(columns={column: "nombre_"+dep[k]})
            j = j + 1
    i = i + 1

df = df[:24]

print("Generate one simple df")

df2 = df[['A21',"nombre_"+dep[0],"montant_"+dep[0]]]
df2['code_departement'] = dep[0]
df2 = df2.rename(columns={"nombre_"+dep[0]: 'nombre',"montant_"+dep[0]:'montant'})
i = 0
for i in range(len(dep)):
    if(i != 0):
        dfinter = df[['A21',"nombre_"+dep[i],"montant_"+dep[i]]]
        dfinter['code_departement'] = dep[i]
        dfinter = dfinter.rename(columns={"nombre_"+dep[i]: 'nombre',"montant_"+dep[i]:'montant'})
        df2 = df2.append(dfinter)


df3 = df2

df3['ND'] = df3['nombre'].apply(lambda x: True if x == 'ND' else False)

df3['nombre'] = df3['nombre'].apply(lambda x: x if x != 'ND' else 0)
df3['montant'] = df3['montant'].apply(lambda x: x if x != 'ND' else 0)

df3['nombre'] = df3['nombre'].astype(float)
df3['montant'] = df3['montant'].astype(float)

dftotal = df3[df3['A21'] == 'TOTAL']

dfdep = df3[df3['A21'] != 'TOTAL']

print("Put ND values in Z section")

for i in range(len(dep)):
    dfinter = dfdep[dfdep['code_departement'] == dep[i]][['montant','code_departement']]
    somme = dfinter.groupby(['code_departement']).sum()['montant'].iloc[0]
    total = dftotal[dftotal['code_departement'] == dep[i]][['montant']]['montant'].iloc[0]
    delta = total - somme
    dfdep.loc[((dfdep.code_departement == dep[i]) & (dfdep['A21'] == 'Z')), 'montant'] = delta + dfdep[((dfdep.code_departement == dep[i]) & (dfdep['A21'] == 'Z'))]['montant'].iloc[0]

    dfinter2 = dfdep[dfdep['code_departement'] == dep[i]][['nombre','code_departement']]
    somme2 = dfinter2.groupby(['code_departement']).sum()['nombre'].iloc[0]
    total2 = dftotal[dftotal['code_departement'] == dep[i]][['nombre']]['nombre'].iloc[0]
    delta2 = total2 - somme2
    dfdep.loc[((dfdep.code_departement == dep[i]) & (dfdep['A21'] == 'Z')), 'nombre'] = delta2 + dfdep[((dfdep.code_departement == dep[i]) & (dfdep['A21'] == 'Z'))]['nombre'].iloc[0]


dfdep['code_departement'] = dfdep['code_departement'].apply(lambda x: None if x == 'ND' else x)

print("Exclude total info")

dffinal = dfdep[dfdep['code_departement'] != 'total']

print("Get Region in dataframe")

dep = pd.read_csv("../utils/departement2019.csv",dtype={'dep':str,'reg':str})

dep = dep[['dep','reg']]

dep = dep.rename(columns={'dep':'code_departement'})

dffinal2 = pd.merge(dffinal, dep, on='code_departement',how='left')

dffinal2 = dffinal2.drop(columns=['ND'])

dffinal2 = dffinal2.rename(columns={'A21':'code_section'})

dffinal2['last_update'] = daytoprocess 

dffinal2 = dffinal2[['reg','code_departement','code_section','nombre','montant','last_update']]

dffinal2 = dffinal2.rename(columns={'code_departement':'dep'})

print("Save csv")

dffinal2.to_csv("../data/reports/reports-"+daytoprocess+".csv",index=False)
