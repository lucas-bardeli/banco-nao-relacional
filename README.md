# 🍀 Banco de Dados Não Relacional

Introdução a Bancos de Dados Não Relacionais, MongoDB, BigData, Data Warehouse e outros conceitos.

## 🔑 Comandos Básicos do MongoDB

> Conexão com o MongoDB e interação com documentos

- `mongosh`
  - Inicia o shell do MongoDB e conecta ao servidor padrão (localhost:27017).
- `db`
  - Mostra o banco de dados atualmente selecionado.
- `use meuBanco`
  - Se meuBanco não existir, ele será criado assim que um documento for inserido.
- `show dbs`
  - Exibe os bancos disponíveis. Se um banco estiver vazio, ele não será listado.
- `show collections`
  - Mostra todas as coleções em um banco.
- `mongosh script.js`
  - Rodar um arquivo `.js` no MongoDB. Ou abrir o mongosh primeiro e usar `load("script.js");`.

Veja os exemplos no arquivo [script.js](scripts/script.js)

## ⚙️ Operadores

> Os operadores no MongoDB são instruções especiais utilizadas para manipular e consultar documentos dentro de uma coleção.

### De Comparação:

> Usados para realizar filtros em consultas, comparando valores dentro dos documentos.
> Permitem encontrar documentos que atendam a critérios como igualdade, diferença, maior ou menor que um determinado valor.

- `$eq` (igual a)
  - Este operador retorna documentos cujo valor de um campo específico seja igual ao valor informado.
- `$ne` (diferente de)
  - Retorna documentos cujo valor de um campo seja diferente do valor especificado.
- `$gt` (maior que)
  - Retorna documentos cujo valor de um campo seja maior que o especificado.
- `$lt` (menor que)
  - Retorna documentos cujo valor de um campo seja menor que o especificado.
- `$gte` e `$lte` (maior ou igual / menor ou igual)
  - São variações dos operadores anteriores, incluindo valores iguais ao limite definido.

### Lógicos:

> Os operadores lógicos combinam múltiplas condições dentro de uma única consulta.

- `$and`
  - O operador `$and` exige que todas as condições especificadas sejam verdadeiras.
- `$or`
  - O operador `$or` retorna documentos que satisfaçam pelo menos uma das condições especificadas.
- `$not`
  - Este operador nega uma condição específica.
- `$nor`
  - O operador `$nor` é o oposto de `$or`, excluindo documentos que satisfaçam qualquer uma das condições listadas.

### De Elemento:

> Permitem verificar a existência de campos em um documento ou o tipo de dado armazenado neles.

- `$exists`
  - Verifica se um campo está presente ou não em um documento.
- `$type`
  - Filtra documentos com base no tipo de dado armazenado em um campo.

Veja os exemplos no arquivo [operadores.js](scripts/operadores.js)

## 🧮 Modificando a Estrutura de Documentos

### Atualização de Documentos:

> Funções para alterar documentos

- `updateOne(filter, update, options)`
  - Atualiza um único documento que corresponde ao filtro.
- `updateMany(filter, update, options)`
  - Atualiza múltiplos documentos que correspondem ao filtro.
- `replaceOne(filter, replacement, options)`
  - Substitui um único documento inteiro pelo novo documento fornecido.

### Operadores de Atualização:

> Operadores para alterar a "estrutura" de documentos

- Modificação de campos:
  - `$set` -> Define ou altera um campo específico.
  - `$unset` -> Remove um campo.
  - `$rename` -> Renomeia um campo.

- Operações matemáticas:
  - `$inc` -> Incrementa o valor de um campo numérico.
  - `$mul` -> Multiplica o valor de um campo.
  - `$min` -> Atualiza o campo apenas se o novo valor for menor que o atual.
  - `$max` -> Atualiza o campo apenas se o novo valor for maior que o atual.

### Operadores de Array:

> Operadores para manejar arrays dentro de documentos

- `$push` -> Adiciona um elemento a um array.
- `$pop` -> Remove o primeiro (-1) ou o último (1) elemento de um array.
- `$pull` -> Remove elementos específicos de um array.
- `$addToSet` -> Adiciona um elemento ao array apenas se ele não existir.
- `$pullAll` -> Remove múltiplos valores específicos de um array.
- `$each` -> Usado com `$push` para adicionar múltiplos elementos ao array.

Veja os exemplos no arquivo [estruturas.js](scripts/estruturas.js)

## 📍 Índices

> Os índices são estruturas de dados especiais que armazenam uma parte dos dados de uma coleção de forma ordenada, facilitando buscas rápidas.

### Índices Simples:

> Usando apenas um campo.

- Por padrão, o MongoDB já cria um índice no campo `_id`, mas podemos criar outros para melhorar o desempenho das buscas.

- Criar um índice em um único campo
  - `db.usuarios.createIndex({ email: 1 })`
- Buscas pelo campo "email" serão muito mais rápidas:
  - `db.usuarios.find({ email: "joao@email.com" })`

### Índices Compostos:

> Usando mais de um campo.

- Quando fazemos buscas com múltiplos critérios frequentemente, um índice composto pode ser mais eficiente.

- Criar um índice composto para **nome** e **idade**:
  - `db.usuarios.createIndex({ nome: 1, idade: -1 })`
  - Este índice ajuda buscas ordenadas pelo nome em ordem crescente e idade em ordem decrescente.
- Essa consulta usará o índice:
  - `db.usuarios.find({ nome: "Carlos" }).sort({ idade: -1 })`

### Índices em Arrays:

> Se um campo for um array e quisermos pesquisar dentro dele, podemos criar um índice multi key.

- Criar um índice para um array:
  - `db.pedidos.createIndex({ itens: 1 })`
  - Isso melhora buscas em coleções onde **itens** é um array.

### Índices em Campos Textuais:

> Se precisamos buscar palavras em campos de texto, o índice textual é útil.

- Criar um índice para busca textual:
  - `db.produtos.createIndex({ descricao: "text" })`
- Agora podemos buscar palavras dentro desse campo:
  - `db.produtos.find({ $text: { $search: "notebook" } })`
  - Retorna todos os produtos cuja **descricao** contém "notebook".

### Índices Geoespaciais:

> Se armazenarmos coordenadas geográficas, podemos criar índices geoespaciais (2dsphere).

- Criar um índice geoespacial:
  - `db.locais.createIndex({ localizacao: "2dsphere" })`
  - Agora podemos buscar locais próximos de um ponto específico.

### Espaço Ocupado por Índices

> Quanto espaço um índice ocupa?

- Se quisermos ver o espaço total ocupado pelos índices de uma coleção, usamos:

### Verificar uso de um Índice

### Remoção de Índices

### Avaliação de Desempenho de Índices
