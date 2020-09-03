import os
import pandas as pd
import glob

from datetime import datetime

today = datetime.today().strftime('%Y-%m-%d')

path = '../data/ccompte-extract/'
all_files = glob.glob(os.path.join(path, "*.csv"))

all_files = sorted(all_files)

writer = pd.ExcelWriter('../published-data/fonds-solidarite-association-'+today+'.xlsx', engine='xlsxwriter')

for f in all_files:
    print(f)
    df = pd.read_csv(f,dtype=str)
    df.to_excel(writer, sheet_name=os.path.splitext(os.path.basename(f))[0], index=False)


writer.save()
