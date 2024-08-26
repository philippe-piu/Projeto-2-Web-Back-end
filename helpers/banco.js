const Sequelize = require('sequelize');

// Inicialização do banco
const sequelize = new Sequelize({
  // Tipo de banco
  dialect: process.env.DB_DIALECT,
  // Local onde será armazenado o banco de dados
  storage: './database.sqlite'
})

// Exporta o sequelize para ser usado em outras partes
module.exports = sequelize;