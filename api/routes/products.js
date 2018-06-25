var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const Product = require('../models/product');
const checkAuth = require('../middleware/check-auth');
router.post('/', checkAuth, (req, res, next) => {   
    console.log("Produc" + req);     
    Product
        .find()
        .then((products) => {
            res.status(200).json({                
                results: products
            });
        })        
        .catch(err => {
            console.log("Error while fetching product");
        })
    
});

router.get('/:productid', (req, res, next) => {    
    var id = req.params.productid;
    Product
        .findById(id)
        .then(result => {
            res.status(200).json({
                message: 'GET response for particular prduct',
                products: result
            });
        })
        .catch(err => {
            console.log("Error while fetching product");
        })
});

router.post('/', (req, res, next) => {    
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    product
        .save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'product created successfully',
                product: product
            });
        })
        .catch(err => {
            console.log(err);
        });    
});

router.patch('/:productid', (req, res, next) => {
    res.status(200).json({
        message: 'item updated ' + req.params.productid
    });
});

router.delete('/:productid', (req, res, next) => {

    Product
        .findOneAndRemove({_id: req.params.productid})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Item deleted succfully"
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })    
});

module.exports = router;