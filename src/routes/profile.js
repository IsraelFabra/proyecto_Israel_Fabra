/* Traer aquí todo lo de profile que hay en authentication */

const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');

const { storage } = require('../index');

const upload = multer({ storage });

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth'); //Si no estás logueado te devuelve al formulario de logueo.






module.exports = router;
  




  