const { Restaurant, MenuItem } = require('../models')

const GetAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll({
      include: [
        {
          model: MenuItem,
          as: 'restaurant_items'
        }
      ]
    })
    res.send(restaurants)
  } catch (error) {
    throw error
  }
}

const GetRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByPk(req.params.id, {
      include: [
        {
          model: MenuItem,
          as: 'restaurant_items'
        }
      ]
    })
    res.send(restaurant)
  } catch (error) {
    throw error
  }
}

const CreateRestaurant = async (req, res) => {
  try {
    const newRest = await Restaurant.create(req.body)
    res.send(newRest)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const UpdateRestaurant = async (req, res) => {
  try {
    let restaurantId = parseInt(req.params.restaurant_id)
    let updatedRest = await Restaurant.update(req.body, {
      where: { id: restaurantId },
      returning: true
    })
    res.send(updatedRest)
  } catch (error) {
    throw error
  }
}

const DeleteRestaurant = async (req, res) => {
  try {
    let restaurantId = parseInt(req.params.id)
    await Restaurant.destroy({
      where: { id: restaurantId }
    })
    res.send({ message: `Deleted restaurant with an id of ${restaurantId}` })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetAllRestaurants,
  GetRestaurantById,
  CreateRestaurant,
  UpdateRestaurant,
  DeleteRestaurant
}
