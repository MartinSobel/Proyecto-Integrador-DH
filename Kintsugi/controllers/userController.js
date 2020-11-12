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
        return res.render("index");
    }
}

module.exports = userController;