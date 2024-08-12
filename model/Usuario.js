const { DataTypes } = require('sequelize');
const sequelize = require('./banco')

const Usuario = sequelize.define('Usuario',{
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome:{
    //Tipo de em String
    type: DataTypes.STRING,
    //Campo não pode ser nulo
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    //Email de ver unico
    unique: true
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  },
  admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
})


// Exporta o sequelize para ser usado em outras partes
module.exports = Usuario; 