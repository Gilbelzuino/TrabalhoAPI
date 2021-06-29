const CadastroRepositorio = require('../models/Cadastro');
module.exports.buscaCadastro = async function () {


    return  CadastroRepositorio.find();
    
    }
    
    module.exports.buscaCadastroPorCpf = async function (cpf){
    
    return await CadastroRepositorio.findOne({ cpf });
    
    }
    
    module.exports.insereCadastro = async function (novoCadastro){
    const {nome, cpf, altura, peso, imc , classificacao , DataNascimento, Cidade, UF, ListaComorbidades, TeveCovid, Email, Senha} = novoCadastro;
    
    const retornoCadastro = await CadastroRepositorio.create({
        nome, cpf, altura, peso, imc , classificacao , DataNascimento, Cidade, UF, ListaComorbidades, TeveCovid, Email, Senha

    });
    
    return retornoCadastro;
    
    }
    
    
    
    module.exports.atualizaCadastro = async function (atualizaCadastro){
    
    
        const {nome, cpf, altura, peso, imc , classificacao , DataNascimento, Cidade, UF, ListaComorbidades, TeveCovid, Email, Senha} = atualizaCadastro;
        
        const CadastroAtualizado = await CadastroRepositorio.updateOne(
            
            {nome, cpf, altura, peso, imc , classificacao , DataNascimento, Cidade, UF, ListaComorbidades, TeveCovid, Email, Senha}, //filtro
            {// campos que vamos atualizar
                $set:
                {
                     nome
                }
            }
            
            );
    
                return CadastroAtualizado;
    
    }
    
    module.exports.removeCadastro = async function (cpf) {
    
    
        return CadastroRepositorio.deleteOne ({ cpf });
    }
    
    module.exports.verificaEmailSenha = async function (Email, Senha){
    
    return CadastroRepositorio.findOne({Email, Senha});
    
    }
    
    module.exports.buscaCadastroPorEmail = async function (Email){
    
        return CadastroRepositorio.findOne({ Email });
        
        }