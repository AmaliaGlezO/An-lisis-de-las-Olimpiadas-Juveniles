fetch('atletas.csv')
  .then(response => response.text())
  .then(data => {
    const rows = data.split('\n');
    const headers = rows[0].split(',');
    const athleteData = rows.slice(1).map(row => {
      const values = row.split(',');
      return headers.reduce((obj, header, i) => {
        obj[header] = values[i];
        return obj;
      }, {});
    });
    
    // Mostrar atletas de cada edición de los Juegos Olímpicos de la Juventud
    const atletas2010 = athleteData.filter(atleta => atleta['Año_JOJ'] === '2010');
    const atletas2014 = athleteData.filter(atleta => atleta['Año_JOJ'] === '2014');
    const atletas2018 = athleteData.filter(atleta => atleta['Año_JOJ'] === '2018');
    
    mostrarAtletas('atletas-2010', atletas2010);
    mostrarAtletas('atletas-2014', atletas2014);
    mostrarAtletas('atletas-2018', atletas2018);
    
    // Agregar funcionalidad a los botones de navegación
    const prevButtons = document.querySelectorAll('.prev-button');
    const nextButtons = document.querySelectorAll('.next-button');
    
    prevButtons.forEach(button => {
      button.addEventListener('click', () => {
        const containerId = button.getAttribute('data-container');
        const container = document.getElementById(containerId);
        const itemWidth = container.querySelector('.athlete-container').offsetWidth;
        const currentScroll = container.scrollLeft;
        const newScroll = currentScroll - itemWidth * 3;
        container.scrollLeft = newScroll >= 0 ? newScroll : 0;
      });
    });
    
    nextButtons.forEach(button => {
      button.addEventListener('click', () => {
        const containerId = button.getAttribute('data-container');
        const container = document.getElementById(containerId);
        const itemWidth = container.querySelector('.athlete-container').offsetWidth;
        const currentScroll = container.scrollLeft;
        const newScroll = currentScroll + itemWidth * 3;
        const maxScroll = container.scrollWidth - container.offsetWidth;
        container.scrollLeft = newScroll <= maxScroll ? newScroll : maxScroll;
      });
    });
  })
  .catch(error => console.error(error));

function mostrarAtletas(contenedor, atletas) {
  const container = document.getElementById(contenedor);
  container.innerHTML = '';
  
  atletas.forEach(atleta => {
    const atletaElement = document.createElement('div');
    atletaElement.classList.add('athlete-container');
    atletaElement.innerHTML = `
      <div class="athlete">
        <div class="medals">
          <div class="medal gold" title="Oros">${atleta['Oro_' + atleta['Año_JOJ']]}</div>
          <div class="medal silver" title="Platas">${atleta['Plata_' + atleta['Año_JOJ']]}</div>
          <div class="medal bronze" title="Bronces">${atleta['Bronce_' + atleta['Año_JOJ']]}</div>
        </div>
        <h3>${atleta['Nombre']}</h3>
        <p>${atleta['Pais']}</p>
        <p>${atleta['Deporte']} - ${atleta['Disciplina']}</p>
        <div class="buttons">
          <button class="trascendencia-button ${atleta['Trascendencia'] === '1' ? 'green' : ''}">Trascendencia</button>
          <button class="resultado-button">Resultado JOJ</button>
        </div>
        <div class="trascendencia-resultados">
          <p>2012: ${atleta['Resultado_2012']}</p>
          <p>2016: ${atleta['Resultado_2016']}</p>
          <p>2020: ${atleta['Resultado_2020']}</p>
        </div>
        <div class="resultado-joj">
          <p>${atleta['Resultado_JOJ']}</p>
        </div>
      </div>
    `;
    container.appendChild(atletaElement);
  });
  
  const trascendenciaButtons = container.querySelectorAll('.trascendencia-button');
  const trascendenciaResultados = container.querySelectorAll('.trascendencia-resultados');
  
  trascendenciaButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      trascendenciaResultados[index].classList.toggle('show');
    });
  });
  
  const resultadoButtons = container.querySelectorAll('.resultado-button');
  const resultadoJOJ = container.querySelectorAll('.resultado-joj');
  
  resultadoButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      resultadoJOJ[index].classList.toggle('show');
    });
  });
}
