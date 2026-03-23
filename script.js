db = db.getSiblingDB("meuBanco"); // Funciona melhor em scripts em vez do "use meuBanco".
// A variável predefinida db refere-se ao banco de dados atualmente selecionado.

// MongoDB cria coleções automaticamente quando documentos são inseridos.
db.createCollection("usuarios");

// Inserção de um único documento.
db.usuarios.insertOne({ nome: "Alice", idade: 25, cidade: "São Paulo" });

// Inserção de múltiplos documentos.
db.usuarios.insertMany([
  { nome: "Bob", idade: 30, cidade: "Rio de Janeiro" },
  { nome: "Carlos", idade: 22, cidade: "Belo Horizonte" },
  { nome: "Lucas", idade: 20, cidade: "São Paulo" },
]);

console.log("\nTodos os usuários:");
// printjson() para exibir no terminal.
printjson(
  db.usuarios.find().pretty(), // Exibe todos os documentos da coleção "usuarios".
);

console.log("\nFiltrar documentos (exemplo: encontrar usuários com idade 25):");
printjson(db.usuarios.find({ idade: 25 }).pretty());

console.log(
  "\nFiltrar e exibir apenas alguns campos. Retorna apenas o campo nome, excluindo _id:",
);
printjson(
  db.usuarios
    .find(
      { cidade: "Belo Horizonte" },
      { nome: 1, _id: 0 }, // 1 e 0 definem quais campos irão aparecer na consulta. Campos com valor 0 (false) não aparecem.
    )
    .pretty(),
);

// Atualizar um único documento.
db.usuarios.updateOne({ nome: "Alice" }, { $set: { idade: 26 } });

// Atualizar múltiplos documentos. Todos os usuários de São Paulo agora terão o campo estado: "SP".
db.usuarios.updateMany({ cidade: "São Paulo" }, { $set: { estado: "SP" } });

// Adiconar um novo valor a um array dentro do documento.
db.usuarios.updateOne({ nome: "Bob" }, { $push: { hobbies: "futebol" } });

// Remover um único documento
db.usuarios.deleteOne({ nome: "Carlos" });

// Remove todos os usuários com menos de 25 anos.
db.usuarios.deleteMany({ idade: { $lt: 25 } });

// Em MongoDB, podemos armazenar os pedidos dentro do próprio documento do cliente, evitando a necessidade de JOIN.
db.usuarios.insertOne({
  _id: 1,
  nome: "João Silva",
  email: "joao@gmail.com",
  pedidos: [
    { id_pedido: 101, produto: "Notebook", quantidade: 1, preco: 3500 },
    { id_pedido: 102, produto: "Smartphone", quantidade: 1, preco: 2000 },
  ],
});

console.log("\nResultado final:");
printjson(db.usuarios.find().pretty());

// Exclui o banco de dados. Cuidado!
db.dropDatabase();
