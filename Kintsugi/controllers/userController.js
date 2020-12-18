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
        return res.render("index");
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
    }
};

module.exports = userController;