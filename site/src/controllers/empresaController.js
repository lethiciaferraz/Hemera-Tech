var empresaModel = require("../models/empresaModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA empresaController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
    empresaModel.listar()
        .then(function(resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function(erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}



function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var ddd = req.body.dddServer;
    var telefone = req.body.telefoneServer;
    var cnpj = req.body.cnpjServer;
    var logradouro = req.body.logradouroServer;
    var cep = req.body.cepServer;
    var complemento = req.body.complementoServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (ddd == undefined) {
        res.status(400).send("Seu ddd está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("Seu telefone está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else if (logradouro == undefined) {
        res.status(400).send("Seu logradouro está undefined!");
    } else if (cep == undefined) {
        res.status(400).send("Seu cep está undefined!");
    } else if (complemento == undefined) {
        res.status(400).send("Seu complemento está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo empresaModel.js
        empresaModel.cadastrar(nome, email, ddd, telefone, cnpj, logradouro, cep, complemento)
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

function listarEmpresa(req, res) {
    var idEmpresa = req.params.idEmpresa;

    empresaModel.listarEmpresa(idEmpresa).then(function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar os funcionarios: ",erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function editarEmpresa(req, res) {
    var novoNome = req.body.nome;
    var novoEmail = req.body.email;
    var novoCnpj = req.body.cnpj;
    var novoTelefone = req.body.telefone;
    var novoCep = req.body.cep;
    var novoLogradouro  = req.body.logradouro;
    var novoComplemento = req.body.complemento;

    var idEmpresa = req.params.idEmpresa;

    empresaModel.editarEmpresa(novoNome, novoEmail, novoCnpj, novoTelefone, novoCep, novoLogradouro, novoComplemento, idEmpresa)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );

}

module.exports = {
    cadastrar,
    listar,
    testar,
    listarEmpresa,
    editarEmpresa,
}