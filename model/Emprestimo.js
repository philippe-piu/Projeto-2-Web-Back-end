const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/banco');
const Usuario = require('./Usuario');
const Livro = require('./Livro');

const Emprestimo = sequelize.define('Emprestimo', {
  idEmprestimo: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Usuario', // Nome da tabela referenciada
      key: 'id'
    }
  },
  livroId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Livro', // Nome da tabela referenciada
      key: 'id'
    }
  },
  dataEmprestimo: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  dataDevolucaoEmprestimo: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'Emprestimo' // Especifica o nome da tabela
});

Emprestimo.belongsTo(Usuario, {
  foreignKey: 'usuarioId',
  as: 'usuario'
});

Emprestimo.belongsTo(Livro, {
  foreignKey: 'livroId',
  as: 'livro'
});

module.exports = Emprestimo;
