const { Customer, MenuItem, Order } = require('../models')

const GetAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll()
    res.send(customers)
  } catch (error) {
    throw error
  }
}

const GetCustomerById = async (req, res) => {
  try {
    const customers = await Customer.findByPk(req.params.id, {
      include: [
        {
          model: Order,
          as: 'customer_order',
          include: [
            {
              model: MenuItem,
              as: 'order_items'
            }
          ]
        }
      ]
    })
    res.send(customers)
  } catch (error) {
    throw error
  }
}

const CreateCustomer = async (req, res) => {
  try {
    const newCustomer = await Customer.create(req.body)
    res.send(newCustomer)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const UpdateCustomer = async (req, res) => {
  try {
    let customerId = parseInt(req.params.customer_id)
    let UpdateCustomer = await Customer.update(req.body, {
      where: { id: customerId },
      returning: true
    })
    res.send(UpdateCustomer)
  } catch (error) {
    throw error
  }
}

const getCustomerOrder = async (req, res) => {
  try {
    const customer = await Customer.findAll({
      include: [
        {
          model: Order,
          as: 'customer_order',
          include: [
            {
              model: MenuItem,
              as: 'order_items'
            }
          ]
        }
      ]
    })
    res.send(customer)
  } catch (error) {
    throw error
  }
}

const DeleteCustomer = async (req, res) => {
  try {
    let customerId = parseInt(req.params.id)
    await Customer.destroy({ where: { id: customerId } })
    res.send({ message: `Deleted customer with an id of ${customerId}` })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetAllCustomers,
  GetCustomerById,
  CreateCustomer,
  UpdateCustomer,
  DeleteCustomer,
  getCustomerOrder
}
