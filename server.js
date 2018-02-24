const express = require('express'); // descargando express
const app = express(); // guardame todas las funciones de expresss en una variable 'app'
const server = app.listen(3001, on); // cuando escuches el puerto 3000 recrea la funcion encender
function on() {
  console.log('Servidor encendido');
}

app.use(express.static('public')); // cuando uses express static y la carpeta se llama 'public'