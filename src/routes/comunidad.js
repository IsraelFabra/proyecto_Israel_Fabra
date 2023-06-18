const express = require('express');
const router = express.Router();
const passport = require('passport');

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');


 
// RUTA COMUNIDAD => esta ruta comprueba que el usuario está logueado y se va a: views/profile.ejs
// Después que views/profile clique en 'unirse' accederá a la ruta 'comunidad' para rellenar comFormularioMatch.ejs:
router.get('/comunidad', isLoggedIn, async (req, res) => {
  const { username } = req.user;

  try {
    //Bandera formulario_completado en DB
    const existingUser = await pool.query('SELECT formulario_completado FROM users WHERE username = ?', [username]);

    if (existingUser.length > 0 && existingUser[0].formulario_completado) {
      res.render('comunidad/comunidad', { title: 'Comunidad meetup Guitar', username: username, showForm: false, showCard: false, showProfileLink: true, mensaje: '' });
    } else {
      res.render('comunidad/comunidad', { title: 'Comunidad meetup Guitar', showForm: true, showCard: true, showProfileLink: false, mensaje: '' });
    }
  } catch (error) {
    console.log(error);
    req.flash('message', 'Ocurrió un error al cargar la página.');
    res.redirect('/comunidad');
  }
});



 
// Al enviar el formulario comFormularioMatch, el usuario se quedará en comunidad.
router.post('/comunidad', isLoggedIn, async (req, res) => {
  const { age, gender, level, availability } = req.body;
  const { username } = req.user;

  try {
    const existingUser = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

    if (existingUser.length > 0) {
      const updatedUser = {
        age,
        gender,
        level,
        availability,
        formulario_completado: true
      };

      await pool.query('UPDATE users SET ? WHERE username = ?', [updatedUser, username]);

      res.redirect('/profile'); // Redirige a profile después de completar el formulario
    } else {
      req.flash('message', 'El usuario no existe.');
      res.redirect('/comunidad'); // Redirige a la misma ruta (/comunidad) en caso de error????????
    }
  } catch (error) {
    console.log(error);
    req.flash('message', 'Ocurrió un error al procesar el formulario.');
    res.redirect('/comunidad'); // Redirige a la misma ruta (/comunidad) en caso de error
  }
});



module.exports = router;