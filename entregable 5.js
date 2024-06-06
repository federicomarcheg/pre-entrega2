const fs = require('fs/promises');
const path = require('path');

class ProductManager {
    constructor(filePath) {
        this.path = filepath;
        this.products = [];
        this.loadProducts();
    }

    async loadProducts() {
        try {
            const data = await
            fs.readFile(this.path, 'utf-8');
        } catch (error) {
            this.products = [];
        }
    }


    async saveProducts() {
        await fs.writeFile(this.path, JSON.stringify(this.products, null, 5))
    }

    async addProduct({title, description, price, thumbnail, code, stock}) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            throw new error ('Todos los campos son obligatorios');
        }


        if (this.products.some(product => product.code === code)) {
            throw new error('El producto con este código ya existe');
        }

        const newProduct = {
            id: this.products.length ?
            this.products[this.products.length - 1]. id + 1 : 1,

           title: "manzana",
           description: "comestible",
           price: 1500,
           thumbnail: "https://www.istockphoto.com/es/fotos/manzana-red-delicious",
           code: "3224",
           stock: "200",

        
        };


        this.products.push(newProduct);
        await this.saveProducts();
        return newProduct;
       
    }

    async getProducts() {
        return this.products;
    }

    async getProductById(id) {
        const product = 
        this.products.find(product => product.id === id);
        if (!product) {
            throw new error("extraviado");
        }
        return product;
    }

    async updateProduct(id, updatedFields) {
        const productIndex = 
        this.products.findIndex(product => product.id === id);
        if (productIndex === -1) {
            throw new Error("extraviado");
        }

        this.products.splice(productIndex, 1);
        await this.saveProducts();
    }
     



}

module.exports = ProductManager;



const express = require('express');
const ProductManager = require('./ProductManager');
const app = express();
const port = 8080;

const productManager = new 
productManager(path.join(__dirname, 'products.json'));

app.use(express.json());


app.get('/api/products', async (req, res) => {
    try {
        const products = await
        productsManager.getProducts();
        const limit = parseInt(req.query.limit)
        || products.length;
        res.json(products.slice(0, limit));
    } catch (error) {
        res.status(500).send(error.mensage);
    }
});


app.post('/api/products', async (req, res) =>{
    try {
        const newProduct = await 
        productManager.addProduct(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(404).send(error.mensage);
    }
});


app.put('/api/products/:pid', async (req, res) => {
    try {
        const updatedProduct = await
        productManager.updateProduct(parseInt(req.params.pid), req.body);
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).send(error.mensage);
    }
});


app.delete('/api/produts/:pid' , async (req, res) => {
    try {
        await productManager.deleteProducts(parseInt(req.params.pid));
        res.status(204).send();

    } catch (error) {
        res.status(404).send(error.mensage);
    }
});


app.listen(port, () => {
    console.log(`El servidor se está ejecutando en el puerto ${port}`);
});



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
  


  