import pandas as pd
from xlsx2csv import Xlsx2csv
import sys

daytoprocess = sys.argv[1]

print("Load xlsx and transform to csv")

xls_file = pd.ExcelFile("../data/pge/xlsx/"+daytoprocess+".xlsx")
sheet_names = xls_file.sheet_names

print("Process file and concat info in one dataframe")

dffinal = pd.DataFrame(columns=['nombre', 'montant', 'code_section','code_departement'])
for sheet in sheet_names:
    if(sheet != 'Récap'):
        df = xls_file.parse(sheet)
        dfnaf = df[31:51]
        dfnaf = dfnaf.rename(columns={dfnaf.columns[0]:"section_naf",dfnaf.columns[1]:"nombre",dfnaf.columns[3]:"montant"})
        dfnaf = dfnaf[['section_naf','nombre','montant']]
        dfnaf['montant'] = dfnaf['montant'].apply(lambda x: x * 1000000)
        dfnaf = dfnaf.reset_index()
        dfnaf = dfnaf.drop(columns={'index'})
        sectioncode = "ABCDEFGHIJKLMNOPQRSZ"
        i = 0
        naf = []
        for index,row in dfnaf.iterrows():
            row['code_section'] = sectioncode[i]
            i = i +1
            naf.append(row)
        newdfnaf = pd.DataFrame(naf)
        newdfnaf = newdfnaf[newdfnaf['nombre'].notna()]
        newdfnaf = newdfnaf.drop(columns={'section_naf'})
        newdfnaf['code_departement'] = sheet
        newdfnaf
        dffinal = dffinal.append(newdfnaf, ignore_index=True)

print("Clean dataframe")

dffinal['code_departement'] = dffinal['code_departement'].apply(lambda x : '971' if x == '951' else '972' if x == '953' else '973' if x == '952' else '974' if x == '957' else '976' if x == '954' else x)

dffinal = dffinal[['code_departement','code_section','nombre','montant']]

dffinal['last_update'] = daytoprocess

dffinal = dffinal.rename(columns={'code_departement':'dep'})

print("Add Region")

dep = pd.read_csv("../utils/departement2019.csv",dtype={'dep':str,'reg':str})

dep = dep[['dep','reg']]

dffinal = pd.merge(dffinal, dep, on='dep',how='left')

dffinal = dffinal[['reg','dep','code_section','nombre','montant','last_update']]

print("Remove info secret fiscal")

dfinter = dffinal[dffinal['code_section'] != 'Z']

dfgb = dfinter[dfinter['nombre'] < 3].groupby(['dep'], as_index=False).sum()

dffinal2 = dffinal

fin = []
for index,row in dffinal.iterrows():
    if(row['code_section'] == 'Z'):
        for index2,row2 in dfgb.iterrows():
            if(row['dep'] == row2['dep']):
                row['nombre'] = row['nombre'] + row2['nombre']
                row['montant'] = row['montant'] + row2['montant']
    fin.append(row)

dffin = pd.DataFrame(fin)

dffin['nombre'] = dffin['nombre'].apply(lambda x: 0 if x < 3 else x)

dffin = dffin[dffin['nombre'] != 0]

print("Save")

dffin.to_csv("../data/pge/pge-naf-"+daytoprocess+".csv",index=False)