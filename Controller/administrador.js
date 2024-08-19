const express = require('express');
const router = express.Router();
const Usuario = require('../model/Usuario');
const bcrypt = require('bcrypt');
const Auth = require('../helpers/Auth');

// Rota para criar um novo usuário administrador
router.post('/create-adm', Auth.autenticarToken, async (req, res) => {
  const { nome, email, senha } = req.body;
  
  if (!nome || !email || !senha) {
    return res.status(400).json({ msg: 'Todos os campos são obrigatórios' });
  }
  
  try {
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ msg: 'Email já cadastrado' });
    }
    
    const hashedSenha = await bcrypt.hash(senha, 10);
    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha: hashedSenha,
      admin: true
    });
    
    res.status(201).json({ msg: 'Novo administrador criado com sucesso', usuario: novoUsuario });
  } catch (error) {
    console.error('Erro ao criar novo administrador:', error);
    res.status(500).json({ msg: 'Erro interno do servidor' });
  }
});

module.exports = router;
