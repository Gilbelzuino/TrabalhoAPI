const { Router } = require('express');
const authService = require('../Services/authService');

const Authroutes = Router();

Authroutes.post('/', async (request, response) => {
   
     let {Email, Senha} = request.body;
     const retornoToken = authService.gerarToken(Email,Senha);


    return response.json(retornoToken);

});

module.exports = Authroutes;