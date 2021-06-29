const { body, validationResult } = require('express-validator')
const { validarCPF } = require('../validations/CPFValidations');
const filaVacinaServico = require('../Services/filaVacinaServico');

const FilaVacinaValidationRules = () => {
    return [
            
        body('CPF').isLength({ min: 11, max: 11 }).withMessage("Tamanho deve ser de 11 caracteres"),
        
        body('CPF').notEmpty().withMessage("CPF obrigatório!!"),
        
        body('Nome').notEmpty().withMessage("Nome obrigatório!!"),
        
        body('Nome').isLength({ min: 5, max: 100 }).withMessage("Mínimo 5 caracteres e Máximo 100 caracteres"),
        
        body('JaTomou').notEmpty().withMessage("Obrigatório inserir se tomou ou não a vacina!!"),
       
        body('CPF').notEmpty().withMessage('CPF obrigatório'),
        body('CPF').custom((value) => {
            if (!validarCPF(value))
                throw new Error('CPF é inválido!');
            return true;
        }).withMessage('CPF inválido'),
        body('CPF').custom(async (value) => {
            const resultadoFilaVacina = await filaVacinaServico.buscaSolicitacaoPorCPF(value);
            console.log(resultadoFilaVacina);
            if (resultadoFilaVacina != null) {
                throw new Error('CPF já existe, cadastro não permitido!');
            }
            return true;
        }),
    ]
}

module.exports = {
    FilaVacinaValidationRules,
}