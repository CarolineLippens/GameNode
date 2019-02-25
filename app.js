const express = require("express");
const app = express();
const http = require('http').Server(app);
const pug = require('pug');
const io = require('socket.io').listen(http);
const port = 3000;


//Liaison index.pug et dosier css
app.set('view engine', 'pug');
app.use(express.static('./assets'));


//Travail et renvois dans l'index
app.get('/',(req, res) => {
  res.statusCode = 200;
  
  // recup url pour recupere les parametre d'url
  // const query = url.parse(req.url, true).query;
  // query.name == name passer dans l'url

  //Renvois de l'index.pug 
  res.render('index');
  //Renvois de l'index + paramètre a récucperer sur pug
  // res.render('index', { name : name, nbPers : i});
  
  
});

io.on('connection', function(socket) {
  console.log('user connected');
});

//Envois au port
http.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
// Quand un client se connecte, on le note dans la console
