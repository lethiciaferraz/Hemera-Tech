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
function MostrarGraficosCPU() {

    let ctx1 = document.getElementById('myChart1');

    new Chart(ctx1, {
        type: 'line',
        data: {
            labels: ['18:00:00', '18:01:00', '18:02:00', '18:03:00', '18:04:00', '18:05:00'],
            datasets: [{
                label: 'Uso em %',
                data: [40, 45, 35, 50, 80, 100],
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
                data: [12, 19, 3, 5, 2, 3],
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

    let targetClock = document.getElementById('myChart3'); // your canvas element


    let valorAtualClock = 1900;
    valorClock.innerHTML = valorAtualClock;

    let optsClock = {
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
        staticZones: [{ strokeStyle: "#F03E3E", min: 0, max: 1500 }, { strokeStyle: "#FFDD00", min: 1000, max: 2000 }, { strokeStyle: "#30B32D", min: 2000, max: 3000 }],
        staticLabels: {
            font: "10px sans-serif",  // Specifies font
            labels: [0, 1000, 2000, 3000],  // Print labels at these values
            // color: "#000000",  // Optional: Label text color
            // fractionDigits: 0  // Optional: Numerical precision. 0=round off.
        }
    };

    let gaugeClock = new Gauge(targetClock).setOptions(optsClock); // create sexy gaugeClock!
    gaugeClock.maxValue = 3000; // set max gaugeClock value
    gaugeClock.setMinValue(0);  // Prefer setter over gaugeClock.minValue = 0
    gaugeClock.animationSpeed = 30; // set animation speed (32 is default value)
    gaugeClock.set(valorAtualClock); // set actual value-

}

// -------------------GRAFICOS DISCO E MEMÓRIA--------------
function MostrarGraficosDiscoEMemoria() {
    let ctx4 = document.getElementById('myChart4');
    new Chart(ctx4, {
        type: 'doughnut',
        data: {
            labels: ['Espaço livre', 'Em uso'],
            datasets: [{
                label: 'Espaço livre',
                data: [15, 85],
                borderWidth: 1
            }]
        },
        options: {
            responsive: false, // desabilita o ajuste automático do tamanho
            width: 15, // define a largura em pixels
            height: 5 // define a altura em pixels
        }
    });


    let ctx5 = document.getElementById('myChart5');

    new Chart(ctx5, {
        type: 'doughnut',
        data: {
            labels: ['Espaço livre', 'Em uso'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19],
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
            labels: ['14:00:00', '14:00:05', '14:00:10', '14:00:15', '14:00:20', '14:00:25'],
            datasets: [{
                label: 'Dowload',
                data: [12, 19, 3, 5, 2, 3],
                borderWidth: 1
            },
            {
                label: 'Upload',
                data: [15, 22, 10, 13, 5, 20],
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

    let valorAtualMS = 2000;
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
        staticZones: [{ strokeStyle: "#F03E3E", min: 0, max: 1500 }, { strokeStyle: "#FFDD00", min: 1000, max: 2000 }, { strokeStyle: "#30B32D", min: 2000, max: 3000 }],
        staticLabels: {
            font: "10px sans-serif",  // Specifies font
            labels: [0, 1000, 2000, 3000],  // Print labels at these values
            // color: "#000000",  // Optional: Label text color
            // fractionDigits: 0  // Optional: Numerical precision. 0=round off.
        }
    };

    let targetMS = document.getElementById('myChart7'); // your canvas element

    let gaugeMS = new Gauge(targetMS).setOptions(optsMS); // create sexy gauge!
    gaugeMS.maxValue = 3000; // set max gauge value
    gaugeMS.setMinValue(0);  // Prefer setter over gauge.minValue = 0
    gaugeMS.animationSpeed = 30; // set animation speed (32 is default value)
    gaugeMS.set(valorAtualMS); // set actual value
}