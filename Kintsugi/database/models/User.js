module.exports = (sequelize, DataTypes) => {
    let alias = 'User';

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.INTEGER
        },
        email: {
            type: DataTypes.STRING
        },
        avatar: {
            type: DataTypes.STRING
        }
    };

    let config = {
        tableName: 'User',
        timestamps: false
    }

    const User = sequelize.define(alias, cols, config);

    User.associate = function(models){
        User.hasMany(models.Cart, {
            as: 'carts',
            foreignKey: 'user_id'
        })
    }
    
    return User;
}