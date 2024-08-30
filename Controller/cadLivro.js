const express = require('express')
const router = express.Router()
const Usuario = require('../model/Usuario')
const Livro = require('../model/Livro')
const Auth = require('../helpers/Auth')

//Rota de cadastro de Livro pelo Adm SOmente ADM CADASTRA LIVRO
router.post('/create-Livro', Auth.autenticarToken, async (req, res) => {
  // Extrai as informações do corpo da requisição
  const { nomeLivro, autor } = req.body

  // Verifica se todos os campos obrigatórios foram fornecidos
  if (!nomeLivro || !autor) {
    //Retorna erro se algum campo não foi preenchido
    return res.status(400).json({ msg: 'Todos os campos são obrigatórios' })
  }

  // Obtém o ID do usuário a partir do token de autenticação
  const usuarioId = req.user.id

  try {
    // Encontrar o usuário no banco de dados pelo ID
    const usuario = await Usuario.findOne({ where: { id: usuarioId } })
    //Se o o Usuario não for um administrador ele não cadastra o livro
    if (!usuario.admin) {
      return res.status(400).json({
        msg: 'Usuário não é administrador você não tem autorização para cadastrar livros'
      })
    }

    // Verifica se o livro já está cadastrado
    const livroExistente = await Livro.findOne({ where: { nomeLivro } })
    //Se o livro estiver Cadastrado ele informa que o livro já está cadatrado
    if (livroExistente) {
      console.log('Livro já cadastrado')
      return res.status(400).json({ msg: 'Livro já cadastrado' })
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

//Rota para update do livro
router.put('/update-livro/:id', Auth.autenticarToken, async (req, res) => {
  //pega o id na url
  const { id } = req.params
  // Extrai as informações do corpo da requisição
  const { nomeLivro, autor, disponivel } = req.body

  // Obtém o ID do usuário a partir do token de autenticação
  const usuarioId = req.user.id
  try {
    // Encontrar o usuário no banco de dados pelo ID
    const usuario = await Usuario.findOne({ where: { id: usuarioId } })
    //Se o o Usuario não for um administrador ele não cadastra o livro
    if (!usuario.admin) {
      return res.status(400).json({
        msg: 'Usuário não é administrador você não tem autorização para atualizar livros'
      })
    }

    //verifica se o usuario existe no banco de dados/tabela
    const livro = await Livro.findOne({ where: { id } })

    // Se o usuário não achar o livro
    if (!livro) {
      //retorna a mensagem de usuario não encontrado no banco
      return res.status(404).json({ msg: 'Livro não encontrado' })
    }

    //Se o nome do livro for informado
    if (nomeLivro) {
      //Banco recebe o nome do Livro
      livro.nomeLivro = nomeLivro
    }
    //Se o nome do autor for informado
    if (autor) {
      //Banco recebe o nome do autor
      livro.autor = autor
    }
    
    //Se o disponibilidade for informado
    if (disponivel) {
      //Banco recebe disponivel
      livro.disponivel = disponivel
    }

    // Salva as alterações no banco de dados/tabela
    await livro.save()

    console.log('Livro atualizado');
    // Retorna uma mensagem de sucesso
    res.status(200).json({
      msg: 'Livro atualizado com sucesso',
      livro: {
        nomeLivro: livro.nomeLivro,
        autor: livro.autor,
        disponivel: livro.disponivel
      }
    })
  } catch (error) {
    console.error('Erro ao editar livro:', error)
    //Em caso de erro manda uma mensagem para erro
    res.status(500).json({ msg: 'Erro interno do servidor' })
  }
})

//Rota para deletar livro do banco/tabela
router.delete('/delete-livro/:id', Auth.autenticarToken, async (req, res) => {
  //pega o id na url ndo livro
  const { id } = req.params

  // Obtém o ID do usuário a partir do token de autenticação
  const usuarioId = req.user.id

  try {
    // Encontrar o usuário no banco de dados pelo ID
    const usuario = await Usuario.findOne({ where: { id: usuarioId } })
    //Se o o Usuario não for um administrador ele não cadastra o livro
    if (!usuario.admin) {
      return res.status(400).json({
        msg: 'Usuário não é administrador você não tem autorização para excluir livros'
      })
    }

    // Busca o usuário no banco de dados pelo ID
    const livro = await Livro.findOne({ where: { id } })

    // Verifica se o usuário existe
    if (!livro) {
      return res.status(404).json({ msg: 'Livro não encontrado' })
    }

    // Exclui o usuário do banco de dados
    await Livro.destroy({ where: { id } })

    // Retorna uma mensagem de sucesso
    res.status(200).json({ msg: 'Livro excluído com sucesso' })
    console.log('Livro excluído com sucesso')
  } catch (erro) {
    console.error('Erro ao excluir Livro', error)
    res.status(500).json({ msg: 'Erro interno do servidor' })
  }
})

module.exports = router