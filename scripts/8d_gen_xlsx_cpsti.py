import pandas as pd

read_file = pd.read_csv ("../published-data/cpsti-regional-naf-latest.csv",dtype=str)
read_file.to_excel ('../published-data/cpsti-regional-naf-latest.xlsx', index = None, header=True)

read_file = pd.read_csv ("../published-data/cpsti-departemental-naf-latest.csv",dtype=str)
read_file.to_excel ('../published-data/cpsti-departemental-naf-latest.xlsx', index = None, header=True)