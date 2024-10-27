const {productModel , productValidator } = require('../models/productModel');

async function createProduct (req , res , next){
    try {
        const {name , price , description , quantityStock , image} = req.body;
        if( name == undefined || price == undefined  || description == undefined || quantityStock == undefined || image == undefined )
            return res.status(200).send("all details are required");
        
        const error = await productValidator({name , price  , description , quantityStock , image});
        if(error) return res.status(400).send(error);
        
        let newProduct = await productModel.create({
            name , price , description , quantityStock , image
        });
        res.redirect('back');
    } catch (error) {
        next(error);
    }
}

async function getProducts (req , res , next){
    try {
        let products = await productModel.find({});
        res.json(products);
    } catch (error) {
        next(error);
    }
}

async function getProductById (req , res , next){
    try {
        let product = await productModel.findById(req.params.id);
        if(!product) return res.status(404).send("Product not found");
        res.json(product);
    } catch (error) {
        next(error);
    }
}

async function updateProduct (req , res , next){
    try {
        const {name , price , category , description , quantityStock , image} = req.body;
        if( name == undefined || price == undefined || category == undefined || description == undefined || quantityStock == undefined || image == undefined )
            return res.status(200).send("all details are required");
        
        const error = await productValidator({name , price , category , description , quantityStock , image});
        if(error) return res.status(400).send(error);
        
        let updatedProduct = await productModel.findByIdAndUpdate(req.params.id , {
            name , price , category , description , quantityStock , image
        } , {new : true});
        res.json(updatedProduct);
    } catch (error) {
        next(error);
    }
}

async function deleteProduct (req , res , next){
    try {
        let product = await productModel.findByIdAndDelete({_id : req.body.idey });
        if(!product) return res.status(404).send("Product not found");
        res.redirect('back');
    } catch (error) {
        next(error);
    }
}

module.exports = { createProduct , getProducts , getProductById , updateProduct , deleteProduct };

