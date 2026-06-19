# FATEC JAHU

# TRABALHO V – BACKUP E RESTORE

# BANCO DE DADOS – NÃO RELACIONAL

# Prof. Me. Tiago Antonio da Silva

## Exercício 1

1. Faça um backup completo do banco de dados do Detran, salvando os dados no diretório `./backup_detran`

Comando utilizado:

```bash
mongodump --db detran --out ./backup_detran
```

## Exercício 2

2. Faça o backup da coleção proprietarios do banco Detran, salvando em `./backup_proprietarios`

Comando utilizado:

```bash
mongodump --db detran --collection proprietarios --out ./backup_proprietarios
```

## Exercício 3

3. Restaure um backup completo do banco Detran a partir da pasta `./backup_detran`

Comando utilizado:

```bash
mongorestore ./backup_detran
```

Outra maneira:

```bash
mongorestore --db detran ./backup_detran/detran
```

## Exercício 4

4. Exporte somente os documentos da coleção multas do banco Detran onde o campo ano seja 2025, salvando em `./backup_multas2025`

Comando utilizado:

```bash
mongodump --db detran --collection multas --query '{ "ano": 2025 }' --out ./backup_multas2025
```

Com veículos pois não tenho multas:

```bash
mongodump --db detran --collection veiculos --query '{ "ano": { "$gte": "2000" } }' --out ./backup_veiculos2000
```

Comando deu errado então vamos usar um arquivo JSON separado com a query:

```bash
mongodump --db detran --collection veiculos --queryFile ./query.json --out ./backup_veiculos2000
```

## Exercício 5

5. Restaure a coleção multas no banco Detran, removendo os dados atuais antes de restaurar os novos, usando um diretório de backup chamado
   `./backup_multas2025`.

Comando utilizado:

```bash
mongorestore --drop --db detran --collection multas ./backup_multas2025/detran/multas.bson
```

Com veículos pois não tenho multas:

```bash
mongorestore --drop --db detran --collection veiculos ./backup_veiculos2000/detran/veiculos.bson
```
