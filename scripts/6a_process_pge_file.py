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
        dfnaf = df[26:47]
        dfnaf = dfnaf.rename(columns={dfnaf.columns[0]:"section_naf",dfnaf.columns[1]:"nombre",dfnaf.columns[3]:"montant"})
        dfnaf = dfnaf[['section_naf','nombre','montant']]
        dfnaf['montant'] = dfnaf['montant'].apply(lambda x: 0 if x == 'ND' else x * 1000000)
        dfnaf = dfnaf.reset_index()
        dfnaf = dfnaf.drop(columns={'index'})
        sectioncode = "ABCDEFGHIJKLMNOPQRSZX"
        i = 0
        naf = []
        for index,row in dfnaf.iterrows():
            row['code_section'] = sectioncode[i]
            i = i +1
            naf.append(row)
        newdfnaf = pd.DataFrame(naf)
        
        newdfnaf
        
        totalnb = 0
        totalm = 0
        arr = []
        for index,row in newdfnaf.iterrows():
            if(row['nombre'] == 'ND'):
                row['nombre'] = 0
            if(row['nombre'] !=  row['nombre']):
                row['nombre'] = 0
            if(row['montant'] == 'ND'):
                row['montant'] = 0
            if(row['montant'] !=  row['montant']):
                row['montant'] = 0
            if(row['code_section'] != 'X'):
                totalnb = totalnb + row['nombre']
                totalm = totalm + row['montant']
            arr.append(row)
        newdfnaf = pd.DataFrame(arr)
        
        newdfnaf
        
        
        if(newdfnaf[newdfnaf['code_section'] == 'Z'].iloc[0]['montant'] != newdfnaf[newdfnaf['code_section'] == 'Z'].iloc[0]['montant']):
            newdfnaf.loc[newdfnaf['code_section'] == 'Z', "montant"] = 0
        if(newdfnaf[newdfnaf['code_section'] == 'Z'].iloc[0]['nombre'] != newdfnaf[newdfnaf['code_section'] == 'Z'].iloc[0]['nombre']):
            newdfnaf.loc[newdfnaf['code_section'] == 'Z', "nombre"] = 0
        
        newdfnaf.loc[newdfnaf['code_section'] == 'Z', "montant"] = newdfnaf[newdfnaf['code_section'] == 'Z'].iloc[0]['montant'] + newdfnaf[newdfnaf['code_section'] == 'X'].iloc[0]['montant'] - totalm
        
        
        newdfnaf.loc[newdfnaf['code_section'] == 'Z', "nombre"] = newdfnaf[newdfnaf['code_section'] == 'Z'].iloc[0]['nombre'] + newdfnaf[newdfnaf['code_section'] == 'X'].iloc[0]['nombre'] - totalnb
        
        newdfnaf = newdfnaf[:-1]
       
        
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

dffin = dffinal

dffin = dffin[dffin['nombre'] != 0]

print("Save")

dffin.to_csv("../data/pge/pge-naf-"+daytoprocess+".csv",index=False)
