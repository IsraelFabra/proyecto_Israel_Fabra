DROP SCHEMA IF EXISTS db_links;
CREATE DATABASE db_links;

USE db_links;


-- USERS TABLE
CREATE TABLE users(
  id INT(11) NOT NULL,
  username VARCHAR(16) NOT NULL,
  password VARCHAR(60) NOT NULL,
  fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users 
  MODIFY password VARCHAR(255) NOT NULL;

ALTER TABLE users 
  ADD PRIMARY KEY (id);

ALTER TABLE users
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE users
 ADD email VARCHAR(255) NULL;

-- Del formulario comFormularioMatch.ejs
ALTER TABLE users ADD age INT(3) NOT NULL;
ALTER TABLE users ADD gender ENUM('masculino', 'femenino') NULL;
ALTER TABLE users ADD level ENUM('principiante', 'medio', 'avanzado');
ALTER TABLE users ADD availability TEXT;
ALTER TABLE users MODIFY COLUMN level ENUM('principiante', 'medio', 'avanzado') NULL;
ALTER TABLE users ADD formulario_completado BOOLEAN DEFAULT FALSE;

-- De Multer y del formulario comUpload.ejs
ALTER TABLE users ADD audio_filename VARCHAR(255) NULL;
ALTER TABLE users DROP COLUMN audio_filename;

-- De Multer y del formulario uploadPhotoForm.ejs
ALTER TABLE users ADD fotoUsuario VARCHAR(255) NULL;
ALTER TABLE users CHANGE fotoUsuario foto_filename VARCHAR(255) NULL;


DESCRIBE users;
SELECT * FROM users;



-- AUDIO TABLE
CREATE TABLE audio (
  idAudio INT(11) NOT NULL AUTO_INCREMENT,
  userId INT(11) NOT NULL,
  audio_filename VARCHAR(255) NOT NULL,
  -- Otros campos de información de la canción
  PRIMARY KEY (idAudio),
  FOREIGN KEY (userId) REFERENCES users(id)
);

-- Del formulario comUpload.ejs
ALTER TABLE audio
ADD COLUMN title VARCHAR(255) NOT NULL,
ADD COLUMN description TEXT NOT NULL;



-- ----------------------

show tables;
select * from sessions;

