const db = require('../database/models');

function pmMiddleware(req, res, next){
    if (req.session.logged == 'logged' && req.session.admin == "yes"){
        next();
    } else {
        db.User.findOne({
            where:{
                email: req.session.email
            }
        }).then((result)=>{
            db.User.findByPk(result.id)
                .then(function(user){
                res.render('profile',{user, msg: 'Sorry, you have to be admin to access this section'});
            }).catch(e =>{
                console.log(e)
            })
        })
    }
}

module.exports = pmMiddleware;