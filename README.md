# Projeto 2: Web Back-end

Este projeto é uma API para um sistema de gerenciamento de biblioteca. Ele permite o cadastro, atualização e exclusão de usuários e livros, bem como a gestão de empréstimos. Utiliza o Express para o gerenciamento de rotas e o Sequelize para a interação com o banco de dados SQLite.

## Estrutura do Projeto

- **index.js**: Arquivo principal que configura o Express, conecta o banco de dados e define as rotas.
- **helpers/banco.js**: Configuração da conexão com o banco de dados SQLite usando Sequelize.
- **helpers/Auth.js**: Middleware para autenticação JWT.
- **model/Usuario.js**: Modelo para a entidade `Usuario`.
- **model/Livro.js**: Modelo para a entidade `Livro`.
- **model/Emprestimo.js**: Modelo para a entidade `Emprestimo`.
- **Controller**: Contém os arquivos de controle para as rotas e operações relacionadas a usuários, livros e empréstimos.

## Configuração

1. De um npm install para instalar o a node modules 
2. De um npm start para inicializar o projeto

## Swagger
O projeto utiliza o Swagger para documentação da API. A documentação está disponível em http://localhost:3000/api-docs quando o servidor está em execução. O Swagger oferece uma interface interativa onde você pode explorar os endpoints da API e ver exemplos de requisições e respostas.

## Endpoints
Os seguintes endpoints estão disponíveis:

Cadastro de Usuário

1. POST /cadastro: Cria um novo usuário.
Login

2. POST /login: Realiza login e retorna um token JWT.
Administrador

3. POST /administrador/create-adm: Cria um novo administrador (requer autenticação).
4. PUT /administrador/update/:id: Atualiza informações de um usuário (requer autenticação).
5. DELETE /administrador/delete-user/:id: Exclui um usuário (requer autenticação).
Livros

6. POST /cadLivro/create-Livro: Adiciona um novo livro (requer autenticação).
7. PUT /cadLivro/update-livro/:id: Atualiza informações de um livro (requer autenticação).

Empréstimos

8. POST /emprestimos/create: Cria um novo empréstimo.
9. PUT /emprestimos/update/:id: Atualiza um empréstimo existente.
Pesquisa

10. GET /pesquisa: Realiza uma pesquisa de livros e usuários.