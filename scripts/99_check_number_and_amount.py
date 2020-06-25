import pandas as pd
import os

files = os.listdir("../data/aides/csv")
files = list(filter(lambda f: f.endswith(".csv"),files))

nbtot = 0
nbmont = 0

for file in files:
    df = pd.read_csv("../data/aides/csv/"+file,dtype=str)
    print(file)
    print("Nb : "+str(df.shape[0]-1))
    print("Montant : "+str(df.loc[df.shape[0]-1]['Montant']))
    nbtot = nbtot + int(df.shape[0]-1)
    nbmont = nbmont + float(df.loc[df.shape[0]-1]['Montant'])
    print("Nb concat : "+str(nbtot))
    print("Montant sum : "+str(nbmont))
    print("---")

print("GLOBAL")
print("Nb concat : "+str(nbtot))
print("Montant sum : "+str(nbmont))
