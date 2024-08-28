const express = require('express')
const router = express.Router()
const Usuario = require('../model/Usuario')
const Livro = require('../model/Livro')
const bcrypt = require('bcrypt')

router.get('/', async (req, res) => {
  try {
    // Cria um tipo de tipo de variavel que verifica se esses emails já existem no banco de dados
    const usuariosExistentes = await Usuario.findAll({
      where: {
        email: [
          'luffye@xample.com',
          'zoro@example.com',
          'nami@example.com',
          'robin@example.com',
          'don@example.com'
        ]
      }
    })

    // Se a consulta retornar algum resultado, os usuários já estão cadastrados
    if (usuariosExistentes.length > 0) {
      return res
        .status(400)
        .json({ msg: 'Usuários já cadastrados no banco de dados' })
    }
    // Criação de Usuários
    const usuario = [
      {
        nome: 'Luffy',
        email: 'luffye@xample.com',
        senha: await bcrypt.hash('123456', 10),
        admin: false
      },
      {
        nome: 'Zoro',
        email: 'zoro@example.com',
        senha: await bcrypt.hash('123456', 10),
        admin: false
      },
      {
        nome: 'Nami',
        email: 'nami@example.com',
        senha: await bcrypt.hash('123456', 10),
        admin: false
      },
      {
        nome: 'Robin',
        email: 'robin@example.com',
        senha: await bcrypt.hash('123456', 10),
        admin: false
      },
      {
        nome: 'Donquixote Doflamingo',
        email: 'don@example.com',
        senha: await bcrypt.hash('123456', 10),
        admin: true
      }
    ]

    // Mandar os dados de cima para o banco de dados inserindos no banco
    await Usuario.bulkCreate(usuario)
    //lembrete o bulkCreate é do sequelize ele permite criar varios campos da tabela no banco de uma vez

    console.log('Usuários cadastrados com sucesso no banco')

    // Criação de Livros
    const livrosExistentes = await Livro.findAll({
      where: {
        nomeLivro: [
          'One Piece',
          'Dragon Ball',
          'Jujutsu Kaisen',
          'Kono Subarashii Sekai ni Shukufuku wo!',
          'Solo Leveling'
        ]
      }
    })

    if (livrosExistentes.length > 0) {
      return res
        .status(400)
        .json({ msg: 'Livros já cadastrados no banco de dados' })
    }

    const livros = [
      { nomeLivro: 'One Piece', autor: 'Eiichiro Oda', disponivel: true },
      { nomeLivro: 'Dragon Ball', autor: 'Akira Toriyama', disponivel: true },
      { nomeLivro: 'Jujutsu Kaisen', autor: 'Gege Akutami', disponivel: true },
      {
        nomeLivro: 'Kono Subarashii Sekai ni Shukufuku wo!',
        autor: 'Natsume Akatsuki',
        disponivel: true
      },
      { nomeLivro: 'Solo Leveling', autor: 'Chugong', disponivel: true }
    ]

    // Mandar os dados de cima para o banco de dados
    await Livro.bulkCreate(livros)

    console.log('Livros cadastrados com sucesso no banco')

    res.status(200).json({
      msg: 'Usuários e Livros Criados com sucesso'
    })
  } catch (error) {
    res.status(500).json({ msg: 'Erro interno do servidor' })
  }
})

module.exports = router
