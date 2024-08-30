const jwt = require('jsonwebtoken');

const autenticarToken = (req, res, next) => {

  //Pega o token gerado no login que vai ser usado bo barerToken ódigo divide a string pelo espaço para obter o token em si (split(' ')[1])
  //req.headers['authorization'] está acessando o authorization sendo usado para gerar o tokrn nessa parte ? verifica se authorization existe o split(' ') divide o cabeçalho authorization e cria um array/vetor e [1] acessa o segundo elemento que é o token gerado
  //Primeiro ele acessa o cabeçalho para verificar se um token esta sendo gerado depois verifica para ver se token existe se for nulo ese já para e não vai pro split se ele existir e for valido depois cria um array que divide o cabeçalho e acessa o o token gerado
  const token = req.headers['authorization']?.split(' ')[1];
  //gera o bearear token
  //Se o o token  não for encontrado
  if (token == null){
    //retorn uma mensagem de erro
    return res.sendStatus(401).json({ msg: 'Token Invalido usuario ' })
  } 

  console.log("Token-- ",token);

  //decodifica e verifica a validade do token
  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    //Se over erro na verificação do token se ele for invalido ou tiver acabado
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
