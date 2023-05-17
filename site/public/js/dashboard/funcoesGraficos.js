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
                if (selecionado === 'abaCPU') {
                    MostrarGraficosCPU();
                } else if (selecionado === 'abaDiscoEMemoria') {
                    MostrarGraficosDiscoEMemoria();
                } else if (selecionado === 'abaRede') {
                    MostrarGraficosRede();
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

//   function obterDadosGraficoTemperaturaCPU() {
//     console.log('Obter dados graficos TEMPERATURA Cpu')

//     fetch(`/graficos/ultimosTemperaturaCPU`, { cache: 'no-store' }).then(function (response) {
//       if (response.ok) {

//         response.json().then(function (resposta) {

//           console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
//           resposta.reverse();

//           plotarGraficoTemperaturaCPU(resposta);
//         });
//       } else {
//         console.error('Nenhum dado encontrado ou erro na API');
//       }
//     })
//       .catch(function (error) {
//         console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
//       });
//   }

function MostrarGraficosCPU() {

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

    let ctx2 = document.getElementById('myChart2');

    new Chart(ctx2, {
        type: 'line',
        data: {
            labels: ['18:04:40', '18:04:45', '18:04:50', '18:04:55', '18:05:00', '18:05:05'],
            datasets: [{
                label: 'Temperatura em Cº',
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

// -------------GRÁFICOS DE REDE--------------------------
function MostrarGraficosRede() {
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

    let valorAtualMS = 40;
    valorMS.innerHTML = valorAtualMS;

    let optsMS = {
        angle: 0, // The span of the gauge arc
        lineWidth: 0.4, // The line thickness
        radiusScale: 0.90, // Relative radius
        pointer: {
            length: 0.53, // // Relative to gauge radius
            strokeWidth: 0.042, // The thickness
            color: 'black' // Fill color

        },
        limitMax: false,     // If false, max value increases automatically if value > maxValue
        limitMin: false,     // If true, the min value of the gauge will be fixed
        colorStart: '#6FADCF',   // Colors
        colorStop: '#8FC0DA',    // just experiment with them
        strokeColor: '#E0E0E0',  // to see which ones work best for you
        generateGradient: true,
        highDpiSupport: true,     // High resolution support
        staticZones: [{ strokeStyle: "#30B32D", min: 0, max: 50 }, { strokeStyle: "#FFDD00", min: 50, max: 100 }, { strokeStyle: "#F03E3E", min: 100, max: 200 }],
        staticLabels: {
            font: "14px sans-serif",  // Specifies font
            labels: [0, 50, 100, 200],  // Print labels at these values
            // color: "#000000",  // Optional: Label text color
            // fractionDigits: 0  // Optional: Numerical precision. 0=round off.
        },
        renderTicks: {
            divisions: 4,
            divWidth: 0.4,
            divLength: 0.91,
            divColor: '#000000',
            subDivisions: 3,
            subLength: 0.8,
            subWidth: 1.0,
            subColor: '#000000'
          }
    };

    let targetMS = document.getElementById('myChart7'); // your canvas element

    let gaugeMS = new Gauge(targetMS).setOptions(optsMS); // create sexy gauge!
    gaugeMS.maxValue = 200; // set max gauge value
    gaugeMS.setMinValue(0);  // Prefer setter over gauge.minValue = 0
    gaugeMS.animationSpeed = 30; // set animation speed (32 is default value)
    gaugeMS.set(valorAtualMS); // set actual value
}