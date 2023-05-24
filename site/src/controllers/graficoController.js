var graficoModel = require("../models/graficoModel");

function buscarUltimasMedidasUsoProcessador(req, res) {

    const limite_linhas = 7;

    var idComputador = req.params.idComputador;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    graficoModel.buscarUltimasMedidas(idComputador, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarMedidasEmTempoRealUsoProcessador(req, res) {

    var idComputador = req.params.idComputador;

    console.log(`Recuperando medidas em tempo real`);

    graficoModel.buscarMedidasEmTempoReal(idComputador).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarUltimasMedidasUsoProcessador,
    buscarMedidasEmTempoRealUsoProcessador,

    // buscarUltimasMedidasArmazenamentoDisco,
    // buscarMedidasEmTempoRealArmazenamentoDisco,

    // buscarUltimasMedidasArmazenamentoMemoria,
    // buscarMedidasEmTempoRealArmazenamentoMemoria,

    // buscarUltimasMedidasUsoRede,
    // buscarMedidasEmTempoRealUsoRede,

}