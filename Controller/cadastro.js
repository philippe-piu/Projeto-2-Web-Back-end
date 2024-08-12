const express = require('express')
const router = express.Router()

const Usuario = require('../model/Usuario')


//Rota Para Cadastro
router.get("/", (req, res) => {
  res.json({msg:"Cadastro de usuário"});
})



module.exports = router