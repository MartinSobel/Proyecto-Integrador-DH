module.exports = (sequelize, DataTypes) => {
    let alias = 'Product';

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.INTEGER
        },
        description: {
            type: DataTypes.STRING
        },
        image: {
            type: DataTypes.STRING
        },
        category_id: {
            type: DataTypes.INTEGER
        }
    };

    let config = {
        tableName: 'Product',
        timestamps: false
    }

    const Product = sequelize.define(alias, cols, config);
    
    Product.associate = function(models){
        Product.belongsToMany(models.Cart_Product, {
            as: 'carts',
            foreignKey: 'product_id',
            through: 'cart_product',
            otherKey: 'cart_id'
        }),
        Product.belongsTo(models.Category, {
            as: 'categories',
            foreignKey: 'category_id'
        })
    }

    return Product;
}