import Client from './api'

// Función para registrar la compra en la base de datos
export const checkoutPedido = async (customerId, checkoutData) => {
  try {
    const res = await Client.post(`/orders/customer_id/${customerId}`, checkoutData)
    return res.data
  } catch (error) {
    throw error
  }
}