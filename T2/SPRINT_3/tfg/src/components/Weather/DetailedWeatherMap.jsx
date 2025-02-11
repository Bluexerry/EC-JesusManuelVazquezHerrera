// Language: JavaScript (JSX)
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { getWeatherPrediction } from '../../services/apiClient.js';
import { provinces, provincesCoordinates } from '../../services/provincesData.js';
import 'leaflet/dist/leaflet.css';
import '../../styles/mapa.css';

const DetailedWeatherMap = () => {
    const [selectedWeather, setSelectedWeather] = useState(null);
    const [error, setError] = useState('');
    const [loadingCode, setLoadingCode] = useState('');

    const handleGetWeather = async (provinceCode) => {
        setSelectedWeather(null);
        setError('');
        setLoadingCode(provinceCode);
        try {
            const data = await getWeatherPrediction(provinceCode);
            setSelectedWeather({ code: provinceCode, data });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoadingCode('');
        }
    };

    // Ícono del marcador utilizando la ruta pública
    const markerIcon = new L.Icon({
        iconUrl: process.env.PUBLIC_URL + '/assets/icons/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
    });

    return (
        <div className="detailed-weather-map">
            <h2 className="map-header">Mapa Meteorológico Interactivo</h2>
            <div className="map-wrapper">
                <MapContainer center={[40.0, -3.7]} zoom={6} className="map-container">
                    <TileLayer
                        attribution='&copy; OpenStreetMap contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {provinces.map((prov) => {
                        const coord = provincesCoordinates[prov.code];
                        if (!coord) return null;
                        return (
                            <Marker key={prov.code} position={[coord.lat, coord.lng]} icon={markerIcon}>
                                <Popup className="marker-popup">
                                    <h3 className="popup-title">{prov.name}</h3>
                                    <p className="popup-code">Código: {prov.code}</p>
                                    <button 
                                        className="popup-button" 
                                        onClick={() => handleGetWeather(prov.code)} 
                                        disabled={loadingCode === prov.code}
                                    >
                                        {loadingCode === prov.code ? 'Cargando...' : 'Ver Predicción'}
                                    </button>
                                    {selectedWeather && selectedWeather.code === prov.code && (
                                        <div className="weather-data">
                                            <h4>Datos Meteorológicos:</h4>
                                            <pre className="weather-pre" style={{ maxHeight: '150px', overflow: 'auto' }}>
                                                {selectedWeather.data}
                                            </pre>
                                        </div>
                                    )}
                                    {error && <p className="popup-error">{error}</p>}
                                </Popup>
                            </Marker>
                        );
                    })}
                </MapContainer>
            </div>
        </div>
    );
};

export default DetailedWeatherMap;