// Controller/admin.js
const express = require('express')
const router = express.Router()
const Usuario = require('../model/Usuario')
const bcrypt = require('bcrypt')
const Auth = require('../helpers/Auth')

router.post('/create', Auth.autenticarToken, async (req, res) => {
  // Verifica se o usuário que está fazendo a solicitação é um administrador
  if (!req.user.admin) {
    return res
      .status(403)
      .json({
        msg: 'Acesso negado. Somente administradores podem criar outros administradores.'
      })
  }

  const { nome, email, senha } = req.body

  // Validação dos campos
  if (!nome || !email || !senha) {
    return res.status(400).json({ msg: 'Todos os campos são obrigatórios' })

    try {
      // Verifica se o email já está cadastrado
      const usuarioExistente = await Usuario.findOne({ where: { email } })
      if (usuarioExistente) {
        return res.status(400).json({ msg: 'Email já cadastrado' })
      }

      // Criptografa a senha
      const hashedSenha = await bcrypt.hash(senha, 10)

      // Cria o novo administrador
      const novoAdmin = await Usuario.create({
        nome,
        email,
        senha: hashedSenha,
        admin: true
      })

      res
        .status(201)
        .json({ msg: 'Administrador criado com sucesso', usuario: novoAdmin })
    } catch (error) {
      console.error('Erro ao criar administrador:', error)
      res.status(500).json({ msg: 'Erro interno do servidor' })
    }
  }
})

module.exports = router
