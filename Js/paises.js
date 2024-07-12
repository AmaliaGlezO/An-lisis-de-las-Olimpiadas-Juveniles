
fetch('paises.csv')
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

    const maxTotal = Math.max(...totals);
    const minTotal = Math.min(...totals);

    const ctx = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'bubble',
      data: {
        datasets: [{
          label: 'Medallas por País',
          data: countries.map((_, index) => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            r: (totals[index] - minTotal) / (maxTotal - minTotal) * 50 + 10,
            color: `hsl(${(totals[index] - minTotal) / (maxTotal - minTotal) * 360}, 100%, 50%)`,
            total: totals[index],
            country: countries[index]
          })),
          backgroundColor: (context) => context.dataset.data[context.dataIndex].color
        }]
      },
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                const index = context.dataIndex;
                return `${context.dataset.data[index].country}: ${context.dataset.data[index].total} Medallas\n${golds[index]} Oros, ${silvers[index]} Platas, ${bronzes[index]} Bronces`;
              }
            }
          }
        },
        elements: {
          point: {
            radius: 0,
            hitRadius: 10
          }
        },
        scales: {
          x: {
            display: false
          },
          y: {
            display: false
          }
        }
      }
    });
  })
  .catch(error => {
    console.error('Error al cargar el archivo CSV:', error);
  });
