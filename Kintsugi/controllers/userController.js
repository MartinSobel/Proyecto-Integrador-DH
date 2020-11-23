const fs = require ('fs');
var users = JSON.parse(fs.readFileSync(__dirname + "/../database/users.json"));

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
        users.push(req.body);
        let usersJSON = JSON.stringify(users);
        fs.writeFileSync(__dirname + "/../database/users.json", usersJSON);
        res.render("index");
    }
};

module.exports = userController;



