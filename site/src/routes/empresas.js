var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

router.get("/", function(req, res) {
    empresaController.testar(req, res);
});

router.get("/listarEmpresa/:idEmpresa", function(req, res) {
    empresaController.listarEmpresa(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de empresaController.js
router.post("/cadastrar", function(req, res) {
    empresaController.cadastrar(req, res);
})


router.put("/editarEmpresa/:idEmpresa", function (req, res) {
    empresaController.editarEmpresa(req, res);
});


module.exports = router;