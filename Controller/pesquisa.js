const express = require('express')
const router = express.Router()
const Livro = require('../model/Livro')
const Usuario = require('../model/Usuario')
const Emprestimo = require('../model/Emprestimo')
const Auth = require('../helpers/Auth')

//Rota para pesquisa de emprestimos
router.get('/emprestimo',Auth.autenticarToken, async (req, res) => {
  //Rota para mostrar os livros que fora emprestados pegando o mostrando os nome dos livros e do ususario que o locou
  try {

    //verifica a validação do token pelo usuario id
    const usuarioId = req.user.id

     //Verifica se o usuário é verdadeiro
     if (!usuarioId) {
      return res.status(400).json({
        msg: 'Identificação de usuario invalida'
      })
    }

    const emprestimos = await Emprestimo.findAll({
      //Where procura pelo usuario login
      where: { usuarioId }, 
      include: [
        { model: Usuario, as: 'usuario', attributes: ['nome'] },
        { model: Livro, as: 'livro', attributes: ['nomeLivro'] }
      ]
    })

    //Cria um vetor pelo map para manipular as informações para imprimir
    //Tipo são dois emprestimos daew ele pega faz dois vetores com as informações abaixo
    const emprestimosF = emprestimos.map(emprestimo => ({
      idEmprestimo: emprestimo.idEmprestimo,
      //entra no emprestimo pega no usuario o nome
      nomeUsuario: emprestimo.usuario.nome,
      nomeLivro: emprestimo.livro.nomeLivro,
      dataEmprestimo: emprestimo.dataEmprestimo,
      dataDevolucaoEmprestimo: emprestimo.dataDevolucaoEmprestimo
    }))

    //Imprime informações na ordem que que eu defini na parte de cima
    console.log('Livros emprestado: \n', emprestimosF)
    res.json(emprestimosF)
  } catch (error) {
    console.error('Erro ao buscar empréstimos', error)
    //Em caso de erro manda uma mensagem para erro
    res.status(500).json({ msg: 'Erro interno do servidor' })
  }
})

router.get('/pes-emprestimo', async (req, res) => {
  //Rota para mostrar os livros que fora emprestados pegando o mostrando os nome dos livros e do ususario que o locou

  try {

    const emprestimos = await Emprestimo.findAll({
      include: [
        //Faço a pesquisa pelo banco de dados Usuario para pegar o usuario e o do livro par pegar o livro
        { model: Usuario, as: 'usuario', attributes: ['nome'] },
        { model: Livro, as: 'livro', attributes: ['nomeLivro'] }
      ]
    })

    //Cria um vetor pelo map para manipular as informações para imprimir
    //Tipo são dois emprestimos daew ele pega faz dois vetores com as informações abaixo
    const emprestimosF = emprestimos.map(emprestimo => ({
      idEmprestimo: emprestimo.idEmprestimo,
      //entra no emprestimo pega no usuario o nome
      nomeUsuario: emprestimo.usuario.nome,
      nomeLivro: emprestimo.livro.nomeLivro,
      dataEmprestimo: emprestimo.dataEmprestimo,
      dataDevolucaoEmprestimo: emprestimo.dataDevolucaoEmprestimo
    }))

    //Imprime informações na ordem que que eu defini na parte de cima
    console.log('Livros emprestado: \n', emprestimosF)
    res.json(emprestimosF)
  } catch (error) {
    console.error('Erro ao buscar empréstimos', error)
    //Em caso de erro manda uma mensagem para erro
    res.status(500).json({ msg: 'Erro interno do servidor' })
  }
})




module.exports = router
