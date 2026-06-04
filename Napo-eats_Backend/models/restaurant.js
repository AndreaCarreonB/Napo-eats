'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Restaurant.hasMany(models.MenuItem, {
        foreignKey: 'restaurantId',
        as: 'restaurant_items'
      })
      Restaurant.belongsToMany(models.Customer, {
        as: 'restaurant_customers',
        through: models.Favorite,
        foreignKey: 'restaurantId'
      })
    }
  }
  Restaurant.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      image: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Restaurant',
      tableName: 'restaurants'
    }
  )
  return Restaurant
}
