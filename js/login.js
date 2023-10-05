// Función para cargar y validar el inicio de sesión
function validarInicioSesion(username, password) {
    // Cargar el archivo JSON
    fetch('./js/baseDeDatos.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Buscar el usuario en los datos cargados
        const usuario = data.find(user => user.username === username);
  
        if (usuario) {
          // Si se encontró el usuario, verificar la contraseña
          if (usuario.password === password) {
            console.log('Inicio de sesión exitoso');
            window.open("../index.html", "_blank");
          } else {
            alert('Contraseña incorrecta.');
            
          }
        } else {
            alert('Usuario no encontrado');
        }
      })
      .catch(error => {
        console.error('Hubo un error al cargar el archivo JSON:', error);
      });
  }

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    validarInicioSesion(username, password);

});

