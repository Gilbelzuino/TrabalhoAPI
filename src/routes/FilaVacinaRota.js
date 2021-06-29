const { Router, request } = require('express');
const filaVacinaServico = require('../services/filaVacinaServico');
const autenticacaoJWT = require('../services/authService');
const { validate } = require('../validations/validations');
const { FilaVacinaValidationRules } = require('../validations/FilaVacinaValidations');
//preparar parar usar o express;

const routes2 = Router();
//autenticacaoJWT.verificarToken
routes2.get('/', autenticacaoJWT.verificarToken, async (request, response) => {
    const FilaVacinaRetorno = await filaVacinaServico.buscaSolicitacaoVacina();
    return response.json(FilaVacinaRetorno);
});

routes2.get('/:CPF', autenticacaoJWT.verificarToken, async (request, response) => {
    const { CPF } = request.params;
    const FilaVacinaRetorno = await filaVacinaServico.buscaSolicitacaoPorCPF(CPF);
    return response.json(FilaVacinaRetorno);
});


    routes2.post('/', FilaVacinaValidationRules() ,  validate, async (request, response) => {

    
    
        const { DataSolicitacao, Solicitante, nºdaDose, JaTomou, CPF, DataVacinacao } = request.body;
        console.log(request.body);
        
        
        const novaVacinacao = {  DataSolicitacao, Solicitante, nºdaDose, JaTomou, CPF, DataVacinacao};
        const FilaVacinaRetorno = await filaVacinaServico.insereCadastroParaVacina(novaVacinacao);
        if (FilaVacinaRetorno === null){

            response.status(500).json({ "ERROR": "Encontra-se na fila. Cadastro não foi inserido!!" });
        }
        return response.status(201).json({ FilaVacinaRetorno });
    
        });


        routes2.put('FilaVacina/:CPF', async (request, response) => {
            //route params guid
        
            const {CPF} = request.params;
            const { DataSolicitacao, Solicitante, nºdaDose, JaTomou, DataVacinacao} = request.body;
            const vacinacaoAtualizar = {DataSolicitacao, Solicitante, nºdaDose, JaTomou, CPF, DataVacinacao};
            const FilaVacinaRetorno = await filaVacinaServico.atualizaVacinacao(vacinacaoAtualizar);      
            if (!FilaVacinaRetorno)
        return response.status(404).json({ "error": "Cadastro não encontado!" });

    return response.status(200).json({ "ok": "Cadastro Atualizado!" });    
                
               
        
        });
        
       
        
        routes2.delete('/:CPF', autenticacaoJWT.verificarToken, async (request, response) => {
           
            const { CPF } = request.params;
           console.log(CPF); 
            const vacinaRetorno = await vacinaServico.removeVacinacao(CPF);
            if (!vacinaRetorno) 
            return response.status(404).json({ "error": "Paciente não encontrado!!" });
        
                
                return response.status(200).json({ "Message": `Pessoa ${CPF} removida da fila de Vacinação!!!` });
        });

        module.exports = routes2;