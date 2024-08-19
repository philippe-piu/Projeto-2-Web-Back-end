const jwt = require('jsonwebtoken');

module.exports = {
  autenticarToken: (req, res, next) => {
    // Pega o token do cabeçalho Authorization
    let beartoken = req.headers['authorization'] || "";
    let token = beartoken.split(" ");
  
    // Verifica se o token tem o prefixo 'Bearer'
    if (token[0] === 'Bearer') {
      token = token[1];
    } else {
      // Retorna erro se o formato do token estiver incorreto ou ausente
      return res.status(401).json({ msg: 'Token não fornecido ou formato incorreto' });
    }
    console.log("\nBearToken \n",beartoken);
    console.log("\nToken-- \n",token);
    // Verifica o token usando o segredo JWT
    jwt.verify(token, process.env.JWT_SECRET, (err, obj) => {
      if (err) {
        return res.status(403).json({ msg: 'Token inválido acasso negado' });
      } else {
        // Se o token for válido, armazena as informações do usuário na requisição
        req.user = obj;
        // Continua para o próximo middleware
        next();
      }
    });
  }
};
