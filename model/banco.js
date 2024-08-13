const Sequelize = require('sequelize');
const path = require('path');

// Inicialização do banco
const sequelize = new Sequelize({
  // Tipo de banco
  dialect: "sqlite",
  // Local onde será armazenado o banco de dados
  storage: path.join(__dirname,'..', 'database.sqlite') 
});

// Função assíncrona para sincronizar o banco de dados
(async () => {
  try {
     // Sincroniza os modelos de tabelas com o banco de dados
    await sequelize.sync({ alter: true }); 
    //alter: true faz modificações caso o banco seja alterado sem mexer no resto da estrutura do banco ou tabela
    console.log('Banco de dados sincronizado com sucesso.');
  } catch (error) {
    console.error('Erro ao sincronizar o banco de dados:', error);
  }
})();

// Exporta o sequelize para ser usado em outras partes
module.exports = sequelize;
