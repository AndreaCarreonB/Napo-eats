import React from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react' 
import { BASE_URL } from '../globals'
import { Link } from 'react-router-dom'

const Restaurant = ({customer}) => {

  let navigate = useNavigate()

  const [selectedListing, setSelectedListing] = useState([])

  let {customerId, restaurantId} = useParams()
  // let {orderId, restaurantId} = useParams()
  const [restaurant, setRestaurant] = useState([])
  const [orderId, setOrderId] = useState([])
  // const [order, setOrder] = useState([])

  
  useEffect(() => {

    const GetOrdersWithItems = async () => {
      const res = await axios.get(`${BASE_URL}/restaurants/id/${restaurantId}`)
      setRestaurant(res.data)
      console.log('test2', res.data)
    }
    const GetOrderById = async () => {
      const res = await axios.get(`${BASE_URL}/orders/order_items/id/${customer.id}`)
      // const res = await axios.get(`${BASE_URL}/orders/order_items/id/${orderId}`)
      // const res = await axios.get(`${BASE_URL}/customers/id/${customer.id}`)
      setOrderId(res.data.order_items)
      console.log('test1', res.data)
    }
    GetOrdersWithItems()
    GetOrderById()
    
  }, [restaurantId])
  
  const favOption = document.getElementById('addedFav')  
  
  const toggleFavorite = async () => {
    if(favOption.innerHTML === "Remove From Favorites"){
      await axios.delete(`${BASE_URL}/favorites/customer_id/${customer.id}/restaurant_id/${restaurantId}`)
      favOption.innerHTML = 'Add To Favorites'
    } else if(favOption.innerHTML === "Add To Favorites"){
      await axios.post(`${BASE_URL}/favorites/create/customer_id/${customer.id}/restaurant_id/${restaurantId}`)
      favOption.innerHTML = "Remove From Favorites"
    }
  }
  
  const toggleOrder = async (e, item) => {
    let itemId = e
    await axios.post(`${BASE_URL}/orders/add_order_item/order_id/${item.orderId}/restaurant_id/${restaurantId}/item_id/${item.id}`)
    alert(`${item.name} was added to your order`)
  }

  const deleteListing = async (selected) => {
    await setSelectedListing(selected.id)
    await axios.delete(`${BASE_URL}/restaurants/id/${selected.id}`)
    navigate('/')
  }

  return (
    <div className='container restaurant__container' key={restaurant.id}>
      <div className="restaurant__details">
        <h1>{restaurant?.name}</h1>
        <p>{restaurant?.description}</p>
        <img src = {restaurant.image} alt={restaurant.image} className='restaurant__image'/>
      </div>
        <div className='restaurant__cta'>
          <button className="btn btn-primary" onClick={toggleFavorite} id='addedFav'>Add To Favorites</button>
          <Link to={`/restaurant/update/${restaurant.id}`}>
          <button className="btn btn-primary">Update Restaurant</button>
              </Link>
          <button className="btn btn-primary" onClick={() => deleteListing(restaurant)}>
                Delete Restaurant</button>
        </div>
      <div className="menu__items">
        
      {restaurant.restaurant_items?.map((item)=>(
        <div  key={item.id}>
            <div className="item__description">
            <img src = {item.image} alt={item.image} className='item__image'/>
              <h4>{item.name}</h4>
              <p>${item.price}</p>
              <p>{item.description}</p>
              <button className="btn btn-primary" onClick={(e) => toggleOrder(e, item)}>Add To Order</button>
            </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default Restaurant