module.exports = (sequelize, DataTypes) => {
    let alias = 'Cart';

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER
        },
        total: {
            type: DataTypes.INTEGER
        }
    };

    let config = {
        tableName: 'Cart',
        timestamps: false
    }

    const Cart = sequelize.define(alias, cols, config);

    Cart.associate = function(models){
        Cart.belongsTo(models.User, {
            as: 'users',
            foreignKey: 'user_id'
        }),
        Cart.belongsToMany(models.Product, {
            as: 'products',
            foreignKey: 'cart_id',
            through: 'cart_product',
            otherKey: 'product_id'
        })
    }
    
    return Cart;
}