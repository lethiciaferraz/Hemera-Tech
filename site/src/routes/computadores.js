var express = require("express");
var router = express.Router();

var computadorController = require("../controllers/computadorController");

router.get("/listarComputadores/:idEmpresa", function(req, res) {
    computadorController.listarComputadores(req, res);
});

router.get("/relatorioComputadores/:idEmpresa", function(req, res) {
    computadorController.exibirRelatorio(req, res);
});

router.get("/obterDadosComp/:idComputador", function(req, res) {
    computadorController.obterDadosComp(req, res);
});

router.delete("/deletarComputador/:idComputador", function(req, res) {
    computadorController.deletarComputador(req, res);
});

router.put("/editarComputador/:idComputador", function(req, res) {
    computadorController.editarComputador(req, res);
});

router.get("/dadosComputador/:idComputador", function(req, res) {
    computadorController.dadosComputador(req, res);
});

module.exports = router;