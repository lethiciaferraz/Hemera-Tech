var graficoModel = require("../models/graficoModel");

function obterDados(req, res) {

    const limite_linhas = 6;

    var idComputador = req.params.idComputador;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    graficoModel.obterDados(idComputador, limite_linhas).then(function(resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function(erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

// function obterUltimosDados(req, res) {

//     var idComputador = req.params.idComputador;

//     graficoModel.obterUltimosDados(idComputador).then(function(resultado) {
//         if (resultado.length > 0) {
//             res.status(200).json(resultado);
//         } else {
//             res.status(204).send("Nenhum resultado encontrado!")
//         }
//     }).catch(function(erro) {
//         console.log(erro);
//         console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
//         res.status(500).json(erro.sqlMessage);
//     });
// }

module.exports = {
    obterDados

    // buscarUltimasMedidasUsoProcessador,
    // buscarMedidasEmTempoRealUsoProcessador,

    // buscarUltimasMedidasArmazenamentoDisco,
    // buscarMedidasEmTempoRealArmazenamentoDisco,

    // buscarUltimasMedidasArmazenamentoMemoria,
    // buscarMedidasEmTempoRealArmazenamentoMemoria,

    // buscarUltimasMedidasUsoRede,
    // buscarMedidasEmTempoRealUsoRede,

}