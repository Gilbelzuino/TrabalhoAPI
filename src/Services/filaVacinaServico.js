const filaVacinaRepositorio = require('../Data/filaVacinaRepositorio');

module.exports.buscaSolicitacaoVacina = async function(){

  return filaVacinaRepositorio.buscaSolicitacaoVacina();
}

module.exports.buscaSolicitacaoPorCpf =  function (cpf){

  return filaVacinaRepositorio.buscaSolicitacaoPorCpf(cpf);

}

module.exports.insereCadastroParaVacina = async function (novaVacinacao){

const FilaVacinaRetorno = filaVacinaRepositorio.buscaSolicitacaoPorCpf(novaVacinacao.cpf);
  if (FilaVacinaRetorno.length == 0) {
  
    return null;

  }
  
  return filaVacinaRepositorio.insereCadastroParaVacina(novaVacinacao);
  
  }

  module.exports.atualizaVacinacao = async function (atualizaVacinacao){

const FilaVacinaRetorno = await filaVacinaRepositorio.buscaSolicitacaoPorCpf(atualizaVacinacao.cpf);
if (FilaVacinaRetorno.length == 0){

  return false;

}

const resultadoFilaVacina = await filaVacinaRepositorio.atualizaVacinacao(atualizaVacinacao);

      return true;
}
  module.exports.removeVacinacao =  async function (cpf){

const FilaVacinaRetorno = await filaVacinaRepositorio.buscaSolicitacaoPorCpf(cpf);
if (FilaVacinaRetorno.length == 0){

  return false;
}
  
const resultadoFilaVacina = await filaVacinaRepositorio.removeVacinacao(cpf);

return true;

  }
  
  module.exports.verificaEmailSenha = function (Email, Senha) {
    return filaVacinaRepositorio.verificaEmailSenha(Email, Senha);
}

module.exports.buscaAlunoPorEmail = function (Email) {
    return filaVacinaRepositorio.buscaAlunoPorEmail(Email);
}