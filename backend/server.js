const express = require('express')
const app = express()
const mongoose = require('mongoose');
const path = require('path');
const port = 3080
const morgan = require("morgan");  

app.use(morgan("dev")); 

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');



mongoose.connect('mongodb+srv://alix:raku3louis@cluster0.buobr.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

// Permet en configurant les headers, de communiquer entre l'application du FrontEnd avec celle du BackEnd
// Pour permettre des requêtes cross-origin (et empêcher des erreurs CORS), des headers spécifiques de contrôle d'accès doivent être précisés pour tous les objets de réponse.
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(express.static('images'));
  app.use(express.static('backend'));


app.use('/api/auth', userRoutes);
app.use('/api/post', postRoutes);



app.listen(port);