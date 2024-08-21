const express = require('express');
const router = express.Router();
const Usuario = require('../model/Usuario');
const bcrypt = require('bcrypt');
const Auth = require('../helpers/Auth');

// Rota para alteração de usuario
router.put('/update/:id', Auth.autenticarToken, async (req, res) => {
  //pega o id na url
  const { id } = req.params;

  //As informações passadas pelo adm no json
  const { nome, email, senha, admin } = req.body;

  try {
    //verifica se o usuario existe no banco de dados/tabela
    const usuario = await Usuario.findOne({ where: { id } });

    // Se o usuário não achar o usuario
    if (!usuario) {
      //retorna a mensagem de usuario não encontrado no banco
      return res.status(404).json({ msg: 'Usuário não encontrado' });
    }

    // Verifica se o usuário é o próprio ou se é um administrador
    if (req.user.id !== usuario.id && !req.user.admin) {
      return res.status(403).json({ msg: 'Acesso negado' });
    }

    //Atualização de nome se o nome for informado
    if (nome) {
      //banco recebe o nome
      usuario.nome = nome;
    }

    // Se um novo email for fornecido
    if (email) {
      // Verifica se já existe um usuário com o novo email
      const usuarioExistente = await Usuario.findOne({ where: { email } });

      // Se o email já estiver em uso e não pertencer ao mesmo usuário
      if (usuarioExistente && usuarioExistente.id !== id) {
        return res.status(400).json({ msg: 'Email já cadastrado' });
      }
      // Atualiza o email do usuário
      usuario.email = email;
    }

    // Se uma nova senha for fornecida, criptografa e atualiza a senha do usuário
    if (senha) {
      usuario.senha = await bcrypt.hash(senha, 10);
    }

    // Permite a alteração do status de administrador apenas se o token for de um administrador
    if (admin !== undefined && req.user.admin) {
      usuario.admin = admin;
    }

    //Salva no banco
    await usuario.save();

    // Envia uma mensagem de sucesso ao cliente
    res.status(200).json({ msg: 'Usuário atualizado com sucesso', usuario });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ msg: 'Erro interno do servidor' });
  }
});

module.exports = router;