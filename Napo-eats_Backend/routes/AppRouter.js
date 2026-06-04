const Router = require('express').Router()
const fs = require('fs')
const path = require('path')

const CustomerRouter = require('./CustomerRouter')
const FavoritesRouter = require('./FavoritesRouter')
const RestaurantRouter = require('./RestaurantRouter')
const OrderRouter = require('./OrderRouter')
const ItemRouter = require('./ItemRouter')
const AuthRouter = require('./AuthRouter')

// 🍕 ENDPOINT PARA EL MENÚ DINÁMICO (Compatible con ConfigMap de Kubernetes)
Router.get('/menu', (req, res) => {
  // Como appRouter está en la carpeta 'routes', subimos un nivel con '../' para entrar a 'config'
  const menuPath = path.join(__dirname, '../config/menu.json')

  fs.readFile(menuPath, 'utf8', (err, data) => {
    if (err) {
      console.error("❌ Error al leer el ConfigMap del menú:", err)
      return res.status(500).json({ error: "No se pudo cargar el menú del día" })
    }
    // Convertimos el contenido de texto a JSON real y lo mandamos
    return res.json(JSON.parse(data))
  })
})

// Tus otras rutas existentes
Router.use('/customers', CustomerRouter)
Router.use('/favorites', FavoritesRouter)
Router.use('/restaurants', RestaurantRouter)
Router.use('/orders', OrderRouter)
Router.use('/items', ItemRouter)
Router.use('/auth', AuthRouter)

module.exports = Router