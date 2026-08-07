/* JUNTANDO COLEÇÕES E AGREGAÇÃO */

/* Como juntar duas coleções? */

// EMBEDDING
// Incorporando documentos dentro de outros.
db.orders.insertOne({
  _id: ObjectId("6anv98vnh30fc98hjfb3804ubhfweff"),
  item: "Laptop",
  price: 1200,
  user: {
    name: "Alice",
  },
});
// Aqui, em vez de armazenar o ObjectId do usuário em orders, você pode incorporar as informações do usuário diretamente no pedido.

// REFERENCE
// Usando referências para ligar documentos de diferentes coleções.
// Você armazena o ObjectId de um documento em outra coleção.
// Similar a uma chave estrangeira em bancos de dados relacionais.
db.users.insertOne({
  _id: ObjectId("78b9c8d7e8f9a0b1c2d3e4f5fjwoeif3"),
  name: "Alice",
});

db.orders.insertOne({
  _id: ObjectId("6anv98vnh30fc98hjfb3804ubhfweff"),
  item: "Laptop",
  price: 1200,
  user_id: ObjectId("78b9c8d7e8f9a0b1c2d3e4f5fjwoeif3"), // Referência ao usuário Alice
});

db.users.findOne({ _id: ObjectId("78b9c8d7e8f9a0b1c2d3e4f5fjwoeif3") });
db.orders.findOne({ _id: ObjectId("6anv98vnh30fc98hjfb3804ubhfweff") });

// Operador $lookup
db.orders.aggregate([
  {
    $lookup: {
      from: "users", // Coleção de referência
      localField: "user_id", // Campo na coleção orders
      foreignField: "_id", // Campo na coleção users
      as: "user_info", // Nome do campo onde os dados do usuário serão armazenados
    },
  },
]);

// Usando o operador $group
db.orders.aggregate([
  {
    $group: {
      _id: "$product_id", // Agrupa pelos IDs de produtos
      total_orders: { $sum: 1 }, // Conta o número de pedidos
      total_quantity: { $sum: "$quantity" }, // Soma a quantidade de cada pedido
    },
  },
]);

/* PIPELINE DE AGREGAÇÃO */

// A pipeline de agregação é a sequência de estágios que os documentos percorrem durante o processo de agregação.
// Cada estágio aplica uma operação específica aos documentos e passa o resultado para o próximo estágio.
db.collection.aggregate([
  { estagio1 },
  { estagio2 },
  { estagio3 },
  // ...
]);
// Entrada, processamento e saída.

// Exemplo de fluxo de dados na pipeline:
db.vendas.aggregate([
  { $match: { ano: 2023 } }, // Filtra documentos
  { $group: { _id: "$mes", total: { $sum: "$valor" } } }, // Agrupa e soma
  { $sort: { total: -1 } }, // Ordena os resultados
]);

/* ESTÁGIOS DE AGREGAÇÃO */

// Operações que compõem a pipeline.

// $match
// Esse estágio filtra os documentos de acordo com os critérios especificados, semelhante à cláusula WHERE em SQL:
db.vendas.aggregate([{ $match: { ano: 2023 } }]);

// $group
// Agrupa documentos com base em um ou mais campos e permite calcular agregados como soma, média, contagem, etc.
db.vendas.aggregate([{ $group: { _id: "$mes", total: { $sum: "$valor" } } }]);

// $project
// Permite selecionar, incluir ou excluir campos específicos nos documentos resultantes.
// Também pode ser usado para criar novos campos ou transformar dados.
db.vendas.aggregate([
  {
    $project: {
      nome: 1,
      valor: 1,
      _id: 0,
    },
  },
]);

// $sort
// Ordena os documentos com base em um ou mais campos.
db.vendas.aggregate([
  { $sort: { valor: -1 } }, // -1 para ordem decrescente, 1 para ordem crescente
]);

// $limit: Restringe o número de documentos que passam para os estágios seguintes.
// $skip: Ignora um número especificado de documentos.
db.vendas.aggregate([{ $sort: { valor: -1 } }, { $limit: 5 }]);

// $unwind
// Desestrutura um array, criando um documento para cada elemento do array.
db.pedidos.aggregate([{ $unwind: "$itens" }]);

// $facet
// Permite executar múltiplas pipelines de agregação em paralelo e combinar os resultados.
db.vendas.aggregate([
  {
    $facet: {
      total_vendas: [{ $count: "count" }],
      soma_total: [{ $group: { _id: null, total: { $sum: "$valor" } } }],
    },
  },
]);

// $bucket: Agrupa documentos em intervalos predefinidos.
// $bucketAuto: Agrupa documentos em um número especificado de buckets automaticamente.
db.vendas.aggregate([
  {
    $bucket: {
      groupBy: "$valor", // Campo para agrupar
      boundaries: [0, 100, 200, 300], // Limites dos buckets
      default: "Mais de 300", // Bucket para valores fora dos limites
      output: { total_vendas: { $sum: 1 }, soma_valores: { $sum: "$valor" } }, // Conta o número de vendas em cada bucket
    },
  },
]);

// $addFields: Adiciona novos campos aos documentos.
// $set: Similar ao $addFields, mas também pode modificar campos existentes.
db.vendas.aggregate([
  {
    $addFields: {
      total: { $multiply: ["$quantidade", "$preco_unitario"] }, // Calcula o valor total da venda
    },
  },
]);

// $count
// Adiciona um campo com o número total de documentos que passaram pelo estágio anterior.
db.vendas.aggregate([{ $count: "total_vendas" }]);

// Como testar? Com o .explain("executionStats")

/* OPERADORES DE AGREGAÇÃO */

// $sum: Soma os valores.
// $avg: Calcula a média.
// $min: Encontra o valor mínimo.
// $max: Encontra o valor máximo.
// $first: Retorna o primeiro valor.
// $last: Retorna o último valor.

// Média de vendas do mês
db.vendas.aggregate([
  {
    $group: {
      _id: "$mes",
      media_vendas: { $avg: "$valor" },
    },
  },
]);

/* OPERADORES CONDICIONAIS */

// Semelhantes a estruturas if-else:

// $cond: Estrutura condicional.
// $ifNull: Retorna um valor se o campo for nulo ou indefinido.
// $switch: Implementa uma série de condições.

db.vendas.aggregate([
  {
    $addFields: {
      acima_da_media: {
        $cond: {
          if: { $gt: ["$valor", 1000] }, // Condição: valor maior que 1000
          then: true, // Se a condição for verdadeira
          else: false, // Se a condição for falsa
        },
      },
    },
  },
]);

/* OPERADORES DE ARRAY */

// $push: Adiciona elementos a um array.
// $addToSet: Adiciona elementos únicos a um array.
// $filter: Filtra elementos de um array.
// $map: Aplica uma expressão a cada elemento de um array.
// $reduce: Reduz um array a um único valor.

db.pedidos.aggregate([
  {
    $project: {
      itens_filtrados: {
        $filter: {
          input: "$itens", // Array de entrada
          as: "item", // Variável para cada elemento do array
          cond: { $gt: ["$$item.quantidade", 2] }, // Condição para filtrar itens com quantidade maior que 2
        },
      },
    },
  },
]);
