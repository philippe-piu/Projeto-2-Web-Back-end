const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../helpers/banco');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
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
}, {
  tableName: 'Usuario',  

  hooks: {
    afterSync: async () => {
      const adminEmail = process.env.EMAIL_ADM;
      const adminSenha = process.env.SENHA_ADM;

      const adminExistente = await Usuario.findOne({ where: { email: adminEmail } });
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
    }
  }
});

module.exports = Usuario;
