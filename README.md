# Banco de Dados Não Relacional
Estudos sobre Banco de Dados Não Relacional com o MongoDB e os comandos em JavaScript.

## Comandos:

Para executar o arquivo JavaScript no shell do MongoDB, basta usar o comando:
```sh
mongosh script.js
```
Ou abrir o mongosh e usar o comando:
```js
load("script.js")
```

```sh
db
# Mostra o banco de dados atualmente selecionado.

use meuBanco
# Se meuBanco não existir, ele será criado assim que um documento for inserido.

show dbs
# Exibe os bancos disponíveis. Se um banco estiver vazio, ele não será listado.

show collections
# Mostra todas as coleções em um banco.
```