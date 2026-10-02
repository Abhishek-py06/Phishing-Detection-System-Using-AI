import pandas as pd

data_path = "data/malicious_phish.csv"
df = pd.read_csv(data_path)

print(df.info())
print(df.head())
print(df['type'].value_counts())
