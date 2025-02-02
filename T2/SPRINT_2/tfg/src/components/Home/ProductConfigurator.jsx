import React, { useState, useEffect } from 'react';

const ProductConfigurator = ({
  products,
  activeProduct,
  setActiveProduct,
  onConfigure,
}) => {
  // Almacena las configuraciones asignadas a cada producto por su id
  const [configurations, setConfigurations] = useState({});
  // Configuración temporal para el modal de configuración individual
  const [tempConfig, setTempConfig] = useState({ color: '', engine: '', tuning: '' });
  // Estados para el filtro global
  const [filterColor, setFilterColor] = useState('');
  const [filterEngine, setFilterEngine] = useState('');
  const [filterTuning, setFilterTuning] = useState('');

  const colors = ['Rojo', 'Azul', 'Negro', 'Blanco', 'Verde'];
  const engines = ['Motor 1.6L', 'Motor 2.0L', 'Motor 2.5L'];
  const tunings = ['Deportivo', 'Económico', 'Equilibrado'];

  // Sincroniza la configuración temporal con la configuración previa del producto activo
  useEffect(() => {
    if (activeProduct) {
      setTempConfig(configurations[activeProduct.id] || { color: '', engine: '', tuning: '' });
    }
  }, [activeProduct, configurations]);

  // Guarda la configuración para el producto activo y cierra el modal
  const saveProductConfig = () => {
    if (activeProduct) {
      setConfigurations({ ...configurations, [activeProduct.id]: tempConfig });
      setActiveProduct(null);
    }
  };

  // Aplica el filtro global basado en las configuraciones asignadas a los productos
  const applyGlobalFilter = () => {
    const filtered = products.filter((prod) => {
      const conf = configurations[prod.id] || {};
      const matchColor = filterColor ? conf.color === filterColor : true;
      const matchEngine = filterEngine ? conf.engine === filterEngine : true;
      const matchTuning = filterTuning ? conf.tuning === filterTuning : true;
      return matchColor && matchEngine && matchTuning;
    });
    onConfigure(filtered);
  };

  // Cancela TODAS las configuraciones y muestra todos los productos
  const cancelAllConfigurations = () => {
    setConfigurations({});
    // Reinicia los filtros globales
    setFilterColor('');
    setFilterEngine('');
    setFilterTuning('');
    // Muestra todos los productos
    onConfigure(products);
  };

  return (
    <div className="configurator-container">
      <h2>Configuración de Productos</h2>
      <p>
        Para configurar un producto, utiliza el botón "Abrir Configurador" en la tarjeta correspondiente.
      </p>
      {/* Sección de filtrado global */}
      <div className="global-filter-section">
        <h3>Filtrar Productos por Configuración</h3>
        <div className="configurator-field">
          <label>Color:</label>
          <select value={filterColor} onChange={(e) => setFilterColor(e.target.value)}>
            <option value="">Todos</option>
            {colors.map((color, idx) => (
              <option key={idx} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
        <div className="configurator-field">
          <label>Motor:</label>
          <select value={filterEngine} onChange={(e) => setFilterEngine(e.target.value)}>
            <option value="">Todos</option>
            {engines.map((engine, idx) => (
              <option key={idx} value={engine}>
                {engine}
              </option>
            ))}
          </select>
        </div>
        <div className="configurator-field">
          <label>Tuning:</label>
          <select value={filterTuning} onChange={(e) => setFilterTuning(e.target.value)}>
            <option value="">Todos</option>
            {tunings.map((tuning, idx) => (
              <option key={idx} value={tuning}>
                {tuning}
              </option>
            ))}
          </select>
        </div>
        <div className="configurator-buttons">
          <button className="configurator-button" onClick={applyGlobalFilter}>
            Aplicar Filtro Global
          </button>
          <button className="configurator-button" onClick={cancelAllConfigurations}>
            Cancelar Configuración
          </button>
        </div>
      </div>

      {/* Modal de configuración para producto individual */}
      {activeProduct && (
        <div className="configurator-modal-overlay">
          <div className="configurator-modal">
            <h3>Configurar: {activeProduct.name}</h3>
            <div className="configurator-field">
              <label>Color:</label>
              <select
                value={tempConfig.color}
                onChange={(e) => setTempConfig({ ...tempConfig, color: e.target.value })}
              >
                <option value="">Sin asignar</option>
                {colors.map((color, idx) => (
                  <option key={idx} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>
            <div className="configurator-field">
              <label>Motor:</label>
              <select
                value={tempConfig.engine}
                onChange={(e) => setTempConfig({ ...tempConfig, engine: e.target.value })}
              >
                <option value="">Sin asignar</option>
                {engines.map((engine, idx) => (
                  <option key={idx} value={engine}>
                    {engine}
                  </option>
                ))}
              </select>
            </div>
            <div className="configurator-field">
              <label>Tuning:</label>
              <select
                value={tempConfig.tuning}
                onChange={(e) => setTempConfig({ ...tempConfig, tuning: e.target.value })}
              >
                <option value="">Sin asignar</option>
                {tunings.map((tuning, idx) => (
                  <option key={idx} value={tuning}>
                    {tuning}
                  </option>
                ))}
              </select>
            </div>
            <div className="configurator-buttons">
              <button onClick={saveProductConfig}>Guardar Configuración</button>
              <button onClick={() => setActiveProduct(null)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductConfigurator;