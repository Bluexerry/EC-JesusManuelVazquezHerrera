import React, { useState } from 'react';
import municipios from '../../services/Municipios.json';

const API_KEY =
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqbXZhenF1ZXpoZXJyZXJhQGFkYWl0cy5lcyIsImp0aSI6ImVjYzI5YzU0LWNhN2YtNDYzZi1iZjlkLWUwOTI5ODU2ZDBkZSIsImlzcyI6IkFFTUVUIiwiaWF0IjoxNzM3NzQxNzc2LCJ1c2VySWQiOiJlY2MyOWM1NC1jYTdmLTQ2M2YtYmY5ZC1lMDkyOTg1NmQwZGUiLCJyb2xlIjoiIn0.3hcx6KrqDOeLZpfbqAsinLAxQmZAohy3gPJ-z1w7N54';

// Ajusta el periodo según la hora actual
const getPeriodForHour = (hour) => {
    if (hour < 6) return '00-06';
    if (hour < 12) return '06-12';
    if (hour < 18) return '12-18';
    return '18-24';
};

const DetailedWeatherSearch = () => {
    const [forecast, setForecast] = useState(null);
    const [selectedMunicipio, setSelectedMunicipio] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Busca la temperatura más cercana a la hora indicada
    const getValueForHour = (data = [], targetHour) => {
        if (!data.length) return null;
        const exact = data.find((item) => item.hora === targetHour);
        if (exact) return exact.value;
        const lower = data.filter((item) => item.hora < targetHour).pop();
        const upper = data.find((item) => item.hora > targetHour);
        if (lower && upper) {
            return Math.round((Number(lower.value) + Number(upper.value)) / 2);
        }
        // Si no puede interpolar, devuelve la primera lectura
        return data[0].value;
    };

    // Toma la condición climática según el periodo
    const getConditionForPeriod = (estadoCielo = [], periodoPreferred) => {
        let cond = estadoCielo.find((item) => item.periodo === periodoPreferred);
        if (!cond) {
            cond = estadoCielo.find((item) => item.periodo === '00-24');
        }
        // Si todo está vacío, devuelve 'No disponible'
        return cond ? cond.descripcion || cond.value || 'No disponible' : 'No disponible';
    };

    // Toma la info de viento según el periodo
    const getWindForPeriod = (viento = [], periodoPreferred) => {
        let wind = viento.find((item) => item.periodo === periodoPreferred);
        if (!wind) {
            wind = viento.find((item) => item.periodo === '00-24');
        }
        return wind || { direccion: 'No disponible', velocidad: 0 };
    };

    // Calcula qué día y hora deben usarse como "actual"
    const transformForecast = (data) => {
        const days = data[0]?.prediccion?.dia || [];
        if (!days.length) return null;

        // Busca el día que coincida con la fecha actual. Si no lo hay, usa el primero.
        const todayString = new Date().toISOString().slice(0, 10); // yyyy-mm-dd
        let currentDay = days.find((d) => d.fecha && d.fecha.startsWith(todayString));
        if (!currentDay) {
            currentDay = days[0];
        }

        // Toma la hora real del sistema
        const hourNow = new Date().getHours();

        // Datos "actuales" usando la hora y periodo del momento
        const current = {
            fecha: currentDay.fecha,
            temperature: getValueForHour(currentDay.temperatura?.dato, hourNow),
            condition: getConditionForPeriod(currentDay.estadoCielo, getPeriodForHour(hourNow)),
            wind: getWindForPeriod(currentDay.viento, getPeriodForHour(hourNow)),
        };

        // Arma la "predicción" para los próximos 2 días
        const dayIndex = days.indexOf(currentDay);
        // Slice de los siguientes 2 días (si existen)
        const nextDays = days.slice(dayIndex + 1, dayIndex + 3);

        const predictions = nextDays.map((day) => ({
            fecha: day.fecha,
            morning: {
                temperature: getValueForHour(day.temperatura?.dato, 8),
                condition: getConditionForPeriod(day.estadoCielo, '06-12'),
                wind: getWindForPeriod(day.viento, '06-12'),
            },
            afternoon: {
                temperature: getValueForHour(day.temperatura?.dato, 15),
                condition: getConditionForPeriod(day.estadoCielo, '12-18'),
                wind: getWindForPeriod(day.viento, '12-18'),
            },
            night: {
                temperature: getValueForHour(day.temperatura?.dato, 21),
                condition: getConditionForPeriod(day.estadoCielo, '18-24'),
                wind: getWindForPeriod(day.viento, '18-24'),
            },
        }));

        return { current, predictions };
    };

    // Escoge el icono en base a la descripción
    const getIconForCondition = (condition) => {
        const cond = condition.toLowerCase();
        if (cond.includes('despejado') || cond.includes('soleado')) {
            return 'fas fa-sun';
        } else if (cond.includes('nublado') || cond.includes('nuboso')) {
            return 'fas fa-cloud';
        } else if (cond.includes('lluvia') || cond.includes('lluvioso')) {
            return 'fas fa-cloud-showers-heavy';
        }
        return 'fas fa-question';
    };

    // Hace la llamada a la API
    const getDetailedWeatherPrediction = async (municipioCode) => {
        setIsLoading(true);
        setError('');
        try {
            const response = await fetch(
                `https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/${municipioCode}`,
                {
                    headers: {
                        Authorization: `Bearer ${API_KEY}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (!response.ok) {
                throw new Error('Error al obtener la predicción detallada');
            }
            const result = await response.json();
            if (result.descripcion !== 'exito') {
                throw new Error('La respuesta de la API no fue exitosa');
            }
            const datosUrl = result.datos;
            const datosResponse = await fetch(datosUrl, {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!datosResponse.ok) {
                throw new Error('Error al obtener los datos detallados');
            }
            const datosText = await datosResponse.text();
            const parsedData = JSON.parse(datosText);
            const transformed = transformForecast(parsedData);
            if (!transformed) {
                throw new Error('No hay datos suficientes para la predicción');
            }
            setForecast(transformed);
        } catch (err) {
            setError(err.message);
            setForecast(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDetailedForecast = () => {
        if (selectedMunicipio) {
            getDetailedWeatherPrediction(selectedMunicipio);
        } else {
            setError('Por favor, selecciona un municipio.');
        }
    };

    return (
        <div className="detailed-weather-search">
            <h2>Pronóstico Detallado</h2>
            <div className="municipio-selector">
                <label htmlFor="municipio">Selecciona un municipio:</label>
                <select
                    id="municipio"
                    value={selectedMunicipio}
                    onChange={(e) => setSelectedMunicipio(e.target.value)}
                >
                    <option value="">-- Seleccionar municipio --</option>
                    {municipios
                        .slice()
                        .sort((a, b) => Number(a.id || 0) - Number(b.id || 0))
                        .map((muni, index) => (
                            <option key={index} value={muni.id}>
                                {muni.id} - {muni.nombre}
                            </option>
                        ))}
                </select>
                <button onClick={handleDetailedForecast}>Obtener Pronóstico</button>
            </div>

            {isLoading ? (
                <div className="loader" aria-label="Cargando pronóstico...">
                    {/* Spinner de carga */}
                </div>
            ) : error ? (
                <p className="error">{error}</p>
            ) : forecast ? (
                <>
                    <div className="current-state">
                        <h3>Estado Actual</h3>
                        <div className="current-info">
                            <i
                                className={getIconForCondition(forecast.current.condition)}
                                style={{ fontSize: '50px', color: '#0078d4' }}
                                aria-hidden="true"
                            ></i>
                            <div>
                                <p>Temperatura: {forecast.current.temperature}°</p>
                                <p>Condición: {forecast.current.condition}</p>
                                <p>Viento: {forecast.current.wind.velocidad} km/h</p>
                            </div>
                        </div>
                    </div>

                    <div className="forecast">
                        <h3>Pronóstico (48 horas a partir de hoy)</h3>
                        {forecast.predictions.map((day, idx) => (
                            <div key={idx} className="forecast-day">
                                <h4>{new Date(day.fecha).toLocaleDateString()}</h4>
                                <div className="forecast-intervals">
                                    <div>
                                        <strong>Mañana (8:00)</strong>
                                        <i
                                            className={getIconForCondition(day.morning.condition)}
                                            style={{ fontSize: '40px', color: '#0078d4' }}
                                            aria-hidden="true"
                                        ></i>
                                        <p>{day.morning.temperature}°</p>
                                        <p>{day.morning.condition}</p>
                                        <p>{day.morning.wind.velocidad} km/h</p>
                                    </div>
                                    <div>
                                        <strong>Tarde (15:00)</strong>
                                        <i
                                            className={getIconForCondition(day.afternoon.condition)}
                                            style={{ fontSize: '40px', color: '#0078d4' }}
                                            aria-hidden="true"
                                        ></i>
                                        <p>{day.afternoon.temperature}°</p>
                                        <p>{day.afternoon.condition}</p>
                                        <p>{day.afternoon.wind.velocidad} km/h</p>
                                    </div>
                                    <div>
                                        <strong>Noche (21:00)</strong>
                                        <i
                                            className={getIconForCondition(day.night.condition)}
                                            style={{ fontSize: '40px', color: '#0078d4' }}
                                            aria-hidden="true"
                                        ></i>
                                        <p>{day.night.temperature}°</p>
                                        <p>{day.night.condition}</p>
                                        <p>{day.night.wind.velocidad} km/h</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : null}
        </div>
    );
};

export default DetailedWeatherSearch;