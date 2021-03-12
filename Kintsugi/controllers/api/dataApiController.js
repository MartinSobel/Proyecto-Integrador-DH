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
            where: {status:"closed"}
        })
        .then(function(cart){
            for(let i = 0; i < cart.length; i++){
                cart[i].setDataValue("endpoint", "/api/data/sales/" + cart[i].id)
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
    },
    status: function(req,res){
        let answer = {
            meta: {
                status: 200,
                url: "/api/data/status"
            },
            data: {
            }
        };
        db.Product.findAll()
            .then(function(products){
                answer.data.totalProducts = products.length;
                db.User.findAll()
                    .then(function(users){
                        answer.data.totalUsers = users.length;
                        db.Cart.findAll(
                            {where:{status:"closed"}}
                        )
                        .then(function(carts){
                            answer.data.totalCarts = carts.length;
                            res.json(answer);
                        })
                    })
            })   
    },
    categories: function(req,res){
        db.Category.findAll()
            .then(function(categories){
                let answer = {
                    meta: {
                        status: 200,
                    },
                    data: categories 
                };
                res.json(answer);
            })
    },
    
    
}
module.exports= dataApiController;