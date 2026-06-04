import './App.css'
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { CheckSession } from './services/Auth'

import NavBar from './components/NavBar'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Favorites from './pages/Favorites'
import Restaurant from './pages/Restaurant'
import Order from './pages/Order'
import CreateRest from './pages/CreateRest'
import UpdateRest from './pages/UpdateRest'
import MisPedidos from './pages/MisPedidos';

function App() {
  const [authenticated, toggleAuthenticated] = useState(false)
  const [customer, setCustomer] = useState(null)

  const handleLogOut = () => {
    setCustomer(null)
    toggleAuthenticated(false)
    localStorage.clear()
  }

  const checkToken = async () => {
    const customer = await CheckSession()
    setCustomer(customer)
    toggleAuthenticated(true)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])

  return (
    <div className="App">
      {/* 🌟 NavBar libre de contenedores antiguos con fondos fijos */}
      <NavBar
        authenticated={authenticated}
        customer={customer}
        handleLogOut={handleLogOut}
      />
      
      <main>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={
              <Login
                setCustomer={setCustomer}
                toggleAuthenticated={toggleAuthenticated}
              />
            }
          />
          <Route
            path="/"
            element={<Home customer={customer} authenticated={authenticated} />}
          />
          <Route
            path="/restaurant/:restaurantId"
            element={<Restaurant customer={customer} />}
          />
          <Route
            path="favorite/:customerId"
            element={<Favorites customer={customer} />}
          />
          <Route
            path="order/:customerId"
            element={<Order customer={customer} />}
          />
          <Route
            path="/restaurant/create"
            element={<CreateRest customer={customer} />}
          />
          <Route
            path="/restaurant/update/:restaurant_id"
            element={<UpdateRest customer={customer} />}
          />
          <Route 
            path="/mis-pedidos" 
            element={<MisPedidos />} />
        </Routes>
      </main>
    </div>
  )
}

export default App