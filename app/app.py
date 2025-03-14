# Hey, i can belive you are reading this hahaha, but as you can notice, this is a very simple flask api
from flask import Flask, render_template, request, jsonify, session, url_for, redirect,send_from_directory
import pymysql
from werkzeug.security import generate_password_hash, check_password_hash
from config import config
from flask_cors import CORS
from functools import wraps
import os
from dotenv import load_dotenv
import json  # Agrega esta línea para manejar JSON

app = Flask(__name__, template_folder='template', static_url_path='/static')
CORS(app)  # Esto habilita CORS para toda la aplicación
app.secret_key = 'Losgatos25.' 

@app.route('/', methods=['GET'])
def raiz_mostrar_login():
    return redirect('/login.html')

@app.route('/login.html', methods=['GET'])
def mostrar_login():
    return render_template('auth/login.html')

@app.route('/registro.html', methods=['GET'])
def mostrar_registro():
    return render_template('auth/registro.html')
load_dotenv()
print(os.getenv('USER'))
# Conectar a la base de datos MySQL
db = pymysql.connect(
    host=os.getenv("DBE_HOST"),
    user=os.getenv("DBE_USER"),
    password=os.getenv("DBE_PASSWORD"), 
)  
    
cursor = db.cursor()

# Create the database
create_database_query = f"CREATE DATABASE IF NOT EXISTS testdb"
cursor.execute(create_database_query)

# Select the created database
cursor.execute(f"USE testdb")
cursor.execute('''
    CREATE TABLE IF NOT EXISTS diccionarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        contenido TEXT NOT NULL
    )
''')
db.commit()

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

@app.route('/login.html', methods=['POST'])
def login():
    # Obtener datos del formulario
    usuario = request.form.get('usuario')
    contrasena = request.form.get('contrasena')

    print(f"usuario: {usuario}, Contraseña: {contrasena}")  # línea para depurar

    # Convertir el correo electrónico a minúsculas
    usuario = usuario.lower()

    # Consultar la base de datos para obtener la contraseña hasheada
    cursor.execute('SELECT id, contrasena FROM usuarios WHERE LOWER(nombre) = %s', (usuario,))
    usuario_info = cursor.fetchone()
    print(f"Resultado de la consulta: {usuario_info}")

    # Verificar si el usuario existe y si la contraseña coincide
    if usuario_info is not None and check_password_hash(usuario_info[1], contrasena):
        session['usuario_id'] = usuario_info[0]  # Guardar el ID del usuario en la sesión
        return redirect(url_for('mostrar_index'))
    else:
        print("Usuario no encontrado o contraseña incorrecta")

    return jsonify({'mensaje': 'Correo o contraseña incorrectos'}), 401

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'usuario_id' not in session:
            return redirect(url_for('mostrar_login'))
        return f(*args, **kwargs)
    return decorated_function

@app.route('/logout', methods=['GET'])
def logout():
    # Eliminar la información del usuario de la sesión
    session.pop('usuario_id', None)
    # Redirigir a la página de inicio de sesión
    return redirect(url_for('mostrar_login'))

@app.route('/index.html', methods=['GET'])
@login_required
def mostrar_index():
    # Obtener información del usuario y agregarla a la sesión
    cursor.execute('SELECT id, nombre, correo FROM usuarios WHERE id = %s', (session['usuario_id'],))
    usuario_info = cursor.fetchone()
    session['nombre_de_usuario'] = usuario_info[1]

    # Cargar diccionario español desde la base de datos
    cursor.execute('SELECT contenido FROM diccionarios WHERE nombre = %s', ('espanol',))
    diccionario_espanol = cursor.fetchone()
    if diccionario_espanol:
        diccionario_espanol = json.loads(diccionario_espanol[0])
    else:
        diccionario_espanol = {}  # Si no hay diccionario en la base de datos, inicializa como un diccionario vacío

    # Cargar diccionario élfico desde la base de datos
    cursor.execute('SELECT contenido FROM diccionarios WHERE nombre = %s', ('elfico',))
    diccionario_elfico = cursor.fetchone()
    if diccionario_elfico:
        diccionario_elfico = json.loads(diccionario_elfico[0])
    else:
        diccionario_elfico = {}  # Si no hay diccionario en la base de datos, inicializa como un diccionario vacío

    return render_template('index.html', diccionario_espanol=diccionario_espanol, diccionario_elfico=diccionario_elfico)

@app.route('/registro.html', methods=['POST'])
def crear_usuario():
    try:
        nuevo_usuario = request.get_json()
        nombre = nuevo_usuario.get('nombre')
        correo = nuevo_usuario.get('correo')
        contrasena = nuevo_usuario.get('contrasena')

        print(f"Correo: {correo}, Contraseña: {contrasena}")

        # Verificar si el usuario ya existe en la base de datos
        cursor.execute('SELECT id FROM usuarios WHERE LOWER(nombre) = %s', (nombre.lower(),))
        usuario_existente = cursor.fetchone()
        
        if usuario_existente is not None:
            return jsonify({'error': 'El usuario ya existe'}), 400
        
        # Verificar si el correo ya existe en la base de datos
        cursor.execute('SELECT id FROM usuarios WHERE LOWER(correo) = %s', (correo.lower(),))
        correo_existente = cursor.fetchone()

        if correo_existente is not None:
            return jsonify({'error': 'El correo ya ha sido registrado'}), 400
        
        # Hashear la contraseña antes de almacenarla
        contrasena_hasheada = generate_password_hash(contrasena, method='pbkdf2:sha256', salt_length=8)

        # Insertar el nuevo usuario
        cursor.execute('INSERT INTO usuarios (nombre, correo, contrasena) VALUES (%s, %s, %s)', (nombre, correo, contrasena_hasheada))
        db.commit()

        return jsonify({'mensaje': 'Usuario creado exitosamente'})
    except Exception as e:
        print(f"Error en la creación de usuario: {e}")
        return jsonify({'error': str(e)}), 500


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

# Resto de las rutas...
# Define the route to get the contents of diccionario.json
@app.route('/api/dic', methods=['GET'])
def get_diccionario():
    diccionario_path = os.path.join(app.root_path, 'template/assets', 'diccionario.json')
    with open(diccionario_path, 'r') as file:
        diccionario_content = file.read()
    return diccionario_content

# Define the route to get the contents of diccionario_elfo.json
@app.route('/api/dic_e', methods=['GET'])
def get_diccionario_elfo():
    diccionario_elfo_path = os.path.join(app.root_path, 'template/assets', 'diccionario_elfo.json')
    with open(diccionario_elfo_path, 'r') as file:
        diccionario_elfo_content = file.read()
    return diccionario_elfo_content
@app.route('/img/<filename>', methods=['GET'])
def serve_image(filename):
    img_path = os.path.join(app.root_path, 'template/assets/img', filename)
    
    # Check if the file exists
    if not os.path.exists(img_path):
        return jsonify({'error': 'Image not found'}), 404

    # Serve the image file
    return send_from_directory(os.path.join(app.root_path, 'template/assets/img'), filename)
if __name__ == '__main__':
    app.config.from_object(config['development'])
    app.run(host="0.0.0.0", port=5000, debug=True)

