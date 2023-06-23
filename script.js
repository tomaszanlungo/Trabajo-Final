window.addEventListener('scroll', function () {

  var header = document.querySelector('header')

  header.classList.toggle('abajo', window.scrollY > 0)

})


// Archivo: script.js

document.addEventListener('DOMContentLoaded', () => {

  function processData(data) {

    // Crea un objeto para almacenar los datos por hora

    const dataByHour = []


    // Recorre los datos y agrupa las horas y la cantidad de horas escuchadas

    data.forEach(entry => {

      const endTime = new Date(entry.endTime)

      const hour = endTime.getHours()

      const msPlayed = entry.msPlayed

      const hoursPlayed = msPlayed / (1000 * 60 * 60) // Convierte milisegundos a horas


      dataByHour.push({ hour, hoursPlayed })

    })


    return dataByHour

  }


  // Obtén los datos del archivo JSON

  fetch('datos/StreamingHistory0.json')

    .then(response => response.json())

    .then(data => {

      // Procesa los datos y crea los grupos por hora

      const dataByHour = processData(data)


      // Crea el gráfico de barras

      const plot = Plot.plot({

        marks: [

          Plot.barY(dataByHour, 

            /* Carlos: Faltaba sumar las horas */

            Plot.groupX({y: "sum"}, {x: "hour", y: "hoursPlayed", fill: "lightpink"})

            )

          ],

        height: 400,

        x: {

          label: 'Hora del día',

          ticks: 24,

        },

        y: {

          label: 'Horas escuchadas',

        },

      })

      

      /* 

      Carlos: El append del plot debe estar dentro del then(),

      cuando sabemos que los datos está resuelto 

      */

      const chartContainer = document.getElementById("chart");

      chartContainer.appendChild(plot);

    })

})

/* https://github.com/russellsamora/scrollama */
// Creamos variables globales
// Usamos d3 para seleccionar elementos del DOM
let main = d3.select("main");
let scrolly = main.select("#scrolly_fotos");
let $figure = scrolly.select("#fixed_container");

// Creamos una instancia de scrollama
let scroller = scrollama();

// Inicializamos el proceso de scrollama
init();

function init() {
  // 1. Configuramos las opciones de scrollama
  // 2. Vinculamos las funciones de scrollama con los eventos cuando entra y/o sale un step
  scroller
    .setup({
      step: "#scrolly_fotos #steps_container .step",
      offset: 0.9, // 0 a 1 para el porcentaje de la pantalla
      debug: false,
      progress: false,
    })
    .onStepEnter(handleFotos)
}

// scrollama event handlers
function handleFotos(response) {
  // response retorna el elemento (step), la dirección (up o down) y el índice del step
  // response = { element, direction, index }
  console.log(response)

  /* Ocultamos todas las fotos del scrolly */
  d3.selectAll(".foto").classed("is_visible", false)

  /* Mostramos la foto correspondiente al step */
  d3.select(`#foto_${response.index}`).classed("is_visible", true)
}

