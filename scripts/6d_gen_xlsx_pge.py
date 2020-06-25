import pandas as pd

read_file = pd.read_csv ("../published-data/pge-regional-naf-latest.csv",dtype=str)
read_file.to_excel ('../published-data/pge-regional-naf-latest.xlsx', index = None, header=True)

read_file = pd.read_csv ("../published-data/pge-departemental-naf-latest.csv",dtype=str)
read_file.to_excel ('../published-data/pge-departemental-naf-latest.xlsx', index = None, header=True)