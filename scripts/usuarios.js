// Crie um usuário:
db.createUser({
  user: "adminUser",
  pwd: "Fatec@2025",
  roles: [
    { role: "userAdminAnyDatabase", db: "admin" },
    "readWriteAnyDatabase",
  ],
});

// Ver usuários:
db.getUsers();

// Ver todas as roles de um usuário:
db.getUser("nomeUsuario");

/* ROLES PERSONALIZADAS */

// Criar roles específicas com permissões granulares, por exemplo, permitir apenas
// leitura da coleção clientes:
db.createRole({
  role: "leitorApenasClientes",
  privileges: [
    {
      resource: { db: "vendas", collection: "clientes" },
      actions: ["find"],
    },
  ],
  roles: [],
});

// Exibe todas as roles internas e personalizadas:
db.getRoles({ showBuiltinRoles: true });

// Exibe apenas as roles personalizadas:
db.getRoles({ showBuiltinRoles: false });

// Ver detalhes de uma role:
db.getRole("leitorApenasClientes", { showPrivileges: true });

// Remover uma role personalizada:
db.dropRole("leitorApenasClientes");

/* ATRIBUIR ROLES A USUÁRIOS */

// Atribuindo Role ao Usuário
db.grantRolesToUser("joao", [{ role: "leitorApenasClientes", db: "meuBanco" }]);

// Removendo Role de Usuário:
db.revokeRolesFromUser("joao", [
  { role: "leitorApenasClientes", db: "meuBanco" },
]);

/* ATRIBUINDO E REMOVENDO PRIVILÉGIOS DE UMA ROLE */

// Concedendo privilégio à uma role:
db.grantPrivilegesToRole("leitorApenasClientes", [
  { resource: { db: "meuBanco", collection: "clientes" }, actions: ["count"] },
]);

// Revogando privilégio de uma role:
db.revokePrivilegesFromRole("leitorApenasClientes", [
  { resource: { db: "meuBanco", collection: "clientes" }, actions: ["count"] },
]);

/* MANIPULAÇÃO DE USUÁRIOS */

// Criação
db.createUser({
  user: "joao",
  pwd: "senha123",
  roles: [{ role: "readWrite", db: "meuBanco" }],
});

// Dados de um usuário específico:
db.getUser("joao");

// Consultar todos os usuários:
db.getUsers();

// Atualização de um usuário:
db.updateUser("joao", {
  pwd: "novaSenha456",
  roles: [{ role: "read", db: "meuBanco" }],
});

// Modifica apenas a senha:
db.changeUserPassword("joao", "outraSenha789");

// Remove um usuário específico:
db.dropUser("joao");

// Remover todos os usuários:
db.dropAllUsers();
