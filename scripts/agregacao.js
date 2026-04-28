// Base de dados exemplo:
use("loja");

// Cliente
db.clientes.insertOne({
  _id: 1,
  nome: "João",
  idade: 30,
  email: "joao.silva@example.com",
});

// Produto
db.produtos.insertOne({
  _id: 4,
  nome: "Produto Exemplo",
  preco: 99.99,
  categoria: "Eletrônicos",
});

// Pedido
db.pedidos.insertOne({
  cliente_id: 1,
  data: new Date(),
  itens: [
    {
      produto_id: 4,
      preco: 99.99,
      quantidade: 1,
      total_unitario: 99.99,
    },
  ],
});

// AGREGAÇÃO:
db.pedidos.aggregate([
  {
    $lookup: {
      from: "clientes",
      localField: "cliente_id",
      foreignField: "_id",
      as: "cliente_info",
    },
  },
]);

// Clientes
db.clientes.insertMany([
  {
    _id: 2,
    nome: "Maria Oliveira",
    idade: 28,
    email: "maria.oliveira@example.com",
  },
  {
    _id: 3,
    nome: "Carlos Pereira",
    idade: 35,
    email: "carlos.pereira@example.com",
  },
]);

// Produtos
db.produtos.insertMany([
  {
    _id: 5,
    nome: "Tablet",
    preco: 250,
    categoria: "Eletrônicos",
  },
  {
    _id: 6,
    nome: "Foninho",
    preco: 150,
    categoria: "Eletrônicos",
  },
  {
    _id: 7,
    nome: "Cadeira Gamer",
    preco: 500,
    categoria: "Móveis",
  },
]);

// Pedido
db.pedidos.insertOne({
  cliente_id: 1,
  data: new Date(),
  itens: [
    {
      produto_id: 5,
      preco: 250,
      quantidade: 2,
      total_unitario: 500,
    },
    {
      produto_id: 6,
      preco: 150,
      quantidade: 1,
      total_unitario: 150,
    },
  ],
});

// Escolha os campos que deseja exibir:
db.pedidos.aggregate([
  {
    $project: {
      cliente_id: 1,
      data: 1,
      valor_total_compra: {
        $sum: {
          $map: {
            input: "$itens",
            as: "item",
            in: "$$item.total_unitario",
          },
        },
      },
    },
  },
]);

db.pedidos.aggregate([
  {
    $project: {
      cliente_id: 1,
      data: 1,
    },
  },
]);

db["estados-cidades"].aggregate([
  // Passo 1: Desconstrói o array principal "estados"
  {
    $unwind: "$estados",
  },
  // Passo 2: Desconstrói o array "cidades" que está dentro de cada estado
  {
    $unwind: "$estados.cidades",
  },
  // Passo 3: Define a estrutura final (projetando apenas os campos que você quer)
  {
    $project: {
      _id: 0, // 0 remove o _id original. Mude para 1 se quiser mantê-lo.
      nome_cidade: "$estados.cidades",
      estado: "$estados.sigla",
      nome_estado: "$estados.nome", // Nota: usar espaços em chaves JSON pode dar dor de cabeça no futuro.
    },
  },
  // Passo 4: Grava a estrutura gerada no estágio anterior em uma nova coleção
  {
    $out: "cidades",
  },
]);

// db.produtos.aggregate([
//   {
//     $project: {
//       _id: 0,
//       nome: 1,
//       matricula: Math.floor(Math.random() * 10),
//       contratacao: 123,
//     },
//   },
//   { limit: 5 },
// ]);

db.produtos.aggregate([
  {
    $project: {
      _id: 0,
      nome: 1,
      matricula: {
        $floor: { $multiply: [{ $rand: {} }, 10] },
      },
      contratacao: {
        $add: [
          new Date("2020-01-01"),
          { $multiply: [{ $rand: {} }, new Date() - new Date("2020-01-01")] },
        ],
      },
    },
  },
  { limit: 5 },
  // { $out: "agentes" },
]);
