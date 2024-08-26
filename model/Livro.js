// Livro.js
const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/banco');

const Livro = sequelize.define('Livro', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nomeLivro: {
    type: DataTypes.STRING,
    allowNull: false
  },
  autor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  preco: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  disponivel: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

module.exports = Livro;
