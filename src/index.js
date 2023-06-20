// PAQUETES. Aquí requiero los módulos que voy a usar en mi proyecto.
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const ejs = require('ejs');
const session = require('express-session');
const validator = require('express-validator');
const passport = require('passport');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session')(session); // Creo que tb. podria ser: const { MySQLStore } = require('express-mysql-session');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const mysql = require('mysql');
const multer = require("multer");
const fs = require('fs'); // Crea automaticamente una carpeta con el nombre username cunando este sube un archivo. fs.mkdir para crear carpeta del usuario con recursive: true. Esto asegura que se creen las subcarpetas necesarias en caso de que no existan.


// ROUTES. Aquí requerimos las rutas buscándolas en sus carpetas y más abajo las usamos.
const indexRouter = require('./routes/index');

// INICIALIZACIONES
const app = express();
require('./lib/passport');

// CONFIGURACIONES (settings)
app.set('port', process.env.PORT || 2000);
//Settings de vistas (para que se sepa donde están los archivos .ejs)!!!
app.set('views', path.join(__dirname, 'views'));
// Configuración adicional de EJS
app.set('view engine', 'ejs');
// Utilizar ejs.renderFile como función de devolución de llamada
app.engine('ejs', ejs.renderFile);
// Middleware Multer para subir (upload) archivos
  //creamos carpetas con el nombre del username así los archivos que suban los usuarios irán a sus carpetas
const getUserFolder = (username) => {
  return path.join(__dirname, 'public', 'upload', username);
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { username } = req.user;
    const userFolder = path.join(__dirname, 'public', 'upload', username);
    fs.mkdir(userFolder, { recursive: true }, (err) => {
      if (err) {
        console.error('Error creating user folder:', err);
      }
      cb(null, userFolder);
    });
  },
  filename: (req, file, cb) => {
    if (file.fieldname === 'fotoUsuario') {
      const extension = path.extname(file.originalname);
      cb(null, 'fotoUsuario' + extension);

      // Guardar el nombre del archivo en la base de datos
      const userId = req.user.id; // Suponiendo que tienes el ID del usuario disponible en req.user.id
      const sql = 'UPDATE users SET foto_filename = ? WHERE id = ?';
      const values = ['fotoUsuario' + extension, userId];
      
      // Ejecutar la consulta para actualizar la columna foto_filename en la base de datos
      pool.query(sql, values, (error, results) => {
        if (error) {
          console.error('Error al guardar el nombre del archivo de foto en la base de datos:', error);
        }
      });
    } else {
      const audioExtension = path.extname(file.originalname);
      const allowedExtensions = ['.mp3', '.wav', '.aac']; // Agrega aquí las extensiones de audio permitidas

      if (!allowedExtensions.includes(audioExtension)) {
        return cb(new Error('El archivo debe ser un archivo de audio válido.'));
      }

      const audioFilename = Date.now() + path.extname(file.originalname);
      cb(null, audioFilename);

      // Guardar el nombre del archivo en la base de datos
      const userId = req.user.id; // El ID del usuario disponible en req.user.id
      const sql = 'INSERT INTO audio (userId, audio_filename) VALUES (?, ?)';
      const values = [userId, audioFilename];

      // Ejecutar la consulta para actualizar la columna audio_filename en la tabla de audio
      pool.query(sql, values, (error, results) => {
        if (error) {
          console.error('Error al guardar el nombre del archivo de audio en la base de datos:', error);
        }
      });
    }
  }
});

module.exports = {
  storage: storage,
};


// MIDDLEWARES
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true})); // Para analizar solicitudes con formato de formulario
//false =>solo aceptar nombres o formatos en string. No imágenes o videos
app.use(bodyParser.json());
app.use(cookieParser('isramysqlnodemysql'))
app.use(validator()); // Middleware para validar las solicitudes usando express-validator
//app.use(upload.single('audio')); // Middleware Multer //usa 'audio' en el nombre del campo de archivo en tu formulario


// Configurar MySQLStore para almacenar la sesión en la base de datos. Flash utilizará esta sesión (ver Global variables)
const { database } = require('./keys.js');

const pool = mysql.createPool(database);

// SESION
app.use(session({
  secret: 'isramysqlnode',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database) //aqui se configura donde se guarda la sesion en mi base de datos por ello el paquete: importar MySQLStore (ver archivo readme)
}));
app.use(flash()); //Módulo flash para enviar mensajes al usuario (cliente en el navegador)
app.use(passport.initialize());
app.use(passport.session());

// Variables globales son utilizadas a través de passport (aquí lee de la base de datos)
app.use((req, res, next) => {
  app.locals.message = req.flash('message'); //message da los mensajes de error (ver en passport.js y message.ejs)
  app.locals.success = req.flash('success');
  app.locals.user = req.user; //ver readme//ver profile.ejs en views
  next();
});
// Middleware de Multer para admitir cualquier tipo de archivo
app.use(multer({ storage: storage }).any());


// RUTAS. Aquí usamos las rutas buscándolas en sus carpetas
app.use(indexRouter);
app.use(require('./routes/authentication'));
app.use(require('./routes/comunidad'));
app.use('/profile/edit', require('./routes/editProfile'));
app.use(require('./routes/upload'));
app.use(require('./routes/feed'));



// Ruta para archivos estáticos en la carpeta PUBLIC (css/styles.css)
app.use(express.static(path.join(__dirname, 'public')));


// Starting
app.listen(app.get('port'), () => {
  console.log('Server is in port', app.get('port'));
});
