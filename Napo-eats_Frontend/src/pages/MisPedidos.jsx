import React, { useState } from 'react';

const MisPedidos = () => {
  // Estado simulado basado en tus requerimientos visuales
  const [pedido, setPedido] = useState({
    id: "ORD-123456", 
    fecha: "03/06/2026",
    entregaEstimada: "30-40",
    status: "Preparando envío", // "Tomando orden", "Cocinando", "Preparando envío", "En camino"
    items: [
      { nombre: "Pizza Pepperoni Grande", cantidad: 1, precio: 180.00 },
      { nombre: "Papas Gajo", cantidad: 1, precio: 60.00 },
      { nombre: "Refresco 600ml", cantidad: 2, precio: 20.00 }
    ],
    detallesEnvio: {
      direccion: "Av. Principal #123, Col. Centro",
      metodoPago: "Tarjeta de Crédito (Procesado por K8s Job)",
      notas: "Sin cebolla en las papas y refrescos bien fríos"
    }
  });

  const etapas = ["Tomando orden", "Cocinando", "Preparando envío", "En camino"];

  const getPorcentajeProgreso = (status) => {
    const index = etapas.indexOf(status);
    if (index === -1) return 0;
    return (index / (etapas.length - 1)) * 100;
  };

  // Calculamos el total de la orden de forma dinámica
  const totalPedido = pedido.items.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  return (
    <div className="container-fluid my-5 d-flex justify-content-center" style={{ minHeight: '85vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Contenedor Principal ajustado al 80% como el inicio */}
      <div style={{ width: '80%' }}>
        
        {/* Tarjeta de Pedido (Gris Azulado) */}
        <div className="card border-0 rounded-3 text-white shadow" style={{ backgroundColor: '#4a5d6e' }}>
          
          {/* Encabezado: ID del Pedido y Fecha */}
          <div className="card-body p-4 pb-2 d-flex justify-content-between align-items-center">
            <span className="fw-bold text-uppercase tracking-wider" style={{ fontSize: '1.1rem', letterSpacing: '0.05em', opacity: 0.9 }}>
              ID DEL PEDIDO: <span className="fw-normal text-light ms-2" style={{ fontFamily: 'Georgia, serif', fontSize: '1.2rem' }}>{pedido.id}</span>
            </span>
            <span className="fw-bold text-uppercase tracking-wider" style={{ fontSize: '0.95rem', letterSpacing: '0.05em', opacity: 0.9 }}>
              Fecha: <span className="fw-normal text-light ms-2" style={{ fontFamily: 'Georgia, serif', fontSize: '1.2rem' }}>{pedido.fecha}</span>
            </span>
          </div>

          <hr className="mx-4 my-2" style={{ borderColor: 'rgba(255,255,255,0.15)', borderWidth: '2px' }} />

          {/* Entrega Estimada */}
          <div className="px-4 pt-3 mb-2">
            <span className="fw-bold text-uppercase tracking-wider" style={{ fontSize: '1.1rem', letterSpacing: '0.05em', opacity: 0.9 }}>
              Entrega estimada en: <span className="fw-normal text-light ms-2" style={{ fontFamily: 'Georgia, serif', fontSize: '1.4rem' }}>({pedido.entregaEstimada}) minutos/horas</span>
            </span>
          </div>

          {/* --- SISTEMA DE SEGUIMIENTO EN TIEMPO REAL --- */}
          <div className="px-5 my-4 position-relative">
            
            {/* Barra de progreso gris de fondo */}
            <div className="position-absolute start-0 end-0 translate-middle-y" style={{ top: '50%', height: '14px', backgroundColor: '#e9ecef', borderRadius: '10px', marginLeft: '3rem', marginRight: '3rem', zIndex: 1 }}>
              {/* Barra de progreso azul activa */}
              <div 
                style={{ 
                  height: '100%', 
                  width: `${getPorcentajeProgreso(pedido.status)}%`, 
                  backgroundColor: '#3b82f6', 
                  borderRadius: '10px',
                  transition: 'width 0.6s ease-in-out'
                }} 
              />
            </div>

            {/* Puntos o Nodos e Indicadores de Texto */}
            <div className="d-flex justify-content-between align-items-center position-relative" style={{ zIndex: 2 }}>
              {etapas.map((etapa, idx) => {
                const etapaIndex = etapas.indexOf(pedido.status);
                const estaCompletado = idx <= etapaIndex;

                return (
                  <div key={etapa} className="d-flex flex-column align-items-center" style={{ width: '85px' }}>
                    {/* El círculo indicador */}
                    <div 
                      className="d-flex align-items-center justify-content-center shadow"
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: estaCompletado ? '#3b82f6' : '#ffffff',
                        border: estaCompletado ? '4px solid #ffffff' : '4px solid #ced4da',
                        boxShadow: estaCompletado ? '0 0 10px rgba(59, 130, 246, 0.6)' : 'none',
                        transition: 'all 0.4s ease'
                      }}
                    >
                      {/* Icono pequeño central si está en la etapa actual */}
                      {pedido.status === etapa && (
                        <div style={{ width: '10px', height: '10px', backgroundColor: '#ffffff', borderRadius: '50%' }} />
                      )}
                    </div>

                    {/* Texto Inferior de la Etapa */}
                    <span 
                      className="text-center mt-3 fw-bold text-uppercase" 
                      style={{ 
                        whiteSpace: 'nowrap',
                        color: pedido.status === etapa ? '#ffffff' : 'rgba(255, 255, 255, 0.6)',
                        fontSize: '0.75rem',
                        letterSpacing: '0.03em'
                      }}
                    >
                      {etapa}
                    </span>
                  </div>
                );
              })}
            </div>

          </div>

          {/* --- BLOQUE DE DESGLOSE TOTALMENTE VERTICAL (Estilo de la maqueta) --- */}
          <div className="p-4 mt-2">
            
            {/* Texto superior de sección */}
            <div className="d-flex align-items-center gap-2 mb-3 text-uppercase tracking-wider" style={{ fontSize: '1.1rem', opacity: 0.85, fontWeight: '700' }}>
              DETALLES DE TU PEDIDO
            </div>

            {/* Contenedor con borde y fondo semi-transparente */}
            <div className="p-4 rounded-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.12)' }}>
              
              {/* Lista fluyendo verticalmente (una debajo de la otra) */}
              <div className="d-flex flex-column gap-3" style={{ fontSize: '1.05rem', color: '#e2e8f0' }}>
                
                {/* 1. Productos */}
                <div className="d-flex align-items-start gap-2">
                  <span style={{ color: '#3b82f6', fontSize: '0.9rem', marginTop: '2px' }}>♦</span>
                  <div>
                    <span className="text-white text-uppercase tracking-wider me-2" style={{ fontWeight: '700', fontSize: '0.95rem' }}>
                      Productos:
                    </span>
                    {pedido.items.map((item, idx) => (
                      <span key={idx} style={{ opacity: 0.9 }}>
                        {item.cantidad}x {item.nombre}{idx < pedido.items.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 2. Especificaciones */}
                <div className="d-flex align-items-start gap-2">
                  <span style={{ color: '#3b82f6', fontSize: '0.9rem', marginTop: '2px' }}>♦</span>
                  <div>
                    <span className="text-white text-uppercase tracking-wider me-2" style={{ fontWeight: '700', fontSize: '0.95rem' }}>
                      Especificaciones:
                    </span> 
                    <span style={{ opacity: 0.9 }}>{pedido.detallesEnvio.notas}</span>
                  </div>
                </div>

                {/* 3. Destino */}
                <div className="d-flex align-items-start gap-2">
                  <span style={{ color: '#3b82f6', fontSize: '0.9rem', marginTop: '2px' }}>♦</span>
                  <div>
                    <span className="text-white text-uppercase tracking-wider me-2" style={{ fontWeight: '700', fontSize: '0.95rem' }}>
                      Destino:
                    </span> 
                    <span style={{ opacity: 0.9 }}>{pedido.detallesEnvio.direccion}</span>
                  </div>
                </div>

                {/* 4. Transacción */}
                <div className="d-flex align-items-start gap-2">
                  <span style={{ color: '#3b82f6', fontSize: '0.9rem', marginTop: '2px' }}>♦</span>
                  <div>
                    <span className="text-white text-uppercase tracking-wider me-2" style={{ fontWeight: '700', fontSize: '0.95rem' }}>
                      Transacción:
                    </span> 
                    <span style={{ opacity: 0.9 }}>{pedido.detallesEnvio.metodoPago}</span>
                  </div>
                </div>

                {/* 5. Total */}
                <div className="d-flex align-items-start gap-2">
                  <span style={{ color: '#3b82f6', fontSize: '0.9rem', marginTop: '2px' }}>♦</span>
                  <div>
                    <span className="text-white text-uppercase tracking-wider me-2" style={{ fontWeight: '700', fontSize: '0.95rem' }}>
                      Total a abonar:
                    </span>
                    <span className="fw-bold" style={{ color: '#9fc7c9', fontSize: '1.2rem' }}>
                      ${totalPedido.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* 6. Sincronización */}
                <div className="d-flex align-items-start gap-2">
                  <span style={{ color: '#3b82f6', fontSize: '0.9rem', marginTop: '2px' }}>♦</span>
                  <div>
                    <span className="text-white text-uppercase tracking-wider me-2" style={{ fontWeight: '700', fontSize: '0.95rem' }}>
                      Sincronización:
                    </span>
                    <span className="badge bg-success bg-opacity-25 text-success border border-success border-opacity-50 px-2 py-1 ms-1 text-uppercase tracking-wider" style={{ fontSize: '0.75rem', fontWeight: '700' }}>
                      React + WebSockets Activo
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default MisPedidos;