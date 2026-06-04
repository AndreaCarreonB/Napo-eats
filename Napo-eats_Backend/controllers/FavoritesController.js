const { Restaurant, Favorite, Customer } = require('../models')

const CreateFavorite = async (req, res) => {
  try {
    // const favorite = await Favorite.create(req.body)
    // res.send(favorite)
    const customerId = parseInt(req.params.customer_id)
    const restaurantId = parseInt(req.params.restaurant_id)

    let itemBody = {
      customerId,
      restaurantId
    }
    const addToFavorite = await Favorite.create(itemBody)
    res.send(addToFavorite)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const UpdateFavorite = async (req, res) => {
  try {
    const updateFavorite = await Favorite.update(
      { ...req.body },
      {
        where: {
          customerId: req.params.customerId,
          restaurantId: req.params.restaurantId
        },
        returning: true
      }
    )
    res.send(updateFavorite)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const DeleteFavorite = async (req, res) => {
  try {
    let restaurantId = parseInt(req.params.restaurant_id)
    let customerId = parseInt(req.params.customer_id)
    await Favorite.destroy({
      where: { restaurantId: restaurantId, customerId: customerId }
    })
    res.send({
      message: `Deleted favorite restaurant with and id of ${restaurantId}`
    })
  } catch (error) {
    throw error
  }
}

const GetallFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.findAll()
    res.send(favorites)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const GetCustomersFavorites = async (req, res) => {
  try {
    const customer = await Customer.findAll({
      include: [{ model: Restaurant, as: 'customer_favorites' }]
    })
    res.send(customer)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const GetCustomerFavoritesById = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id, {
      include: [{ model: Restaurant, as: 'customer_favorites' }]
    })
    res.send(customer)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const GetRestaurantsWithCustomerList = async (req, res) => {
  try {
    const restaurant = await Restaurant.findAll({
      include: [{ model: Customer, as: 'restaurant_customers' }]
    })
    res.send(restaurant)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

module.exports = {
  CreateFavorite,
  UpdateFavorite,
  GetCustomersFavorites,
  GetRestaurantsWithCustomerList,
  DeleteFavorite,
  GetallFavorites,
  GetCustomerFavoritesById
}
