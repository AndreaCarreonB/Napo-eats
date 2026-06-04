import React from 'react'
import { Link } from 'react-router-dom';

const NavBar = ({ authenticated, customer, handleLogOut }) => {
  

  // 🎨 Estilos personalizados con tu color oscuro #9fc7c9
  const navStyle = {
    backgroundColor: '#4d5f70', // Tu color solicitado
    padding: '10px 20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
  };

  const searchInputStyle = {
    borderRadius: '0px', 
    border: '1px solid #ffffff',
    backgroundColor: 'rgba(255, 255, 255, 0.2)', 
    color: '#ffffff',
    height: '42px'
  };

  // 1️⃣ MENÚ PRIVADO (Cuando el usuario SI ha iniciado sesión)
  const authenticatedOptions = (
    <div className="d-flex align-items-center justify-content-between w-100 flex-wrap">
      {/* Lado Izquierdo: Solo Nombre como botón de Inicio/Home */}
      <div className="d-flex align-items-center">
        <a className="navbar-brand text-white fw-bold fs-2 m-0" href="/" style={{ fontFamily: 'Georgia, serif' }}>
          Napo-eats
        </a>
      </div>

      {/* Centro: El buscador */}
      <div className="flex-grow-1 mx-4 d-flex align-items-center" style={{ maxWidth: '500px', height: '42px' }}>
        <div className="input-group w-100">
          <input 
            type="search" 
            className="form-control text-white" 
            placeholder="¿Qué se te antoja pedir hoy?..." 
            style={{
              borderRadius: '0px', 
              border: '1px solid #ffffff',
              backgroundColor: 'rgba(255, 255, 255, 0.2)', 
              color: '#ffffff',
              height: '42px',
              margin: '0',
              WebkitTextFillColor: '#ffffff' // Asegura el color del texto en navegadores basados en Webkit
            }}
          />
          <button 
            className="btn btn-outline-light d-flex align-items-center justify-content-center" 
            type="button" 
            style={{ 
              borderRadius: '0px', 
              borderLeft: 'none', 
              height: '42px', 
              width: '45px'
            }}
          >
            🔍
          </button>
        </div>
      </div>

      <div className="d-flex align-items-center gap-3">
        
        {/* BOTÓN: MIS PEDIDOS (Mismo estilo exacto que tenías, color #9fc7c9) */}
        <div style={{
          backgroundColor: '#9fc7c9', 
          border: 'none',
          borderRadius: '8px',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <Link 
            to="/mis-pedidos" 
            className="nav-link text-white fw-bold" 
            style={{ 
              padding: 0, 
              color: '#ffffff',
              textDecoration: 'none'
            }}
          >
            Mis Pedidos
          </Link>
        </div>

        {/* NUEVO BOTÓN INTEGRADO ESTILO KIWILIMÓN */}
        <div style={{
          backgroundColor: '#9fc7c9', 
          border: 'none',
          borderRadius: '8px',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <a className="nav-link text-white fw-bold" style={{ color: '#9fc7c9' }} onClick={handleLogOut} href="/">
              Salir
          </a>
        </div>

        {/* Tu imagen fija en el extremo derecho */}
        <img 
          src="/napo-eats.png" 
          alt="Logo" 
          style={{ height: '80px', width: '80px', borderRadius: '50%', objectFit: 'cover' }} 
        />

      </div>
    </div>
  )

  // MENÚ PÚBLICO (Cuando NO han iniciado sesión)
  const publicOptions = (
    <div className="d-flex align-items-center justify-content-between w-100 flex-wrap">
      {/* Lado Izquierdo: Solo Nombre como botón de Inicio/Home */}
      <div className="d-flex align-items-center">
        <a className="navbar-brand text-white fw-bold fs-2 m-0" href="/" style={{ fontFamily: 'Georgia, serif' }}>
          Napo-eats
        </a>
      </div>

      {/* Centro: El buscador (Nivelado verticalmente y optimizado para delivery) */}
      <div className="flex-grow-1 mx-4 d-flex align-items-center" style={{ maxWidth: '500px', height: '42px' }}>
        <div className="input-group w-100">
          <input 
            type="search" 
            className="form-control text-white" 
            placeholder="¿Qué se te antoja pedir hoy?..." 
            style={{
              borderRadius: '0px', 
              border: '1px solid #ffffff',
              backgroundColor: 'rgba(255, 255, 255, 0.2)', 
              color: '#ffffff',
              height: '42px',
              margin: '0',
              WebkitTextFillColor: '#ffffff' // Asegura el color del texto en navegadores basados en Webkit
            }}
          />
          <button 
            className="btn btn-outline-light d-flex align-items-center justify-content-center" 
            type="button" 
            style={{ 
              borderRadius: '0px', 
              borderLeft: 'none', 
              height: '42px', 
              width: '45px'
            }}
          >
            🔍
          </button>
        </div>
      </div>

      {/* Lado Derecho: El nuevo botón integrado + Tu Imagen de Logo */}
      <div className="d-flex align-items-center gap-3">
        
        {/* NUEVO BOTÓN INTEGRADO ESTILO KIWILIMÓN */}
        <div style={{
          backgroundColor: '#9fc7c9', 
          border: 'none',
          borderRadius: '8px',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <a href="/register" className="text-white fw-bold text-uppercase small text-decoration-none">
            REGÍSTRATE
          </a>
          <span className="text-white-50">|</span>
          <a href="/login" className="text-white fw-bold text-uppercase small text-decoration-none">
            INICIA SESIÓN
          </a>
        </div>

        {/* Tu imagen fija en el extremo derecho */}
        <img 
          src="/napo-eats.png" 
          alt="Logo" 
          style={{ height: '80px', width: '80px', borderRadius: '50%', objectFit: 'cover' }} 
        />
      </div>
    </div>
  )

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={navStyle}>
      <div className="container-fluid">
        {/* Cambiamos las variables fijas por la evaluación real de las propiedades */}
        {authenticated && customer ? authenticatedOptions : publicOptions}
      </div>
    </nav>
  )
}

export default NavBar