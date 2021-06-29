const mongoose = require('mongoose');
const cadastroSchema = new mongoose.Schema({

DataSolicitacao : Date,
Solicitante : String,
nºdaDose : Int16Array,
JaTomou : Boolean,
CPF : String,
DataVacinacao : Date
});

module.exports = mongoose.model('FilaVacina',cadastroSchema );