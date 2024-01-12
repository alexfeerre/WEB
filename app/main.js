window.onload = () => {
  let startIndex = 0;
  const articlesPerPage = 32;
  let totalFilteredArticles = 0;
  let accumulatedArticles = [];

  function generateArticles(data, start, end, searchValue) {
    const articlesContainer = document.getElementById('articles-container');

    if (startIndex === 0) {
      articlesContainer.innerHTML = '';
      accumulatedArticles = [];
    }

    totalFilteredArticles = 0;

    for (let i = 0; i < data.articulos.length; i++) {
      const articulo = data.articulos[i];
      const palabrasClave = articulo.palabras_clave.split(',').map(keyword => keyword.trim().toLowerCase());
      const shouldShow = palabrasClave.some(keyword => keyword.includes(searchValue.toLowerCase()));

      if (shouldShow) {
        totalFilteredArticles++;

        if (startIndex === 0 && accumulatedArticles.length < end) {
          accumulatedArticles.push(articulo);
        }

        if (totalFilteredArticles > start && totalFilteredArticles <= end) {
          const articleDiv = document.createElement('div');
          articleDiv.classList.add('article');

          if (articulo.imagenes && articulo.imagenes.length > 0) {
            const imageUrls = articulo.imagenes.split(',').map(url => url.trim());
            if (imageUrls.length > 0 && imageUrls[0] !== "") {
              const img = document.createElement('img');
              img.src = imageUrls[0];
              img.classList.add('article-image');
              articleDiv.appendChild(img);
            }
          }

          if (articulo.titulo && articulo.titulo.trim() !== "") {
            const title = document.createElement('h2');
            title.textContent = articulo.titulo;
            articleDiv.appendChild(title);
          }

          if (articulo.subtitulo && articulo.subtitulo.trim() !== "") {
            const subtitle = document.createElement('p');
            subtitle.textContent = articulo.subtitulo;
            articleDiv.appendChild(subtitle);
          }

          articleDiv.addEventListener('click', () => {
            window.location.href = `article.html?id=${articulo.Id}`;
          });

          articlesContainer.appendChild(articleDiv);
        }
      }
    }

    if (totalFilteredArticles <= end) {
      document.getElementById('ver-mas-button').style.display = 'none';
    } else {
      document.getElementById('ver-mas-button').style.display = 'flex';
    }
  }

  function loadMoreArticles(data, searchValue) {
    const endIndex = startIndex + articlesPerPage;
    generateArticles(data, startIndex, endIndex, searchValue);
  }

  fetch("assets/data/data.json")
    .then(response => response.json())
    .then(data => {
      const searchBar = document.getElementById('search-bar');

      function handleSearch() {
        const searchValue = searchBar.value.toLowerCase();
        startIndex = 0;
        loadMoreArticles(data, searchValue);
      }

      searchBar.addEventListener('input', handleSearch);

      searchBar.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
          handleSearch();
        }
      });

      const verMasButton = document.getElementById('ver-mas-button');
      verMasButton.addEventListener('click', () => {
        const searchValue = searchBar.value.toLowerCase();
        startIndex += articlesPerPage;
        loadMoreArticles(data, searchValue);
      });

      loadMoreArticles(data, ''); // Cargar artículos por defecto al iniciar
    })
    .catch(error => console.error('Error al cargar los datos:', error));

  // ENVIAR CORREO
const emailInput = document.getElementById('emailInput');
const enviarCorreoBtn = document.getElementById('enviarCorreoBtn');
let mensajeMostrado = false;

function enviarCorreo() {
  const mensaje = document.getElementById('mensaje');
  const correo = emailInput.value.trim().toLowerCase();
  const dominiosPermitidos = ['@esdmadrid.es', '@educamadrid.org', '@hotmail.com', '@gmail.com'];

  let valido = dominiosPermitidos.some(dominio => correo.endsWith(dominio));

  if (valido) {
    mensaje.textContent = `Correo enviado a ${correo}.`;
    mensaje.style.color = 'white';
    emailInput.value = ''; 
  } else {
    mensaje.textContent = 'Por favor, ingresa una dirección de correo válida.';
    mensaje.style.color = 'white';
  }

  mensaje.style.opacity = '1';

  setTimeout(() => {
    mensaje.style.opacity = '0';
    mensaje.style.transition = 'opacity 1s ease-in-out';
  }, 5000);
}

enviarCorreoBtn.addEventListener('click', enviarCorreo);

// Manejar la tecla "Enter" para enviar el correo
emailInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    enviarCorreo();
  }
});

}