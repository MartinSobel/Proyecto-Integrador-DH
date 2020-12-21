const fs = require ('fs');
const { use } = require('../routes');
var users = JSON.parse(fs.readFileSync(__dirname + "/../database/users.json"));

function rememberMiddleware(req, res, next){
    if(req.cookie.remember != undefined && req.session.logged == undefined){
        let usersJSON = fs.readFileSync(__dirname + "/../database/users.json", {encoding: 'utf-8'});
        let users;
        if (usersJSON == ""){
            users = [];
        } else {
            users = JSON.parse(usersJSON);
        }
        let userLogged;

        for (let i = 0 ; i < users.length ; i ++){
            if (users[i].email == req.cookie.remember){
                userLogged = users[i];
            }
        }
        req.session.logged = userLogged;
    }
}

module.exports = rememberMiddleware;