const fs = require ('fs');
const { use } = require('../routes');
const db = require('../database/models');


function rememberMiddleware(req, res, next){
    if(req.cookies.remember != undefined && req.session.logged == undefined){
        db.User.findOne({   
            where: {
                email: req.cookies.remember
            }
        }).then(function(resultado){
            req.session.logged = 'logged'
        })
        next();
    }
}

module.exports = rememberMiddleware;
