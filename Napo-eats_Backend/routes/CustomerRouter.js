const Router = require('express').Router()
const controller = require('../controllers/CustomerController')

Router.get('/get_all', controller.GetAllCustomers)
Router.get('/id/:id', controller.GetCustomerById)
Router.post('/new_customer', controller.CreateCustomer)
Router.put('/id/:customer_id', controller.UpdateCustomer)
Router.delete('/id/:id', controller.DeleteCustomer)
Router.get('/customer_order', controller.getCustomerOrder)

module.exports = Router
