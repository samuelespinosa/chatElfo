// Obtener el formulario al cargar el script
const apiUrl = 'http://localhost:5000';
const registrationForm = document.getElementById('registrationForm');

function registrarNuevoUsuario() {
  const newUsername = document.getElementById('newUsername').value;
  const newCorreo = document.getElementById('newCorreo').value;
  const newPassword = document.getElementById('newPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  // Verificar que las contraseñas coincidan
  if (newPassword !== confirmPassword) {
    alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
    return;
  }

  fetch(apiUrl + '/registro.html', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nombre: newUsername, correo: newCorreo, contrasena: newPassword }),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Datos invalidos o ya estan en uso');
    }
    return response.json();
  })
  .then(data => {
    alert(data.mensaje); // Muestra el mensaje del servidor
    irALogin(); // Redirige a la página de inicio de sesión
  })
  .catch(error => {
    console.error('Hubo un error al realizar la solicitud:', error);
    alert('Datos invalidos o ya estan en uso. Por favor, inténtalo de nuevo.');
  });
}

function irALogin() {
  // Redirigir a la página de inicio de sesión
  window.location.href = "../login.html";
}

// Escuchar el evento de envío del formulario
registrationForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Evitar el envío normal del formulario
  registrarNuevoUsuario();
});

// Asociar la función con el evento de clic del botón "Ya tengo cuenta"
document.getElementById('goToLoginBtn').addEventListener('click', function (event) {
  event.preventDefault();
  irALogin();
});

// Asociar la función con el evento de clic del botón
document.getElementById('createAccountBtn').addEventListener('click', function (event) {
  event.preventDefault();
  registrarNuevoUsuario();
});