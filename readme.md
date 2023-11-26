# Configuraciones necesarias para ejecutar el proyecto en windows 

A continuación se detallan los pasos para crear un entorno virtual y instalar los requisitos del proyecto en Windows.

## Paso 1: Abrir el Símbolo del Sistema

Abre el Símbolo del Sistema en tu máquina con Windows (CMD).

## Paso 2: Navegar al Directorio del Proyecto

Usa el comando cd para navegar al directorio donde está el proyecto:

<pre>
    cd  EldiLex
</pre>

## Paso 3: Crear y Activar el Entorno Virtual

Usa el siguiente comando para crear un entorno virtual
<pre>
    python -m venv venv
</pre>

### Ahora, activa el entorno virtual con el siguiente comando:
<pre>
    venv\Scripts\activate
</pre>

## Paso 4: Instalar Requisitos
<pre>
    pip install -r requirements.txt
</pre>

## Paso 6: Tener mysql

Asegurate de tener mysql instalado y tener el proceso corriendo.

## Paso 7: Navegar al directorio src del proyecto y modificar .env

Abre el archivo .env y modifica las variables de entorno, solo debes modificar la contrasña si tienes las configuraciones por defecto de mysql

## Paso 8: Navegar al Directorio src del proyecto con cmd 
<pre>
    cd src
</pre>

## Paso 9: Ejecuta el proyecto
<pre>
    python app.py
</pre>

## Paso 10: Click ala dirección mostrada en consola.

Debe lucir parecida a esta http://127.0.0.1:5000


## Paso 12: Crea un usuario y usa la app

c:









