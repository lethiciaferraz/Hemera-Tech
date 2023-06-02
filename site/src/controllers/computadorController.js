var computadorModel = require("../models/computadorModel");

function exibirRelatorio(req, res) {
    var idEmpresa = req.params.idEmpresa;

    computadorModel.exibirRelatorio(idEmpresa).then(function(resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(
            function(erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar os computadores: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function listarComputadores(req, res) {
    var idEmpresa = req.params.idEmpresa;

    computadorModel.listarComputadores(idEmpresa).then(function (resultado) {
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

function deletarComputador(req, res) {
    var idComputador = req.params.idComputador;

    computadorModel.deletarComputador(idComputador)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar o computaor: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function editarComputador(req, res) {
    let novoSistemaOperacional = req.body.sistemaOperacional;
    let novoModelo = req.body.modelo;
    let novoTotalRam = req.body.totalRam;
    let novoTotalDisco = req.body.totalDisco;
  
    let idComputador = req.params.idComputador;

    computadorModel.editarComputador(novoSistemaOperacional,novoModelo,novoTotalRam, novoTotalDisco, idComputador)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao fazer a edição do computador: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );

}

module.exports = {
    exibirRelatorio,
    listarComputadores,
    deletarComputador,
    editarComputador
}