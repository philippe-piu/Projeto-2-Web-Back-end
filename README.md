# Projeto-2-Web-Back-end

<h1>API de Gerenciamento de Usuário</h1>

<p>Este projeto é uma API para gerenciamento de usuários com funcionalidades de cadastro, login, administração e autenticação. Utiliza Express para o servidor, Sequelize com SQLite para o banco de dados, e JWT para autenticação.</p>

## Estrutura do Projeto

### index.js

Configura o servidor Express, middleware, templates Mustache, cookies e as rotas principais. Também integra o Swagger para documentação da API.

### Controller

- **cadastro.js**: Gerencia rotas para cadastro de usuários. Permite a criação de novos usuários e validação de dados.
- **login.js**: Gerencia a autenticação de usuários. Realiza o login e gera tokens JWT.
- **administrador.js**: Permite a criação, atualização e exclusão de usuários, com autenticação de administrador para algumas operações.

### model

- **banco.js**: Configura e sincroniza o banco de dados SQLite usando Sequelize.
- **Usuario.js**: Define o modelo de usuário, incluindo hooks para criar um usuário administrador inicial.

### helpers

- **Auth.js**: Contém a função `autenticarToken` para validar tokens JWT em rotas protegidas.

### Swagger

Arquivo `swagger.json` para a documentação da API. Acesse a documentação em `/api-docs` após iniciar o servidor.

## Início Rápido

1. Estale a node Modules com um npm install no terminar

2. Inicie o servidor:
    ```bash
    npm start
    ```

3. Acesse a API na URL `http://localhost:3000`.

4. Acesse a documentação da API no Swagger em `http://localhost:3000/api-docs`.

## Endpoints

### Cadastro

- `GET /cadastro` - Mensagem de boas-vindas ao cadastro.
- `POST /cadastro` - Cadastra um novo usuário.

### Login

- `POST /login` - Realiza o login e retorna um token JWT.

### Administração

- `POST /administrador/create-adm` - Cria um novo administrador.
- `PUT /administrador/update/:id` - Atualiza as informações de um usuário.
- `DELETE /administrador/delete-user/:id` - Exclui um usuário não administrador.

## Observações

- A senha dos usuários é criptografada usando bcrypt.
- O token JWT é utilizado para autenticação nas rotas protegidas.

## Teste Pelo Thunder Client

<p>Cadastro de Cliente Correto <img src="/Figuras/Cadastro1.PNG" alt="Cadastro"></p>
<p>Cadastro de Cliente Com erro <img src="/Figuras/CadastroErro.PNG" alt="Cadastro"></p>
<p>Login <img src="/Figuras/Login e Criação do token.PNG" alt="Login"></p>
<p>Criar Adm <img src="/Figuras/Criar Adm1.PNG" alt="Criar Adm"></p>
<p>Criar Adm <img src="/Figuras/Criar Adm2.PNG" alt="Criar Adm"></p>
<p>Update <img src="/Figuras/update.PNG" alt="Update"></p>
<p>Delete <img src="/Figuras/delete.PNG" alt="Delete"></p>

## Documentação pelo Swagger
<p>ara acessar a documentação pelo Swagger, depois de inicializar o projeto, vá ao seu navegador e insira o endereço http://localhost:3000/api-docs.<p>
<br>
<p>Imagem ilustrativa<p>
<img src="/Figuras/swagger.PNG" alt="Swagger">