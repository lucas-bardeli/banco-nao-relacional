# 🍀 Banco de Dados Não Relacional
Estudos sobre Banco de Dados Não Relacional com o MongoDB e os comandos em JavaScript.

## 🔑 Comandos
Para executar o arquivo JavaScript no shell do MongoDB, basta usar o comando:
```bash
mongosh script.js
```
Ou abrir o mongosh e usar o comando:
```js
load("script.js")
```
```bash
db
# Mostra o banco de dados atualmente selecionado.

use meuBanco
# Se meuBanco não existir, ele será criado assim que um documento for inserido.

show dbs
# Exibe os bancos disponíveis. Se um banco estiver vazio, ele não será listado.

show collections
# Mostra todas as coleções em um banco.
```

## ⚙️ Operadores
### De Comparação:
Usados para realizar filtros em consultas, comparando valores dentro dos documentos.
Permitem encontrar documentos que atendam a critérios como igualdade, diferença, maior ou menor que um determinado valor.
- $eq (igual a)
  - Este operador retorna documentos cujo valor de um campo específico seja igual ao valor informado.
- $ne (diferente de)
  - Retorna documentos cujo valor de um campo seja diferente do valor especificado.
- $gt (maior que)
  - Retorna documentos cujo valor de um campo seja maior que o especificado.
- $lt (menor que)
  - Retorna documentos cujo valor de um campo seja menor que o especificado.
- $gte e $lte (maior ou igual / menor ou igual)
  - São variações dos operadores anteriores, incluindo valores iguais ao limite definido.

### Lógicos:
Os operadores lógicos combinam múltiplas condições dentro de uma única consulta.
- $and
  - O operador $and exige que todas as condições especificadas sejam verdadeiras.
- $or
  - O operador $or retorna documentos que satisfaçam pelo menos uma das condições especificadas.
- $not
  - Este operador nega uma condição específica.
- $nor
  - O operador $nor é o oposto de $or, excluindo documentos que satisfaçam qualquer uma das condições listadas.

### De Elemento:
Permitem verificar a existência de campos em um documento ou o tipo de dado armazenado neles.
- $exists
  - Verifica se um campo está presente ou não em um documento.
- $type
  - Filtra documentos com base no tipo de dado armazenado em um campo.

Veja os exemplos no arquivo [operadores.js](operadores.js)