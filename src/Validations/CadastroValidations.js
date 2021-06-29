const { body, validationResult } = require('express-validator')
const { validarCPF } = require('../Validations/CPFValidations');
const cadastroServico = require('../services/cadastroServico');
//funcao aplica validação
const CadastroValidationRules = () => {
    return [
        
        body('Email').isEmail().withMessage("E-mail inválido"),
        
        body('Email').notEmpty().withMessage("E-mail obrigatório!!"),
        
        body('Nome').notEmpty().withMessage("Nome obrigatório!!"),
        
        body('Nome').isLength({ min: 5, max: 100 }).withMessage("Mínimo 5 caracteres e Máximo 100 caracteres"),
        
        body('senha').notEmpty().withMessage("Senha obrigatória!!"),
        
        body('peso').notEmpty().isLength({ min:1, max: Infinity}).withMessage("Inserir o peso!!"),
        
        body('altura').notEmpty().isLength({ min:1, max: Infinity}).withMessage("Inserir a altura!!"),
        
       body('CPF').isLength({ min: 11, max: 11 }).withMessage('Tamanho deve ser de 11 caracteres'),
       
        body('DataNascimento').notEmpty().withMessage("Data de Nascimento é obrigatória!!"),

        body('Email').custom(async (value) => {
            const resultadoCadastro = await cadastroServico.buscaCadastroPorEmail(value);
            console.log(resultadoCadastro);
            if (resultadoCadastro != null) {
                throw new Error('Email já existe, cadastro não permitido!');
            }
            return true;

        }).withMessage('Email já existe , cadastro não permitido'),
        
        body('CPF').notEmpty().withMessage('CPF obrigatório'),
        body('CPF').custom((value) => {
            if (!validarCPF(value))
                throw new Error('CPF é inválido!');
            return true;
        }).withMessage('CPF inválido'),
        body('CPF').custom(async (value) => {
            const resultadoCadastro = await cadastroServico.buscaCadastroPorCPF(value);
            console.log(resultadoCadastro);
            if (resultadoCadastro != null) {
                throw new Error('CPF já existe, cadastro não permitido!');
            }
            return true;
        }),

    ]
}

module.exports = {
    CadastroValidationRules,
}