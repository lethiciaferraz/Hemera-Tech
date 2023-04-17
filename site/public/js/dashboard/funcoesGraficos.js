
// PARA MUDAR DE ABA
window.addEventListener('load', () => {
    document.querySelectorAll('.abas nav a').forEach((a) => {
        a.addEventListener('click', () => {

            let f = a.parentNode.querySelector('a.focus')


            if (f) f.classList.remove('focus')
            a.classList.add('focus')

        })
        if (location.hash) {
            document.querySelector('a[href="' + location.hash + '"]').classList.add('focus')
        }
    })
})

// -------------GRÁFICOS CPU--------------------------

let ctx1 = document.getElementById('myChart1');

new Chart(ctx1, {
    type: 'line',
    data: {
        labels: ['14:00:00', '14:30:00', '15:00:00', '15:30:00', '16:00:00', '16:30:00'],
        datasets: [{
            label: 'Uso em %',
            data: [50, 19, 3, 5, 2, 100],
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

let ctx4 = document.getElementById('myChart4');

new Chart(ctx4, {
    type: 'line',
    data: {
        labels: ['14:00:00', '14:00:05', '14:00:10', '14:00:15', '14:00:20', '14:00:25'],
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

let targetClock = document.getElementById('foo'); // your canvas element


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


// -------------------GRAFICOS DISCO E MEMÓRIA--------------
let ctx2 = document.getElementById('myChart2');
new Chart(ctx2, {
    type: 'doughnut',
    data: {
        labels: ['Espaço livre', 'Em uso'],
        datasets: [{
            label: 'Espaço livre',
            data: [12, 19],
            borderWidth: 1
        }]
    },
    options: {

    }
});


let ctx3 = document.getElementById('myChart3');

new Chart(ctx3, {
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
    }
});

// -------------GRÁFICOS DE REDE--------------------------
let ctx5 = document.getElementById('myChart5');

new Chart(ctx5, {
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

var optsMS = {
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

var targetMS = document.getElementById('foo1'); // your canvas element

var gaugeMS = new Gauge(targetMS).setOptions(optsMS); // create sexy gauge!
gaugeMS.maxValue = 3000; // set max gauge value
gaugeMS.setMinValue(0);  // Prefer setter over gauge.minValue = 0
gaugeMS.animationSpeed = 30; // set animation speed (32 is default value)
gaugeMS.set(valorAtualMS); // set actual value


