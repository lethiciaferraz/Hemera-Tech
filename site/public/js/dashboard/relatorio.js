var idEmpresa = Number(sessionStorage.getItem('ID_EMPRESA'));
// var idEmpresa = 1;

function MostrarRelatorioComputadores() {
    fetch(`/computadores/relatorioComputadores/${idEmpresa}`).then(function(resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                // se der bom mas não achar nenhum
            }

            resposta.json().then(function(response) {
                console.log("Dados recebidos: ", JSON.stringify(response));

                for (let i = 0; i < response.length; i++) {
                    var cor = '#D95F58'

                    console.log(i);

                    caixa_lista.innerHTML += `
    <div id = "linha"> 
        <div id = "dado_status">
            <i class = "fa-solid fa-circle"style = "color: ${cor};" ></i>
        </div>

        <div id = "dado_idComputador">
            <p>${response[i].idComputador}</p>
        </div>

        <div id = "dado_macAddress">
            <p>${response[i].MacAddress}</p>
        </div>

        <div id = "dado_nomeFuncionario">
            <p>${response[i].nome+ ' ' + response[i].sobrenome}</p>
        </div>

        <div id = "ver_dashboard">
            <buuton onclick="salvarCumputador(${response[i].idComputador})">ver dashboard</button>
        </div>
    </div >

    <div id = "tracinho"style = "margin-bottom: 20px;"> </div>`;

                }

                // finalizarAguardar();
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function(resposta) {
        console.error(resposta);
        // finalizarAguardar();
    });
}

MostrarRelatorioComputadores();

function salvarCumputador(idComputador) {
    sessionStorage.ID_COMPUTADOR = idComputador
    window.location = "dashboardDetalhes.html#aba1"
}