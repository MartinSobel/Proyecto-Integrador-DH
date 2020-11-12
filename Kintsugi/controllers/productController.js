const productController = {
    renderMenu: function (req, res, next) {
        return res.render("menu");
    },
    renderProductAdd: function (req, res, next) {
        return res.render("product_add");
    },
    renderProductDetail: function (req, res, next) {
        return res.render("product_detail");
    },
    renderProductCart: function (req, res, next) {
        return res.render("product_cart");
    }
}

module.exports = productController;