// -------------GRÁFICOS --------------------------
var listaDeDados


function obterDadosComputador() {
    fetch(`/computadores/obterDadosComp/${sessionStorage.ID_COMPUTADOR}`, { cache: 'no-store' }).then(function(response) {
            if (response.ok) {

                response.json().then(function(response) {
                    resposta = response[0]

                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    document.getElementById("dado_idcomputador").innerText = resposta.idComputador;
                    document.getElementById("dado_hostName").innerText = resposta.MacAddress;
                    document.getElementById("dado_sistema_operacional").innerText = resposta.sistema_operacional;
                    document.getElementById("dado_processador").innerText = resposta.modelo;

                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function(error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}
obterDadosComputador();

function obterDadosGraficos(tipoGrafico) {
    console.log('Obter dados graficos')

    fetch(`/graficos/obterDados/${sessionStorage.ID_COMPUTADOR}`, { cache: 'no-store' }).then(function(response) {
            if (response.ok) {

                response.json().then(function(response) {

                    console.log(`Dados recebidos: ${JSON.stringify(response)}`);
                    listaDeDados = response;
                    exibirGrafico(tipoGrafico);

                    // setTimeout(function () {
                    //     obterDadosGraficos();
                    // }, 10000);
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function(error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function exibirGrafico(tipoGrafico) {
    if (tipoGrafico === 'cpuERede') {


        MostrarGraficosProcessadorERede();

        setInterval(function() {
            destroyChart(chart1);
            destroyChart(chart6);
            MostrarGraficosProcessadorERede();
            obterDadosGraficos();
        }, 20000); // atualiza a cada 10 segundos
    } else if (tipoGrafico === 'memoriaEDisco') {

        MostrarGraficosDiscoEMemoria();

        setInterval(function() {
            destroyChart(chart4);
            destroyChart(chart5);
            MostrarGraficosDiscoEMemoria();
            obterDadosGraficos();
        }, 20000); // atualiza a cada 10 segundos
    } else {
        console.error('Tipo de gráfico inválido');
    }
}


var chart1, chart6, chart4, chart5;

//FAMOSO PLOTAR
function MostrarGraficosProcessadorERede() {
    console.log('deu bom processador e rede')


    let ctx1 = document.getElementById('myChart1');

    chart1 = new Chart(ctx1, {
        type: 'line',
        data: {
            labels: [listaDeDados[5].horario, listaDeDados[4].horario, listaDeDados[3].horario, listaDeDados[2].horario, listaDeDados[1].horario, listaDeDados[0].horario],
            datasets: [{
                label: 'Uso em %',
                data: [listaDeDados[5].uso_cpu, listaDeDados[4].uso_cpu, listaDeDados[3].uso_cpu, listaDeDados[2].uso_cpu, listaDeDados[1].uso_cpu, listaDeDados[0].uso_cpu],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    let ctx6 = document.getElementById('myChart6');

    chart6 = new Chart(ctx6, {
        type: 'line',
        data: {
            labels: [listaDeDados[5].horario, listaDeDados[4].horario, listaDeDados[3].horario, listaDeDados[2].horario, listaDeDados[1].horario, listaDeDados[0].horario],
            datasets: [{
                    label: 'Dowload',
                    data: [listaDeDados[5].download_rede, listaDeDados[4].download_rede, listaDeDados[3].download_rede, listaDeDados[2].download_rede, listaDeDados[1].download_rede, listaDeDados[0].download_rede],
                    borderWidth: 1
                },
                {
                    label: 'Upload',
                    data: [listaDeDados[5].upload_rede, listaDeDados[4].upload_rede, listaDeDados[3].upload_rede, listaDeDados[2].dupload_rede, listaDeDados[1].upload_rede, listaDeDados[0].upload_rede],
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

}


// -------------------GRAFICOS DISCO E MEMÓRIA--------------
function MostrarGraficosDiscoEMemoria() {
    console.log('deu bom disoc e memoria')

    let ctx4 = document.getElementById('myChart4');
    chart4 = new Chart(ctx4, {
        type: 'line',
        data: {
            labels: [listaDeDados[5].horario, listaDeDados[4].horario, listaDeDados[3].horario, listaDeDados[2].horario, listaDeDados[1].horario, listaDeDados[0].horario],
            datasets: [{
                label: 'Uso em %',
                data: [listaDeDados[5].utilizado_memoria, listaDeDados[4].utilizado_memoria, listaDeDados[3].utilizado_memoria, listaDeDados[2].utilizado_memoria, listaDeDados[1].utilizado_memoria, listaDeDados[0].utilizado_memoria],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });



    let ctx5 = document.getElementById('myChart5');

    chart5 = new Chart(ctx5, {
        type: 'doughnut',
        data: {
            labels: ['Espaço livre', 'Em uso'],
            datasets: [{
                label: 'em %',
                data: [(100 - listaDeDados[0].utilizado_armazenamento), listaDeDados[0].utilizado_armazenamento],
                borderWidth: 1
            }]
        },
        options: {
            responsive: false, // desabilita o ajuste automático do tamanho
            width: 15, // define a largura em pixels
            height: 5 // define a altura em pixels
        }
    });


}

function destroyChart(chart) {

    chart.destroy();

}