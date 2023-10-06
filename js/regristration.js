// Función para agregar un nuevo usuario y guardar los datos actualizados en el navegador
function agregarNuevoUsuario(username, password) {
    // Cargar el archivo JSON
    fetch('./js/baseDeDatos.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(usuarios => {
        // Crear un nuevo objeto de usuario
        const nuevoUsuario = {
          username: username,
          password: password
        };
  
        // Agregar el nuevo usuario a la lista de usuarios
        usuarios.push(nuevoUsuario);
  
        // Guardar los datos actualizados en el navegador (esto es solo un ejemplo en memoria)

        console.log('Nuevo usuario agregado:', usuarios);
      })
      .catch(error => {
        console.error('Hubo un error al cargar el archivo JSON:', error);
      });
  }


const registrationForm = document.getElementById('registrationForm');
const showRegistrationButton = document.getElementById('showRegistration');

    showRegistrationButton.addEventListener('click', () => {
        registrationForm.style.display = 'block';
    });

    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newUsername = document.getElementById('newUsername').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (newPassword !== confirmPassword) {
            alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
            return window.location.href = "../regristro.html";
        }

        // Aquí código para guardar el nuevo usuario y contraseña en una base de datos 

        agregarNuevoUsuario(newUsername,newPassword);
  
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        registrationForm.style.display = 'none';
        window.location.href = "../login.html";
    });