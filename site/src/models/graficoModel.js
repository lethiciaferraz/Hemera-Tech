var database = require("../database/config");

function obterDados(idComputador, limite_linhas) {
    console.log("ACESSEI O Grafico MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterDados():", idComputador, limite_linhas);
    var instrucao = `SELECT top ${limite_linhas} *, FORMAT(momento, 'HH:mm:ss') as horario from Registros where idComputador = ${idComputador} order by momento desc;`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// function obterUltimosDados(idComputador) {
//     console.log("ACESSEI O Grafico MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterDados():", idComputador, limite_linhas);
//     var instrucao = `SELECT top 1 *, FORMAT(momento, 'HH:mm:ss') as horario from Registros where idComputador = ${idComputador} order by momento desc;`;
//     console.log("Executando a instrução SQL: \n" + instrucao);
//     return database.executar(instrucao);
// }


module.exports = {
    obterDados


    // buscarUltimasMedidasUsoProcessador,
    // buscarMedidasEmTempoRealUsoProcessador,

    // buscarUltimasMedidasArmazenamentoDisco,
    // buscarMedidasEmTempoRealArmazenamentoDisco,

    // buscarUltimasMedidasArmazenamentoMemoria,
    // buscarMedidasEmTempoRealArmazenamentoMemoria,

    // buscarUltimasMedidasUsoRede,
    // buscarMedidasEmTempoRealUsoRede,


}