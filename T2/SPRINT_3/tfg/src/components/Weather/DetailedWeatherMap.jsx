import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../../styles/map.css";

const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqbXZhenF1ZXpoZXJyZXJhQGFkYWl0cy5lcyIsImp0aSI6ImVjYzI5YzU0LWNhN2YtNDYzZi1iZjlkLWUwOTI5ODU2ZDBkZSIsImlzcyI6IkFFTUVUIiwiaWF0IjoxNzM3NzQxNzc2LCJ1c2VySWQiOiJlY2MyOWM1NC1jYTdmLTQ2M2YtYmY5ZC1lMDkyOTg1NmQwZGUiLCJyb2xlIjoiIn0.3hcx6KrqDOeLZpfbqAsinLAxQmZAohy3gPJ-z1w7N54";
const WEATHER_ENDPOINT = "https://opendata.aemet.es/opendata/api/observacion/convencional/datos/estacion";
const STATIONS_ENDPOINT = "https://opendata.aemet.es/opendata/api/valores/climatologicos/inventarioestaciones/todasestaciones";

// Define custom Pikachu icon.
const pikachuIcon = L.icon({
    iconUrl: "/assets/icons/Pikachu.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

// Converts a ddmmss coordinate to decimal degrees.
const convertCoordinates = (coord) => {
    const numeric = coord.slice(0, -1);
    const hemisphere = coord.slice(-1);
    const degrees = parseInt(numeric.slice(0, 2), 10);
    const minutes = parseInt(numeric.slice(2, 4), 10);
    const seconds = parseInt(numeric.slice(4, 6), 10);
    let decimal = degrees + minutes / 60 + seconds / 3600;
    return hemisphere === "S" || hemisphere === "W" ? -decimal : decimal;
};

// Finds the nearest station from the list based on Euclidean distance approximation.
const findNearestStation = (lat, lon, stationsList) => {
    let nearest = null;
    let minDist = Infinity;
    stationsList.forEach((station) => {
        const stationLat = convertCoordinates(station.latitud);
        const stationLon = convertCoordinates(station.longitud);
        const dist = Math.sqrt((lat - stationLat) ** 2 + (lon - stationLon) ** 2);
        if (dist < minDist) {
            minDist = dist;
            nearest = station;
        }
    });
    return nearest;
};

const DetailedWeatherMap = () => {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [nearestStationData, setNearestStationData] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [stations, setStations] = useState([]);

    useEffect(() => {
        fetch(`${STATIONS_ENDPOINT}?api_key=${API_KEY}`)
            .then((res) => res.json())
            .then((data) => {
                if (data && data.datos) {
                    return fetch(data.datos, {
                        headers: { "Content-Type": "application/json" },
                    });
                }
                throw new Error("No data url for stations");
            })
            .then((res) => res.json())
            .then((stationsData) => setStations(stationsData))
            .catch((err) => console.error("Error fetching stations:", err));
    }, []);

    const handleMapClick = (e) => {
        const { lat, lng } = e.latlng;
        setSelectedLocation({ lat, lng });
        setWeatherData(null);

        if (stations.length > 0) {
            const nearest = findNearestStation(lat, lng, stations);
            setNearestStationData(nearest);

            if (nearest && nearest.indicativo) {
                fetch(`${WEATHER_ENDPOINT}/${nearest.indicativo}?api_key=${API_KEY}`)
                    .then((res) => res.json())
                    .then((data) => {
                        if (data && data.datos) {
                            return fetch(data.datos, {
                                headers: { "Content-Type": "application/json" },
                            });
                        }
                        throw new Error("No data url for weather");
                    })
                    .then((res) => res.json())
                    .then((weather) => setWeatherData(weather[0]))
                    .catch((err) => console.error("Error fetching weather data:", err));
            }
        }
    };

    return (
        <div className="map-wrapper">
            <MapContainer center={[40, -3]} zoom={6} style={{ height: "100%", width: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MapClickHandler onClick={handleMapClick} />
                {selectedLocation && (
                    <Marker icon={pikachuIcon} position={[selectedLocation.lat, selectedLocation.lng]}>
                        <Popup>
                            <div>
                                <h4>Ubicación Seleccionada</h4>
                                <p>
                                    <strong>Lat:</strong> {selectedLocation.lat.toFixed(4)}
                                    <br />
                                    <strong>Lng:</strong> {selectedLocation.lng.toFixed(4)}
                                </p>
                                {nearestStationData && (
                                    <>
                                        <h4>Estación Más Cercana</h4>
                                        <p>
                                            <strong>Indicativo:</strong>{" "}
                                            {nearestStationData.indicativo || "No disponible"}
                                            <br />
                                            <strong>Latitud:</strong> {nearestStationData.latitud || "No disponible"}
                                            <br />
                                            <strong>Longitud:</strong> {nearestStationData.longitud || "No disponible"}
                                        </p>
                                    </>
                                )}
                                {weatherData ? (
                                    <>
                                        <h4>Datos Meteorológicos</h4>
                                        <p>
                                            <strong>Ubicación:</strong> {weatherData.ubi}
                                            <br />
                                            <strong>Temperatura:</strong> {weatherData.ta}°C
                                            <br />
                                            <strong>Humedad:</strong> {weatherData.hr}%
                                            <br />
                                            <strong>Viento:</strong> {weatherData.vv} m/s
                                        </p>
                                    </>
                                ) : (
                                    <p>Cargando datos meteorológicos...</p>
                                )}
                                <p><em>Pika pika, pikachu</em></p>
                            </div>
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    );
};

const MapClickHandler = ({ onClick }) => {
    useMapEvents({ click: onClick });
    return null;
};

export default DetailedWeatherMap;