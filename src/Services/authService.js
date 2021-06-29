const jwt = require('jsonwebtoken');
const cadastroServico = require('../services/cadastroServico');

module.exports.verificarToken = async (request, response, next) => {
    const token = request.header('Authorization').split(' ');
    try {
        if (token == undefined)
            throw new Error();
        console.log('token ' + token[1]);
        const data = jwt.verify(token[1], process.env.JWT_KEY);

        const Cadastro = await cadastroServico.buscaCadastroPorEmail(data.Email);
        if (!Cadastro) {
            throw new Error();
        }
        request.user = Cadastro;
        request.token = token;
        next();
    }
    catch (error) {
        response.status(401).send({ 'error': 'Not Authorized' })
    }

}

module.exports.gerarToken = (Email, Senha) => {
   
    const Cadastro = cadastroServico.verificaEmailSenha(Email, Senha);
    if (Cadastro == null) {
        return ({ auth: false, token: null, message: "Error"});;
    }
    const token = jwt.sign({ Email: Cadastro.Email }, process.env.JWT_KEY);
    return ({ auth: true, token: token, message : "OK!!" });
}