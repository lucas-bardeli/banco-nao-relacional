// COMO JUNTAR DUAS COLEÇÕES: EMBEDDING
db.orders.insertOne({
  _id: ObjectId("6anv98vnh30fc98hjfb3804ubhfud8"),
  item: "Laptop",
  price: 1200,
  user: {
    name: "Alice",
  },
});

// COMO JUNTAR DUAS COLEÇÕES: REFERENCE
db.users.insertOne({
  _id: ObjectId("12345aauu"), // só exemplo de id
  name: "Alice",
});

db.orders.insertOne({
  _id: ObjectId("6anv98vnh30fc98hjfb3804ubhfud8"),
  item: "Laptop",
  price: 1200,
  user_id: ObjectId("12345aauu"), // referência ao usuário
});

db.users.findOne({ _id: ObjectId("12345aauu") });
db.orders.findOne({ _id: ObjectId("6anv98vnh30fc98hjfb3804ubhfud8") });

// $lookup
db.orders.aggregate([
  {
    $lookup: {
      from: "users", // coleção de referência
      localField: "user_id", // campo na coleção orders
      foreignField: "_id", // campo na coleção users
      as: "user_info", // nome do campo onde os dados do usuário serão armazenados
    },
  },
]);

// USANDO OPERADOR $GROUP
db.orders.aggregate([
  {
    $group: {
      _id: "$product_id", // agrupa pelos IDs de produtos
      total_orders: { $sum: 1 }, // conta o número de pedidos
      total_quantity: { $sum: "$quantity" }, // soma a quantidade de cada pedido
    },
  },
]);

// PIPELINE DE AGREGAÇÃO
// A pipeline de agregação é a sequência de estágios que os
// documentos percorrem durante o processo de agregação. Cada
// estágio aplica uma operação específica aos documentos e passa
// o resultado para o próximo estágio.
db.collection.aggregate([
  { estagio1 },
  { estagio2 },
  { estagio3 },
  // ...
]);

// EXEMPLO DE FLUXO DE DADOS NA PIPELINE
db.vendas.aggregate([
  { $match: { ano: 2023 } }, // filtra documentos
  { $group: { _id: "$mes", total: { $sum: "$valor" } } }, // agrupa e soma
  { $sort: { total: -1 } }, // ordena os resultados
]);

// ESTÁGIOS DE AGREGAÇÃO
// O estágio $match filtra os documentos de acordo com os
// critérios especificados, semelhante à cláusula WHERE em SQL:
db.vendas.aggregate([{ $match: { ano: 2023 } }]);

// O estágio $group agrupa documentos com base em um ou mais
// campos e permite calcular agregados como soma, média,
// contagem, etc.
db.vendas.aggregate([{ $group: { _id: "$mes", total: { $sum: "$valor" } } }]);

// O estágio $project permite selecionar, incluir ou excluir
// campos específicos nos documentos resultantes. Também pode
// ser usado para criar novos campos ou transformar dados.
db.vendas.aggregate([
  {
    $project: {
      nome: 1,
      valor: 1,
      _id: 0,
    },
  },
]);

// O estágio $sort ordena os documentos com base em um ou
// mais campos.
db.vendas.aggregate([{ $sort: { valor: -1 } }]); // -1 para ordem decrescente, 1 para ordem crescente

// $limit: Restringe o número de documentos que passam para os
// estágios seguintes.
// $skip: Ignora um número especificado de documentos.
db.vendas.aggregate([{ $sort: { valor: -1 } }, { $limit: 5 }]);

// O estágio $unwind desestrutura um array, criando um
// documento para cada elemento do array.
db.pedidos.aggregate([{ $unwind: "$itens" }]);

// O estágio $facet permite executar múltiplas pipelines de
// agregação em paralelo e combinar os resultados.
db.vendas.aggregate([
  {
    $facet: {
      total_vendas: [{ $count: "count" }],
      soma_total: [{ $group: { _id: null, total: { $sum: "$valor" } } }],
    },
  },
]);

// $bucket: Agrupa documentos em intervalos predefinidos.
// $bucketAuto: Agrupa documentos em um número especificado
// de buckets automaticamente.
db.vendas.aggregate([
  {
    $bucket: {
      groupBy: "$valor", // campo para agrupar
      boundaries: [0, 100, 200, 300], // limites dos buckets
      default: "Mais de 300", // bucket para valores fora dos limites
      output: { total_vendas: { $sum: 1 }, soma_valores: { $sum: "$valor" } }, // conta o número de vendas em cada bucket
    },
  },
]);

// $addFields: Adiciona novos campos aos documentos.
// $set: Similar ao $addFields, mas também pode modificar
// campos existentes.
db.vendas.aggregate([
  {
    $addFields: {
      total: { $multiply: ["$quantidade", "$preco_unitario"] }, // calcula o valor total da venda
    },
  },
]);

// O estágio $count adiciona um campo com o número total de
// documentos que passaram pelo estágio anterior.
db.vendas.aggregate([{ $count: "total_vendas" }]);

// OPERADORES CONDICIONAIS
// $cond: Estrutura condicional.
// $ifNull: Retorna um valor se o campo for nulo ou indefinido.
// $switch: Implementa uma série de condições.
db.vendas.aggregate([
  {
    $addFields: {
      acima_da_media: {
        $cond: {
          if: { $gt: ["$valor", 1000] }, // condição: valor maior que 1000
          then: true, // se a condição for verdadeira
          else: false, // se a condição for falsa
        },
      },
    },
  },
]);

// OPERADORES DE ARRAY
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
          input: "$itens", // array de entrada
          as: "item", // variável para cada elemento do array
          cond: { $gt: ["$$item.quantidade", 2] }, // condição para filtrar itens com quantidade maior que 2
        },
      },
    },
  },
]);
