const mongoose = require('mongoose');
const cadastroSchema = new mongoose.Schema({
    name : String,
    cpf  : String,
    altura : Number,
    peso : Number,
    classificacao : String,
    imc : Number,
    DataNascimento : Date,
    Cidade : String,
    UF : String,
    ListaComorbidades : String,
    TeveCovid : Boolean,
    Email : String,
    Senha : String,

});

module.exports = mongoose.model('Cadastro',cadastroSchema );