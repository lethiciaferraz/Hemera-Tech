window.addEventListener('load', () => {
    obterDadosGraficos()
    document.querySelectorAll('.abas nav a').forEach((a) => {
        a.addEventListener('click', () => {

            let f = a.parentNode.querySelector('a.selecionado')

            if (f) f.classList.remove('selecionado')
            a.classList.add('selecionado')

            // ADICIONEI ISO 
            // criar variavel para guardar o elemento que foi clicado(o data target varia)
            let div = document.querySelector(`.abas .${a.getAttribute('data-target')}`)

            // pega todas as section dentro da div de classe abas
            document.querySelectorAll('.abas section').forEach((sectionAtual) => {

                // ele checa se é a mesma que foi clicada e some ou dá block nela
                if (sectionAtual == div) {
                    sectionAtual.style.display = 'block'
                } else {
                    sectionAtual.style.display = 'none'
                }
            })

            // AQUI É PRA CHAMAR A FUNÇÃO DO GRÁFICO CORRESONDENTE A ABA
            let selecionado = a.getAttribute('data-target');
            if (selecionado) {
                if (selecionado === 'abaProcessadorERede') {

                    MostrarGraficosProcessadorERede();
                } else if (selecionado === 'abaDiscoEMemoria') {

                    MostrarGraficosDiscoEMemoria();
                }
            }
            //   ---------------------------------------------
        })

        if (location.hash) {
            document.querySelector('a[href="' + location.hash + '"]').click()
        }
    })
})

// -------------GRÁFICOS --------------------------
var listaDeDados

function obterDadosGraficos() {
    console.log('Obter dados graficos')

    fetch(`/graficos/obterDados/${sessionStorage.ID_COMPUTADOR}`, { cache: 'no-store' }).then(function(response) {
            if (response.ok) {

                response.json().then(function(response) {

                    console.log(`Dados recebidos: ${JSON.stringify(response)}`);
                    listaDeDados = response

                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function(error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}



function MostrarGraficosProcessadorERede() {

    let ctx1 = document.getElementById('myChart1');

    new Chart(ctx1, {
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

    new Chart(ctx6, {
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
    let ctx4 = document.getElementById('myChart4');
    new Chart(ctx4, {
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

    new Chart(ctx5, {
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