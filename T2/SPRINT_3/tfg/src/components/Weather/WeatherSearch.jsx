import React, { useState, useEffect } from 'react';
import { getWeatherPrediction } from '../../services/apiClient.js';
import { provinces } from '../../services/provincesData.js'; // Importa el listado de provincias
import '../../styles/home.css';

const WeatherSearch = () => {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    // Estado para la provincia seleccionada (por defecto Sevilla - código 41)
    const [selectedProvince, setSelectedProvince] = useState('41');

    // Función para obtener la predicción en base a la provincia actual
    const fetchWeather = async (provinceCode) => {
        setIsLoading(true);
        setError('');
        try {
            // Usar el endpoint cambiando el código final por el valor seleccionado
            const data = await getWeatherPrediction(provinceCode);
            console.log('Datos de la API:', data); // Para depuración
            setWeather(data);
        } catch (err) {
            setError(err.message);
            setWeather(null);
        } finally {
            setIsLoading(false);
        }
    };

    // Petición inicial con la provincia por defecto
    useEffect(() => {
        fetchWeather(selectedProvince);
    }, []);

    // Manejar el clic del botón para cambiar la provincia
    const handleProvinceChange = () => {
        fetchWeather(selectedProvince);
    };

    return (
        <div className="weather-search">
            <h2>Predicción del Tiempo</h2>
            <div className="province-selector">
                <label htmlFor="province">Selecciona una provincia:</label>
                <select
                    id="province"
                    value={selectedProvince}
                    onChange={(e) => setSelectedProvince(e.target.value)}
                >
                    {provinces.map((prov) => (
                        <option key={prov.code} value={prov.code}>
                            {prov.code} - {prov.name}
                        </option>
                    ))}
                </select>
                <button onClick={handleProvinceChange}>Cambiar Provincia</button>
            </div>
            {isLoading ? (
                <div className="loader" aria-label="Cargando predicción del tiempo...">
                    {/* Spinner de carga */}
                </div>
            ) : error ? (
                <p className="error">{error}</p>
            ) : (
                weather && (
                    <div className="weather-result">
                        <pre>{weather}</pre>
                    </div>
                )
            )}
        </div>
    );
};

export default WeatherSearch;