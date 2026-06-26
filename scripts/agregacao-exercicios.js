// Base de dados exemplo:
db.clientes.insertMany([
  { _id: 153, nome: "João", idade: 30, regiao: "Sudeste" },
  { _id: 154, nome: "Maria", idade: 25, regiao: "Sul" },
  { _id: 155, nome: "Pedro", idade: 35, regiao: "Nordeste" },
  { _id: 156, nome: "Ana", idade: 28, regiao: "Sudeste" },
  { _id: 157, nome: "Carlos", idade: 42, regiao: "Centro-Oeste" },
]);

db.vendas.insertMany([
  { _id: 1, cliente_id: 153, produto: "Notebook", quantidade: 1, valor: 3500 },
  { _id: 2, cliente_id: 153, produto: "Mouse", quantidade: 2, valor: 80 },
  { _id: 3, cliente_id: 153, produto: "Teclado", quantidade: 1, valor: 150 },
  { _id: 4, cliente_id: 154, produto: "Notebook", quantidade: 1, valor: 3200 },
  { _id: 5, cliente_id: 154, produto: "Monitor", quantidade: 2, valor: 900 },
  { _id: 6, cliente_id: 155, produto: "Mouse", quantidade: 5, valor: 75 },
  { _id: 7, cliente_id: 155, produto: "Teclado", quantidade: 3, valor: 140 },
  { _id: 8, cliente_id: 155, produto: "Monitor", quantidade: 1, valor: 950 },
  { _id: 9, cliente_id: 156, produto: "Notebook", quantidade: 2, valor: 3400 },
  { _id: 10, cliente_id: 156, produto: "Mouse", quantidade: 4, valor: 85 },
  { _id: 11, cliente_id: 156, produto: "Teclado", quantidade: 2, valor: 145 },
  { _id: 12, cliente_id: 156, produto: "Monitor", quantidade: 1, valor: 920 },
  { _id: 13, cliente_id: 157, produto: "Mouse", quantidade: 6, valor: 78 },
  { _id: 14, cliente_id: 157, produto: "Teclado", quantidade: 2, valor: 155 },
  { _id: 15, cliente_id: 157, produto: "Monitor", quantidade: 3, valor: 980 },
]);

// EXERCÍCIOS

// 1) Contagem de Vendas por Cliente:
// – Objetivo: Calcular quantas vendas cada cliente realizou.
// – Dica: Use $group com cliente_id.
db.vendas.aggregate([
  {
    $group: {
      _id: "$cliente_id",
      total_vendas: { $sum: 1 },
    },
  },
]);

// 2) Média de Vendas por Produto:
// – Objetivo: Determinar a média de vendas para cada tipo de produto.
// – Dica: Agrupe por produto e utilize $avg.
db.vendas.aggregate([
  {
    $group: {
      _id: "$produto",
      media_venda_por_produto: { $avg: "$valor" },
    },
  },
]);

// • Listar Clientes que Compraram Mais de 5 Produtos:
// – Objetivo: Identificar clientes que realizaram grandes pedidos.
// – Dica: Use $match após $group.
db.vendas.aggregate([
  {
    $group: {
      _id: "$cliente_id",
      total_produtos: { $sum: "$quantidade" },
    },
  },
  {
    $match: {
      total_produtos: { $gt: 5 },
    },
  },
]);

// • Top 3 Produtos Mais Vendidos:
// – Objetivo: Encontrar os produtos com maior número de vendas.
// – Dica: Agrupe por produto, some quantidade e use $sort seguido de $limit.
db.vendas.aggregate([
  {
    $group: {
      _id: "$produto",
      total_vendido: { $sum: "$quantidade" },
    },
  },
  {
    $sort: { total_vendido: -1 },
  },
  {
    $limit: 3,
  },
]);

// • Total de Vendas por Região:
// – Objetivo: Se houver um campo regiao em clientes, calcular o total de vendas por
// região.
// – Dica: Utilize $lookup para unir pedidos e clientes, depois agrupe por regiao.
db.vendas.aggregate([
  {
    $lookup: {
      from: "clientes",
      localField: "cliente_id",
      foreignField: "_id",
      as: "cliente",
    },
  },
  {
    $unwind: "$cliente",
  },
  {
    $group: {
      _id: "$cliente.regiao",
      total_vendas: {
        $sum: {
          $multiply: ["$quantidade", "$valor"],
        },
      },
    },
  },
  {
    $sort: {
      total_vendas: -1,
    },
  },
]);
