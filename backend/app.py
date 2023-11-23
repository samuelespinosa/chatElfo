from flask import Flask, request, jsonify
import mysql.connector
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

# Conectar a la base de datos MySQL
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="asd123$$$", 
    database="Eldilex_db"
)

cursor = db.cursor()
# Función para crear usuarios de prueba

def crear_usuarios_de_prueba():
    usuarios_de_prueba = [
        {"nombre": "samuelespinosa", "correo": "saespinosab@una.edu.co", "contrasena": "12345678"},
        {"nombre": "Usuario2", "correo": "usuario2@example.com", "contrasena": "password2"},
        # Agrega más usuarios según sea necesario
    ]

    for usuario in usuarios_de_prueba:
        nombre = usuario["nombre"]
        correo = usuario["correo"]
        contrasena_plana = usuario["contrasena"]

        # Hashear la contraseña antes de almacenarla
        contrasena_hasheada = generate_password_hash(contrasena_plana, method='pbkdf2:sha256')

        # Insertar usuario en la base de datos
        cursor.execute('INSERT INTO usuarios (nombre, correo, contrasena) VALUES (%s, %s, %s)', (nombre, correo, contrasena_hasheada))
        db.commit()

    print("Usuarios de prueba creados exitosamente.")

# Llamada a la función para crear usuarios de prueba
#crear_usuarios_de_prueba()

# Crear tabla de usuarios si no existe
cursor.execute('''
    CREATE TABLE IF NOT EXISTS usuarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        correo VARCHAR(255) NOT NULL,
        contrasena VARCHAR(255) NOT NULL
    )
''')
db.commit()

# Operaciones CRUD
@app.route('/usuarios', methods=['GET'])
def obtener_usuarios():
    cursor.execute('SELECT id, nombre, correo FROM usuarios')
    usuarios = cursor.fetchall()
    return jsonify({'usuarios': usuarios})

@app.route('/usuarios/<int:usuario_id>', methods=['GET'])
def obtener_usuario(usuario_id):
    cursor.execute('SELECT id, nombre, correo FROM usuarios WHERE id = %s', (usuario_id,))
    usuario = cursor.fetchone()
    return jsonify({'usuario': usuario})

@app.route('/usuarios', methods=['POST'])
def crear_usuario():
    nuevo_usuario = request.get_json()
    nombre = nuevo_usuario.get('nombre')
    correo = nuevo_usuario.get('correo')
    contrasena = nuevo_usuario.get('contrasena')

    # Hashear la contraseña antes de almacenarla
    contrasena_hasheada = generate_password_hash(contrasena, method='sha256')

    cursor.execute('INSERT INTO usuarios (nombre, correo, contrasena) VALUES (%s, %s, %s)', (nombre, correo, contrasena_hasheada))
    db.commit()

    return jsonify({'mensaje': 'Usuario creado exitosamente'})

@app.route('/usuarios/<int:usuario_id>', methods=['PUT'])
def actualizar_usuario(usuario_id):
    usuario_actualizado = request.get_json()
    nombre = usuario_actualizado.get('nombre')
    correo = usuario_actualizado.get('correo')
    contrasena = usuario_actualizado.get('contrasena')

    # Hashear la nueva contraseña antes de almacenarla
    contrasena_hasheada = generate_password_hash(contrasena, method='sha256')

    cursor.execute('UPDATE usuarios SET nombre = %s, correo = %s, contrasena = %s WHERE id = %s', (nombre, correo, contrasena_hasheada, usuario_id))
    db.commit()

    return jsonify({'mensaje': 'Usuario actualizado exitosamente'})

@app.route('/usuarios/<int:usuario_id>', methods=['DELETE'])
def eliminar_usuario(usuario_id):
    cursor.execute('DELETE FROM usuarios WHERE id = %s', (usuario_id,))
    db.commit()

    return jsonify({'mensaje': 'Usuario eliminado exitosamente'})

@app.route('/login', methods=['POST'])
def login():
    datos_login = request.get_json()
    correo = datos_login.get('correo')
    contrasena = datos_login.get('contrasena')

    cursor.execute('SELECT id, contrasena FROM usuarios WHERE correo = %s', (correo,))
    usuario = cursor.fetchone()

    if usuario and check_password_hash(usuario[1], contrasena):
        return jsonify({'mensaje': 'Inicio de sesión exitoso'})
    else:
        return jsonify({'mensaje': 'Correo o contraseña incorrectos'}), 401

if __name__ == '__main__':
    app.run(debug=True)
