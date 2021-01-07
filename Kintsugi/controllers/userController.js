const fs = require ('fs');
var users = JSON.parse(fs.readFileSync(__dirname + "/../database/users.json"));
let bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const db = require('../database/models');

const userController = {
    renderLogin: function (req, res, next) {
        return res.render("login");
    },
    renderRegister: function (req, res, next) {
        return res.render("register");
    },
    logged: function (req, res, next) {
        if (req.body.remember != undefined){
            console.log('cookie');
            res.cookie('remember', req.body.email, { maxAge: 60000 });
        }
        /*for (let i = 0 ; i < users.length ; i++){
            if (req.body.email == users[i].email){
                if(bcrypt.compareSync(req.body.password, users[i].password) ){
                    req.session.logged = 'logged';
                    if (req.body.remember != undefined){
                        res.cookie('remember', req.body.email, {maxAge: 2592000000});
                    }
                    return res.redirect("/");
                } else return res.redirect("/users/login");
            } else return res.redirect("/users/login");
        }*/
        db.User.findOne({
            where:{
                email: req.body.email
            }
        }).then((result)=>{
            if(bcrypt.compareSync(req.body.password, result.password) ){
                req.session.logged = 'logged';
                if (req.body.remember != undefined){
                    res.cookie('remember', req.body.email, {maxAge: 2592000000});
                }
                return res.redirect("/");
            } else return res.redirect("/users/login");
        })
    },
    registered: function (req, res, next) {
        let errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.render('render', {errors: errors.errors});
        }

        db.User.create({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            
        });
        
        
        // let newUser = {
        //     name: req.body.name,
        //     phone: req.body.phone,
        //     email: req.body.email,
        //     password: bcrypt.hashSync(req.body.password, 10),
        //     avatar: req.files[0].filename
        // }
        // users.push(newUser);
        // let usersJSON = JSON.stringify(users);
        // fs.writeFileSync(__dirname + "/../database/users.json", usersJSON);

        res.redirect("/");
    },
    renderProfile: function(req, res, next){
        db.User.findByPk(req.params.id).then(function(user){
            res.render('profile', {user});
        })
    },
    editProfile: function(req, res, next){
        db.User.update({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
        },{
        where: {
            id: req.params.id
            }
        }).then(function(){
            res.redirect("/users/profile/"+ req.params.id)
        })
    }
};

module.exports = userController;