module.exports = (sequelize, DataTypes) => {
    let alias = 'Category';

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        }
    };

    let config = {
        tableName: 'Category',
        timeStamps: false
    }

    const Category = sequelize.define(alias, cols, config);

    Category.associate = function(models){
        Category.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'category_id'
        })
    }
    
    return Category;
}