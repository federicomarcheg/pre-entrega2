const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    category: {type: String, required: true},
    availability: {type: Boolean, required: true}
});

module.exports = mongoose.model('product', productSchema);


const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
    products: [
        {
            product: {type mongoose.Schema.Types.ObjectId, ref: 'products'},
            quantity: { type: Number, required: true}
        }
    ]
});


const product = require('../models/product');

exports.getProducts = async (req, res) => {
    try {
        const {limit = 10, page = 1,
            sort, query } = req.query;
            const filter = query ? { $or: [{category: query}, {availability: query === 'true'}]} : {};
            const options = {
                limit: parseInt(limit),
                skip: (parseInt(page) -1 ) *
                parseInt(limit),
                sort: sort ? {price: sort === 'asc' ?  1: -1} : {}
            };


            const products = await 
            product.find(filter, null, options);
            const totalProducts = await
            ptoduct.countDocuments(filter);
            const totalPges = math.ceil(totalProducts / options.limit);

            res.json({
                status: 'sucess',
                payload: products,
                totalPages,
                prevPage: page > 1 ? page -1 : null,
                 
                nextPage: page < totalPages ?
                parseInt(page) + 1 : null,
                page: parseInt(page),
                hasPrevPage: page > 1,
                hasNextPage: page < totalPages,
                    
                    prevLink: page > 1 ? `/api/products?limit=${limit}&page=${page - 1}
                    &sort=${sort}&query=${query}` : null,
                           
                         nextLink: page < totalPages ?
                         `/api/products?limit${limit}&page=${parseInt(page) + 1}&sort=${sort}&query=${query}` : null
            });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};


const cart = require('../models/cart');

exports.deleteProductFromCart = async(req, res) => {
    try {
        const { cid, pid } = req.params;
        const cart = await
        Cart.findById(cid);
        cart.products =
        cart.products.filter(p => p.product.toString() !== pid);
        await cart.save();
        res.json({ status: 'sucess',
          message: 'product removed from cart' });
    } catch (error) {
        res.status(402).json({ status: 'error', message: error.message });
    }
};


exports.updateCart = async(req, res) => {
    try {
        const { cid } = req.params;
        const {products } = req.body;
        const cart = await
        cart.findByIdAndUpdate(cid, { products }, { new: true });
        res.json({ status: 'sucess', payload: cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};


exports.updateProductQuantityInCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const cart = await cart.findById(cid);
        const product =
        cart.products.find(p => p.product.toString() === pid);

        if (product) {
            product.quantity = quantity;
            await cart.save();
            res.json({ status: 'sucess', payload: cart });
        } else {
            res.status(404).json({ status: 'error', message: 'product not found in cart' });
        }
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};


exports.clearCart = async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await
        Cart.findByIdAndUpdate(cid, { products: []}, { new: true });
        res.json({ status: 'sucess', payload: cart});
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message});
    }
};


exports.getCartWithProducts = async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await
        Cart.findById(cid).populate('products.product');
        res.json({ status: 'sucess', payload: cart});
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};




const express = require('express');
const router = express.router();
const productController = require('../cpntrollers/productController');

router.get('/', productController.getProducts);


router.delete('/:cid/products/:pid',
    cartController.deleteProductFromCart);
    router.put('/:cid', cartCotroller.updateCart);
    router.put('/:cid/pructs/:pid', cartController.updateProductQuantityInCart);
    router.delete('/:cid', cartController.ClearCart);
    router.get('/:cid', cartController.getCartWithProducts);


module.exports = router;



const products = [
    { name: "Yerba Mate", price: 1500, stock: 500 , section: "comestibles", active: true},
    { name: "Yerba Orgánica", price: 1500, stock: 500 , section: "comestibles", active: true},
    { name: "Yerba Compuesta", price: 1500, stock: 500 , section: "comestibles", active: true},
    { name: "Café", price: 1500, stock: 450 , section: "comestibles", active: true},
    { name: "Té común", price: 1500, stock: 200 , section: "comestibles", active: true},
    { name: "Té de hierbas", price: 1500, stock: 200 , section: "comestibles", active: true},
    { name: "Té de manzanilla", price: 1500, stock: 200 , section: "comestibles", active: true},
    { name: "Té de boldo", price: 1500, stock: 200 , section: "comestibles", active: true},
    { name: "Mate Cocido", price: 1500, stock: 100 , section: "comestibles", active: true},
    { name: "Azúcar", price: 1200, stock: 100, section: "comestibles", active: true},
    { name: "Dulce de leche", price: 1200, stock: 450 , section: "comestibles", active: true},
    { name: "Galletitas", price: 1200, stock: 500 , section: "comestibles", active: true},
    { name: "Aceite", price: 1200, stock: 100 , section: "comestibles", active: false},
    { name: "Harina", price: 350, stock: 450, section: "comestibles", active: false},
    { name: "Manteca", price: 350, stock: 500 , section: "comestibles", active: false},
    { name: "Mermelada de durazno", price: 350, stock: 450 , section: "comestibles", active: false},
    { name: "Dentifrico", price: 350, stock: 100 , section: "higiene", active: false},
    { name: "Agua Mineral", price: 740, stock: 100, section: "bebidas", active: true},
    { name: "Vino", price: 740, stock: 50 , section: "bebidas", active: true},
    { name: "Cerveza", price: 740, stock: 100 , section: "bebidas", active: true},
    { name: "Gancia", price: 740, stock: 200 , section: "bebidas", active: true},
    { name: "Fernet", price: 2300, stock: 100, section: "bebidas", active: true},
    { name: "Gaseosa", price: 2300, stock: 450 , section: "bebidas", active: true},
    { name: "Leche", price: 2300, stock: 100 , section: "comestibles", active: true},
    { name: "Crema", price: 2300, stock: 500 , section: "comestibles", active: true},
    { name: "Yogurt", price: 480, stock: 100 , section: "comestibles", active: true},
    { name: "Pan", price: 480, stock: 450 , section: "comestibles", active: true},
    { name: "Alfajor", price: 480, stock: 200 , section: "comestibles", active: true},
    { name: "Facturas", price: 480, stock: 100 , section: "comestibles", active: true},
    { name: "Cloro", price: 480, stock: 100 , section: "limpieza", active: true},
    { name: "Detergente", price: 480, stock: 100 , section: "limpieza", active: true}
  ];
  


  