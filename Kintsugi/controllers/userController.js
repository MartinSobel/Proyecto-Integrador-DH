const fs = require ('fs');
var users = JSON.parse(fs.readFileSync(__dirname + "/../database/users.json"));
let bcrypt = require('bcrypt');

const db = require('../database/models');
const {check, validationResult, body} = require ('express-validator');

const userController = {
    renderLogin: function (req, res, next) {
        return res.render("login");
    },
    renderRegister: function (req, res, next) {
        return res.render("register");
    },
    logged: function (req, res, next) {
        db.User.findOne({
            where:{
                email: req.body.email
            }
        }).then((result)=>{
            if(bcrypt.compareSync(req.body.password, result.password) ){
                req.session.logged = 'logged';
                req.session.email = req.body.email
                db.User.findOne({
                    where: {
                        email: req.body.email
                    }
                }).then(function(result){
                    req.session.user = result
                })
                if (req.body.remember != undefined){
                    res.cookie('remember', req.body.email, {maxAge: 2592000000});
                }
                return res.redirect("/");
            } else return res.render("login", {msg: "User or password incorrect"});
        }).catch(function(e){
            console.log(e);
            return res.render("login", {msg: "User or password incorrect"});
        })
    },
    registered: function (req, res, next) {
       
        let errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.render('register', {errors: errors.errors});
        }

        db.User.create({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            
        });
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
        }).catch(function(error){
            console.log(error)
            res.send('error')
            });
    },
    logout: function(req, res, next){
        res.cookie('remember', '', {maxAge: 0})
        req.session.destroy();
        res.redirect('/');
        }
};


module.exports = userController;