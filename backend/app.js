//mongodb+srv://dbuser001:<password>@cluster0-zggum.mongodb.net/test?retryWrites=true&w=majority
//dbuser001
//YCxQosQ0KQ2n6iJ8

const express = require('express');
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');
const Product = require('./models/product');

const app = express();
//DB Connect
mongoose.connect('mongodb+srv://dbuser001:YCxQosQ0KQ2n6iJ8@cluster0-zggum.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() =>{
  console.log('***Product DB Connected***');
})
.catch(()=>{
  console.log('Not Connected');
  console.log(error); 
});

//CORS resolve
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
//Body Pasrer
app.use(bodyParser.json());

//Routes implementation
//GET  /api/products :: Returns all products in the database as  { products: Product[] }

//GET  /api/products/:id Returns the product with the provided  _id  as  { product: Product }

//POST  /api/products Creates a new product in the database The request body must contain:

//PUT  /api/products/:id Updates the product with the provided  _id  with the data provided in the request body

//DELETE  /api/products/:id Deletes the product with the provided  _id Returns the following object:  { message: 'Deleted!' }



module.exports = app;