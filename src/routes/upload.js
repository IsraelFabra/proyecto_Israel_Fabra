const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require("multer");

const { storage } = require('../index'); // Importa la configuración de Multer desde index.js

const upload = multer({storage: storage});

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth'); //Si no estás logueado te devuelve al formulario de logueo.


// Ruta para que muestre: 'mensaje: 'Canción subida exitosamente!'
router.post('/upload', isLoggedIn, async (req, res) => {
  const { username } = req.user;
  const { title, description } = req.body;


  try {




    // Actualizar título y descripción en la tabla audio

/*      await pool.query('INSERT INTO audio (userId, audio_filename, title, description) VALUES (?, ?, ?, ?)', [req.user.id, req.files['audioUsuario'][0].filename, title, description]);
    console.log('Title:', req.body.title);
    console.log('Description:', req.body.description);
 */   
    
    


    //Bandera formulario_completado en DB
    const existingUser = await pool.query('SELECT formulario_completado FROM users WHERE username = ?', [username]);

    if (existingUser.length > 0 && existingUser[0].formulario_completado) {
      res.render('comunidad/comunidad', { title: 'Comunidad meetup Guitar', username: username, showForm: false, showCard: false, showProfileLink: true, mensaje: 'Canción subida exitosamente! Ves a feed.' });
    } else {
      res.render('comunidad/comunidad', { title: 'Comunidad meetup Guitar', showForm: true, showCard: true, showProfileLink: false, mensaje: 'Canción No Subida' });
    }
  } catch (error) {
    console.log(error);
    req.flash('message', 'Ocurrió un error al cargar la página.');
    res.redirect('/comunidad');
  }
});


module.exports = router;
