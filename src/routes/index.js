const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../lib/auth');


// RUTA HOME
router.get('/', (req, res) => {
  // res.render('main', {title: 'Meetup Guitar'}); 
  // Comprobar si el usuario está autenticado
  if (req.isAuthenticated()) {
    const username = req.user.username; // Obtener el nombre de usuario desde el objeto user
    // Mostrar el enlace al perfil si el usuario está autenticado
    res.render('main', { title: 'Meetup Guitar', navigation: '/partials/navigation', showProfileLink: true, username: username });
  } else {
    // No mostrar el enlace al perfil si el usuario no está autenticado
    res.render('main', { title: 'Meetup Guitar', navigation: '/partials/navigation', showProfileLink: false });
  }
});


// Ruta para mi página de desarrollador
router.get('/portafolioIndexIsra', (req, res) => {
  res.render('portafolioIndexIsra', { title: 'pagina contacto' })
})


module.exports = router;



