const express = require('express')
const router = express.Router()
const Livro = require('../model/Livro')
const Usuario = require('../model/Usuario')
const Emprestimo = require('../model/Emprestimo')
const Auth = require('../helpers/Auth')

//Rota para emprestar livro
router.post('/emprestar-livro', Auth.autenticarToken, async (req, res) => {
  const { livro, dataDevolucaoEmprestimo } = req.body

  // Verifica se todos os campos obrigatórios foram fornecidos
  if (!livro || !dataDevolucaoEmprestimo) {
    //Retorna erro se algum campo não foi preenchido
    return res.status(400).json({ msg: 'Todos os campos são obrigatórios' })
  }

  // Obtém o ID do usuário a partir do token de autenticação
  const usuarioIdentificacao = req.user.id

  try {
    // Encontrar o usuário no banco de dados pelo ID
    const usuIden = await Usuario.findOne({
      where: { id: usuarioIdentificacao }
    })

    //Verifica se o usuário é verdadeiro
    if (!usuIden) {
      return res.status(400).json({
        msg: 'Identificação de usuario invalida'
      })
    }

    //findAll busca os registro do banco da tabela do id do livro pra ver se existem e retorna um vetor com os registros do livro encontrados
    const livrosExistentes = await Livro.findAll({ where: { id: livro } })

    /*Verifica se o número de livros encontrados no banco de dados é diferente do número de IDs fornecidos. Se for diferente, significa que um ou mais livros não foram encontrados.*/
    if (livrosExistentes.length !== livro.length) {
      //retorna uma mensagem
      return res.status(400).json({ msg: 'Um ou mais livros não encontrados' })
    }

    //Criação do emprestimo
    //multiplos registro Criados
    const emprestimos = await Promise.all(
      //Criando um array/vetor de livros
      livro.map(livroId =>
        Emprestimo.create({
          usuarioId: usuarioIdentificacao,
          livroId: livroId,
          dataEmprestimo: new Date(),
          dataDevolucaoEmprestimo
        })
      )
    )
    console.log('Emprestimo autorizado')
    //mensagem de sucesso
    res.status(201).json({ msg: 'Emprestimo realizado com sucesso !!!' })
  } catch (error) {
    console.error('Erro de emprestimo', error)
    //Em caso de erro manda uma mensagem para erro
    res.status(500).json({ msg: 'Erro interno do servidor' })
  }
})

// Rota para excluir um empréstimo
router.delete('/delete/:id', Auth.autenticarToken, async (req, res) => {
 // Pega na URL
  const { id } = req.params;

  try {
    //verico o banco o primeiro objeto encontrado no banco com e verifico se é o id passado na url
    const emprestimo = await Emprestimo.findOne({ where: { idEmprestimo: id } });

    //se o o id não existir não encontra o emprestimo
    if (!emprestimo) {
      return res.status(404).json({ msg: 'Empréstimo não encontrado' });
    }

    //destroy o emprestimo no banco
    await Emprestimo.destroy({ where: { idEmprestimo: id } });

    //mensagem de sucesso
    console.log('Empréstimo excluído com sucesso');
    res.status(200).json({ msg: 'Empréstimo excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir o empréstimo:', error);
    res.status(500).json({ msg: 'Erro interno do servidor' });
  }
});


module.exports = router
