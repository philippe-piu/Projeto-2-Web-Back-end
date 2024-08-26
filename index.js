//Requires gerais
const path = require("path");
require("dotenv").config();

//Conectando o banco
(async () => {
  const banco = require('./helpers/banco');
  const Usuario = require('./model/Usuario');
  const Livro = require('./model/Livro');

  try {
      const resultado = await banco.sync();
      console.log(resultado);
      console.log('Banco de dados sincronizado com sucesso.');
  } catch (error) {
    console.error('Erro ao sincronizar o banco de dados:', error);
  }
})();

//Express
const express = require('express')
const app = express()
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

//Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Template Mustache
var mustacheExpress = require("mustache-express");
var engine = mustacheExpress()
app.engine("mustache", engine);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "mustache");

//Cokies
const cookieParser = require("cookie-parser")
app.use(cookieParser())


app.use("/", require('./Controller/main'))
app.use("/cadastro", require('./Controller/cadastro'))
app.use("/login", require('./Controller/login'));
app.use("/administrador", require('./Controller/administrador'));
app.use("/updateInfo", require('./Controller/updateInfo'));
app.use("/cadLivro", require('./Controller/cadLivro'));

app.listen(process.env.PORT, ()=> {
  console.log("Servidor Inicializado")
})