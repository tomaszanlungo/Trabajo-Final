window.addEventListener("scroll", function(){
    var header = document.querySelector("header");
    header.classList.toggle("abajo",window.scrollY>0)
})

// Archivo: script.js
document.addEventListener("DOMContentLoaded", () => {
    // Obtén los datos del archivo JSON
    fetch("datos/StreamingHistory0.json")
      .then(response => response.json())
      .then(data => {
        // Procesa los datos y crea los grupos por hora
        const dataByHour = processData(data);
  
        // Crea el gráfico de barras
        const plot = Plot.plot({
          marks: [Plot.barY(dataByHour, { x: "hour", y: "hoursPlayed" })],
          height: 400,
          x: {
            label: "Hora del día",
            type: "ordinal",
            ticks: 24,
          },
          y: {
            label: "Horas escuchadas",
          },
        });
  
        // Renderiza el gráfico en el elemento con ID "chart"
        const chartContainer = document.getElementById("chart");
        chartContainer.appendChild(plot);
      });
  
    function processData(data) {
      // Crea un objeto para almacenar los datos por hora
      const dataByHour = [];
  
      // Recorre los datos y agrupa las horas y la cantidad de horas escuchadas
      data.forEach(entry => {
        const endTime = new Date(entry.endTime);
        const hour = endTime.getHours();
        const msPlayed = entry.msPlayed;
        const hoursPlayed = msPlayed / (1000 * 60 * 60); // Convierte milisegundos a horas
  
        dataByHour.push({ hour, hoursPlayed });
      });
  
      return dataByHour;
    }

    document.select("#chart").append(() => plot);

  });
  