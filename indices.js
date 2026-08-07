/* ÍNDICES E DESEMPENHO EM CONSULTAS */

// Base de dados exemplo:
use("loja");

// Coleção de 100 mil documentos:
for (let i = 0; i < 100000; i++) {
  db.usuarios.insertOne({
    nome: `Usuario${i}`,
    email: `usuario${i}@email.com`,
    idade: Math.floor(Math.random() * 80) + 18,
  });
}

/* ÍNDICES SIMPLES */

// Criar um índice em um único campo
db.usuarios.createIndex({ email: 1 });

// Buscas pelo campo email serão muito mais rápidas:
db.usuarios.find({ email: "joao@email.com" });

/* ÍNDICES COMPOSTOS */

// Criar um índice composto para nome e idade:
db.usuarios.createIndex({ nome: 1, idade: -1 });
// Este índice ajuda buscas ordenadas pelo nome em ordem crescente e idade em ordem decrescente.

// Essa consulta usará o índice:
db.usuarios.find({ nome: "Carlos" }).sort({ idade: -1 });

/* ÍNDICES EM ARRAYS */

// Criar um índice para um array:
db.pedidos.createIndex({ itens: 1 });
// Isso melhora buscas em coleções onde itens é um array.

/* ÍNDICES EM CAMPOS TEXTUAIS */

// Criar um índice para busca textual:
db.produtos.createIndex({ descricao: "text" });

// Agora podemos buscar palavras dentro desse campo:
db.produtos.find({ $text: { $search: "notebook" } });
// Retorna todos os produtos cuja descricao contém "notebook".

/* ÍNDICES GEOESPACIAIS */

// Criar um índice geoespacial:
db.locais.createIndex({ localizacao: "2dsphere" });
// Agora podemos buscar locais próximos de um ponto específico.

/* Quanto espaço um índice ocupa? */

// Usamos:
db.usuarios.totalIndexSize();
// Saída: 5242880
// Significa que os índices ocupam 5MB (5242880 bytes) na coleção usuarios.

// Detalhando o espaço usado por cada índice:
db.usuarios.stats().indexSizes;

/* Como saber se o índice está sendo usado? */

// Utilizamos .explain("executionStats")

// Exemplo sem índice:
db.usuarios.find({ email: "joao@email.com" }).explain("executionStats");
// Se na resposta "totalKeysExamined" for 0 e "totalDocsExamined" for o total de documentos da
// coleção, significa que a consulta não está usando um índice.

// Exemplo com índice:
db.usuarios
  .find({ email: "joao@email.com" })
  .hint({ email: 1 })
  .explain("executionStats");
// Se "totalKeysExamined" for baixo e "totalDocsExamined" também, significa que o
// índice foi utilizado com sucesso.

// Podemos ver também através do tempo na resposta com "executionTimeMillis".

// Usando hint() para forçar o uso de um índice específico:

// Crie os índices:
db.pedidos.createIndex({ email: 1 });
db.pedidos.createIndex({ cliente: 1, status: 1 });

// Consulta:
db.pedidos.find({ email: "joao@email.com" }).explain("executionStats");

// Forçando o uso do índice cliente_1_status_1
db.pedidos
  .find({ email: "joao@email.com" })
  .hint({
    cliente: 1,
    status: 1,
  })
  .explain("executionStats");

/* REMOVENDO UM ÍNDICE */

// Se um índice não estiver sendo usado, podemos removê-lo para economizar espaço:
db.usuarios.dropIndex("email_1");

// Para listar os índices existentes de uma coleção:
db.pessoas.getIndexes();
