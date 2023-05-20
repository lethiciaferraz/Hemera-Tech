var funcionarioModel = require("../models/funcionarioModel");


function testar(req, res) {
    console.log("ENTRAMOS NA usuarioController");
    res.json("ESTAMOS FUNCIONANDO!");
}


function entrar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        funcionarioModel.entrar(email, senha)
            .then(
                function(resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um registro com o mesmo login e senha!");
                    }
                }
            ).catch(
                function(erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var sobrenome = req.body.sobrenomeServer
    var email = req.body.emailServer;
    var cpf = req.body.cpfServer
    var telefone = req.body.telefoneServer
    var senha = req.body.senhaServer

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (sobrenome == undefined) {
        res.status(400).send("Seu sobrenome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (cpf == undefined) {
        res.status(400).send("Seu cpf está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("Seu telefone está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        funcionarioModel.cadastrar(nome, sobrenome, email, cpf, telefone, senha)
            .then(
                function(resultado) {
                    res.json(resultado);
                }
            ).catch(
                function(erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function adicionarFuncao(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var funcao = req.body.funcaoServer;
    var flagAdm = req.body.flagAdmServer;
    var idEmpresa = req.body.idEmpresaServer
    var idFuncionario = req.body.idFuncionarioServer

    // Faça as validações dos valores
    if (funcao == undefined) {
        res.status(400).send("Sua função está undefined!");
    } else if (flagAdm == undefined) {
        res.status(400).send("Sua flag adm está undefined!");
    } else if (idEmpresa == undefined) {
        res.status(400).send("Seu idEmpresa está undefined!");
    } else if (idFuncionario == undefined) {
        res.status(400).send("Seu idFuncionario está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        funcionarioModel.adicionarFuncao(funcao, flagAdm, idEmpresa, idFuncionario)
            .then(
                function(resultado) {
                    res.json(resultado);
                }
            ).catch(
                function(erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    entrar,
    cadastrar,
    adicionarFuncao,
    testar,
    listar,
    editar
}