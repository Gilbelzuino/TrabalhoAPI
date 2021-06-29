//importando pacote express
//importando pacotes
const express = require("express");
const cors = require('cors');

const routes = require('./routes/CadastroRota');
const routes2 = require ('./routes/FilaVacinaRota');
const Authroutes = require("./routes/authRota");
const connectDB = require("./infra/database");

//require('dotenv').config({ path: './src/config/.env' });

connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use('/auth', Authroutes );
app.use('/Cadastro', routes);
app.use('/FilaVacina', routes2);

module.exports = app.listen(process.env.PORT || 3333, () => {
    console.log("Server running");
});