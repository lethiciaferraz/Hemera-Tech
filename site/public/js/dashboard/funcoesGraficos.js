window.addEventListener('load', () => {
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

// -------------GRÁFICOS CPU--------------------------
// function obterDadosGraficoCPU() {
//     console.log('Obter dados graficos USO Cpu')

//     fetch(`/graficos/ultimosUsoCPU`, { cache: 'no-store' }).then(function (response) {
//       if (response.ok) {

//         response.json().then(function (resposta) {

//           console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
//           resposta.reverse();

//           plotarGraficoUsoCPU(resposta);
//         });
//       } else {
//         console.error('Nenhum dado encontrado ou erro na API');
//       }
//     })
//       .catch(function (error) {
//         console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
//       });
//   }


function MostrarGraficosProcessadorERede() {

    let ctx1 = document.getElementById('myChart1');

    new Chart(ctx1, {
        type: 'line',
        data: {
            labels: ['18:00:00', '18:01:00', '18:02:00', '18:03:00', '18:04:00', '18:05:00'],
            datasets: [{
                label: 'Uso em %',
                data: [40, 45, 35, 50, 65, 70],
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
            labels: ['18:04:40', '18:04:45', '18:04:50', '18:04:55', '18:05:00', '18:05:05'],
            datasets: [{
                label: 'Dowload',
                data: [12, 19, 15, 31, 29, 29],
                borderWidth: 1
            },
            {
                label: 'Upload',
                data: [15, 22, 10, 13, 6, 20],
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

}

// -------------------GRAFICOS DISCO E MEMÓRIA--------------
function MostrarGraficosDiscoEMemoria() {
    let ctx4 = document.getElementById('myChart4');
    new Chart(ctx4, {
        type: 'line',
        data: {
            labels: ['18:04:40', '18:04:45', '18:04:50', '18:04:55', '18:05:00', '18:05:05'],
            datasets: [{
                label: 'Uso em %',
                data: [20, 22, 20, 18, 17, 20],
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
                data: [60, 40],
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
