const jwt = require('jsonwebtoken');

const autenticarToken = (req, res, next) => {

  //Pega o token gerado no login que vai ser usado bo barerToken ódigo divide a string pelo espaço para obter o token em si (split(' ')[1])
  const token = req.headers['authorization']?.split(' ')[1];
  
  //Se o o token do administrador não for encontrado
  if (token == null){
    //retorn uma mensagem de erro
    return res.sendStatus(401).json({ msg: 'Token Invalido usuario não é adm' })
  } 

  console.log("Token-- ",token);

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    //Se over erro na verificação do token
    if (error){
      //retorn uma mensagem de erro
      return res.sendStatus(403).json({ msg: 'Token Invalido verifique' });
    } 
     // Se o token for válido, as informações do usuário são anexadas ao req e a requisição continua para o próximo middleware
    req.user = user;
    next();
  });
};

module.exports = { autenticarToken };
