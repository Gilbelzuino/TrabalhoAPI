const filaVacinaRepositorio = require('../models/FilaVacina');


module.exports.buscaSolicitacaoVacina = async function () {


return await filaVacinaRepositorio.find();

}

module.exports.buscaCadastroPorCpf = async function (cpf){

return await filaVacinaRepositorio.find({ cpf });

}

module.exports.buscaSolicitacaoPorCpf = async function (cpf){

    return await filaVacinaRepositorio.findOne({ cpf });
    
    }

module.exports.insereCadastroParaVacina = async function (novaVacinacao){
const {DataSolicitacao, Solicitante, nºdaDose, JaTomou, CPF, DataVacinacao} = novaVacinacao;

const retornoFilaVacina = await filaVacinaRepositorio.create({
    DataSolicitacao, Solicitante, nºdaDose, JaTomou, CPF, DataVacinacao
});

return retornoFilaVacina;

}



module.exports.atualizaVacinacao = async function (atualizaVacinacao){


    const {DataSolicitacao, Solicitante, nºdaDose, JaTomou, CPF, DataVacinacao} = atualizaVacinacao;
    
    const vacinaAtualizada = await filaVacinaRepositorio.updateOne(
        
        { cpf }, //filtro
        {// campos que vamos atualizar
            $set:
            {
                 nome
            }
        }
        
        );

            return vacinaAtualizada;

}

module.exports.removeVacinacao = async function (cpf) {


    return filaVacinaRepositorio.deleteOne({ cpf });


}

module.exports.verificaEmailSenha = async function (Email, Senha) {
    return await filaVacinaRepositorio.findOne({ Email, Senha });
}