import pandas as pd

read_file = pd.read_csv ("../published-data/activite-partielle-departemental-nace17-latest.csv",dtype=str)
read_file.to_excel ('../published-data/activite-partielle-departemental-nace17-latest.xlsx', index = None, header=True)