const express = require('express')
const router = express.Router()
const Usuario = require('../model/Usuario')
const Livro = require('../model/Livro')
const Auth = require('../helpers/Auth')

//Rota de cadastro de Livro pelo Adm
router.post('/create-Livro', Auth.autenticarToken, async (req, res) => {
  // Extrai as informações do corpo da requisição
  const { nomeLivro, autor } = req.body

  // Verifica se todos os campos obrigatórios foram fornecidos
  if (!nomeLivro || !autor) {
    //Retorna erro se algum campo não foi preenchido
    return res.status(400).json({ msg: 'Todos os campos são obrigatórios' })
  }

  // Obtém o ID do usuário a partir do token de autenticação
  const usuarioId = req.user.id;
  
  try {
    // Encontrar o usuário no banco de dados pelo ID
    const usuario = await Usuario.findOne({ where: { id: usuarioId } });
    //Se o o Usuario não for um administrador ele não cadastra o livro
    if(!usuario.admin){
      return res.status(400).json({ msg: 'Usuário não é administrador você não tem autorização para cadastrar livros'})
    }

    // Verifica se o livro já está cadastrado
    const livroExistente = await Livro.findOne({ where: { nomeLivro } });
    //Se o livro estiver Cadastrado ele informa que o livro já está cadatrado
    if (livroExistente) {
      console.log('Livro já cadastrado');
      return res.status(400).json({ msg: "Livro já cadastrado" });
    }

    //Criação de informações na tabela
    const novoLivro = await Livro.create({
      nomeLivro,
      autor,
      disponivel: true
    })

    console.log('Cadastro de Livro feito com sucesso')

    //Manda mensagem de sucesso no cadastro
    res
      .status(201)
      .json({ msg: 'Livro cadastrado com sucesso', livro: novoLivro })
  } catch (error) {
    console.error('Erro ao cadastrar livro:', error)
    //Em caso de erro manda uma mensagem para erro
    res.status(500).json({ msg: 'Erro interno do servidor' })
  }
})

module.exports = router
