# 🍀 MongoDB

Introdução ao MongoDB (Banco de Dados Não Relacional). Arquivos JavaScript com os conteúdos das aulas práticas.

## 🔑 Comandos Básicos

> Conexão com o **MongoDB** e interação com documentos.

- `mongosh`
  - Inicia o shell do **MongoDB** e conecta ao servidor padrão `localhost:27017`.
- `db`
  - Mostra o banco de dados atualmente selecionado.
- `use meuBanco`
  - Se `meuBanco` não existir, ele será criado assim que um documento for inserido.
- `show dbs`
  - Exibe os bancos disponíveis. Se um banco estiver vazio, ele não será listado.
- `show collections`
  - Mostra todas as coleções em um banco.
- `mongosh script.js`
  - Rodar um arquivo `.js` no **MongoDB**. Ou abrir o `mongosh` primeiro e usar `load("script.js");`.

Veja os primeiros exemplos no arquivo [introducao.js](introducao.js)
