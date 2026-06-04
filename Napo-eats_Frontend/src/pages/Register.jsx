import React from 'react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { RegisterCustomer } from '../services/Auth'
import { BASE_URL } from '../globals'
import Client from '../services/api'


const Register = () => {
  const initialState = {
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  const [formValues, setFormValues] = useState(initialState)
  const [customerData, setCustomerData] = useState(null)
  let navigate = useNavigate()

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      // 1. Guarda al usuario en la base de datos
      const res = await RegisterCustomer({
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        address: formValues.address,
        email: formValues.email,
        password: formValues.password
      })
      
      setCustomerData(res.id)
      
      // 2. Genera la orden inicial usando el 'Client' que acabas de importar
      await Client.post(`/orders/customer_id/${res.id}`)

      // 3. Si todo sale bien, dispara la alerta de éxito

      // 4. Limpia el formulario y te manda a la página principal
      setFormValues(initialState)
      navigate('/login')

    } catch (error) {
      // Si algo falla o el correo está repetido, cae aquí y te avisa en vez de congelar la pantalla
      console.error("Error en el registro:", error)
      alert("Hubo un problema. Asegúrate de estar usando un correo electrónico nuevo.")
    }
  }
  return (
    // Fondo de pantalla general (#f4f6f4) que llena la vista
    <section id="register-page" style={{ backgroundColor: '#f4f6f4', minHeight: 'calc(100vh - 62px)', padding: '40px 15px' }}>
      
      {/* Contenedor central Blanco estilo Paper */}
      <div className="container bg-white rounded-3 shadow-sm p-4 p-md-5" style={{ maxWidth: '960px' }}>
        <div className="row g-4">
          
          {/* LADO IZQUIERDO: Beneficios Informativos (Centrado verticalmente con align-self-center) */}
          <div className="col-12 col-md-6 border-end-md pe-md-4 align-self-center">
            <div className="d-flex align-items-center text-muted mb-3">
              <span className="fs-4 me-2">📝</span>
              <h2 className="fw-normal fs-4 m-0" style={{ fontFamily: 'Georgia, serif', color: '#3d4d5c' }}>
                ¡Únete a Napo-eats!
              </h2>
            </div>
            
            <h6 className="border-top fw-bold text-dark pt-3 mt-2 mb-4">
              Crea tu cuenta y disfruta de una experiencia personalizada.
            </h6>
            
            <ul className="list-unstyled text-secondary lh-lg fs-6">
              <li className="mb-2"> ✓ Ordena tus platillos favoritos más rápido.</li>
              <li className="mb-2"> ✓ Guarda direcciones y métodos de pago de forma segura.</li>
              <li className="mb-2"> ✓ Consulta el historial de tus pedidos cuando quieras.</li>
              <li className="mb-2"> ✓ Recibe promociones y descuentos exclusivos en delivery.</li>
              <li className="mb-2"> ✓ Sigue tu pedido en tiempo real hasta tu puerta.</li>
            </ul>
            
            <p className="fw-bold text-dark mt-4">Registrarte es gratis y solo te tomará unos minutos.</p>
            
            <div className="mt-4 pt-3 border-top">
              <span className="text-muted">¿Ya tienes una cuenta? </span>
              <Link 
                to="/login" 
                className="fw-bold text-decoration-none" 
                style={{ color: '#4d5f70' }}
              >
                Inicia sesión aquí
              </Link>
            </div>
          </div>

          {/* LADO DERECHO: Formulario Real de Registro */}
          <div className="col-12 col-md-6 ps-md-4">
            
            <div className="text-center position-relative mb-4">
              <span className="bg-white px-3 text-muted small fw-semibold text-uppercase" style={{ zIndex: 1 }}>
                Formulario de Registro
              </span>
              <div className="position-absolute top-50 start-0 end-0 border-bottom" style={{ zIndex: -1 }}></div>
            </div>

            <form onSubmit={handleSubmit} className="row g-0.5">
              {/* Nombre */}
              <div className="col-md-6">
                <label htmlFor="firstName" className="form-label fw-semibold text-secondary small mb-1">Nombre</label>
                <input 
                  onChange={handleChange}
                  name="firstName"
                  type="text" 
                  value={formValues.firstName}
                  className="form-control" 
                  id="firstName" 
                  required
                  placeholder="Tu nombre"
                />
              </div>

              {/* Apellido */}
              <div className="col-md-6">
                <label htmlFor="lastName" className="form-label fw-semibold text-secondary small mb-1">Apellido</label>
                <input 
                  onChange={handleChange}
                  type="text"
                  name="lastName"
                  value={formValues.lastName}
                  required
                  className="form-control" 
                  id="lastName"
                  placeholder="Tu apellido"
                />
              </div>

              {/* Email */}
              <div className="col-12">
                <label htmlFor="email" className="form-label fw-semibold text-secondary small mb-1">Email</label>
                <input 
                  onChange={handleChange}
                  name="email"
                  type="email" 
                  value={formValues.email}
                  className="form-control" 
                  id="email" 
                  required
                  placeholder="ejemplo@correo.com"
                />
              </div>

              {/* Contraseña */}
              <div className="col-md-6">
                <label htmlFor="password" className="form-label fw-semibold text-secondary small mb-1">Contraseña</label>
                <input 
                  onChange={handleChange}
                  type="password"
                  name="password"
                  value={formValues.password}
                  required
                  className="form-control" 
                  id="password"
                  placeholder="Mínimo 6 caracteres"
                />
              </div>

              {/* Confirmar Contraseña */}
              <div className="col-md-6">
                <label htmlFor="confirmPassword" className="form-label fw-semibold text-secondary small mb-1">Confirmar Contraseña</label>
                <input 
                  onChange={handleChange}
                  type="password"
                  name="confirmPassword"
                  value={formValues.confirmPassword}
                  required
                  className="form-control" 
                  id="confirmPassword"
                  placeholder="Repite tu contraseña"
                />
              </div>

              {/* Dirección */}
              <div className="col-12">
                <label htmlFor="inputAddress" className="form-label fw-semibold text-secondary small mb-1">Dirección de Entrega</label>
                <input 
                  onChange={handleChange}
                  type="text"
                  name="address"
                  value={formValues.address}
                  required
                  className="form-control" 
                  id="inputAddress" 
                  placeholder="Calle, Número, Colonia o Municipio"
                />
              </div>

              {/* Botón de Enviar Dinámico */}
              <div className="col-12 mt-4">
                <button 
                  type="submit" 
                  disabled={
                    !formValues.email || 
                    !formValues.password || 
                    formValues.password !== formValues.confirmPassword
                  }
                  className="btn text-white fw-bold text-uppercase w-100"
                  style={{ 
                    backgroundColor: (formValues.email && formValues.password && formValues.password === formValues.confirmPassword) ? '#3d4d5c' : '#a0aab2',
                    height: '45px',
                    border: 'none',
                    borderRadius: '6px'
                  }}
                >
                  Registrarme
                </button>
              </div>
            </form>

          </div>

        </div>
      </div>
    </section>
  )
}

export default Register