var express = require("express");
var router = express.Router();

var computadorController = require("../controllers/computadorController");

router.get("/listar/:idEmpresa", function (req, res) {
    computadorController.listar(req, res);
});

module.exports = router;