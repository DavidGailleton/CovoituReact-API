const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const productsRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');
// const checkPostRoutes = require('./routes/isAlreadyPost');
const auth = require('./middleware/is-auth');

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use('/auth', authRoutes);

app.use('/products', productsRoutes);

app.use(auth);

//connexions a la BDD
mongoose
  .connect(
    'mongodb+srv://David:Adm1n069@cluster0.ov3vohk.mongodb.net/Covoitureact?retryWrites=true&w=majority',
  )
  .then((result) => {
    app.listen(3003, () => {
      console.log('App is listening on port 3003');
    });
  })
  .catch((e) => console.log('Connexion a la BDD echoue' + e));
