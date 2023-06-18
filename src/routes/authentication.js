const express = require('express');
const router = express.Router();
const passport = require('passport');

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth'); //Si no estás logueado te devuelve al formulario de logueo.


// SIGNUP (registrarse)
router.get('/signup', (req, res) => {
  res.render('auth/signup', { title: 'registrate', showProfileLink: false });
});

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/comunidad', // Redirige a la página de comunidad para rellenar el comFormularioMatch
  failureRedirect: '/signup',
  failureFlash: true
}));

// SIGNIN (iniciar sesion) 
router.get('/signin', (req, res) => {
  res.render('auth/signin', {title: 'loguearse', showProfileLink: false});
});

//  => esta ruta, una vez el usuario está logueado, se va a: views/profile.ejs
router.post('/signin', (req, res, next) => {
  req.check('username', 'Username is Required').notEmpty();
  req.check('password', 'Password is Required').notEmpty();
  const errors = req.validationErrors();
  if (errors.length > 0) {
    req.flash('message', errors[0].msg);
    res.redirect('/signin');
  }
  passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true
  })(req, res, next);
});

// LOGOUT (finalizar sesion)
router.get('/logout', (req, res) => {
  req.logOut(); //Passport proporciona este método.
  res.redirect('/');
});


// PROFILE
router.get('/profile', isLoggedIn, async (req, res) => {
  // Verificar si el usuario está autenticado
  if (req.isAuthenticated()) {
    const { username, fullname, email, availability, age, gender, level } = req.user;
    try {
      // Obtener datos del usuario desde la base de datos
      const userData = await pool.query('SELECT formulario_completado FROM users WHERE username = ?', [username]);

      if (userData.length > 0) {
        const user = userData[0];
        res.render('profile', {
          title: 'Profile',
          username,
          fullname,
          email,
          availability,
          age,
          gender,
          level,
          showProfileLink: true,
          showCard: false
        });
      } else {
        req.flash('message', 'Usuario no encontrado.');
        return res.redirect('/signin');
      }
    } catch (error) {
      console.log(error);
      req.flash('message', 'Ocurrió un error al cargar la página.');
      return res.redirect('/profile');
    }
  } else {
    res.redirect('/signin'); // Redirigir al formulario de inicio de sesión si el usuario no está autenticado
  }
});



module.exports = router;
