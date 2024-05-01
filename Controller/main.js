const express = require('express')
const router = express.Router()

//Rota Para Inicial do Projeto
router.get("/", (req, res) => {
  res.render("index");
})

module.exports = router