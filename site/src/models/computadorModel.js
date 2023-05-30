var database = require("../database/config");

function listarComputadores(idEmpresa) {
    console.log("ACESSEI O COMENTARIO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarComputador()", idEmpresa);
    var instrucao = `
    select*from Computador where idEmpresa = ${idEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function exibirRelatorio(idEmpresa) {
    console.log("ACESSEI O Computador MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirRelatorio():", idEmpresa);
    var instrucao = `SELECT f.nome, f. sobrenome, c.idComputador, c.MacAddress from Computador as c
join logAcesso as l on l.idComputador = c.idComputador 
join Funcionario as f on f.idFuncionario = l.idFuncionario
where c.idEmpresa = ${idEmpresa} and (l.horario_final 	is null or (l.horario_final is null and (horario_inicio is null)));`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function editarComputador(novoSistemaOperacional,novoModelo,novoTotalRam, novoTotalDisco, idComputador) {
    console.log("ACESSEI O EDITAR Computador MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editarComputador(): ", novoSistemaOperacional,novoModelo, novoTotalRam, novoTotalDisco, idComputador);
    var instrucao = `
    UPDATE Computador 
    SET sistema_operacional = '${novoSistemaOperacional}',
    modelo = '${novoModelo}',
    total_memoria = ${novoTotalRam},
    total_armazenamento = ${novoTotalDisco}
    WHERE idComputador = ${idComputador};
        `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}

function deletarComputador(idComputador) {
    console.log("ACESSEI O Computador MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idComputador);
    var instrucao = `
        DELETE FROM Computador WHERE idComputador = ${idComputador};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listarComputadores,
    exibirRelatorio,
    deletarComputador,
    editarComputador
}