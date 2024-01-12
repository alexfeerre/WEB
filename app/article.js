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
            const imgDesc = article[imgKey]?.trim();
            if (imageUrl.trim() !== '' && imgDesc) {
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

        const articleHTML = `
          <div class="introdetail">
          <p class="timedetail">${article.marca_temporal ? `Publicado el ${article.marca_temporal}` : ''}</p>
          <h1 class="titledetail">${article.titulo ? `${article.titulo}` : 'Título No especificado'}</h1>
          <p class="subtitledetail">${article.subtitulo ? `${article.subtitulo}` : 'Subtítulo No especificado'}</p>
          <div class="subclassestitulo">
          <p class="namedetail">${article.nombre_estudiante ? `${article.nombre_estudiante}` : 'Nombre del estudiante no especificado'}</p>
          <p class="classdetail">${article.asignatura ? `Asignatura: ${article.asignatura}` : 'Asignatura no especificada'}</p>
          <p class="modaldetail">${article.especialidad ? `Especialidad: ${article.especialidad}` : 'Especialidad no especificada'}</p>
          </div>
          </div>
          <section class="datadetails">
          ${article.entidad ? `<p class="entidaddetail" style="padding: 10px 15px; background-color: none; border: 2px solid; border-radius: 4px;">Entidad: ${article.entidad}</p>` : '<p class="entidaddetail" style="padding: 10px 15px; background-color: none; border: 2px solid; border-radius: 4px;">Entidad no especificada</p>'}
          ${article.linea_investigacion ? `<p class="linedetail" style="padding: 10px 15px; background-color: none; border: 2px solid; border-radius: 4px; display: flex; flex-direction: row; justify-content: flex-end;">Línea de investigación: ${article.linea_investigacion}</p>` : '<p class="linedetail" style="padding: 10px 15px; background-color: none; border: 2px solid; border-radius: 4px;">Línea de investigación no especificada</p>'}
          <p class="maildetail">${article.correo_docente ? `Correo del docente: ${article.correo_docente}` : 'Correo del docente no especificado'}</p>
          <p class="descriptiondetail" >${article.descripcion ? `Descripción: ${article.descripcion}` : 'Descripción no especificada'}</p>
          <p class="keydetail">${article.palabras_clave ? `Palabras clave: ${article.palabras_clave}` : 'Palabras clave no especificadas'}</p>
          <p class="cursodetail">${article.curso ? `Curso: ${article.curso}` : 'Curso no especificado'}</p>
          <div class="article-images">
            ${renderImages()}
          </div>
          <div class="social">
          <p class="socialtitle">Redes Sociales del estudiante</p>
          <p class="socialdetail">${article.redes_estudiante ? `${article.redes_estudiante}` : 'Redes del estudiante no especificadas'}</p>
          </div>
          <div class="enlaces_details">
          ${article.enlace_video ? `<button class="link-button" onclick="window.location.href='${article.enlace_video}'">Enlace video</button>` : ''}
          ${article.enlace_info ? `<button class="link-button" onclick="window.location.href='${article.enlace_info}'">Enlace Info</button>` : ''}
          ${article.doc_info ? `<button class="link-button" onclick="window.location.href='${article.doc_info}'">Enlace Documento</button>` : ''}
          ${article.form2 ? `<button class="link-button" onclick="window.location.href='${article.form2}'">Enlace Formulario 2</button>` : ''}
          </div>
          </section>
        `;

        articleDetails.innerHTML = articleHTML;

        // Agregar estilos para los botones
        const linkButtons = document.querySelectorAll('.link-button');
        linkButtons.forEach(button => {
          button.style.cursor = 'pointer';
          button.style.backgroundColor = 'black';
          button.style.color = 'white';
          button.style.padding = '2% 5% 2% 5%';
          button.style.border = 'none';
        
        });
      } else {
        articleDetails.innerHTML = "<p>Artículo no encontrado.</p>";
      }
    })
    .catch(error => console.error('Error al cargar los detalles del artículo:', error));

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
