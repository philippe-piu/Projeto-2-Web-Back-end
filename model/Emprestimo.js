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
    // Nome da tabela referenciada
    references: {
      model: 'Usuario', 
      key: 'id'
    }
  },
  livroId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      // Nome da tabela referenciada
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
    allowNull: true
  }
}, {
  // Especifica o nome da tabela
  tableName: 'Emprestimo' 
});

//Cada emprestimo esta associado a Usuario
//belongsTo muitos para um
Emprestimo.belongsTo(Usuario, {
  foreignKey: 'usuarioId',
  as: 'usuario'
});

//Cada emprestimo esta associado a livro
Emprestimo.belongsTo(Livro, {
  foreignKey: 'livroId',
  as: 'livro'
});

module.exports = Emprestimo;
