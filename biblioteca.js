
db = db.getSiblingDB("biblioteca");

db.createCollection("livros");

db.autores.insertOne(
  { nome: "Neil Gaiman" }
);

db.alunos.insertOne(
  { nome: "Lucas Bardeli", curso: "DSM", anoIngresso: 2025, ativo: true }
);

db.livros.insertOne(
  { titulo: "Coraline", anoPublicacao: 2002, genero: "Fantasia", paginas: 90, disponivel: true }
);

db.livros.insertMany([
  { titulo: "The Sandman", anoPublicacao: 1989, genero: "Ficção", paginas: 200, disponivel: true },
  { titulo: "O Código Da Vinci", anoPublicacao: 2003, genero: "Ficção", paginas: 450, disponivel: false },
  { titulo: "Harry Potter e a Pedra Filosofal", anoPublicacao: 1997, genero: "Fantasia", paginas: 300, disponivel: true }
]);

db.livros.insertOne(
  {
    titulo: "Diário de um Banana", anoPublicacao: 2007, genero: "Comédia",
    autor: { nome: "Jeff Kinney", nacionalidade: "Americano" }
  }
);

db.livros.insertOne(
  {
    titulo: "Antologia da literatura fantástica", anoPublicacao: 1940, genero: "Ficção",
    autores: [
      { nome: "Adolfo Bioy Casares", nacionalidade: "Argentino" },
      { nome: "Jorge Luis Borges", nacionalidade: "Argentino" },
      { nome: "Silvina Ocampo", nacionalidade: "Argentina" },
    ]
  }
);

db.alunos.insertOne(
  {
    nome: "João", curso: "Logística", anoIngresso: 2022, ativo: false,
    contatos: [
      { email: "joao@email.com" },
      { telefone: "(11) 99999-9999" }
    ]
  }
);

db.livros.insertOne(
  {
    titulo: "O Senhor dos Anéis", disponivel: true,
    categorias: ["Fantasia", "Aventura", "Épico", "Ficção"],
    palavrasChave: ["anéis", "hobbits", "guerra", "terra média", "magia", "senhor", "romance"],
  }
);

db.createCollection("emprestimos");

db.emprestimos.insertOne({
  aluno: { nome: "Maria", curso: "Administração" },
  livro: { titulo: "O Senhor dos Anéis" },
  dataEmprestimo: new Date("2026-02-24"),
  dataDevolucao: new Date("2026-03-11"),
  status: "pendente"
});

db.emprestimos.insertMany([
  {
    aluno: { nome: "Carlos", curso: "Engenharia" },
    livro: { titulo: "Diário de um Banana" },
    dataEmprestimo: new Date("2026-02-01"),
    dataDevolucao: new Date("2026-02-15"),
    status: "devolvido"
  },
  {
    aluno: { nome: "Ana", curso: "Direito" },
    livro: { titulo: "Antologia da literatura fantástica" },
    dataEmprestimo: new Date("2026-02-10"),
    dataDevolucao: new Date("2026-02-25"),
    status: "pendente"
  },
  {
    aluno: { nome: "Lucas Bardeli", curso: "DSM" },
    livro: { titulo: "Harry Potter e a Pedra Filosofal" },
    dataEmprestimo: new Date("2026-02-15"),
    dataDevolucao: new Date("2026-03-01"),
    status: "devolvido"
  }
]);

db.livros.updateOne(
  { titulo: "Harry Potter e a Pedra Filosofal" },
  { $set: { disponivel: false } }
);

db.livros.updateOne(
  { titulo: "O Senhor dos Anéis" },
  { $push: { categorias: "Clássico" } }
);

db.livros.updateOne(
  { titulo: "Coraline" },
  { $inc: { vezesEmprestado: 150 } }
);

db.livros.updateMany(
  { genero: "Ficção" },
  { $set: { destaque: true } }
);

db.livros.updateMany(
  { titulo: "O Senhor dos Anéis" },
  { $pull: { palavrasChave: "romance" } }
);

db.emprestimos.deleteMany({
  $or: [
    { "aluno.nome": "Lucas Bardeli" },
    { status: "devolvido" }
  ]
});

db.livros.deleteMany({
  $or: [
    { paginas: { $lt: 100 } },
    { genero: "Comédia" }
  ]
});