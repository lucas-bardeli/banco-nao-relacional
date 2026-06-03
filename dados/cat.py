import pandas as pd

# O nome cat.py vem de uma referência ao comando cat do terminal de sistemas Unix/Linux
arquivo = input("Digite o caminho do arquivo CSV: ")

# Abre o arquivo para leitura
file = open(arquivo)

# Lê todas as linhas do arquivo e conta quantas linhas existem
numline = len(file.readlines())
print("\nNúmero de linhas: ", numline)

# Fecha o arquivo após a leitura
file.close()

print("\nVersão mais performática usando 'with'")
with open(arquivo) as file:
    numline = len(file.readlines())
    print("Número de linhas: ", numline)

print("\nVersão com função do Pandas")
df = pd.read_csv(arquivo, nrows=5)
print("Primeiras linhas do arquivo: \n", df.head())
