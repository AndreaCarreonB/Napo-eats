import React from 'react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { SignInCustomer } from '../services/Auth'

const Login = ({ toggleAuthenticated, setCustomer }) => {
  let navigate = useNavigate()
  const [formValues, setFormValues] = useState({ email: '', password: '' })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    // 1. Mandamos las credenciales al backend mediante tu servicio de Axios
    const res = await SignInCustomer(formValues) 
    
    // 🔍 Espía en la consola para auditar qué estructura exacta devuelve tu servidor
    console.log("Respuesta completa del servicio de Auth:", res)

    // 2. Guardamos el token en el almacenamiento local para que la sesión sea persistente
    if (res && res.token) {
      localStorage.setItem('token', res.token)
    }

    // 3. Informamos a App.js para que actualice los estados globales
    if (setCustomer) {
      // res.customer maneja la estructura { customer: {...}, token: '...' }
      // res maneja el caso donde el backend devuelve directo los datos del usuario
      setCustomer(res.customer || res) 
    }
    
    if (toggleAuthenticated) {
      toggleAuthenticated(true) // ⚡ Esto activa instantáneamente el NavBar privado
    }
    navigate('/') 

  } catch (error) {
    console.error("Error al iniciar sesión:", error)
    alert("Correo electrónico o contraseña incorrectos. Inténtalo de nuevo.")
  }
}

  return (
    <section id="login" style={{ backgroundColor: '#f4f6f4', minHeight: 'calc(100vh - 62px)', padding: '40px 15px' }}>
      <div className="container bg-white rounded-3 shadow-sm p-4 p-md-5" style={{ maxWidth: '960px' }}>
        <div className="row g-4">
          
          {/* LADO IZQUIERDO: Beneficios informativos */}
          <div className="col-12 col-md-6 border-end-md pe-md-4 align-self-center">
            <div className="d-flex align-items-center text-muted mb-3">
              <span className="fs-4 me-2">👤</span>
              <h2 className="fw-normal fs-4 m-0" style={{ fontFamily: 'Georgia, serif', color: '#3d4d5c' }}>
                ¡Bienvenid@!
              </h2>
            </div>
            
            <h6 className="border-top fw-bold text-dark pt-3 mt-2 mb-4">
              Conecta tu cuenta y disfruta de una experiencia personalizada.
            </h6>
            
            <ul className="list-unstyled text-secondary lh-lg fs-6">
              <li className="mb-2"> ✓ Ordena tus platillos favoritos más rápido.</li>
              <li className="mb-2"> ✓ Guarda direcciones y métodos de pago.</li>
              <li className="mb-2"> ✓ Consulta el historial de tus pedidos.</li>
              <li className="mb-2"> ✓ Recibe promociones y descuentos exclusivos.</li>
              <li className="mb-2"> ✓ Sigue tu pedido en tiempo real.</li>
            </ul>
            
            <p className="fw-bold text-dark mt-4">Registrarte es gratis y solo te tomará unos minutos.</p>
                        
            <div className="mt-4 pt-3 border-top">
              <span className="text-muted">¿No tienes cuenta? </span>
              <Link to="/register" className="fw-bold text-decoration-none" style={{ color: '#4d5f70' }}>
                Regístrate aquí
              </Link>
            </div>
          </div>

          {/* LADO DERECHO: Redes sociales + Formulario Real */}
          <div className="col-12 col-md-6 border-end-md pe-md-4 align-self-center">
            
            <div className="text-center position-relative mb-4">
              <span className="bg-white px-3 text-muted small fw-semibold text-uppercase" style={{ zIndex: 1 }}>Conéctate con tu correo</span>
              <div className="position-absolute top-50 start-0 end-0 border-bottom" style={{ zIndex: -1 }}></div>
            </div>

            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
              <div>
                <label htmlFor="inputEmail4" className="form-label fw-semibold text-secondary small">Email</label>
                <input 
                  onChange={handleChange}
                  name="email"
                  type="email" 
                  value={formValues.email}
                  className="form-control" 
                  id="inputEmail4" 
                  required
                  placeholder="ejemplo@correo.com"
                  style={{ height: '45px' }}
                />
              </div>

              <div>
                <label htmlFor="inputPassword4" className="form-label fw-semibold text-secondary small">Contraseña</label>
                <input 
                  onChange={handleChange}
                  type="password"
                  name="password"
                  value={formValues.password}
                  required
                  className="form-control" 
                  id="inputPassword4"
                  placeholder="Escribe tu contraseña"
                  style={{ height: '45px' }}
                />
              </div>

              <button 
                type="submit" 
                disabled={!formValues.email || !formValues.password}
                className="btn text-white fw-bold text-uppercase w-100 mt-2"
                style={{ 
                  backgroundColor: formValues.email && formValues.password ? '#3d4d5c' : '#4d5f70',
                  height: '45px',
                  border: 'none'
                }}
              >
                INICIA SESIÓN
              </button>
            </form>

          </div>

        </div>
      </div>
    </section>
  )
}

export default Login