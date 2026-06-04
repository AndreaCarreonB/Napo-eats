const Router = require('express').Router()
const controller = require('../controllers/OrderController')

// Obtener todas las órdenes
Router.get('/order_items', controller.getOrderItems)

// Obtener una orden específica por ID (la que usa tu pantalla de React)
Router.get('/order_items/id/:id', controller.GetOrdersById)

// ⚡ NUEVA RUTA: Para actualizar el estado (Tomando orden -> Cocinando -> etc.) y disparar el WebSocket
Router.put('/order_items/status/:order_id', controller.UpdateOrderStatus)

// Agregar un platillo a la orden
Router.post(
  '/add_order_item/order_id/:order_id/restaurant_id/:restaurant_id/item_id/:item_id',
  controller.AddOrderItem
)

// Crear una nueva orden vacía para un cliente
Router.post('/customer_id/:customer_id', controller.CreateOrder)

// Eliminar un platillo de la orden
Router.delete('/item_id/:item_id', controller.DeleteItem)

// Eliminar una orden completa
Router.delete('/order_id/:order_id', controller.DeleteOrder)

module.exports = Router