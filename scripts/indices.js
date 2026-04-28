for (let i = 0; i < 100000; i++) {
  db.usuarios.insertOne({
    nome: `Usuario${i}`,
    email: `usuario${i}@email.com`,
    idade: Math.floor(Math.random() * 80) + 18,
  });
}

// ÍNDICES SIMPLES
// Usando apenas um campo
db.pessoas.find({ email: "joao@email.com" }).explain("executionStats");

db.pessoas.createIndex({ email: 1 });

// ÍNDICES COMPOSTOS
// Usando mais de um campo
db.pessoas
  .find({ nome: "Carlos" })
  .sort({ idade: -1 })
  .explain("executionStats");

db.pessoas.createIndex({ nome: 1, idade: -1 });

// ÍNDICES EM ARRAYS
db.pedidos.createIndex({ itens: 1 });

// ÍNDICES EM CAMPOS TEXTUAIS
db.produtos.find({ $text: { $search: "notebook" } });

db.produtos.createIndex({ descricao: "text" });

// ÍNDICES GEOESPACIAIS
db.locais.createIndex({ localizacao: "2dsphere" });

// QUANTO ESPAÇO UM ÍNDICE OCUPA?
db.pessoas.totalIndexSize();

// DETALHANDO
db.pessoas.stats().indexSizes;

// COMO SABER SE O ÍNDICE ESTÁ SENDO USADO?
db.pessoas
  .find({ email: "joao@email.com" })
  .hint({ email: 1 })
  .explain("executionStats");

db.pedidos.createIndex({ cliente: 1, status: 1 });

// Forçando o uso do índice cliente_1_status_1
db.pedidos
  .find({ email: "joao@email.com" })
  .hint({
    cliente: 1,
    status: 1,
  })
  .explain("executionStats");

// REMOVENDO UM ÍNDICE
// Para listar os índices existentes de uma coleção:
db.pessoas.getIndexes();

db.pessoas.dropIndex("email_1");
