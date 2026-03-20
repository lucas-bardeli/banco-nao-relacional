// Base de dados exemplo:
use("loja");

db.users.insertMany([
  {
    _id: 1,
    username: "joao",
    age: 24,
    active: true,
    premium: false,
    hobies: ["reading", "soccer"],
    tasks: [{ title: "Study MongoDB", status: "pending" }],
  },
  {
    _id: 2,
    username: "maria",
    age: 30,
    active: false,
    premium: true,
    hobies: ["cooking", "yoga"],
    tasks: [{ title: "Complete project", status: "done" }],
  },
  {
    _id: 3,
    username: "carlos",
    age: 35,
    active: true,
    premium: false,
    hobies: ["gaming", "music"],
    tasks: [{ title: "Write report", status: "pending" }],
  },
]);

// ATUALIZAÇÃO DE DOCUMENTOS:

db.users.updateOne({ username: "joao" }, { $set: { age: 25 } });
// O usuário "joao" agora tem age: 25.

db.users.updateMany({ active: true }, { $set: { premium: true } });
// Todos os usuários ativos agora são premium.

db.users.replaceOne(
  { username: "maria" },
  {
    _id: 2,
    username: "maria",
    age: 31,
    active: true,
    premium: false,
    hobbies: [],
  },
);
// "maria" foi completamente substituída e perdeu suas tasks e hobbies.

// MODIFICAÇÃO DE CAMPOS:

// $set
db.users.updateOne({ username: "joao" }, { $set: { premium: true } });
// "joao" agora é premium.

// $unset
db.users.updateOne({ username: "carlos" }, { $unset: { premium: "" } });
// Remove o campo 'premium' do usuário "carlos".

// $rename
db.users.updateOne({ username: "maria" }, { $rename: { age: "yearsOld" } });
// O campo 'age' foi renomeado para 'yearsOld' para "maria".

// OPERAÇÕES MATEMÁTICAS:

// $inc
db.users.updateOne({ username: "joao" }, { $inc: { age: 1 } });
// A idade de "joao" aumenta em 1.

// $mul
db.users.updateOne({ username: "carlos" }, { $mul: { age: 2 } });
// A idade de "carlos" dobra.

// $min
db.users.updateOne({ username: "joao" }, { $min: { age: 23 } });
// Se a idade de "joao" for maior que 23, ela é reduzida para 23.

// $max
db.users.updateOne({ username: "maria" }, { $max: { yearsOld: 35 } });
// Se a idade de "maria" for menor que 35, ela é aumentada para 35.
