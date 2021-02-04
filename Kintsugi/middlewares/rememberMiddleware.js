const fs = require ('fs');
const { use } = require('../routes');
const db = require('../database/models');


function rememberMiddleware(req, res, next){
    if(req.cookies.remember != undefined && req.session.logged == undefined){
        /* find one where email es = a req.cookie.remember */
        db.User.findOne({
            where: {
                email: req.cookies.remember
            }
                    /* guardo en una variable (=req.session.logged)*/
        }).then(function(resultado){
            req.session.logged = resultado
        })            
    }
}

module.exports = rememberMiddleware;
