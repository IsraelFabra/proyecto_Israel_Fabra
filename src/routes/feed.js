const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');

const { storage } = require('../index');

const upload = multer({ storage });

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth'); //Si no estás logueado te devuelve al formulario de logueo.


// Ruta para mostrar el feed de canciones
router.get('/feed', isLoggedIn, async (req, res) => {
  const { username } = req.user;

  try {
    // Obtener las canciones subidas por los usuarios desde la base de datos
    const sql = `
    SELECT audio.audio_filename, users.username, users.foto_filename, users.age, users.gender, users.level, users.availability
    FROM audio
    INNER JOIN users ON audio.userId = users.id
    ORDER BY users.username
`;  const songs = await pool.query(sql);

  const users = songs.reduce((acc, song) => {
    const existingUser = acc.find(user => user.username === song.username);
    if (existingUser) {
      existingUser.songs.push(song);
    } else {
      acc.push({
        username: song.username,
        foto_filename: song.foto_filename,
        songs: [song],
        age: song.age,
        gender: song.gender,
        level: song.level,
        availability: song.availability
      });
    }
    return acc;
  }, []);

    res.render('comunidad/feed', {
      title: 'Feed de canciones',
      showProfileLink: true, 
      songs: users,
      username,    
    });
  } catch (error) {
    console.log(error);
    req.flash('message', 'Ocurrió un error al cargar el feed de canciones');
    res.redirect('/comunidad/feed');
  }
});


// Ruta para procesar la carga de archivos
router.post('/upload', upload.fields([{ name: 'audioUsuario' }, { name: 'fotoUsuario' }]), (req, res) => {
  const { username } = req.user;
  const audioFile = req.files['audioUsuario'][0];
  const fotoFile = req.files['fotoUsuario'][0];
  const audioFilename = audioFile ? audioFile.filename : null;
  const fotoFilename = fotoFile ? fotoFile.filename : null;

  // Renderizar la respuesta con el nombre de usuario y los nombres de archivo
  res.render('comunidad/editProfile', { username, audioFilename, fotoFilename, title: 'Alimenta la comunidad', filename: null, showProfileLink: true });
});


module.exports = router;
