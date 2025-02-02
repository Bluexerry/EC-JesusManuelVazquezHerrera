// src/services/apiClient.js

const API_BASE_URL = 'https://opendata.aemet.es/opendata/api';
const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqbXZhenF1ZXpoZXJyZXJhQGFkYWl0cy5lcyIsImp0aSI6ImVjYzI5YzU0LWNhN2YtNDYzZi1iZjlkLWUwOTI5ODU2ZDBkZSIsImlzcyI6IkFFTUVUIiwiaWF0IjoxNzM3NzQxNzc2LCJ1c2VySWQiOiJlY2MyOWM1NC1jYTdmLTQ2M2YtYmY5ZC1lMDkyOTg1NmQwZGUiLCJyb2xlIjoiIn0.3hcx6KrqDOeLZpfbqAsinLAxQmZAohy3gPJ-z1w7N54'; // Reemplaza con tu API Key real

export const getWeatherPrediction = async (provinceCode = '41') => {
    try {
        // Primer paso: Obtener la URL de los datos usando el código de provincia
        const response = await fetch(`${API_BASE_URL}/prediccion/provincia/hoy/${provinceCode}`, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener la predicción del tiempo');
        }

        const result = await response.json();

        if (result.descripcion !== 'exito') {
            throw new Error('La respuesta de la API no fue exitosa');
        }

        const datosUrl = result.datos;

        // Segundo paso: Obtener los datos reales de la predicción como texto
        const datosResponse = await fetch(datosUrl, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`, // Verifica si necesitas este header
            },
        });

        if (!datosResponse.ok) {
            throw new Error('Error al obtener los datos de la predicción del tiempo');
        }

        const datos = await datosResponse.text(); // Parsear como texto

        return datos; // Retornar el texto plano
    } catch (error) {
        throw error;
    }
};