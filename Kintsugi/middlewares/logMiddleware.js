const db = require('../database/models');

function logMiddleware(req, res, next){
    if (req.session.logged != 'logged'){
        next();
    } else {
        db.User.findOne({
            where: {
                email: req.cookies.remember
            }
        }).then(function(resultado){
            res.redirect('/users/profile/'+ resultado.id);

        })
       
    }
}

module.exports = logMiddleware;