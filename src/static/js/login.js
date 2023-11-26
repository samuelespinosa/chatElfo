const apiUrl = 'http://localhost:5000';

document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault();

  // Obtener datos del formulario
  const username = document.getElementById('usuario').value;
  const password = document.getElementById('contrasena').value;

  // Enviar datos al servidor para el inicio de sesión
  fetch(apiUrl + '/login.html', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `usuario=${username}&contrasena=${password}`,
  })
  .then((response) => {
    // Verificar si la respuesta es una redirección (código 3xx)
    if (response.redirected) {
      // Si es una redirección, cambiar la ventana a la URL de destino
      window.location.href = response.url;
    } else {
      alert('Error en la solicitud. Por favor, inténtalo de nuevo.');
      // Si no es una redirección, intentar analizar el cuerpo como JSON
      return response.json();
    }
  })
});

document.getElementById('showRegistration').addEventListener('click', function() {
  window.location.href = '/registro.html';
});