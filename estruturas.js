/* MODIFICANDO A ESTRUTURA DE DOCUMENTOS */

// Base de dados exemplo:
use("loja");

db.usuarios.insertMany([
  {
    _id: 1,
    username: "joao",
    age: 24,
    active: true,
    premium: false,
    hobbies: ["reading", "soccer"],
    tasks: [{ title: "Study MongoDB", status: "pending" }],
  },
  {
    _id: 2,
    username: "maria",
    age: 30,
    active: false,
    premium: true,
    hobbies: ["cooking", "yoga"],
    tasks: [{ title: "Complete project", status: "done" }],
  },
  {
    _id: 3,
    username: "carlos",
    age: 35,
    active: true,
    premium: false,
    hobbies: ["gaming", "music"],
    tasks: [{ title: "Write report", status: "pending" }],
  },
]);

// ATUALIZAÇÃO DE DOCUMENTOS:

// Atualiza apenas um documento que corresponde ao filtro:
db.usuarios.updateOne({ username: "joao" }, { $set: { age: 25 } });
// O usuário "joao" agora tem age: 25.

// Atualiza todos os documentos que correspondam ao filtro:
db.usuarios.updateMany({ active: true }, { $set: { premium: true } });
// Todos os usuários ativos agora são premium.

// Substitui um documento inteiro por um novo:
db.usuarios.replaceOne(
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
// Define ou altera um campo específico:
db.usuarios.updateOne({ username: "joao" }, { $set: { premium: true } });
// "joao" agora é premium.

// $unset
// Remove um campo:
db.usuarios.updateOne({ username: "carlos" }, { $unset: { premium: "" } });
// Remove o campo 'premium' do usuário "carlos".

// $rename
// Renomeia um campo:
db.usuarios.updateOne({ username: "maria" }, { $rename: { age: "yearsOld" } });
// O campo 'age' foi renomeado para 'yearsOld' para "maria".

// OPERAÇÕES MATEMÁTICAS:

// $inc
// Incrementa um valor:
db.usuarios.updateOne({ username: "joao" }, { $inc: { age: 1 } });
// A idade de "joao" aumenta em 1.

// $mul
// Multiplica um valor:
db.usuarios.updateOne({ username: "carlos" }, { $mul: { age: 2 } });
// A idade de "carlos" dobra.

// $min
db.usuarios.updateOne({ username: "joao" }, { $min: { age: 23 } });
// Se a idade de "joao" for maior que 23, ela é reduzida para 23.

// $max
db.usuarios.updateOne({ username: "maria" }, { $max: { yearsOld: 35 } });
// Se a idade de "maria" for menor que 35, ela é aumentada para 35.

// OPERAÇÕES EM ARRAYS:

// $push
// Adiciona um elemento ao array:
db.usuarios.updateOne({ username: "maria" }, { $push: { hobbies: "guitar" } });
// "guitar" é adicionado ao array hobbies de "maria".

// $pop
// Remove o primeiro ou último elemento:
db.usuarios.updateOne({ username: "joao" }, { $pop: { hobbies: -1 } });
// Remove o primeiro item do array hobbies de "joao".

// $pull
// Remove elementos específicos:
db.usuarios.updateOne({ username: "carlos" }, { $pull: { hobbies: "gaming" } });
// Remove "gaming" do array hobbies de "carlos".

// $addToSet
// Adiciona um item se ele não existir:
db.usuarios.updateOne(
  { username: "joao" },
  { $addToSet: { hobbies: "chess" } },
);
// "chess" só será adicionado ao array hobbies de "joao" se ainda não existir.

// $each
// Adiciona múltiplos elementos:
db.usuarios.updateOne(
  { username: "carlos" },
  { $push: { hobbies: { $each: ["coding", "music"] } } },
);
// "coding" e "music" são adicionados a hobbies de "carlos".

// Aviso! Sem o $each iria adicionar um array dentro do array de hobbies.
db.usuarios.updateOne(
  { username: "carlos" },
  { $push: { hobbies: ["coding", "music"] } },
);
