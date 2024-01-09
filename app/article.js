window.onload = () => {
  const params = new URLSearchParams(window.location.search);
  const articleId = params.get('id');

  fetch("assets/data/data.json")
    .then(response => response.json())
    .then(data => {
      const articleDetails = document.getElementById('article-details');

      const article = data.articulos.find(item => item.Id === parseInt(articleId));

      if (article) {
        // Función para generar HTML de las imágenes con sus descripciones
        const renderImages = () => {
          let imagesHTML = '';
          article.imagenes.split(',').forEach((imageUrl, index) => {
            const imgKey = `desc_img${index + 1}`;
            const imgDesc = article[imgKey].trim();
            if (imageUrl.trim() !== '') {
              imagesHTML += `
                <div class="image-container">
                  <img class="article-images-details" src="${imageUrl.trim()}" alt="${imgDesc}">
                  <p>${imgDesc}</p>
                </div>
              `;
            }
          });
          return imagesHTML;
        };

        // Crear la estructura HTML con todos los datos del artículo
        const articleHTML = `
          <h1>${article.titulo}</h1>
          <p>Marca temporal: ${article.marca_temporal}</p>
          <p>Correo del docente: ${article.correo_docente}</p>
          <p>Nombre del estudiante: ${article.nombre_estudiante}</p>
          <p>Redes del estudiante: ${article.redes_estudiante}</p>
          <p>Título: ${article.titulo}</p>
          <p>Subtítulo: ${article.subtitulo}</p>
          <p>Descripción: ${article.descripcion}</p>
          <p>Palabras clave: ${article.palabras_clave}</p>
          <p>Línea de investigación: ${article.linea_investigacion}</p>
          <p>Especialidad: ${article.especialidad}</p>
          <p>Asignatura: ${article.asignatura}</p>
          <p>Curso: ${article.curso}</p>
          <p>Entidad: ${article.entidad}</p>
          <div class="article-images">
            ${renderImages()}
          </div>
          <p>doc_info: ${article.doc_info}</p>
          <p>form2: ${article.form2}</p>
          <p>Enlace video: ${article.enlace_video}</p>
          <p>Enlace Info: ${article.enlace_info}</p>

        `;

        articleDetails.innerHTML = articleHTML;
      } else {
        articleDetails.innerHTML = "<p>Artículo no encontrado.</p>";
      }
    })
    .catch(error => console.error('Error al cargar los detalles del artículo:', error));
}
