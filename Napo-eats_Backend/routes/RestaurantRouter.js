const Router = require('express').Router()
const controller = require('../controllers/RestaurantController')

Router.get('/get_all', controller.GetAllRestaurants)
Router.get('/id/:id', controller.GetRestaurantById)
Router.post('/new_restaurant', controller.CreateRestaurant)
Router.put('/id/:restaurant_id', controller.UpdateRestaurant)
Router.delete('/id/:id', controller.DeleteRestaurant)

module.exports = Router
