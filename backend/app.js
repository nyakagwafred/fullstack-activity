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
app.get('/api/products', (req, res, next) =>{
    Product.find().then(
        (products) => {
            res.status(200).json({products});
        }
    ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
);
})

//GET  /api/products/:id Returns the product with the provided  _id  as  { product: Product }
app.get('/api/products/:id', (req, res, next) =>{
    Product.findOne({_id: req.params.id}).then(
        (product) => {
            res.status(200).json({product});
        }
    ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        });
})

//POST  /api/products Creates a new product in the database The request body must contain:
app.post('/api/products', (req, res, next) => {
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      inStock: req.body.inStock
    });
    product.save().then(
      () => {
        res.status(201).json({ product });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });

//PUT  /api/products/:id Updates the product with the provided  _id  with the data provided in the request body
app.put('/api/products/:id', (req, res, next) => {
    const product = new Product({
      _id: req.params.id,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      inStock: req.body.inStock
    });
    Product.updateOne({_id: req.params.id}, product).then(
      () => {
        res.status(201).json({
             message: 'Updated!' 
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });

//DELETE  /api/products/:id Deletes the product with the provided  _id Returns the following object:  { message: 'Deleted!' }
app.delete('/api/products/:id', (req, res, next) => {
    Product.deleteOne({_id: req.params.id}).then(
      () => {
        res.status(200).json({
          message: 'Deleted!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });


module.exports = app;