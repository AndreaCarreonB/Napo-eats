const Router = require('express').Router()
const controller = require('../controllers/FavoritesController')

Router.get('/get_all', controller.GetallFavorites)
Router.get('/customer_favorites', controller.GetCustomersFavorites)
Router.get('/restaurant_users', controller.GetRestaurantsWithCustomerList)
Router.get('/customer_favorites/id/:id', controller.GetCustomerFavoritesById)
Router.post(
  '/create/customer_id/:customer_id/restaurant_id/:restaurant_id',
  controller.CreateFavorite
)
Router.put('/update/:customerId/:restaurantId', controller.UpdateFavorite)
Router.delete(
  '/customer_id/:customer_id/restaurant_id/:restaurant_id',
  controller.DeleteFavorite
)

module.exports = Router
