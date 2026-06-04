import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { checkoutPedido } from '../services/Order'
import axios from 'axios' // 👈 Importamos Axios para conectar con el backend
import { Link } from 'react-router-dom';

const Home = ({ customer, authenticated }) => {
  let navigate = useNavigate()

  // 1. 🍕 Estado para almacenar los platillos reales que vengan del backend (ConfigMap)
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  // Estado del carrito: Guardará objetos estructurados como { product, quantity }
  const [cartItems, setCartItems] = useState([])
  const [pedidoExitoso, setPedidoExitoso] = useState(null);
  
  // Pago
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(''); // Vacío al inicio o 'efectivo'

  // 2. 📡 useEffect para traer el menú dinámico al cargar la aplicación
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/menu')
        setFeaturedProducts(response.data)
      } catch (error) {
        console.error("❌ Error al traer el menú del backend/ConfigMap:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchMenu()
  }, [])

  // Agregar un producto o incrementar la cantidad si ya existe
  const handleSelectProduct = (product) => {
    const existingItem = cartItems.find(item => item.product.id === product.id)
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.product.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCartItems([...cartItems, { product, quantity: 1 }])
    }
  }

  // Modificar cantidades (+ / -) directamente desde la barra lateral
  const updateQuantity = (productId, change) => {
    setCartItems(cartItems.map(item => {
      if (item.product.id === productId) {
        const newQuantity = item.quantity + change
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : null
      }
      return item
    }).filter(Boolean))
  }

  // Cálculos de la orden
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const subTotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0)
  const tax = subTotal * 0.16 // IVA simulado (16%)
  const total = subTotal + tax

  // ==========================================
  // 🔥 ¡AQUÍ ESTÁ TU PROCESO DE COMPRA CORREGIDO CON RESTAURANT_ID! 
  // ==========================================
const handleProcederAlPago = async () => {
  try {
    if (!customer) {
      alert("Por favor, inicia sesión para realizar tu pedido.")
      return
    }

    // Identificador único de la sesión activa
    const customerIdReal = customer.id || customer.customer?.id;
    console.log("🚀 Enviando pedido del cliente con ID:", customerIdReal);

    // 📍 Extracción inteligente de la columna address que viene desde tu base de datos
    const direccionRegistrada = 
      customer.address || 
      customer.customer?.address || 
      "Dirección no especificada en el registro";

    // Convertimos los precios a enteros para respetar el tipo INTEGER de tu BD
    const itemsProcesados = cartItems.map(item => ({
      restaurantId: Number(item.product.restaurantId) || 1,
      name: String(item.product.name),
      description: item.product.ingredients || '',
      image: item.product.image || '',
      price: Math.round(Number(item.product.price)),
      quantity: Number(item.quantity) || 1
    }));

    const datosEnvio = {
      items: itemsProcesados,
      address: direccionRegistrada, // 👈 Pasará el texto real de Postgres (ej. calle,7,municipio)
      paymentMethod: paymentMethod === 'tarjeta' ? 'Tarjeta de Crédito' : 'Efectivo contra entrega',
      notes: "Pedido procesado desde la interfaz",
      total: Math.round(Number(total))
    };

    console.log("📦 Datos estructurados enviados al backend:", datosEnvio);

    // Mandamos el identificador del usuario y los datos del pedido al servicio
    const respuesta = await checkoutPedido(customerIdReal, datosEnvio);
    
    // Validamos el éxito del Job asíncrono
    const respuestaExitosa = respuesta?.success || respuesta?.data?.success || respuesta?.status === 200 || respuesta?.status === 201;

    if (respuestaExitosa) {
      const opcionesFecha = { hour: '2-digit', minute: '2-digit', hour12: true, day: 'numeric', month: 'long', year: 'numeric' };
      const fechaFormateada = new Date().toLocaleString('en-US', opcionesFecha);
      
      // Capturamos el id autogenerado por PostgreSQL
      const idDeLaOrdenReal = respuesta?.orderId || respuesta?.data?.orderId || Math.floor(100000 + Math.random() * 900000);

      // Mapeamos los ítems estáticamente para congelar el ticket visual antes de vaciar
      const itemsParaTicket = cartItems.map(item => ({ ...item, product: { ...item.product } }));

      setPedidoExitoso({
        invoiceNumber: `ORD-${idDeLaOrdenReal}`,
        orderTime: fechaFormateada,
        paymentMethod: datosEnvio.paymentMethod,
        address: datosEnvio.address, // ¡Se pintará automáticamente en la interfaz!
        amount: datosEnvio.total,
        items: itemsParaTicket
      });

      setCartItems([]); // Vaciamos el carrito de compras lateral
    } else {
      alert("Hubo un problema inesperado con la respuesta del servidor.");
    }
  } catch (error) {
    console.error("❌ Error al procesar la compra en la base de datos:", error);
    alert("Hubo un error al procesar tu pago en el servidor.");
  }
};

  // Mensaje temporal si la API tarda un instante en responder
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center bg-dark text-white" style={{ minHeight: '100vh' }}>
        <h3>🍕 Cargando el menú dinámico del día...</h3>
      </div>
    )
  }

  // ==========================================
  // VISTA 1: USUARIO AUTENTICADO ("Home Logueado con Grid POS")
  // ==========================================
  return customer && authenticated ? ( 
    <section id='home' style={{ backgroundColor: '#f4f6f4', minHeight: '100vh', paddingTop: '30px' }}>
      <div className="container-fluid px-4">
        
        <div className="row g-4">
          
          {/* COLUMNA IZQUIERDA: MENÚ DINÁMICO DE PLATILLOS (8 de 12 columnas) */}
          <div className="col-12 col-lg-8">
            {/* Encabezado de Bienvenida */}
            <div className="bg-white p-4 rounded-3 shadow-sm mb-4">
              <h2 className="fw-bold text-dark m-0" style={{ fontFamily: 'Georgia, serif' }}>
                ¡Qué bueno verte, {customer.firstName || 'Usuario'}!
              </h2>
              <p className="text-muted m-0 mt-1">Elige los platillos que desees y arma tu orden personalizada</p>
            </div>

            {/* Grid de Tarjetas de Productos Seleccionables */}
            <div className="row g-3">
              {featuredProducts.map((product) => (
                <div className="col-12 col-md-6" key={product.id}>
                  <div className="card h-100 shadow-sm border-0 rounded-3 overflow-hidden bg-white">
                    <div style={{ height: '180px' }}>
                      <img src={product.image} className="w-100 h-100" style={{ objectFit: 'cover' }} alt={product.name} />
                    </div>
                    <div className="card-body d-flex flex-column justify-content-between p-4">
                      <div>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <h4 className="fw-bold m-0 text-dark" style={{ fontFamily: 'Georgia, serif' }}>{product.name}</h4>
                          <span className="badge fs-6 px-3 py-1" style={{ backgroundColor: '#4d5f70', border: 'none' }}>${product.price.toFixed(2)}</span>
                        </div>
                        <p className="text-muted small lh-sm mb-4">{product.ingredients}</p>
                      </div>
                      
                      {/* Botón de selección directa */}
                      <button 
                        className="btn w-100 py-2 fw-bold text-uppercase tracking-wider shadow-sm text-white"
                        style={{ backgroundColor: '#4d5f70', border: 'none' }}
                        onClick={() => handleSelectProduct(product)}
                      >
                        ➕ Seleccionar Platillo
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* COLUMNA DERECHA: GRID DE PEDIDO LATERAL INTERACTIVO (4 de 12 columnas) */}
          <div className="col-12 col-lg-4">
            <div className="card border-0 shadow-sm rounded-3 d-flex flex-column" style={{ position: 'sticky', top: '20px', minHeight: '80vh', backgroundColor: '#ffffff' }}>
              
              {/* Encabezado del Carrito Lateral */}
              <div className="p-3 border-bottom d-flex justify-content-between align-items-center bg-light rounded-top-3">
                <span className="fw-bold text-dark fs-5">🛒 Resumen de Orden</span>
                <button 
                  className="btn btn-sm btn-danger px-3 py-2 fs-6 shadow-sm fw-bold text-white d-flex align-items-center gap-1"
                  style={{ backgroundColor: '#9fc7c9', borderRadius: '4px', border: 'none' }}
                  onClick={() => setCartItems([])}
                >
                  Vaciar
                </button>
                <div className="badge px-3 py-2 fs-6 shadow-sm text-white" style={{ backgroundColor: '#4d5f70' }}>
                  Platillos: {cartCount}
                </div>
              </div>

              {/* Lista de productos agregados (Deslizable individualmente) */}
              <div className="p-3 flex-grow-1 overflow-auto" style={{ maxHeight: '42vh' }}>
                {cartItems.length === 0 ? (
                  <div className="text-center text-muted py-5">
                    <p className="fs-1 m-0">🍽️</p>
                    <p className="small mt-2">Tu pedido está vacío.<br/>Selecciona platillos a la izquierda.</p>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom" key={item.product.id}>
                      <div style={{ maxWidth: '55%' }}>
                        <h6 className="fw-bold text-dark mb-0 text-truncate">{item.product.name}</h6>
                        <small className="text-muted">${item.product.price.toFixed(2)} c/u</small>
                      </div>
                      
                      {/* Controles de cantidad e importes parciales */}
                      <div className="d-flex align-items-center gap-2">
                        <button className="btn btn-sm btn-outline-secondary px-2 py-0 fw-bold" onClick={() => updateQuantity(item.product.id, -1)}>−</button>
                        <span className="fw-bold px-1 text-dark small">{item.quantity}</span>
                        <button className="btn btn-sm btn-outline-secondary px-2 py-0 fw-bold" onClick={() => updateQuantity(item.product.id, 1)}>+</button>
                        <span className="fw-bold text-dark ms-2" style={{ minWidth: '65px', textAlign: 'right' }}>
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Caja Inferior de Totales y Cierre del Pedido */}
              <div className="p-3 bg-light border-top mt-auto rounded-bottom-3">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted small">Sub Total</span>
                  <span className="fw-semibold text-dark">${subTotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted small">IVA (16%)</span>
                  <span className="fw-semibold text-dark">${tax.toFixed(2)}</span>
                </div>
                <hr className="my-2" />
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="fw-bold text-dark fs-5 m-0">Total</span>
                  <span className="fw-bold text-dark fs-4">${total.toFixed(2)}</span>
                </div>

                {/* 🟢 MENÚ DESPLEGABLE DE PAGO */}
                {cartItems.length > 0 && (
                  <div className="mb-2">
                    <button
                      type="button"
                      className="w-100 d-flex justify-content-between align-items-center fw-bold text-dark border-0 p-0 py-2"
                      style={{ background: 'none', fontSize: '1.1rem', cursor: 'pointer' }}
                      onClick={() => setIsPaymentOpen(!isPaymentOpen)}
                    >
                      <span>Metodo de pago</span>
                      <span 
                        className="fw-normal text-muted"
                        style={{ 
                          transform: isPaymentOpen ? 'rotate(180deg)' : 'rotate(0deg)', 
                          transition: 'transform 0.2s ease',
                          fontSize: '0.9rem',
                          marginRight: '2px'
                        }}
                      >
                        v
                      </span>
                    </button>

                    {isPaymentOpen && (
                      <div className="p-3 bg-white rounded border border-light-subtle shadow-sm flex-column d-flex gap-2 mt-2">
                        {/* Opción 1: Efectivo */}
                        <label 
                          className="d-flex align-items-center gap-2 p-2 rounded" 
                          style={{ 
                            cursor: 'pointer', 
                            backgroundColor: paymentMethod === 'efectivo' ? '#f4f9f9' : 'transparent',
                            border: paymentMethod === 'efectivo' ? '1px solid #9fc7c9' : '1px solid #dee2e6'
                          }}
                        >
                          <input 
                            type="radio" 
                            name="payment" 
                            checked={paymentMethod === 'efectivo'} 
                            onChange={() => setPaymentMethod('efectivo')} 
                            style={{ accentColor: '#9fc7c9' }} 
                          />
                          <span className="text-dark fw-medium small">💵 Efectivo contra entrega</span>
                        </label>

                        {/* Opción 2: Tarjeta */}
                        <label 
                          className="d-flex align-items-center gap-2 p-2 rounded" 
                          style={{ 
                            cursor: 'pointer', 
                            backgroundColor: paymentMethod === 'tarjeta' ? '#f4f9f9' : 'transparent',
                            border: paymentMethod === 'tarjeta' ? '1px solid #9fc7c9' : '1px solid #dee2e6'
                          }}
                        >
                          <input 
                            type="radio" 
                            name="payment" 
                            checked={paymentMethod === 'tarjeta'} 
                            onChange={() => setPaymentMethod('tarjeta')} 
                            style={{ accentColor: '#9fc7c9' }} 
                          />
                          <span className="text-dark fw-medium small">💳 Tarjeta de Crédito / Débito</span>
                        </label>

                        {paymentMethod === 'tarjeta' && (
                          <div className="mt-2 p-2.5 bg-light rounded border d-flex flex-column gap-2">
                            <p className="fw-bold text-muted mb-0" style={{ fontSize: '0.75rem' }}>DATOS DE LA TARJETA</p>
                            <input type="text" placeholder="Número de tarjeta (16 dígitos)" className="form-control form-control-sm" maxLength="16" />
                            <div className="d-flex gap-2">
                              <input type="text" placeholder="MM/AA" className="form-control form-control-sm w-50" maxLength="5" />
                              <input type="password" placeholder="CVC" className="form-control form-control-sm w-50" maxLength="3" />
                            </div>
                            <input type="text" placeholder="Nombre del titular" className="form-control form-control-sm" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* ⚡ BOTÓN DE CHECKOUT COMPLETAMENTE VINCULADO AL BACKEND */}
                <button 
                  className="btn w-100 py-3 fw-bold text-uppercase text-white shadow-sm"
                  style={{ backgroundColor: '#4d5f70', border: 'none', borderRadius: '6px', letterSpacing: '0.5px' }}
                  disabled={cartItems.length === 0 || !paymentMethod} 
                  onClick={handleProcederAlPago}
                >
                  Proceder al Pago ➔
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* 🧾 MODAL DINÁMICO DE PAGO EXITOSO (TICKET ESTILO IMAGE_77A607.PNG) */}
{pedidoExitoso && (
  <div style={{
    position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center',
    alignItems: 'center', zIndex: 9999, padding: '20px'
  }}>
    <div style={{
      backgroundColor: '#ffffff', width: '100%', maxWidth: '420px',
      borderRadius: '16px', padding: '30px 24px', position: 'relative',
      boxShadow: '0 10px 25px rgba(0,0,0,0.15)', fontFamily: 'Arial, sans-serif'
    }}>
      
      {/* Botón Cerrar (X) */}
      <button 
        onClick={() => setPedidoExitoso(null)}
        style={{
          position: 'absolute', top: '20px', right: '20px', border: 'none',
          background: 'none', fontSize: '22px', color: '#9ca3af', cursor: 'pointer'
        }}
      >
        ×
      </button>
      
      {/* Icono del Recibo */}
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <span style={{ fontSize: '50px' }}>🧾</span>
      </div>

      <h3 style={{ textAlign: 'center', fontWeight: 'bold', color: '#111827', margin: '0 0 24px 0', fontSize: '22px' }}>
        Payment Successful
      </h3>

      {/* DETALLES DE PAGO */}
      <div style={{ marginBottom: '24px' }}>
        <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: '#374151', marginBottom: '12px' }}>Payment Details</h4>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', color: '#6b7280', marginBottom: '8px' }}>
          <span>Invoice Number</span>
          <span style={{ color: '#1f2937', fontWeight: '500' }}>{pedidoExitoso.invoiceNumber}</span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', color: '#6b7280', marginBottom: '8px' }}>
          <span>Order Time</span>
          <span style={{ color: '#1f2937', fontWeight: '500' }}>{pedidoExitoso.orderTime}</span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', color: '#6b7280', marginBottom: '8px' }}>
          <span>Payment Method</span>
          <span style={{ color: '#1f2937', fontWeight: '500' }}>{pedidoExitoso.paymentMethod}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', color: '#6b7280', marginBottom: '8px' }}>
          <span>Delivery Address</span>
          <span style={{ color: '#1f2937', fontWeight: '500', maxWidth: '200px', textAlign: 'right', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
            {pedidoExitoso.address}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', color: '#6b7280', marginBottom: '8px' }}>
          <span>Payment Status</span>
          <span style={{ backgroundColor: '#10b981', color: '#ffffff', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>
            Successful
          </span>
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: '1px dashed #e5e7eb', margin: '16px 0' }} />

      {/* DETALLES DE PRODUCTOS COMPRADOS */}
      <div style={{ marginBottom: '28px' }}>
        <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: '#374151', marginBottom: '12px' }}>Product Details</h4>
        
        {pedidoExitoso.items.map((item, index) => (
          <div key={index} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', color: '#6b7280', marginBottom: '8px' }}>
            <span>{item.product.name} <small style={{ color: '#9ca3af' }}>x{item.quantity}</small></span>
            <span style={{ color: '#1f2937', fontWeight: '500' }}>${(item.product.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', color: '#6b7280', marginBottom: '8px' }}>
          <span>Delivery Charges</span>
          <span style={{ color: '#1f2937', fontWeight: '500' }}>$0.00</span>
        </div>

        <hr style={{ border: 'none', borderTop: '1px dashed #e5e7eb', margin: '12px 0' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: 'bold', color: '#111827' }}>
          <span>Total Amount</span>
          <span style={{ fontSize: '16px' }}>${pedidoExitoso.amount.toFixed(2)}</span>
        </div>
      </div>

      {/* Botón de Acción Inferior */}
        <div 
          style={{
            width: '100%', 
            backgroundColor: '#9fc7c9', 
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(159, 199, 201, 0.2)', 
            transition: 'background 0.2s',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#8bb3b5'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#9fc7c9'}
        >
          <Link 
            to="/mis-pedidos" 
            className="nav-link text-white fw-bold" 
            onClick={() => setPedidoExitoso(null)} // 👈 ¡CLAVE! Cierra el modal para que no tape la nueva pantalla
            style={{ 
              width: '100%',
              textAlign: 'center',
              padding: '12px 0', // Volvemos al relleno vertical original para mantener la altura del botón
              color: '#ffffff',
              textDecoration: 'none',
              fontSize: '15px',
              fontWeight: 'bold',
              display: 'block' // Hace que todo el botón sea cliqueable y no solo el texto
            }}
          >
            Mis Pedidos
          </Link>
        </div>
    </div>
  </div>
)}
      </div>
    </section>
  ) : (
    // ==========================================
    // VISTA 2: VISTA PÚBLICA (Usa el mismo estado del backend)
    // ==========================================
    <div style={{ backgroundColor: '#f4f6f4', minHeight: '100vh', width: '100%' }}>
      <div className="text-center pt-5 pb-3 bg-white">
        <h1 className="fw-bold text-dark m-0 display-4" style={{ fontFamily: 'Georgia, serif' }}>Napo-eats</h1>
        <p className="text-muted text-uppercase tracking-wider small mt-1" style={{ letterSpacing: '2px' }}>
          COMIDA & DELIVERY EN TIEMPO REAL
        </p>
      </div>

      <div className="py-5 shadow-lg mx-auto rounded-3" style={{ backgroundColor: '#4d5f70', color: '#f8fafc', width: '80%' }}>
        <div className="container-fluid px-4 px-md-5" style={{ maxWidth: '100%' }}>
          <div className="d-flex align-items-center mb-4 border-bottom border-secondary pb-3">
            <span className="me-2 fs-4">🛒</span>
            <span className="text-uppercase small fw-bold tracking-wider text-white-50" style={{ letterSpacing: '1px' }}>
              TU TIENDA — MENÚ ESPECIALIZADO Y ESPECIFICACIONES
            </span>
          </div>

          <div id="napoEatsHorizontalCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              {featuredProducts.map((product, index) => (
                <div key={product.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                  <div className="row g-5 align-items-center px-md-5">
                    <div className="col-12 col-md-6">
                      <div className="rounded-3 overflow-hidden shadow-lg" style={{ height: '400px' }}>
                        <img src={product.image} className="w-100 h-100" style={{ objectFit: 'cover' }} alt={product.name} />
                      </div>
                    </div>
                    
                    <div className="col-12 col-md-6">
                      <span className="badge text-uppercase mb-2" style={{ backgroundColor: 'rgba(159, 199, 201, 0.15)', color: '#9fc7c9', padding: '6px 12px' }}>
                        PRODUCTOS
                      </span>

                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="fw-bold m-0 display-5 text-white" style={{ fontFamily: 'Georgia, serif' }}>
                          {product.name}
                        </h2>
                        <span className="fs-3 fw-bold px-3 py-1 rounded" style={{ color: '#9fc7c9', backgroundColor: 'rgba(159, 199, 201, 0.1)' }}>
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                      
                      <p className="mb-2 text-uppercase fw-bold text-white-50 small" style={{ letterSpacing: '1px' }}>
                        ▶ INGREDIENTES DEL PLATILLO:
                      </p>
                      <p className="lh-lg fs-5" style={{ color: '#cbd5e1' }}>
                        {product.ingredients}
                      </p>

                      <button 
                        className="btn mt-4 px-5 py-3 fw-bold text-uppercase text-white transition shadow-sm"
                        style={{ backgroundColor: '#9fc7c9', border: 'none', borderRadius: '4px' }}
                        onClick={() => navigate('/login')}
                      >
                        🛒 Iniciar Sesión para ordenar
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#napoEatsHorizontalCarousel" data-bs-slide="prev" style={{ width: '3%' }}>
              <span className="carousel-control-prev-icon p-3 rounded-circle" style={{ backgroundColor: '#9fc7c9' }} aria-hidden="true"></span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#napoEatsHorizontalCarousel" data-bs-slide="next" style={{ width: '3%' }}>
              <span className="carousel-control-next-icon p-3 rounded-circle" style={{ backgroundColor: '#9fc7c9' }} aria-hidden="true"></span>
            </button>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Home