//Requires gerais
const path = require("path");
require("dotenv").config();

//Conectando o banco
(async () => {
  const banco = require('./helpers/banco');
  const Usuario = require('./model/Usuario');
  const Livro = require('./model/Livro');
  const Emprestimo = require('./model/Emprestimo');
  
  try {
    
      const resultado = await banco.sync();
      console.log(resultado);
      console.log('Banco de dados sincronizado com sucesso.');

      const adminEmail = process.env.EMAIL_ADM;
      const adminSenha = process.env.SENHA_ADM;
      //Verifica se esse email de adm existe
      const adminExistente = await Usuario.findOne({ where: { email: adminEmail } });
      //Se não existir o email
      if (!adminExistente) {
        const hashedSenha = await bcrypt.hash(adminSenha, 10);
        await Usuario.create({
          nome: 'Admin',
          email: adminEmail,
          senha: hashedSenha,
          admin: true
        });
        console.log('Usuário administrador criado com sucesso.');
      } else {
        console.log('Usuário ADM já se encontra criado no banco.');
      }
      
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
app.use("/install", require('./Controller/install'));
app.use("/emprestimos", require('./Controller/emprestimos'));
app.use("/pesquisa", require('./Controller/pesquisa'));


app.listen(process.env.PORT, ()=> {
  console.log("Servidor Inicializado")
})