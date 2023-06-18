//Aquí se hace un update mediante dos pasos: GET + POST (más abajo en un sólo paso: UPDATE)

const express = require('express');
const router = express.Router();
const passport = require('passport');
const fs = require('fs');
const path = require('path');

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth'); //Si no estás logueado te devuelve al formulario de logueo.


// Ruta GET para mostrar el formulario de edición de perfil
router.get('/', isLoggedIn, async (req, res) => {
  try {
    const { username, fullname, email, availability, age, gender, level } = req.user;

    res.render('profile', {
      title: 'Perfil',
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
  } catch (error) {
    console.log(error);
    req.flash('message', 'Ocurrió un error al cargar la página de perfil.');
    return res.redirect('/profile');
  }
});

// Ruta POST para procesar los datos del formulario de edición de perfil
router.post('/', isLoggedIn, async (req, res) => {
  const { username, fullname, email, availability, age, gender, level } = req.user;
  const { newUsername } = req.body;

  try {
    // Actualizar el nombre de usuario en el objeto de usuario almacenado en req.user
    req.user.username = newUsername;

    // Actualizar el nombre de usuario en la base de datos
    await pool.query(
      'UPDATE users SET username = ? WHERE username = ?',
      [newUsername, username]
    );

    res.render('profile', {
      title: 'Perfil',
      username: newUsername,
      fullname,
      email,
      availability,
      age,
      gender,
      level,
      showProfileLink: true,
      showCard: false,
      success: 'Nombre de usuario actualizado correctamente'
    });
  } catch (error) {
    console.log(error);
    req.flash('message', 'Ocurrió un error al actualizar el nombre de usuario');
    res.redirect('/profile');
  }
});



// Ruta gestiona para mostrar el formulario de carga de foto de perfil (fetch)
router.get('/photo/form', isLoggedIn, async (req, res) => {
  try {
    res.render('comunidad/uploadPhotoForm', { title: 'Carga de Foto' });
  } catch (error) {
    console.log(error);
    req.flash('message', 'Ocurrió un error al cargar el formulario de carga de fotos.');
    res.redirect('/profile');
  }
});


// Ruta POST para procesar la foto de perfil del usuario
router.post('/photo', isLoggedIn, async (req, res) => {
  const { username } = req.user;
  
  try {
    // Verificar si se seleccionó un archivo
    if (!req.file) {
      req.flash('message', 'Debes seleccionar una foto');
      return res.redirect('/profile');
    }

    // Obtener el nombre del archivo y la ubicación temporal
    const { originalname, path: tempPath } = req.file;
    
    // Definir la ubicación y el nombre del archivo final en el servidor
    const targetPath = path.join(__dirname, '..', 'uploads', username, 'fotoUsuario.jpg');

    // Mover el archivo a su ubicación final
    fs.rename(tempPath, targetPath, async (error) => {
      if (error) {
        console.log(error);
        req.flash('message', 'Ocurrió un error al guardar la foto');
        return res.redirect('/profile');
      }
      
      // Actualizar la ruta de la foto en la base de datos
      const photoPath = `/upload/${username}/fotoUsuario.jpg`; // Ruta relativa de la foto en la base de datos

      await pool.query('UPDATE users SET fotoUsuario = ? WHERE username = ?', [`/upload/${username}/fotoUsuario.jpg`, username]);

      req.flash('success', 'Foto de perfil actualizada correctamente');
      res.redirect('/profile');
    });
  } catch (error) {
    console.log(error);
    req.flash('message', 'Ocurrió un error al procesar la foto de perfil');
    res.redirect('/profile');
  }
});

module.exports = router;
