import React, { useState, useEffect } from 'react';
import { getWeatherPrediction } from '../../services/apiClient.js';
import '../../styles/home.css';

const provinces = [
    { code: '01', name: 'Araba/Álava' },
    { code: '02', name: 'Albacete' },
    { code: '03', name: 'Alacant/Alicante' },
    { code: '04', name: 'Almería' },
    { code: '33', name: 'Asturias' },
    { code: '05', name: 'Ávila' },
    { code: '06', name: 'Badajoz' },
    { code: '08', name: 'Barcelona' },
    { code: '48', name: 'Bizkaia' },
    { code: '09', name: 'Burgos' },
    { code: '10', name: 'Cáceres' },
    { code: '11', name: 'Cádiz' },
    { code: '39', name: 'Cantabria' },
    { code: '12', name: 'Castelló/Castellón' },
    { code: '51', name: 'Ceuta' },
    { code: '13', name: 'Ciudad Real' },
    { code: '14', name: 'Córdoba' },
    { code: '15', name: 'A Coruña' },
    { code: '16', name: 'Cuenca' },
    { code: '17', name: 'Girona' },
    { code: '18', name: 'Granada' },
    { code: '19', name: 'Guadalajara' },
    { code: '20', name: 'Gipuzkoa' },
    { code: '21', name: 'Huelva' },
    { code: '22', name: 'Huesca' },
    { code: '071', name: 'Isla de Menorca' },
    { code: '072', name: 'Isla de Mallorca' },
    { code: '073', name: 'Islas de Ibiza y Formentera' },
    { code: '351', name: 'Isla de Lanzarote' },
    { code: '352', name: 'Isla de Fuerteventura' },
    { code: '353', name: 'Isla de Gran Canaria' },
    { code: '381', name: 'Isla de Tenerife' },
    { code: '382', name: 'Isla de La Gomera' },
    { code: '383', name: 'Isla de La Palma' },
    { code: '384', name: 'Isla de El Hierro' },
    { code: '23', name: 'Jaén' },
    { code: '24', name: 'León' },
    { code: '25', name: 'Lleida' },
    { code: '27', name: 'Lugo' },
    { code: '28', name: 'Madrid' },
    { code: '29', name: 'Málaga' },
    { code: '52', name: 'Melilla' },
    { code: '30', name: 'Murcia' },
    { code: '31', name: 'Navarra' },
    { code: '32', name: 'Ourense' },
    { code: '34', name: 'Palencia' },
    { code: '36', name: 'Pontevedra' },
    { code: '26', name: 'La Rioja' },
    { code: '37', name: 'Salamanca' },
    { code: '40', name: 'Segovia' },
    { code: '41', name: 'Sevilla' },
    { code: '42', name: 'Soria' },
    { code: '43', name: 'Tarragona' },
    { code: '44', name: 'Teruel' },
    { code: '45', name: 'Toledo' },
    { code: '46', name: 'València/Valencia' },
    { code: '47', name: 'Valladolid' },
    { code: '49', name: 'Zamora' },
    { code: '50', name: 'Zaragoza' },
];

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