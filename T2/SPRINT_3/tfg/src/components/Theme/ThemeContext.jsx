import React, { createContext, useContext, useState, useEffect } from 'react';
import '../../styles/themeContext.css'; // Importar el CSS para que se apliquen las variables

export const ThemeContext = createContext();

/**
 * Hook para usar el contexto del tema.
 */
export const useTheme = () => useContext(ThemeContext);

/**
 * Proveedor del tema.
 */
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        // Aplica la clase de tema al elemento raíz (<html>)
        document.documentElement.className = theme;
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;