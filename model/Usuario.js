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
  //função do sequelize que se executa em um momento especifico com afterSync
  hooks: {
    //afterSync crie e altera a tabela
    afterSync: async () => {
      //Cria tipo uma varial para armazenar o email e senha por meio desta variaveis posso usar por elas 
      const adminEmail = process.env.EMAIL_ADM;
      const adminSenha = process.env.SENHA_ADM;

      //Verifica se já tem um usuario criado na tabela do banco usuario com este email
      const adminExistente = await Usuario.findOne({ where: { email: adminEmail } });
      //Se não esxistir o usurio no inicio do banco ele cria um usuario pre definido
      if (!adminExistente) {
        const hashedSenha = await bcrypt.hash(adminSenha, 10);
        await Usuario.create({
          nome: 'Admin',
          email: adminEmail,
          senha: hashedSenha,
          admin: true
        });
        //Mensagem no terminal para criação de usuario  adm
        console.log('Usuário administrador criado com sucesso.');
      } else {
        console.log('Usuário ADM já se encontra criado no banco.');
      }
    }
  }
});

module.exports = Usuario;
