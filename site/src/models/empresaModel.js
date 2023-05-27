var database = require("../database/config")

function listar() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM usuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, email, ddd, telefone, cnpj, cep, logradouro, complemento) {
    console.log("ACESSEI O EMPRESA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, ddd, telefone, cnpj, logradouro, cep, complemento);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        EXEC sp_cadastrar_empresa
  @email = '${email}',
  @nome = '${nome}',
  @cnpj = '${cnpj}',
  @ddd = '${ddd}',
  @telefone = '${telefone}',
  @cep = '${cep}',
  @logradouro = '${logradouro}',
  @complemento = '${complemento}';
`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarEmpresa(idEmpresa) {
    console.log("ACESSEI O empresa MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarFuncionarios():", idEmpresa);
    var instrucao = `select * from Empresa where idEmpresa = ${idEmpresa}`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function editarEmpresa(novoNome, novoEmail, novoCnpj, novoTelefone, novoCep, novoLogradouro, novoComplemento, idEmpresa) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", novoNome, novoEmail, novoCnpj, novoTelefone, novoCep, novoLogradouro, novoComplemento, idEmpresa);
    var instrucao = `
    UPDATE Empresa SET 
    nome = '${novoNome}',
    email = '${novoEmail}',
    CNPJ = '${novoCnpj}',
    telefone = '${novoTelefone}',
	cep = '${novoCep}',
	logradouro = '${novoLogradouro}',
	complemento = '${novoComplemento}'
WHERE idEmpresa = ${idEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrar,
    listar,
    listarEmpresa,
    editarEmpresa

};