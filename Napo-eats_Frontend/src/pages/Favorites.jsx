import React from 'react'
import { useState, useEffect, useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import {BASE_URL} from '../globals'


const Favorite = ({customer}) => {
    const { customerId } = useParams()

    console.log('favorite customer', customerId)

    const [favorite, setFavorite] = useState(null)
  
    const getCustomerFavorite = useCallback(async () => {
      const res = await axios.get(
        `${BASE_URL}/favorites/customer_favorites/id/${customerId}`
      )
      setFavorite(res.data)
    }, [customerId])
    
    useEffect(() => {
      getCustomerFavorite()
    }, [getCustomerFavorite])

    const handleRefresh = () => {
      window.location.reload(false);
    }
    
    const handleDelete = async (e) => {
      let restaurantId = e
      await axios.delete(`${BASE_URL}/favorites/customer_id/${customerId}/restaurant_id/${restaurantId}`)
      handleRefresh();
    }

    return favorite !== null ? (
        <div className='container favorite__container'>
            {/* <h2 >
                Favorite Restaurants
            </h2> */}
            <div className='favorite__restaurant'>
              {favorite.customer_favorites.map((restaurant) => (
                <div key={restaurant.id } className="favorite-data-container">
                    <h3>{restaurant.name}</h3>
                  <Link to={`/customer_id/${customerId}/restaurant/${restaurant.id}`}> 
                    <img src={restaurant.image} alt={restaurant.name} className="item__image"/>
                  </Link>
                  <button  onClick={() => handleDelete(restaurant.id)} className="btn btn-primary">Delete</button>
                </div>
              ))}
            </div>
        </div>
    ) : null
}

export default Favorite