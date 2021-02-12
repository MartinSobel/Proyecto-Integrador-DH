let db = require ('../../database/models')

let dataApiController = {
    users: function(req,res){
        db.User.findAll()
        .then(function(users){
            for(let i = 0; i<users.length; i++){
                users[i].setDataValue("endpoint", "/api/data/users/" + users[i].id)
            }
            let answer = {
                meta: {
                    status: 200,
                    total: users.length,
                    url: "/api/data/users"
                },
                data: users
            };
            res.json(answer);
        })
    },
    sales: function(req,res){
        db.Cart.findAll({
            where: {status:0}
        })
        .then(function(cart){
            for(let i = 0; i<cart.length; i++){
                users[i].setDataValue("endpoint", "/api/data/sales/" + cart[i].id)
            }
            let answer = {
                meta: {
                    status: 200,
                    total: cart.length,
                    url: "/api/data/sales"
                },
                data: cart
            };
            res.json(answer);
        })
    },
    products: function(req,res){
        db.Product.findAll()
        .then(function(products){
            for(let i = 0; i<products.length; i++){
                products[i].setDataValue("endpoint", "/api/data/products/" + products[i].id)
            }
            let answer = {
                meta: {
                    status: 200,
                    total: products.length,
                    url: "/api/data/products"
                },
                data: products
            };
            res.json(answer);
        })
    }
}
module.exports= dataApiController;