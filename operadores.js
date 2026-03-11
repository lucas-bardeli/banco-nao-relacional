
db.produtos.insertMany([
  {
    "_id": 1,
    "nome": "Notebook Dell",
    "categoria": "Eletrônicos",
    "preco": 4500,
    "estoque": 15,
    "avaliacao": 4.7,
  },
  {
    "_id": 2,
    "nome": "Smartphone Samsung",
    "categoria": "Eletrônicos",
    "preco": 2500,
    "estoque": 30,
    "avaliacao": 4.5,
  },
  {
    "_id": 3,
    "nome": "Cadeira Gamer",
    "categoria": "Móveis",
    "preco": 1200,
    "estoque": 10,
    "avaliacao": 4.8,
  }
]);

// OPERADORES DE COMPARAÇÃO:

// $eq
// Retornará o produto "Smartphone Samsung", pois seu preço é exatamente 2500.
db.produtos.find({ "preco": { $eq: 2500 } });

// $ne
// Aqui, serão retornados todos os produtos exceto o "Notebook Dell", pois seu preço é 4500.
db.produtos.find({ "preco": { $ne: 4500 } });

// $gt
// Retornará tanto o "Notebook Dell" quanto o "Smartphone Samsung", pois seus preços são superiores a 2000.
db.produtos.find({ "preco": { $gt: 2000 } });

// $lt
// Retornará os produtos "Smartphone Samsung" e "Cadeira Gamer".
db.produtos.find({ "preco": { $lt: 3000 } });

// $gte e $lte
// Retornará todos os produtos com preço entre 1000 e 3000, incluindo esses valores.
db.produtos.find({
  "preco": {
    $gte: 1000, $lte: 3000
  }
});

// OPERADORES LÓGICOS:

// $and
// Isso retornará apenas o "Notebook Dell", pois ele pertence à categoria "Eletrônicos" e tem preço maior que 3000.
db.produtos.find({
  $and: [
    { "categoria": "Eletrônicos" },
    { "preco": { $gt: 3000 } }
  ]
});

// $or
// Aqui, qualquer produto da categoria "Eletrônicos" ou que tenha preço superior a 4000 será retornado.
db.produtos.find({
  $or: [
    { "categoria": "Eletrônicos" },
    { "preco": { $gt: 4000 } }
  ]
});

// $not
// Isso retornará todos os produtos cujo preço não seja maior que 3000.
db.produtos.find({
  "preco": {
    $not: { $gt: 3000 }
  }
});

// $nor
// Serão retornados apenas produtos que não sejam da categoria "Eletrônicos" e que tenham preço inferior ou igual a 4000.
db.produtos.find({
  $nor: [
    { "categoria": "Eletrônicos" },
    { "preco": { $gt: 4000 } }
  ]
});

// OPERADORES DE ELEMENTO:

// $exists
// Retorna todos os produtos que possuem o campo avaliacao.
db.produtos.find({
  "avaliacao": { $exists: true }
});

// $type
// Retorna todos os documentos onde o campo preco seja do tipo double.
db.produtos.find({ "preco": { $type: "double" } });