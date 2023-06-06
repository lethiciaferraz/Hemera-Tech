var express = require("express");
var router = express.Router();

var graficoController = require("../controllers/graficoController");


router.get("/obterDados/:idComputador", function(req, res) {
    graficoController.obterDados(req, res);
});

// router.get("/obterUltimosDados/:idComputador", function(req, res) {
//     graficoController.obterUltimosDados(req, res);
// });


module.exports = router;