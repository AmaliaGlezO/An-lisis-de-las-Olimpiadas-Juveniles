fetch('datos/paises.csv')
  .then(response => response.text())
  .then(data => {
    const countries = [];
    const golds = [];
    const silvers = [];
    const bronzes = [];
    const totals = [];

    const lines = data.split('\n');
    lines.forEach((line, index) => {
      if (index > 0 && line.trim() !== '') {
        const [country, gold, silver, bronze, total] = line.split(',');
        countries.push(country);
        golds.push(parseInt(gold));
        silvers.push(parseInt(silver));
        bronzes.push(parseInt(bronze));
        totals.push(parseInt(total));
      }
    });

    // Ordenar los países de mayor a menor según el total de medallas
    const sortedData = countries.map((_, index) => ({
      country: countries[index],
      gold: golds[index],
      silver: silvers[index],
      bronze: bronzes[index],
      total: totals[index]
    })).sort((a, b) => b.total - a.total);

    const sortedCountries = sortedData.map(item => item.country);
    const sortedGolds = sortedData.map(item => item.gold);
    const sortedSilvers = sortedData.map(item => item.silver);
    const sortedBronzes = sortedData.map(item => item.bronze);
    const sortedTotals = sortedData.map(item => item.total);

    const maxTotal = Math.max(...sortedTotals);
    const minTotal = Math.min(...sortedTotals);

    const ctx = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: sortedCountries.reverse(), // Invertir el orden de los países
        datasets: [
          {
            label: 'Oros',
            data: sortedGolds.reverse(), // Invertir el orden de los datos
            backgroundColor: (context) => {
              const index = context.dataIndex;
              const hue = (sortedTotals[index] - minTotal) / (maxTotal - minTotal) * 180; // Rango de 180 a 360 (azul)
              return `hsl(${hue}, 100%, 50%)`;
            },
            barPercentage: 0.8, // Aumentar el espacio entre barras
            categoryPercentage: 0.8 // Aumentar el espacio entre categorías
          },
          {
            label: 'Platas',
            data: sortedSilvers.reverse(), // Invertir el orden de los datos
            backgroundColor: (context) => {
              const index = context.dataIndex;
              const hue = (sortedTotals[index] - minTotal) / (maxTotal - minTotal) * 180; // Rango de 180 a 360 (azul)
              return `hsl(${hue}, 100%, 50%)`;
            },
            barPercentage: 0.8, // Aumentar el espacio entre barras
            categoryPercentage: 0.8 // Aumentar el espacio entre categorías
          },
          {
            label: 'Bronces',
            data: sortedBronzes.reverse(), // Invertir el orden de los datos
            backgroundColor: (context) => {
              const index = context.dataIndex;
              const hue = (sortedTotals[index] - minTotal) / (maxTotal - minTotal) * 180; // Rango de 180 a 360 (azul)
              return `hsl(${hue}, 100%, 50%)`;
            },
            barPercentage: 0.8, // Aumentar el espacio entre barras
            categoryPercentage: 0.8 // Aumentar el espacio entre categorías
          },
          {
            label: 'Total',
            data: sortedTotals.reverse(), // Invertir el orden de los datos
            backgroundColor: (context) => {
              const index = context.dataIndex;
              const hue = (sortedTotals[index] - minTotal) / (maxTotal - minTotal) * 180; // Rango de 180 a 360 (azul)
              return `hsl(${hue}, 100%, 50%)`;
            },
            barPercentage: 0.8, // Aumentar el espacio entre barras
            categoryPercentage: 0.8 // Aumentar el espacio entre categorías
          }
        ]
      },
      options: {
        indexAxis: 'y', // Cambiar a eje Y
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                const index = context.dataIndex;
                return `${sortedCountries[index]}: ${sortedTotals[index]} Medallas\n${sortedGolds[index]} Oros, ${sortedSilvers[index]} Platas, ${sortedBronzes[index]} Bronces`;
              }
            }
          }
        },
        scales: {
          x: {
            stacked: true,
            reverse: true // Ordenar de mayor a menor
          },
          y: {
            stacked: true
          }
        }
      }
    });
  })
  .catch(error => {
    console.error('Error al cargar el archivo CSV:', error);
  });
