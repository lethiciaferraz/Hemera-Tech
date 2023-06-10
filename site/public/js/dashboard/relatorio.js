var idEmpresa = Number(sessionStorage.getItem('ID_EMPRESA'));
// var idEmpresa = 1;
var qtdEmUso = 0;

function MostrarRelatorioComputadores() {
    fetch(`/computadores/relatorioComputadores/${idEmpresa}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                // se der bom mas não achar nenhum
            }

            resposta.json().then(function (response) {
                console.log("Dados recebidos: ", JSON.stringify(response));

                for (let i = 0; i < response.length; i++) {
                    
                    console.log(i);

                    caixa_lista.innerHTML += `

    <div id = "linha" >

        <div id = "dado_status">
    <i class = "fa-solid fa-circle"style = "color: #77D33E;" ></i> 

        </div>

        <div id = "dado_idComputador">
            <p>${response[i].idComputador}</p>
        </div>

        <div id = "dado_macAddress">
            <p>${response[i].MacAddress}</p>
        </div>

        <div id = "dado_nomeFuncionario">
            <p>${response[i].nome + ' ' + response[i].sobrenome}</p>
        </div>

        <div id = "ver_dashboard">
            <buuton onclick="salvarCumputador(${response[i].idComputador})" style="color: #812FCD; cursor: pointer; ">ver dashboard</button>
        </div>
    </div >

    <div id = "tracinho"style = "margin-bottom: 20px;"> </div>`;

    qtdEmUso++
                }

                document.getElementById("dado_computadores_em_uso").innerText = qtdEmUso + " Em Uso" ;

                // finalizarAguardar();
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
        // finalizarAguardar();
    });
}


      function quantidadeComputadores() {
        console.log(idEmpresa)
        fetch(`/computadores/quantidadeComputadores/${idEmpresa}`).then(function (resposta) {
            if (resposta.ok) {
                if (resposta.status == 204) {
                    console.log('nenhum usuario encontrado')
                }

                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));

                        var qtd = resposta.quantidade;
                        document.getElementById("dado_computadores_cadastrados").innerText = qtd + " Computadores Cadastrados";

                        var porcentagem = qtd/100 * qtdEmUso
                        document.getElementById("dado_porcentagem").innerText = porcentagem.toFixed(2) + "% dos computadores estão sendo monitorados";

                        document.getElementById("dado_sem_incidentes").innerText = qtdEmUso;

                        document.getElementById("dado_inativo").innerText = qtd - qtdEmUso ;

                        
                });
            } else {
                throw ('Houve um erro na API!');
            }
        }).catch(function (resposta) {
            console.error(resposta);
            // finalizarAguardar();
        });
    }


MostrarRelatorioComputadores();
quantidadeComputadores()

function salvarCumputador(idComputador) {
    sessionStorage.ID_COMPUTADOR = idComputador
    // sessionStorage.ID_COMPUTADOR = 29
    window.location = "dashboardDetalhes.html#aba1"
}