const fs = require('fs');
const db = require('../database/models');
var products = JSON.parse(fs.readFileSync(__dirname + "/../database/products.json"));


const productController = {
    renderMenu: function (req, res, next) {
        db.Product.findAll().then(function(products){
            return res.render("menu", {products});
        })
    },
    renderMenuRolls: function (req, res, next) {
        db.Product.findAll({where:{category_id: 1}
        }).then(function(products){
            return res.render("menu", {products});
        })
    },
    renderMenuMixed: function (req, res, next) {
        db.Product.findAll({where:{category_id: 2}
        }).then(function(products){
            return res.render("menu", {products});
        })
    },
    renderMenuSnacks: function (req, res, next) {
        db.Product.findAll({where:{category_id: 3}
        }).then(function(products){
            return res.render("menu", {products});
        })
    },
    renderMenuSalads: function (req, res, next) {
        db.Product.findAll({where:{category_id: 4}
        }).then(function(products){
            return res.render("menu", {products});
        })
    },
    renderMenuTempura: function (req, res, next) {
        db.Product.findAll({where:{category_id: 5}
        }).then(function(products){
            return res.render("menu", {products});
        })
    },
    renderMenuDessert: function (req, res, next) {
        db.Product.findAll({where:{category_id: 6}
        }).then(function(products){
            return res.render("menu", {products});
        })
    },
    renderMenuDrinks: function (req, res, next) {
        db.Product.findAll({where:{category_id: 7}
        }).then(function(products){
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
    addAnother: function (req, res, next){
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
                return res.redirect("/products/cart");
            })
        })  
    },
    deleteOne: function (req, res, next) {
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
            }).then((cart)=>{
                db.Product.findByPk(req.params.id)
                    .then(function(prod){
                        db.Cart.update({total: cart.total - prod.price}, {
                            where: {
                                id: cart.id
                            }
                        })
                }).then(e => {
                    db.Cart_Product.findOne({where:{product_id: req.params.id, cart_id: cart.id}})
                    .then(prodToDelete =>{
                        db.Cart_Product.destroy({where:{id: prodToDelete.id}})
                        return res.redirect("/products/cart");
                    })
                })
            })
        }) 
    },
    renderProductCart: function (req, res, next) {
        db.User.findOne({
            where: {
                email: req.session.email
            }
        }).then(function(result){
            db.Cart.findOne({
                where: {
                    user_id: result.id,
                    status: "open"
                }, include: [{association: 'products'}]
            }).then(cart => {
                db.Cart_Product.findAll({where:{cart_id: cart.id}})
                    .then(cartprod => {
                        var prodsid = []
                        for(let i = 0 ; i < cartprod.length ; i++){
                            prodsid.push(cartprod[i].product_id)
                        }

                        function countArray(original) {
                            var compressed = [];
                            var copy = original.slice(0);
                            for (var i = 0; i < original.length; i++) {
                                var myCount = 0;	
                                for (var w = 0; w < copy.length; w++) {
                                    if (original[i] == copy[w]) {
                                        myCount++;
                                        delete copy[w];
                                    }
                                }
                                if (myCount > 0) {
                                    var a = new Object();
                                    a.id = original[i];
                                    a.count = myCount;
                                    compressed.push(a);
                                }
                            }
                            return compressed;
                        };
                        
                        var prodCount = countArray(prodsid);

                        res.render("product_cart", {cart, prodCount})
                    })
            }).catch(function(e){
                console.log(e)
                var cart = {products: []}
                res.render("product_cart", {cart})
            })
        })
    },
    renderProductDetail: function (req, res, next) {
        db.Product.findByPk(req.params.id).then(function(product){
            res.render('product_detail', {product});
        })
    },
    closeCart: function (req, res, next) {
        db.User.findOne({
            where: {
                email: req.session.email
            }
        }).then(function(result){
            db.Cart.findOne({
                where:{
                    user_id: req.session.userid,
                    status: 'open'
                }
            }).then(cart => {
                db.Cart.update({status: "closed"}, {
                    where: {
                        id: cart.id
                    }
                })
                res.redirect('/products/checkout')
            }).catch(e =>{console.log(e)})
        })
    },
    renderCheckout: function (req, res, next) {
        return res.render("checkout");
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
        }).then(e =>{
            res.redirect("/product_manager/")
        }).catch(function(e){
            console.log("CATCH DE PM ADD > STORE" + e)
        })
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
        if(req.files[0] == undefined){
        db.Product.findByPk(req.params.id)
        .then(prod =>{
            db.Product.update({
                name: req.body.name,
                description: req.body.desc,
                price: req.body.price,
                category_id: req.body.cat,
                image: prod.image
            },{
            where: {id: req.params.id}
                }).then(function(){
                    res.redirect("/product_manager/")
                }).catch(function(error){
                    console.log(error)
                    res.send('error')
                    });
        }) } else {
            db.Product.update({
                name: req.body.name,
                description: req.body.desc,
                price: req.body.price,
                category_id: req.body.cat,
                image: req.files[0].filename
            },{
            where: {id: req.params.id}
                }).then(function(){
                    res.redirect("/product_manager/")
                }).catch(function(error){
                    console.log(error)
                    res.send('error')
                    });
        }
    },
    destroy: function(req,res,next){
        db.Cart_Product.findAll({
            where:{product_id: req.params.id}
        }).then(carts =>{
            console.log("CAAAARTTSSS" + carts)
            db.Cart_Product.destroy({
                where: {product_id: req.params.id}
            }).then(e =>{
                var cartsid = []
                for (let i = 0; i < carts.length; i++) {
                    cartsid.push(carts[i].cart_id)  
                }
                console.log("CAAAARTTSSS IIDDD" + cartsid)
                db.Cart.destroy({
                    where:{id:cartsid, status: "open"}
                }).then(e =>{
                    db.Product.destroy({
                        where:{id: req.params.id}
                        }).then(function(){
                            return res.redirect("/product_manager/");
                    })
                })
            })
        }).catch(e =>{
            console.log(e)
        })
    },
}

module.exports = productController;