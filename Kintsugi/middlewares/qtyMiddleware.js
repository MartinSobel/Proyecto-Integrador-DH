const db = require('../database/models');


function qtyMiddleware(req,res,next){
    if(req.session.logged == 'logged'){
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
            }).then(cart => {
                if (cart == null){
                    next()
                } else{
                    db.Cart_Product.findAll({
                        where:{
                            cart_id: cart.id
                        }
                    }).then(prods =>{
                        res.locals.qtyCart = prods.length
                        next()
                    }).catch(function(e){
                        console.log(e);
                        next();
                    })
                }
            }).catch(function(e){
                console.log(e);
                next();
            })
        }).catch(function(e){
            console.log(e);
            next();
        })
    } else {
        next();
    }
}

module.exports = qtyMiddleware;
