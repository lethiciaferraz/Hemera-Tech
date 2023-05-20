var express = require("express");
var router = express.Router();

var graficoController = require("../controllers/graficoController");


router.get("/ultimas/:idComputador", function (req, res) {
    graficoController.buscarUltimasMedidasUsoProcessador(req, res);
});

router.get("/tempo-real/:idComputador", function (req, res) {
    graficoController.buscarMedidasEmTempoRealUsoProcessador(req, res);
})


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

router.get("/ultimas/:idComputador", function (req, res) {
    graficoController.buscarUltimasMedidasUsoRede(req, res);
});

router.get("/tempo-real/:idComputador", function (req, res) {
    graficoController.buscarMedidasEmTempoRealUsoRede(req, res);
})


module.exports = router;