const CadastroRepositorio = require('../Data/CadastroRepositorio');
const calculadoraImc = require ('../util/imc');
module.exports.buscaCadastro = async function(){

  return CadastroRepositorio.buscaCadastro();
}

module.exports.buscaCadastroPorCpf = async function(cpf){

  return await CadastroRepositorio.buscaCadastroPorCpf(cpf);
}

module.exports.insereCadastro = async function(novoCadastro){

const CadastroRetorno = CadastroRepositorio.buscaCadastro(novoCadastro.cpf);
  if (CadastroRetorno.length == 0) {
  
    return null;

  }
  
  const {peso,altura} = novoCadastro;
  
  let imc = calculadoraImc.imc(peso,altura);
  let classificacao = calculadoraImc.classificacao(imc);
   
  novoCadastro.imc = imc;
  novoCadastro.classificacao = classificacao; 
  
  return CadastroRepositorio.insereCadastro(novoCadastro);
  
  }

  module.exports.atualizaCadastro = async function(atualizaCadastro){

const CadastroRetorno = await CadastroRepositorio.buscaCadastroPorCpf(atualizaCadastro.cpf);
if (CadastroRetorno.length == 0){

  return false;

}

const resultadoCadastro = await CadastroRepositorio.atualizaCadastro(atualizaCadastro);

      return true;
}
  module.exports.removeCadastro =  async function(cpf){

const CadastroRetorno = await CadastroRepositorio.buscaCadastroPorCpf(cpf);
if (CadastroRetorno.length == 0){

  return false;

}
  
const resultadoCadastro = await CadastroRepositorio.removeCadastro(cpf);

return true;

  }

  module.exports.buscaCadastroPorEmail = async function(Email){

return await CadastroRepositorio.buscaCadastroPorEmail(Email);

  }

  module.exports.verificaEmailSenha= async function(Email , Senha){

    return await CadastroRepositorio.verificaEmailSenha(Email, Senha);
    
      }