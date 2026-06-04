const { Order, MenuItem } = require('../models')

const getOrderItems = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: MenuItem,
          as: 'order_items'
        }
      ]
    })
    res.send(orders)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

// 🔌 Modificado para estructurar la respuesta exacta que tu React necesita leer
const GetOrdersById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [{ model: MenuItem, as: 'order_items' }]
    })

    if (!order) {
      return res.status(404).send({ message: "Orden no encontrada" })
    }

    // Estructuramos la información mapeando tus modelos reales a la vista del Frontend
    const payloadPedido = {
      id: `ORD-${order.id}`,
      fecha: order.createdAt ? new Date(order.createdAt).toLocaleDateString('es-MX') : "03/06/2026",
      entregaEstimada: order.estimatedTime || "30-40",
      status: order.status || "Tomando orden", // "Tomando orden", "Cocinando", "Preparando envío", "En camino"
      items: order.order_items ? order.order_items.map(item => ({
        nombre: item.name,
        cantidad: item.quantity || 1, // Por si manejas cantidad en una tabla intermedia
        precio: parseFloat(item.price)
      })) : [],
      detallesEnvio: {
        direccion: order.address || "Av. Principal #123, Col. Centro",
        metodoPago: order.paymentMethod || "Tarjeta de Crédito (Procesado por K8s Job)",
        notas: order.notes || "Sin especificaciones adicionales"
      }
    }

    res.send(payloadPedido)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

// ⚡ NUEVA FUNCIÓN: Actualiza el estado en Postgres y emite por WebSocket en vivo
const UpdateOrderStatus = async (req, res) => {
  try {
    const orderId = parseInt(req.params.order_id)
    const { nuevoStatus } = req.body // Ej: "Cocinando", "Preparando envío", "En camino"

    // 1. Validar que el estado enviado sea uno de los 4 de tu frontend
    const estadosValidos = ["Tomando orden", "Cocinando", "Preparando envío", "En camino"]
    if (!estadosValidos.includes(nuevoStatus)) {
      return res.status(400).send({ message: "Estado de orden inválido" })
    }

    // 2. Actualizar el estado en la Base de Datos usando Sequelize
    // Nota: Asegúrate de tener la columna 'status' añadida en tu migración/modelo de Order
    await Order.update(
      { status: nuevoStatus },
      { where: { id: orderId } }
    )

    // 3. Volvemos a buscar la orden completa con sus items para mandársela limpia al Frontend
    const order = await Order.findByPk(orderId, {
      include: [{ model: MenuItem, as: 'order_items' }]
    })

    // 4. Armamos el objeto con la estructura idéntica que lee tu interfaz de React
    const payloadPedido = {
      id: `ORD-${order.id}`,
      fecha: order.createdAt ? new Date(order.createdAt).toLocaleDateString('es-MX') : "03/06/2026",
      entregaEstimada: order.estimatedTime || "30-40",
      status: order.status,
      items: order.order_items ? order.order_items.map(item => ({
        nombre: item.name,
        cantidad: item.quantity || 1,
        precio: parseFloat(item.price)
      })) : [],
      detallesEnvio: {
        direccion: order.address || "Av. Principal #123, Col. Centro",
        metodoPago: order.paymentMethod || "Tarjeta de Crédito (Procesado por K8s Job)",
        notas: order.notes || "Sin especificaciones adicionales"
      }
    }

    // 5. 🔌 RECUPERAR WEBOCKETS: Extraemos la instancia de io que configuramos en server.js
    const io = req.app.get('socketio')
    
    if (io) {
      // Le avisamos instantáneamente a React que el pedido cambió
      io.emit('actualizacion_pedido', payloadPedido)
      console.log(`📢 [WS] Estado de Orden ${orderId} cambiado a: ${nuevoStatus}`)
    }

    res.send({ success: true, message: "Estado actualizado y transmitido por WebSockets", pedido: payloadPedido })
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const AddOrderItem = async (req, res) => {
  try {
    const order_items = await MenuItem.findByPk(req.params.item_id)
    const orderId = parseInt(req.params.order_id)
    const restaurantId = parseInt(req.params.restaurant_id)

    let orderBody = {
      name: order_items.name,
      price: order_items.price,
      description: order_items.description,
      image: order_items.image,
      orderId,
      restaurantId
    }
    const addItemToOrder = await MenuItem.create(orderBody)
    res.send(addItemToOrder)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const CreateOrder = async (req, res) => {
  try {
    const customerId = parseInt(req.params.customer_id);
    
    // 📦 El frontend enviará el carrito (items), la dirección y método de pago en el cuerpo (body)
    const { items, address, paymentMethod, notes, total } = req.body;

    // 1. Insertamos la Orden en la tabla 'Orders' de PostgreSQL
    const createdOrder = await Order.create({
      customerId,
      status: "Tomando orden", // Fase 1 de la barra de progreso
      address: address || "Dirección del perfil",
      paymentMethod: paymentMethod || "Tarjeta de Crédito",
      notes: notes || "Ninguna",
      total: total || 0
    });

    // 2. Vinculamos cada platillo del carrito a esta nueva orden
    // Recorremos los ítems que vienen del estado del carrito en React
    if (items && items.length > 0) {
      for (const item of items) {
        await MenuItem.create({
          name: item.name || item.nombre,
          price: item.price || item.precio,
          description: item.description || "",
          image: item.image || "",
          orderId: createdOrder.id, // Enlazamos al ID recién generado
          restaurantId: item.restaurantId || 1
        });
      }
    }

    // 3. Respondemos con éxito al Frontend
    res.status(201).send({
      success: true,
      message: "Pedido guardado con éxito",
      orderId: createdOrder.id
    });

  } catch (error) {
    console.error("❌ Error en CreateOrder:", error);
    return res.status(500).send(error.message);
  }
};

const DeleteItem = async (req, res) => {
  try {
    const itemId = parseInt(req.params.item_id)
    await MenuItem.destroy({ where: { id: itemId } })
    res.send({ message: `Deleted item with and id of ${itemId}` })
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const DeleteOrder = async (req, res) => {
  try {
    const orderId = parseInt(req.params.order_id)
    // Corregido: Usabas 'Cart.destroy', lo cambiamos a 'Order.destroy' para no causar errores
    await Order.destroy({ where: { id: orderId } })
    res.send({ message: `Deleted order with and id of ${orderId}` })
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

module.exports = {
  getOrderItems,
  GetOrdersById,
  UpdateOrderStatus, // Exportamos la nueva función
  AddOrderItem,
  CreateOrder,
  DeleteItem,
  DeleteOrder
}