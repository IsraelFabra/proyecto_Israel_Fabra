Mis disculpas por la confusión. Si deseas mostrar el contenido del archivo `users.ejs` en la vista `profile.ejs`, necesitarás realizar algunos cambios adicionales en tu código.

1. En primer lugar, asegúrate de tener la ruta en tu archivo de enrutamiento (`profile.js`) para manejar la solicitud de la vista de perfil y pasar los datos necesarios a la vista.

En tu archivo `profile.js`, importa los módulos necesarios y define la ruta para la vista de perfil. Aquí tienes un ejemplo básico:

```javascript
const express = require('express');
const router = express.Router();

// Importa el módulo isLoggedIn desde tu archivo lib/auth.js
const { isLoggedIn } = require('../lib/auth');

// Ruta para la vista de perfil
router.get('/profile', isLoggedIn, (req, res) => {
  // Aquí debes realizar una consulta a la base de datos para obtener los datos necesarios para la vista users.ejs
  // Supongamos que obtienes los datos de usuarios de la base de datos y los almacenas en la variable `usersData`
  const usersData = [
    { username: 'user1', fullname: 'User 1', availability: 'Available', age: 25, gender: 'Male', level: 'Beginner' },
    { username: 'user2', fullname: 'User 2', availability: 'Busy', age: 30, gender: 'Female', level: 'Intermediate' },
    // ...otros usuarios
  ];

  res.render('profile', { title: 'Perfil del usuario', usersData });
});

module.exports = router;
```

2. Luego, en tu vista `profile.ejs`, puedes utilizar los datos de `usersData` para mostrarlos en la tabla. Puedes iterar sobre el arreglo `usersData` y mostrar cada usuario en una fila de la tabla. Aquí tienes un ejemplo:

```html
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
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-7">
        <table class="table table-dark table-bordered table-hover">
          <thead>
            <tr>
              <td>username</td>
              <td>fullname</td>
              <td>availability</td>
              <td>age</td>
              <td>gender</td>
              <td>level</td>
            </tr>
          </thead>
          <tbody>
            <% usersData.forEach(user => { %>
              <tr>
                <td><%= user.username %></td>
                <td><%= user.fullname %></td>
                <td><%= user.availability %></td>
                <td><%= user.age %></td>
                <td><%= user.gender %></td>
                <td><%= user.level %></td>
              </tr>
            <% }) %>
          </tbody>
        </table>
      </div>
      <div class="col-md-5">
        <div class="card-body">
          <form action="/add" method="POST">
            <input
              type="text"
              name="username"
              placeholder="username"
              class="form-control mb-2"
              autofocus            
            />
  


            <button type="submit" class="btn btn-info">save customer</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  
  <%- include('../partials/footer') %>
</body>
</html>
```

En este ejemplo, asumimos que `usersData` es un arreglo de objetos que contiene los datos de los usuarios que deseas mostrar en la tabla. Utilizando la etiqueta de scriptlet `<% %>`, iteramos sobre el arreglo y mostramos cada usuario en una fila de la tabla.

Recuerda adaptar este código a tu estructura de archivos y rutas específica, y asegurarte de obtener los datos de los usuarios desde tu base de datos antes de renderizar la vista `profile.ejs`.



---------------------------------------------------------------------------------

* Para que muestre los datos del usuario en una tabla en el navegador (SELECT):

Para mostrar los datos del usuario en los `<td>` de la tabla en el archivo `usersData.ejs`, puedes utilizar la sintaxis de interpolación de EJS `<%= ... %>` para insertar los valores dinámicamente. Aquí tienes un ejemplo de cómo podrías hacerlo:

```ejs
<div class="container mt-5">
  <div class="row">
    <div class="col-md-7">
      <table class="table table-dark table-bordered table-hover">
        <thead>
          <tr>
            <td>username</td>
            <td>fullname</td>
            <td>availability</td>
            <td>age</td>
            <td>gender</td>
            <td>level</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><%= username %></td>
            <td><%= fullname %></td>
            <td><%= availability %></td>
            <td><%= age %></td>
            <td><%= gender %></td>
            <td><%= level %></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="col-md-5">
      <div class="card-body">
        <form action="/add" method="POST">
          <input
            type="text"
            name="username"
            placeholder="username"
            class="form-control mb-2"
            autofocus
          />
          <button type="submit" class="btn btn-info">Editar usuario</button>
        </form>
      </div>
    </div>
  </div>
</div>
```

En este ejemplo, asumí que el usuario tiene propiedades como `fullname`, `availability`, `age`, `gender` y `level`. Asegúrate de tener esos valores disponibles en tu código y pásalos como variables al renderizar la vista en tu archivo `authentication.js`.

Al renderizar la vista `usersData.ejs`, puedes pasar los datos del usuario en el objeto de opciones. Por ejemplo:

```javascript
res.render('profile/usersData', {
  title: 'Profile',
  username: req.user.username,
  fullname: req.user.fullname,
  availability: req.user.availability,
  age: req.user.age,
  gender: req.user.gender,
  level: req.user.level,
  showProfileLink: true
});
```

Asegúrate de tener los datos del usuario disponibles en `req.user` y reemplaza las propiedades con los nombres reales en tu código.

Con estos cambios, los datos del usuario deberían mostrarse en los `<td>` correspondientes en la tabla de la vista `usersData.ejs`.


---------------------------------------------------------------------------------