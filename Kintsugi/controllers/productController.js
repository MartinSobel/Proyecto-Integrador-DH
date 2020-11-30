const fs = require('fs');
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
        return res.render("product_edit", {products});
    },
    renderProductAdd: function (req, res, next) {
        return res.render("product_add");
    },
    store: function(req, res, next) {
        let newProduct= {
            id: req.body.id,
            name: req.body.name,
            desc: req.body.desc,
            price: req.body.price,
            cat: req.body.cat,
            img: req.files[0].filename
        }
        products.push(newProduct);
        let productsJSON = JSON.stringify(products);
        fs.writeFileSync(__dirname + "/../database/products.json", productsJSON);
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
                res.render("product_edit_detail",{products, productFound})
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