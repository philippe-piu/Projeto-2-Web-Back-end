const express = require('express');
const router = express.Router();
const Usuario = require('../model/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Rota para login
router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ msg: "Email e senha são obrigatórios" });
  }

  try {
    // Verifica se o usuário existe
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(401).json({ msg: "Credenciais inválidas" });
    }

    // Verifica a senha
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ msg: "Credenciais inválidas" });
    }

    // Gera o token JWT
    const token = jwt.sign({ id: usuario.id, admin: usuario.admin }, process.env.JWT_SECRET, {
      expiresIn: '1h' // Tempo de expiração do token
    });

    res.json({ token });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({ msg: "Erro interno do servidor" });
  }
});

module.exports = router;
