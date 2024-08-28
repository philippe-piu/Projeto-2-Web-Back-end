const { DataTypes } = require('sequelize')
const sequelize = require('../helpers/banco')
const Usuario = require('./Usuario')
const Livro = require('./Livro')

const Emprestimo = sequelize.define('Emprestimo', {
  idEmprestimo: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    //referencia do id da tabela Usuário
    references: {
      model: 'Usuario',
      key: 'id'
    }
  },
  livroId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Livro',
      key: 'id'
    }
  },
  dataEmprestimo: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  dataDevolucaoEmprestimo: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
})

module.exports = Emprestimo
