const Router = require('express').Router()
const controller = require('../controllers/ItemController')

Router.get('/cart_items', controller.GetOrderItems)
Router.post(
  '/add_order_item/order_id/:order_id/item_id/:item_id',
  controller.AddOrderItem
)
Router.get('/restaurant_orders', controller.GetRestaurantWithAllOrders)
Router.post('/create', controller.CreatItem)
Router.put('/update/:customerId/:restaurantId', controller.UpdateItem)

module.exports = Router
