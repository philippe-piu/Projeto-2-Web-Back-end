const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../model/Usuario');
const Auth = require('../helpers/Auth');

//Routa de login
router.post('/',  async (req,res) =>{
  //Pega  requisição o email e senha que o usuario digitou
  const {email,senha} = req.body;

  //Se não tiver colocado email ou senha da um erro
  if(!email || !senha){
    //Retorna um erro
    return res.status(400).json({msg: 'Email e senha são campos obrigatórios'})
  }

  try{
    //Verificação de email existente
    const usuario = await Usuario.findOne({ where: {email} });
    //Se o usurio não for encontrado no banco /tabela
    if(!usuario){
      return res.status(400).json({ msg: 'Cadastro de usuário não encontrado '});
    }

    //verifica se a senha é a mesma do banco/tabela
    //lembrete a usuario.senha é a senha do banco e senha que o  usurio inseriu para logar
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    //Se a senha for diferente da erro
    if(!senhaValida){
      return res.status(400).json({ msg: 'Senha incorreta verifique' });
    }

    //Gerar token 
    const token = jwt.sign({id: usuario.id, email:usuario.email}, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })

    console.log('Login realizado com sucesso',token)

    // Retorna o token e uma mensagem de sucesso
    return res.status(200).json({ msg: 'Login realizado com sucesso', token });

  }catch(error){
    console.log('Erro no login')

    return res.status(500).json({ msg: 'Ocorreu um erro no servidor', error });
  }
})



module.exports = router;