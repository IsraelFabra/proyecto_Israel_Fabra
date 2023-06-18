* A- Este es el curso completo:
https://www.youtube.com/watch?v=qJ5R9WTW0_E


* Video 1h:12 min: Nodejs, ejs, bootstrap:
https://www.youtube.com/watch?v=OVESuyVoPkI&t=948s

* Video rutas (ver 17:40):
https://www.youtube.com/watch?v=OWukxSRtr-A&list=PLE9a6neO0rW_Y_mTW4Jua4Ia8W3EFlDug

* Video red social:
https://www.youtube.com/watch?v=TqC3e8nBycg

* Video flash manual:
https://www.youtube.com/watch?v=fSFPfAgE5yM

https://www.youtube.com/watch?v=yfO-oJPkYN8

* Video Passport:
https://www.youtube.com/watch?v=QykWhMy2eNo

* B- Video paquete música (multer):
https://www.youtube.com/watch?v=lSCLVwLdSOk&t=19s

https://www.youtube.com/watch?v=wsn6PyQLtfY

* B- Paquete imagen-audio (multer):
https://www.youtube.com/watch?v=AbJ-y2vZgBs

* B!!!- https://www.youtube.com/watch?v=wIOpe8S2Mk8&t=61s


* Pag compartir y descubrir música:
https://soundcloud.com/ngocdoanclef


* A - Hay un packete nodeMailer => dice que lo tiene en otro video.

* A - Módulo flash para enviar mensajes al usuario: 1:53 h.

* B - Módulo multer para gestionar imagenes/audio.


---------------------------------------------------------

* Para ver donde Multer guarda las fotos y las imágenes de usuarios ver: routes/feed.js

---------------------------------------------------------

* Con: npm install express-mysql-session@2.1.0    Funciona!!!!!!!!!!!!!!!!!

---------------------------------------------------------


* Error:   savedPassword: undefined
Error: Illegal arguments: string, undefined
    at _async                    Este error está en helpers.js


[
  [
    {
      id: 1,
      username: 'a',
      password: '$2a$10$fQhmkocpDQCqCdYC6qLo6O57Z/8Y6TvgE8ZlkF9hyCii9PGtWgzeu'
    }
  ],
  [

Arreglado con:  const user = rows[0][0]   !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!



---------------------------------------------------------

* En la carpeta routes, archivo authentication:
session: true, //Con esto funciona!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  ¿Están aquí las cookies?
Con esto consigo que el objeto 'user' que está las variables globales del archivo index.js se le pueda leer lo que contiene.

* Archivo authentication.js:  
        session: false, //Con esto funciona!!!!!!!  ¿para que sea true tendría que tener cookies?
---------------------------------------------------------

* En la presentación explicar: express-validator

---------------------------------------------------------


* En la presentación explicar Multer.

* En la presentación explicar Passport.
  - 3:15 Con Passport serializamos el dato del usuario (en la memoria de la sesión). 
         Desde request podemos obtener esos datos.

* En la presentación explicar Flash.

* En la presentación explicar mySQLStore.  En mysql si escribo: show tables;
select * from sessions; veré la table que crea para la sesión.

* En la presentación explicar mysqlstore:

  Guardar la sesión en la base de datos tiene varias ventajas:

1. Persistencia: Al guardar la sesión en la base de datos, la información de la sesión se almacena de forma duradera. Esto significa que incluso si el servidor se reinicia o el usuario cierra y vuelve a abrir su navegador, la sesión se puede restaurar desde la base de datos y la información de la sesión permanecerá intacta. Esto permite que los usuarios mantengan su estado de autenticación y cualquier otro dato asociado con la sesión.

2. Escalabilidad: Almacenar la sesión en la base de datos permite distribuir la carga de sesiones entre múltiples servidores. En una configuración de servidor múltiple, todos los servidores pueden acceder a la misma base de datos para leer y escribir la información de la sesión. Esto facilita la escalabilidad horizontal de la aplicación, ya que se pueden agregar más servidores sin perder el estado de la sesión.

3. Seguridad: Al guardar la sesión en la base de datos, se puede aplicar un nivel adicional de seguridad. La información de la sesión se almacena de forma segura en la base de datos, lo que dificulta su acceso no autorizado. Además, al usar una biblioteca como `express-mysql-session`, se pueden aplicar medidas adicionales de protección, como el uso de cifrado y la configuración de tiempos de expiración de sesión.

En resumen, guardar la sesión en la base de datos proporciona persistencia, escalabilidad y seguridad mejoradas para la gestión de sesiones en tu aplicación. Permite que los usuarios mantengan su estado de autenticación y otra información relevante a lo largo del tiempo y proporciona una base sólida para el manejo de sesiones en entornos de servidor múltiple.


---------------------------------------------------------

*    app.locals.user = req.user; //ver readme//ver profile.ejs en views:


    En el código proporcionado, app.locals.user = req.user; asigna el valor del objeto req.user a la propiedad user del objeto app.locals.

En Express.js, app.locals es un objeto que proporciona una forma de acceder a variables locales en las vistas o plantillas de tu aplicación. Los valores asignados a app.locals están disponibles en todas las vistas renderizadas por la aplicación.

req.user generalmente se refiere al objeto de usuario actualmente autenticado en una sesión. Si estás utilizando algún sistema de autenticación en tu aplicación (por ejemplo, Passport.js), es común almacenar los datos del usuario autenticado en req.user.

Por lo tanto, app.locals.user = req.user; está configurando la variable user en app.locals para que esté disponible en las vistas. Esto permite que las vistas accedan al objeto req.user y utilicen los datos del usuario autenticado, como el nombre de usuario, el ID u otra información relevante.

---------------------------------------------------------


* links/add.ejs?




---------------------------------------------------------

Si deseas que el código sepa automáticamente dónde está la raíz de la carpeta de los routers, puedes utilizar una variable para almacenar la ruta de la carpeta base y luego concatenarla con las rutas de los archivos de las rutas. Aquí tienes un ejemplo de cómo hacerlo:

const path = require('path');

// Obtener la ruta de la carpeta base de los routers
const routersRoot = path.join(__dirname, 'routes');

// ROUTES. Aquí requerimos las rutas buscándolas en sus carpetas y más abajo las usamos.
const indexRouter = require(path.join(routersRoot, 'index'));
// ...


En este ejemplo, __dirname es una variable predefinida en Node.js que representa la ruta absoluta del directorio actual. Luego, se utiliza path.join para concatenar __dirname con la subruta relativa de la carpeta de los routers y el nombre de archivo de la ruta que deseas requerir.

De esta manera, puedes mantener la referencia correcta a la raíz de la carpeta de los routers, sin importar desde dónde se ejecute el código.

---------------------------------------------------------

* COMUNIDAD:

  Los usuarios registrados cuando inicien sesión y se les muestre 'Bienvenido' y su nombre de usuario y un botón: 'Unete a la comunidad' y que te direccione a un router.get llamado 'comunidad'

---------------------------------------------------------

* Hilos!!!!!!!!!!!!!!

En mi caso casi todo lo consigo manegar por profile.

router.get('/', isLoggedIn, (req, res) => {
  // Comprobar si el usuario está autenticado
  if (req.isAuthenticated()) {
    // Mostrar el enlace al perfil si el usuario está autenticado
    res.render('main', { title: 'Meetup Guitar', navigation: '/partials/navigation', showProfileLink: true });
  } else {
    // No mostrar el enlace al perfil si el usuario no está autenticado
    res.render('main', { title: 'Meetup Guitar', navigation: '/partials/navigation', showProfileLink: false });
  }
});


 <% if (showProfileLink) { %>
          <a class="nav-link" href="/perfil">Perfil</a>
        <% } %>


---------------------------------------------------------


* Para guardar la información del formulario comFormulaioMatch.ejs en una DB. Más adelante cuando un usuario quiera modificar el formulario que se le pinten 
  los datos desde la DB.


Si deseas almacenar la información en una base de datos en lugar de utilizar cookies, puedes seguir los siguientes pasos:

1. Configuración de la base de datos: Asegúrate de tener una base de datos configurada y una conexión establecida desde tu aplicación. Puedes utilizar una base de datos SQL como MySQL o PostgreSQL, o una base de datos NoSQL como MongoDB.

2. Creación del modelo de datos: Define un modelo de datos en tu aplicación que represente la información del formulario enviado y el estado del usuario. Esto puede incluir campos como el ID del usuario, un indicador de si el formulario se envió correctamente y cualquier otro dato relevante.

3. Almacenamiento en la base de datos: Después de procesar y validar los datos del formulario, guarda la información relevante en la base de datos utilizando el modelo de datos definido. Actualiza el estado del usuario para indicar que el formulario se ha enviado correctamente.

4. Verificación en la página inicial: En la ruta o controlador que maneja la página inicial, consulta la base de datos para verificar el estado del usuario. Si el formulario se envió correctamente en una ocasión anterior, redirige directamente a la vista de la comunidad en lugar de mostrar el formulario.

Aquí hay un ejemplo de cómo podrías implementarlo utilizando la biblioteca Mongoose para trabajar con MongoDB en una aplicación de Express.js:

```javascript
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Conexión a la base de datos de MongoDB
mongoose.connect('mongodb://localhost/nombre_basedatos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Definición del modelo de datos
const Usuario = mongoose.model('Usuario', {
  nombre: String,
  formularioEnviado: Boolean,
});

// Controlador para procesar el envío del formulario
app.post('/enviar-formulario', async (req, res) => {
  // Procesar y validar los datos del formulario aquí

  // Guardar el estado del formulario en la base de datos
  await Usuario.findOneAndUpdate(
    { nombre: 'nombre_usuario' }, // Puedes utilizar algún identificador único del usuario en lugar de 'nombre_usuario'
    { formularioEnviado: true },
    { upsert: true }
  );

  // Redirigir a la página de la comunidad
  res.redirect('/comunidad');
});

// Ruta para mostrar la página inicial
app.get('/', async (req, res) => {
  // Verificar el estado del usuario en la base de datos
  const usuario = await Usuario.findOne({ nombre: 'nombre_usuario' }); // Puedes utilizar algún identificador único del usuario en lugar de 'nombre_usuario'

  if (usuario && usuario.formularioEnviado) {
    // Redirigir directamente a la página de la comunidad
    res.redirect('/comunidad');
  } else {
    // Mostrar el formulario
    res.render('comFormularioMatch'); // Renderizar el archivo ejs correspondiente al formulario
  }
});

// Ruta para mostrar la vista de la comunidad
app.get('/comunidad', (req, res) => {
  // Mostrar la vista de la comunidad
  res.render('vistaComunidad'); // Renderizar el archivo ejs correspondiente a la vista de la comunidad
});

// Resto de la configuración y rutas de Express.js...

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
```

En este ejemplo, se utiliza Mongoose para definir el modelo de datos `Usuario



--- 

¡Por supuesto! Aquí tienes un ejemplo de cómo podrías implementar el mismo flujo utilizando MySQL en una aplicación de Express.js:

1. Configuración de la base de datos: Asegúrate de tener una base de datos MySQL configurada y una conexión establecida desde tu aplicación. Puedes utilizar el paquete `mysql` para interactuar con la base de datos MySQL desde tu aplicación.

2. Creación de la tabla: Crea una tabla en la base de datos que contenga los campos necesarios para almacenar la información del formulario enviado y el estado del usuario.

3. Almacenamiento en la base de datos: Después de procesar y validar los datos del formulario, inserta o actualiza un registro en la tabla de la base de datos para indicar que el formulario se ha enviado correctamente.

4. Verificación en la página inicial: En la ruta o controlador que maneja la página inicial, consulta la base de datos para verificar el estado del usuario. Si el formulario se envió correctamente en una ocasión anterior, redirige directamente a la vista de la comunidad en lugar de mostrar el formulario.

Aquí tienes un ejemplo de cómo podrías implementarlo utilizando el paquete `mysql` en una aplicación de Express.js:

```javascript
const express = require('express');
const mysql = require('mysql');

const app = express();

// Configuración de la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'usuario',
  password: 'contraseña',
  database: 'nombre_basedatos',
});

// Establecer la conexión a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión a la base de datos establecida');
});

// Controlador para procesar el envío del formulario
app.post('/enviar-formulario', (req, res) => {
  // Procesar y validar los datos del formulario aquí

  // Consultar si el usuario existe en la base de datos
  connection.query(
    'SELECT * FROM usuarios WHERE nombre = ?', ['nombre_usuario'], // Puedes utilizar algún identificador único del usuario en lugar de 'nombre_usuario'
    (err, results) => {
      if (err) {
        console.error('Error al consultar la base de datos:', err);
        return;
      }

      if (results.length > 0) {
        // El usuario ya existe, actualizar el estado del formulario enviado
        connection.query(
          'UPDATE usuarios SET formularioEnviado = 1 WHERE nombre = ?', ['nombre_usuario'],
          (err, result) => {
            if (err) {
              console.error('Error al actualizar la base de datos:', err);
              return;
            }

            // Redirigir a la página de la comunidad
            res.redirect('/comunidad');
          }
        );
      } else {
        // El usuario no existe, insertar un nuevo registro en la base de datos
        connection.query(
          'INSERT INTO usuarios (nombre, formularioEnviado) VALUES (?, 1)', ['nombre_usuario'],
          (err, result) => {
            if (err) {
              console.error('Error al insertar en la base de datos:', err);
              return;
            }

            // Redirigir a la página de la comunidad
            res.redirect('/comunidad');
          }
        );
      }
    }
  );
});

// Ruta para mostrar la página inicial
app.get('/', (req, res) => {
  // Consultar el estado del usuario en la

 base de datos
  connection.query(
    'SELECT formularioEnviado FROM usuarios WHERE nombre = ?', ['nombre_usuario'], // Puedes utilizar algún identificador único del usuario en lugar de 'nombre_usuario'
    (err, results) => {
      if (err) {
        console.error('Error al consultar la base de datos:', err);
        return;
      }

      if (results.length > 0 && results[0].formularioEnviado === 1) {
        // Redirigir directamente a la página de la comunidad
        res.redirect('/comunidad');
      } else {
        // Mostrar el formulario
        res.render('comFormularioMatch'); // Renderizar el archivo ejs correspondiente al formulario
      }
    }
  );
});

// Ruta para mostrar la vista de la comunidad
app.get('/comunidad', (req, res) => {
  // Mostrar la vista de la comunidad
  res.render('vistaComunidad'); // Renderizar el archivo ejs correspondiente a la vista de la comunidad
});

// Resto de la configuración y rutas de Express.js...

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
```

En este ejemplo, se utiliza el paquete `mysql` para interactuar con la base de datos MySQL. Se establece una conexión a la base de datos y se ejecutan consultas para insertar o actualizar registros en la tabla `usuarios`. En la ruta `'/'`, se consulta el estado del usuario y se redirige directamente a la vista de la comunidad si el formulario se envió correctamente en una ocasión anterior.


---------------------------------------------------------

* La validación arreglarla, ya que permite que varios usuarios tengan el mismo username o el mismo password:

https://www.youtube.com/watch?v=YzVYI1TxVFc

function logout(req, res) {
  if (req.sessionloggedin == true) {
    req.session.destroy();
  }
  res.redirect('/');
}

https://www.youtube.com/watch?v=uUJr5Itz8kY   // a mano

https://www.youtube.com/watch?v=7i7xmwowwCY  // con express validator

https://www.youtube.com/watch?v=WvwMAJU1bd4  // con express validator

https://www.youtube.com/watch?v=VMRgFfmv6j0  // con express validator





---------------------------------------------------------


En routes/feed.js ver: //const sql = "select * from users" => Para que muestre las imágenes o audios del usuario, tengo que pasarlas a la DB para así poderlas luego pintar.




---------------------------------------------------------



Si deseas que cada vez que un usuario suba una canción se genere un nuevo registro en la base de datos en lugar de reemplazar el registro existente, necesitarás realizar cambios tanto en el código del backend como en el código del frontend.

Aquí hay una propuesta de cómo podrías modificar el código:

1. En el archivo `feed.ejs`, realiza los siguientes cambios:

```html
<!-- Feed: Alimento para la comunidad. Variables para que la ruta en feed.js pueda pintar a través de la DB las canciones -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= title %></title>
    <%- include('../partials/head') %>
</head>
<body>

  <!-- Para footer abajo -->
  <div class="wrapper">

    <%- include('../partials/navigation') %>     

    <div class="container mt-5">
      <h1 class="mb-4 text-custom1">Escucha los posts de los usuarios:</h1>

      <% users.forEach(function(user) { %>
        <div class="row">
          <div class="col-md-12">
            <div class="d-flex align-items-center">
              <img src="/upload/isra/image.jpg" alt="Foto de perfil" class="img-thumbnail rounded-circle" style="max-width: 50px; height: auto;">
              <p class="text-custom2 username-style mb-0 ms-2"><%= user.username %></p>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-10">
            <div class="row">
              <div class="col-md-5">
                <img src="/img/closeUpGuitar3.avif" alt="closeUpGuitar1" class="img-fluid img-thumbnail" style="max-width: 300px; height: auto;"> 
              </div>
              <div class="col-md-7">
                <% user.songs.forEach(function(song) { %>
                  <audio controls style="width: 100%;">
                    <source src="/upload/<%= user.username %>/<%= song.audio_filename %>" type="audio/mp3">
                  </audio>
                <% }); %>
              </div>
            </div>
          </div>
        </div>
      <% }); %>

    </div>


  </div> <!-- Fin de footer abajo -->

  <%- include('../partials/footer') %>
</body>
</html>
```

2. En el archivo `feed.js`, realiza los siguientes cambios:

```javascript
const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');

const { storage } = require('../index');

const upload = multer({ storage });

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

// Ruta para mostrar el feed de canciones
router.get('/feed', isLoggedIn, async (req, res) => {
  const { username } = req.user;

  try {
    // Obtener las canciones subidas por los usuarios desde la base de datos
    const users = await pool.query('SELECT * FROM users');

    // Obtener las canciones asociadas a cada usuario
    for (const user of users) {
      const songs = await pool.query('SELECT * FROM songs WHERE user_id = ?', [user.id]);
      user.songs = songs;
    }

    res.render

('feed', { title: 'Feed', users });
  } catch (error) {
    console.error('Error retrieving songs:', error);
    res.redirect('/');
  }
});

// Ruta para subir una nueva canción
router.post('/upload', isLoggedIn, upload.single('audio'), async (req, res) => {
  const { filename } = req.file;
  const { id } = req.user;

  try {
    // Guardar la información de la canción en la base de datos
    await pool.query('INSERT INTO songs (user_id, audio_filename) VALUES (?, ?)', [id, filename]);

    res.redirect('/feed');
  } catch (error) {
    console.error('Error uploading song:', error);
    res.redirect('/');
  }
});

module.exports = router;
```

En este código, se agrega una nueva tabla en la base de datos llamada `songs` para almacenar las canciones subidas por cada usuario. Cada vez que un usuario sube una canción, se inserta un nuevo registro en la tabla `songs` asociado al ID del usuario y con el nombre de archivo de la canción. Luego, al obtener los usuarios y sus canciones en la ruta `/feed`, se obtienen las canciones asociadas a cada usuario y se pasan a la plantilla `feed.ejs` para su visualización.

Es importante mencionar que estos cambios son solo una sugerencia y pueden requerir adaptaciones adicionales según la estructura de tu base de datos y los requisitos específicos de tu aplicación.



---------------------------------------------------------



<!-- Feed: Alimento para la comunidad. Variables para que la ruta en feed.js pueda pintar a través de la DB las canciones -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= title %></title>
    <%- include('../partials/head') %>
</head>
<body>

  <!-- Para footer abajo -->
  <div class="wrapper">

    <%- include('../partials/navigation') %>     

    <div class="container mt-5">
      <h1 class="mb-4 text-custom1">Escucha los posts de los usuarios:</h1>

      <% songs.forEach(function(user) { %>
        <div class="row">
          <div class="col-md-12">
            <div class="d-flex align-items-center">
              <img src="/upload/<%= user.username %>/<%= user.foto_filename %>" alt="Foto de perfil" class="img-thumbnail rounded-circle" style="max-width: 50px; height: auto;">
              <p class="text-custom2 username-style mb-0 ms-2"><%= user.username %></p>
            </div>
          </div>
        </div>

        <% user.songs.forEach(function(song) { %>
          <div class="row">
            <div class="col-md-10">
              <div class="row">
                <div class="col-md-12">
                  <h4><%= song.title %></h4>
                  <p><%= song.description %></p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-5">
                  <img src="/img/closeUpGuitar3.avif" alt="closeUpGuitar1" class="img-fluid img-thumbnail" style="max-width: 250px; height: auto;"> 
                </div>
                <div class="col-md-7">
                  <audio controls style="width: 100%;">
                    <source src="/upload/<%= user.username %>/<%= song.audio_filename %>" type="audio/mp3">
                  </audio>
                </div>
              </div>
            </div>
          </div>

          <div class="row text-dark mb-3">
            <div class="col-md-12">
              <p>Title: <%= song.title %></p>
              <p>Description: <%= song.description %></p>
              <p>Age: <%= user.age %></p>
              <p>Gender: <%= user.gender %></p>
              <p>Level: <%= user.level %></p>
              <p>Availability: <%= user.availability %></p>
            </div>
          </div>
          
        <% }); %>

      <% }); %>

    </div>


  </div> <!-- Fin de footer abajo -->

  <%- include('../partials/footer') %>
</body>
</html>

--------------------------------------------------------

hazme un ejemplo práctico y sencillo de cómo recoger un dato de un formulario por su 'name' y como hacer ruta post para que se inserte en una base de datos