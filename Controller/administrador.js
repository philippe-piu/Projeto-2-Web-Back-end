const express = require('express');
const router = express.Router();
const Usuario = require('../model/Usuario');
const bcrypt = require('bcrypt');
const Auth = require('../helpers/Auth');

// Rota para criar um novo usuário administrador
router.post('/create-adm', Auth.autenticarToken, async (req, res) => {
  

  // Extrai as informações do corpo da requisição
  const { nome, email, senha } = req.body;
  
    // Verifica se todos os campos obrigatórios foram fornecidos
  if (!nome || !email || !senha) {
    //Retorna erro se algum campo não foi preenchido
    return res.status(400).json({ msg: 'Todos os campos são obrigatórios' });
  }
  
  try {
    //Verifica se existe o email fornecido
    const usuarioExistente = await Usuario.findOne({ where: { email } });

    if (usuarioExistente) {
      return res.status(400).json({ msg: 'Email já cadastrado' });
    }
    //pega a senha junto com o bcrypt meio que esconde ela no banco
    const hashedSenha = await bcrypt.hash(senha, 10);

    //Cria um novo usuário administrador no banco/tabela Usuario
    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha: hashedSenha,
      admin: true
    });
    
    //Manda uma mensagem de sucesso na criação de um adm
    res.status(201).json({ msg: 'Novo administrador criado com sucesso', usuario: novoUsuario });
  } catch (error) {
    console.error('Erro ao criar novo administrador:', error);
    //Em caso de erro manda uma mensagem para erro
    res.status(500).json({ msg: 'Erro interno do servidor' });
  }
});

// Rota para excluir um usuário não administrador
router.delete('/delete-user/:id', Auth.autenticarToken, async (req, res) => {
  //pega o id na url
  const { id } = req.params;

  try {
    // Busca o usuário no banco de dados pelo ID
    const usuario = await Usuario.findOne({ where: { id } });

    // Verifica se o usuário existe
    if (!usuario) {
      return res.status(404).json({ msg: 'Usuário não encontrado' });
    }

    // Verifica se o usuário é um administrador
    if (usuario.admin) {
      return res.status(403).json({ msg: 'Não é possível excluir administradores' });
    }

    // Exclui o usuário do banco de dados
    await Usuario.destroy({ where: { id } });

    // Retorna uma mensagem de sucesso
    res.status(200).json({ msg: 'Usuário excluído com sucesso' });
    console.log("Usuário excluído com sucesso")

  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    res.status(500).json({ msg: 'Erro interno do servidor' });
  }
});


module.exports = router;
