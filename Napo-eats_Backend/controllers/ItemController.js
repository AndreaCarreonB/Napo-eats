const { Restaurant, MenuItem, Order } = require('../models')

const CreatItem = async (req, res) => {
  try {
    const item = await MenuItem.create(req.body)
    res.send(item)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const AddOrderItem = async (req, res) => {
  try {
    const order_items = await Item.findByPk(req.params.item_id)
    const orderId = parseInt(req.params.order_id)

    let itemBody = {
      name: order_items.name,
      price: order_items.price,
      image: order_items.image,
      orderId
    }
    const addItemToCart = await MenuItem.create(itemBody)
    res.send(addItemToCart)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const UpdateItem = async (req, res) => {
  try {
    const updateItem = await MenuItem.update(
      { ...req.body },
      {
        where: {
          orderId: req.params.orderId,
          restaurantId: req.params.restaurantId
        },
        returning: true
      }
    )
    res.send(updateItem)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const GetOrderItems = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [{ model: Restaurant, as: 'restaurant_order' }]
      // raw: true
    })
    res.send(orders)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const GetRestaurantWithAllOrders = async (req, res) => {
  try {
    const restaurant = await Restaurant.findAll({
      include: [
        { model: Order, as: 'restaurant_cart', through: { attributes: [] } }
      ]
      // raw: true
    })
    res.send(restaurant)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

module.exports = {
  CreatItem,
  UpdateItem,
  GetOrderItems,
  GetRestaurantWithAllOrders,
  AddOrderItem
}
