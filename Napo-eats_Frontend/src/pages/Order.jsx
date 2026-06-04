import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react' 
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../globals'


const Order = ({customer}) => {

  let {customerId} = useParams()

  const [orderItems, setOrderItems] = useState([])

  // const handleRefresh = () => {
  //   window.location.reload(false)
  // }
  useEffect(() => {
    const GetItems = async() => {
      const res = await axios.get(`${BASE_URL}/orders/order_items/id/${customerId}`)
      setOrderItems(res.data.orderItems) 
      console.log('orderitems', res.data)
    }
    GetItems()
  }, [customerId])

  const handleDelete = async (e) => {
    let itemId= e
    await axios.delete(`${BASE_URL}/orders/item_id/${itemId}`)
    // handleRefresh()
  }

  return (
    <div>Order
      <div>
      {orderItems?.map((item)=>(
        <div>
          <h2 key={item.id}>{item?.name}</h2>
          <button onClick={() => handleDelete(item.id)} className='delete-item-btn'>Remove From Order</button>
        </div>
      ))}
      </div>
    </div>
  )
}

export default Order