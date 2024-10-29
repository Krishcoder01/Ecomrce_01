const {cartModel ,cartValidator} = require('../models/cartModel');
const {productModel} = require('../models/productModel');

async function getCart (req , res , next){
    try {
        const user = req.user;
        let cart = await cartModel.find({user : user.id}).populate('products.productId');
        console.log(cart.forEach( p => console.log(p.products)));
        res.render('cart' , {cart});
    } catch (error) {
        next(error);
    }
}

async function addToCart (req , res , next){
    try {
        const user = req.user;
        const product = await productModel.findById(req.params.id);
        // console.log(product)
       
        // const error = await cartValidator({product });
        // console.log(error + "error hai")
        // if(error) return res.status(400).send(error);


        let cart = await cartModel.findOne({user : user.id});
        console.log(product.id + "product id");
        
        if(cart){
            let index = cart.products.findIndex( (p) => p.productId.toString() == product._id);
            console.log(index);
            if(index !== -1){
                cart.products[index].quantity += 1;
                cart.totalPrice += product.price;
            }else{
                cart.products.push({ productId : product._id , quantity : 1});
                cart.totalPrice += product.price;
            }
            cart = await cart.save();
        }else{
            cart = await cartModel.create({user : user.id , products : [{ productId : product._id , quantity : 1}] , totalPrice : product.price});
        }
        res.redirect('back');

    } catch (error) {
        next(error);
    }
}

async function deleteCart (req , res , next){
    try {
        //start karna hai

        let cart = await cartModel.findById({user : req.user._id});
        let product = await productModel.findById(req.params.id);
        let index = cart.products.findIndex( p => p.productID == product._id);
        if(index !== -1){
            cart.products[index].quantity -= 1;
            cart.totalPrice -= product.price;
            if(cart.products[index].quantity == 0){
                cart.products.splice(index , 1);
            }
            cart = await cart.save();
        }else{
            return res.status(404).send('Product not found in cart');
        }
        res.json(cart);
    } catch (error) {
        next(error);
    }
}

module.exports = {getCart , addToCart , deleteCart};