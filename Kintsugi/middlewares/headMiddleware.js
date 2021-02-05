const db = require('../database/models');

function headMiddleware(req, res, next){
    if (req.session.logged == 'logged'){
        db.User.findOne({
            where: {
                email: req.session.email
            }
        }).then(function(result){
            res.locals.userLogged = result.name;
            next();
        })
    } else {
        next();
    }
}

module.exports = headMiddleware;