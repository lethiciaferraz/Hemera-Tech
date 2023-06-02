var express = require("express");
var router = express.Router();

var graficoController = require("../controllers/graficoController");


router.get("/obterDados/:idComputador", function(req, res) {
    graficoController.obterDados(req, res);
});


module.exports = router;