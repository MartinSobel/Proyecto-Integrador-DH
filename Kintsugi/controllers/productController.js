const fs = require('fs');
const db = require('../database/models');
var products = JSON.parse(fs.readFileSync(__dirname + "/../database/products.json"));


const productController = {
    renderMenu: function (req, res, next) {
        return res.render("menu");
    },
    renderProductDetail: function (req, res, next) {
        return res.render("product_detail");
    },
    renderProductCart: function (req, res, next) {
        return res.render("product_cart");
    },
    renderProductManager: function (req, res, next) {
        db.Product.findAll().then(function(products){
        return res.render("pm_index", {products});
        })
    },
    renderProductAdd: function (req, res, next) {
        return res.render("pm_add");
    },
    store: function(req, res, next) {
        
        db.Product.create({
            name: req.body.name,
            description: req.body.desc,
            price: req.body.price,
            category_id: req.body.cat,
            image: req.files[0].filename
        })
        res.redirect("/product_manager/")
    },
    renderProductEdit: function (req, res, next) {
            var idProduct = req.params.id;
            var productFound;
            for(var i=0;i < products.length;i++){
                if(products[i].id == idProduct){
                    productFound = products[i];
                    break;
                }
            }
            if(productFound){
                res.render("pm_edit",{products, productFound})
            }else{
                res.send("No se encontró el producto");
            }
    },
    update: function(req, res, next) {
        var idProduct = req.params.id;
        var editProducto2 = products.map(function(producto){
            if(producto.id == idProduct){
                let productoEditado = req.body;
                productoEditado.id = idProduct;
                return productoEditado;
            }
            return producto;
        });
        editProductsJSON = JSON.stringify(editProducto2);
        fs.writeFileSync(__dirname + "/../database/products.json",editProductsJSON);
        res.redirect("/product_manager/");
    },
    destroy: function(req,res,next){
        var idProduct = req.params.id;
        var productsDestroy = products.filter(function(product){
            return product.id != idProduct;
        });
        productsDestroyJSON = JSON.stringify(productsDestroy);
        fs.writeFileSync(__dirname + "/../database/products.json",productsDestroyJSON);
        return res.redirect("/product_manager/");
    },
}

module.exports = productController;