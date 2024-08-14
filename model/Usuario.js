const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('./banco');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
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
}, {
  hooks: {
    afterSync: async (options) => {
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
        console.log('Usuário administrador já existe.');
      }
    }
  }
});

module.exports = Usuario;
