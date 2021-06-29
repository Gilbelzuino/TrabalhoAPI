const { Router, request } = require('express');
const cadastroServico = require('../services/cadastroServico');
const autenticacaoJWT = require('../services/authService');
const { validate } = require('../validations/validations');
const { CadastroValidationRules } = require('../validations/CadastroValidations');
//preparar parar usar o express;

const routes = Router();
//autenticacaoJWT.verificarToken
routes.get('/', async (request, response) => {
    const CadastroRetorno = await cadastroServico.buscaCadastro();
    return response.json(CadastroRetorno);
});

routes.get('/:cpf', autenticacaoJWT.verificarToken, async (request, response) => {
    const { cpf } = request.params;
    const CadastroRetorno = await cadastroServico.buscaCadastroPorCpf(cpf);
    return response.json(CadastroRetorno);
});


    routes.post('/', CadastroValidationRules(), validate , async (request, response) => {
 
        const { nome, cpf, altura, peso, imc , classificacao , DataNascimento, Cidade, UF, ListaComorbidades, TeveCovid, Email, Senha } = request.body;
        console.log(request.body);
        //destruturação
        
        const novoCadastro = { nome, cpf, altura, peso, imc , classificacao , DataNascimento, Cidade, UF, ListaComorbidades, TeveCovid, Email, Senha};
        const CadastroRetorno = await cadastroServico.insereCadastro(novoCadastro);
        if (CadastroRetorno === null){

            response.status(500).json({ "ERROR": "CPF Cadastro já existe. Cadastro do not be inserted" });
        }
        return response.status(201).json({ CadastroRetorno });
    
        });


        routes.put('/:cpf', async (request, response) => {
            //route params guid
        
            const { cpf} = request.params;
            const { nome, altura, peso, DataNascimento, Cidade, UF, ListaComorbidades, TeveCovid } = request.body;
            const CadastroAtualizar = {nome, cpf, altura, peso, DataNascimento, Cidade, UF, ListaComorbidades, TeveCovid, Email, Senha};
            const CadastroRetorno = await cadastroServico.atualizaCadastro(CadastroAtualizar);      
            if (!CadastroRetorno)
        return response.status(404).json({ "error": "Cadastro não encontado!" });

    return response.status(200).json({ "ok": "Cadastro Atualizado!" });    
                
               
        
        });
        
       
        
        routes.delete('/:cpf', autenticacaoJWT.verificarToken, async (request, response) => {
           
            const { cpf } = request.params;
           console.log(cpf); 
            const CadastroRetorno = await cadastroServico.removeCadastro(cpf);
            if (!CadastroRetorno) 
                return response.status(404).json({ "error": "Cadastro não encontrado!!" });
            
                
                return response.status(200).json({ "Message": `Cadastro ${cpf} removido` });
        });

        module.exports = routes;