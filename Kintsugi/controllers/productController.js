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
                    status: 'open',
                }
            }).then((result)=>{
                // Si hay un carrito creado, agrega el producto
                if(result != null){
                    db.Cart_Product.create({
                        cart_id: result.id,
                        product_id: req.params.id
                    })
                    return res.render("product_cart");
                // Si no, crea el carrito y agrega el producto
                } else {
                    db.Cart.create({
                        user_id: req.session.userid
                    }).then(function(res){
                        db.Cart_Product.create({
                            cart_id: res.id,
                            product_id: req.params.id
                        })
                    }).catch(function(error){
                        console.log('ERRRRRRORRR  ' + error)
                    })
                    return res.render("product_cart");
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