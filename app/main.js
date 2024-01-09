window.onload = () => {

let startIndex = 0;
const articlesPerPage = 32;

function generateArticles(data, start, end) {
  const articlesContainer = document.getElementById('articles-container');

  for (let i = start; i < end; i++) {
    if (i >= data.articulos.length) {
      document.getElementById('ver-mas-button').style.display = 'none';
      break;
    }

    const articulo = data.articulos[i];
    const articleDiv = document.createElement('div');
    articleDiv.classList.add('article');

    if (articulo.imagenes && articulo.imagenes.length > 0) {
      const imageUrls = articulo.imagenes.split(',').map(url => url.trim());
      if (imageUrls.length > 0 && imageUrls[0] !== "") {
        const img = document.createElement('img');
        img.src = imageUrls[0]; // Mostrar la primera imagen
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

function loadMoreArticles(data) {
  const endIndex = startIndex + articlesPerPage;
  generateArticles(data, startIndex, endIndex);
  startIndex = endIndex;
}

  fetch("assets/data/data.json")
    .then(response => response.json())
    .then(data => {
      loadMoreArticles(data);

      const verMasButton = document.getElementById('ver-mas-button');
      verMasButton.addEventListener('click', () => {
        loadMoreArticles(data);
      });
    })
    .catch(error => console.error('Error al cargar los datos:', error));
}
