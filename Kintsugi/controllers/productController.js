const fs = require('fs');
const db = require('../database/models');
var products = JSON.parse(fs.readFileSync(__dirname + "/../database/products.json"));


const productController = {
    renderMenu: function (req, res, next) {
        db.Product.findAll().then(function(products){
            return res.render("menu", {products});
        })
    },
    addToCart: function (req, res, next){
        // Consultamos si el usuario tiene un carrito creando en la base de datos
        db.User.findOne({
            where: {
                email: req.session.email
            }
        }).then(function(result){
            req.session.userid = result.id;
            db.Cart.findOne({
                where:{
                    user_id: req.session.userid,
                    status: 'open'
                }
            }).then((result)=>{
                // Si hay un carrito creado, agrega el producto
                if(result != null){
                    db.Cart_Product.create({
                        cart_id: result.id,
                        product_id: req.params.id
                    })
                    db.Product.findByPk(req.params.id)
                        .then(function(prod){
                            db.Cart.update({total: result.total + prod.price}, {
                                where: {
                                  id: result.id
                                }
                            })
                    });
                    return res.redirect("/products/menu");
                // Si no, crea el carrito y agrega el producto
                } else {
                    db.Cart.create({
                        user_id: req.session.userid
                    }).then(function(result){
                        db.Cart_Product.create({
                            cart_id: result.id,
                            product_id: req.params.id
                        })
                        db.Product.findByPk(req.params.id)
                        .then(function(prod){
                            db.Cart.update({total: prod.price}, {
                                where: {
                                  user_id: req.session.userid
                                }
                            })
                        })
                        return res.redirect("/products/menu");
                    }) 
                }
            })
        })  
    },
    renderProductDetail: function (req, res, next) {
        db.Product.findByPk(req.params.id).then(function(product){
            res.render('product_detail', {product});
        })
    },
    renderProductCart: function (req, res, next) {
        // ENCONTRAR EL CARRITO ABIERTO DEL USUARIO LOGUEADO
        console.log("EMAAAILLL " + req.session.email)
        db.User.findOne({
            where: {
                email: req.session.email
            }
        }).then(function(result){
            console.log("USUARIOOOO " + result.id)
            db.Cart.findOne({
                where: {
                    user_id: result.id
                }
            }).then(function(carrito){
                console.log("CARRITOOOO " + carrito.id)
                // EXTRAER ID DE ESE CARRITO y EXTRAER TODOS LOS PRODUCTS ID DENTRO DE ESE CART-PRODUCT
                db.Cart_Product.findAll({
                    where: {
                        cart_id: carrito.id
                    }
                }).then(function(prods){
                    // CONSEGUIR TODOS LOS PRODUCTOS A PARTIR DE CADA PROD ID 
                    console.log("PRODUCTOOOOO " + prods[0].product_id)
                    let productsArr = []
                    for (let i = 0; i < prods.length; i++) {
                        db.Product.findByPk(prods[i].product_id)
                            .then(function(prod){
                                products.push(prod)
                            })   
                    } console.log("ARRAY DE PRODSSS " + productsArr)
                })
            })
        })
        // ENVIAR ESOS PRODUCTS ID A LA VISTA
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
            db.Product.findByPk(req.params.id).then(function(product){
                return res.render("pm_edit",{product}) 
            }).catch(function(error){
                console.log(error)
                res.send("No se encontró el producto");
            })
        },
    update: function(req, res, next) {
        console.log(req.body.desc);
        db.Product.update({
            name: req.body.name,
            description: req.body.desc,
            price: req.body.price,
            category_id: req.body.cat,
            image: req.files[0].filename
        },{
        where: {
            id: req.params.id
            }
        }).then(function(){
            res.redirect("/product_manager/edit/"+ req.params.id)
        }).catch(function(error){
            console.log(error)
            res.send('error')
            });
    },
    destroy: function(req,res,next){
        db.Product.destroy({
            where:{id:req.params.id}
        }).then(function(){
            return res.redirect("/product_manager/");
        })
    },
}

module.exports = productController;