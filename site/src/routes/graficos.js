var express = require("express");
var router = express.Router();

var graficoController = require("../controllers/graficoController");

// CPU
router.get("/ultimas/:idComputador", function (req, res) {
    graficoController.buscarUltimasMedidasUsoCPU(req, res);
});

router.get("/tempo-real/:idComputador", function (req, res) {
    graficoController.buscarMedidasEmTempoRealUsoCPU(req, res);
})

router.get("/ultimas/:idComputador", function (req, res) {
    graficoController.buscarUltimasMedidasTemperaturaCPU(req, res);
});

router.get("/tempo-real/:idComputador", function (req, res) {
    graficoController.buscarMedidasEmTempoRealTemperaturaCPU(req, res);
})

// DISCO E MEMORIA
router.get("/ultimas/:idComputador", function (req, res) {
    graficoController.buscarUltimasMedidasArmazenamentoDisco(req, res);
});
router.get("/tempo-real/:idComputador", function (req, res) {
    graficoController.buscarMedidasEmTempoRealArmazenamentoDisco(req, res);
})

router.get("/ultimas/:idComputador", function (req, res) {
    graficoController.buscarUltimasMedidasArmazenamentoMemoria(req, res);
});

router.get("/tempo-real/:idComputador", function (req, res) {
    graficoController.buscarMedidasEmTempoRealArmazenamentoMemoria(req, res);
})

// REDE
router.get("/ultimas/:idComputador", function (req, res) {
    graficoController.buscarUltimasMedidasUsoRede(req, res);
});

router.get("/tempo-real/:idComputador", function (req, res) {
    graficoController.buscarMedidasEmTempoRealUsoRede(req, res);
})


module.exports = router;