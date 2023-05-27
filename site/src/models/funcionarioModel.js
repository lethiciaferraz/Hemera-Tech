var database = require("../database/config")

function entrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    // var instrucao = `
    //     SELECT f.*, fn.idEmpresa FROM funcionario as f join funcao as fn on f.idFuncionario = fn.idFuncionario  WHERE email = '${email}' AND senha = '${senha}' AND flag_administrador = 1;
    // `;
    var instrucao = `select *  from Funcionario where email = '${email}' and senha = '${senha}'`
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, sobrenome, email, cpf, telefone, senha) {
    console.log("ACESSEI O CLIENTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, sobrenome, email, cpf, telefone, senha);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
    EXEC sp_cadastrar_funcionario @nome = '${nome}', @sobrenome = '${sobrenome}', @cpf = '${cpf}', @telefone = '${telefone}', @email = '${email}', @senha = '${senha}';`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function adicionarFuncao(funcao, flagAdm, idEmpresa, idFuncionario) {
    console.log("ACESSEI O CLIENTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", funcao, flagAdm, idEmpresa, idFuncionario);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
    insert into funcao (funcao, flag_administrador, idEmpresa, idFuncionario) values ('${funcao}', ${flagAdm}, ${idEmpresa}, ${idFuncionario} )`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function listarFuncionarios(idEmpresa) {
    console.log("ACESSEI O CLIENTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarFuncionarios():", idEmpresa);
    var instrucao = `select * from funcionario where idEmpresa = ${idEmpresa}`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function editarFuncionario(novoNome, novoSobrenome, novoEmail, novoTelefone, novaFuncao, idFuncionario) {
    console.log("ACESSEI O EDITAR FUNCIONARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", novoNome, novoSobrenome, novoEmail, novoTelefone, novaFuncao, idFuncionario);
    var instrucao = `
    UPDATE funcionario 
    SET nome = '${novoNome}',
        sobrenome = '${novoSobrenome}',
        email = '${novoEmail}',
        telefone = '${novoTelefone}',
        funcao = '${novaFuncao}'
    WHERE idFuncionario = ${idFuncionario};
        `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}

function deletarFuncionario(idFuncionario) {
    console.log("ACESSEI O Funcionario MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idFuncionario);
    var instrucao = `
        DELETE FROM Funcionario WHERE idFuncionario = ${idFuncionario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    entrar,
    cadastrar,
    adicionarFuncao,
    listarFuncionarios,
    editarFuncionario,
    deletarFuncionario
};