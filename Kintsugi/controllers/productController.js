
const productController = {
    renderMenu: function (req, res, next) {
        return res.render("menu");
    },
    renderProductAdd: function (req, res, next) {
        return res.render("product_add");
    },
    renderProductEdit: function (req, res, next) {
        return res.render("product_edit");
    },
    renderProductEditDetail: function (req, res, next) {
        return res.render("product_edit_detail");
    },
    renderProductDetail: function (req, res, next) {
        return res.render("product_detail");
    },
    renderProductCart: function (req, res, next) {
        return res.render("product_cart");
    },
    create: function(req, res, next){
       var product = {
        name: req.body.name,
        nameJap: req.body.jap,
        description: req.body.desc,
        price: req.body.price,
        category: req.body.cat,
        image: req.body.img,
        }
        return res.render("product_edit");
    }
}

module.exports = productController;