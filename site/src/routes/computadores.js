var express = require("express");
var router = express.Router();

var computadorController = require("../controllers/computadorController");

router.get("/listarComputadores/:idEmpresa", function(req, res) {
    computadorController.listarComputadores(req, res);
});

router.get("/relatorioComputadores/:idEmpresa", function(req, res) {
    computadorController.exibirRelatorio(req, res);
});

module.exports = router;