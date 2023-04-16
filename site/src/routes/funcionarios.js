var express = require("express");
var router = express.Router();

var funcionarioController = require("../controllers/funcionarioController");

router.post("/cadastrar", function(req, res) {
    funcionarioController.cadastrar(req, res);
})

router.post("/adicionarFuncao", function(req, res) {
    funcionarioController.adicionarFuncao(req, res);
})

router.post("/autenticar", function(req, res) {
    funcionarioController.entrar(req, res);
});

module.exports = router;