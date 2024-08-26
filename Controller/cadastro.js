const express = require('express')
const router = express.Router()
const Usuario = require('../model/Usuario')
const bcrypt = require('bcrypt');

//Rota Para Cadastro
router.get("/", async (req, res) => {
  res.json({msg:"Cadastro de usuário"});
})

// Rota para cadastro de usuários
router.post("/", async (req, res) => { 
  const { nome, email, senha, admin } = req.body;

  //Se alguns deste campos não for preenchido ele retorna uma mensagem informando que falta preencher algum campos
  if (!nome || !email || !senha || !admin) {
    return res.status(400).json({ msg: "Todos os campos são obrigatórios" });
  }

  try {
    // Verifica se o email já está cadastrado
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ msg: "Email já cadastrado" });
    }

    // Criptografa a senha
    const hashedSenha = await bcrypt.hash(senha, 10);

    // Cria o novo usuário
    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha: hashedSenha,
      admin
    });

    res.status(201).json({ msg: "Usuário cadastrado com sucesso", usuario: novoUsuario });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    res.status(500).json({ msg: "Erro interno do servidor" });
  }
});

module.exports = router