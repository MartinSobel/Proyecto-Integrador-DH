const fs = require ('fs');
var users = JSON.parse(fs.readFileSync(__dirname + "/../database/users.json"));
let bcrypt = require('bcrypt');

const userController = {
    renderLogin: function (req, res, next) {
        return res.render("login");
    },
    renderRegister: function (req, res, next) {
        return res.render("register");
    },
    logged: function (req, res, next) {
        for (let i = 0 ; i < users.length ; i++){
            if (req.body.email == users[i].email){
                if(bcrypt.compareSync(req.body.password, users[i].password) ){
                    req.session.logged = 'logged';
                    return res.redirect("/");
                } else return res.redirect("/users/login");
            } else return res.redirect("/users/login");
        }
    },
    registered: function (req, res, next) {
        let newUser = {
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            avatar: req.files[0].filename
        }
        users.push(newUser);
        let usersJSON = JSON.stringify(users);
        fs.writeFileSync(__dirname + "/../database/users.json", usersJSON);
        res.redirect("/");
    },
    renderProfile: function(req, res, next){
        return res.render('profile');
    }
};

module.exports = userController;