module.exports.validarCPF = (CPF) => {
    console.log('CPF:' + CPF);
    if (typeof CPF !== "string") return false
    CPF = CPF.replace(/[\s.-]*/igm, '')
    if (
        !CPF ||
        CPF.length != 11 ||
        CPF == "00000000000" ||
        CPF == "11111111111" ||
        CPF == "22222222222" ||
        CPF == "33333333333" ||
        CPF == "44444444444" ||
        CPF == "55555555555" ||
        CPF == "66666666666" ||
        CPF == "77777777777" ||
        CPF == "88888888888" ||
        CPF == "99999999999"
    ) {
        return false
    }
    var soma = 0
    var resto
    for (var i = 1; i <= 9; i++)
        soma = soma + parseInt(CPF.substring(i - 1, i)) * (11 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11)) resto = 0
    if (resto != parseInt(CPF.substring(9, 10))) return false
    soma = 0
    for (var i = 1; i <= 10; i++)
        soma = soma + parseInt(CPF.substring(i - 1, i)) * (12 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11)) resto = 0
    if (resto != parseInt(CPF.substring(10, 11))) return false
    return true
}