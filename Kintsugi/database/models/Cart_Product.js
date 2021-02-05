module.exports = (sequelize, DataTypes) => {
    let alias = 'Cart_Product';

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cart_id: {
            type: DataTypes.INTEGER
        },
        product_id: {
            type: DataTypes.INTEGER
        }
    };

    let config = {
        tableName: 'Cart_Product',
        timestamps: false
    }

    const Cart_Product = sequelize.define(alias, cols, config);

    Cart_Product.associate = function(models){
        Cart_Product.belongsTo(models.User, {
            as: 'users',
            foreignKey: 'user_id'
        }),
        Cart_Product.belongsToMany(models.Product, {
            as: 'products',
            foreignKey: 'cart_id',
            through: 'cart_product',
            otherKey: 'product_id'
        })
    }
    
    return Cart_Product;
}