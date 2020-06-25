import pandas as pd

read_file = pd.read_csv ("../published-data/reports-echeances-regional-naf-latest.csv",dtype=str)
read_file.to_excel ('../published-data/reports-echeances-regional-naf-latest.xlsx', index = None, header=True)

read_file = pd.read_csv ("../published-data/reports-echeances-departemental-naf-latest.csv",dtype=str)
read_file.to_excel ('../published-data/reports-echeances-departemental-naf-latest.xlsx', index = None, header=True)