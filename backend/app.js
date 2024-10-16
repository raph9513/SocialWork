const express = require('express');
const rateLimit = require("express-rate-limit");

require("dotenv").config();        //met les valeurs de donnée importante dans un fichier .env

const helmet = require('helmet')  //configure de manière appropriée des en-têtes HTTP pour protéger de certaines vulnérabilités




const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // 100 requests per windowMs
});


const app = express();
app.use(express.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
;

//ROUTES
const userRoutes = require('./route/user');
const postRoutes = require('./route/post');
const commentRoutes = require('./route/comment');
app.use('/api/users', userRoutes); 
app.use('/api/auth/posts', postRoutes); 
app.use('/api/auth/comments', commentRoutes); 




app.use(helmet());
app.use(limiter);







module.exports = app;