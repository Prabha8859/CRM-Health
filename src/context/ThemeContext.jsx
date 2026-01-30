import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    // Dark Mode State
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark' ||
            (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    });

    // Current Brand Color (defaulting to the blue defined in CSS)
    const [currentThemeColor, setCurrentThemeColor] = useState(() => {
        return localStorage.getItem('themeColor') || '#66CCFF';
    });

    // Apply Dark Mode
    useEffect(() => {
        const root = window.document.documentElement;
        if (isDarkMode) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    // Apply Theme Color
    useEffect(() => {
        const root = window.document.documentElement;

        // We update the CSS variables dynamically
        // Primary is the selected color
        root.style.setProperty('--color-brand-primary', currentThemeColor);

        // We can generate secondary/light variants basically or just keep them fixed/harmonious
        // For simplicity, we'll keep the secondary/light fixed or relatively adjusted if needed.
        // However, to ensure the gradient looks good, maybe we should update secondary too?
        // Let's rely on the user just picking the "Primary" and we might leave secondary static 
        // OR ideally, we assume the user only cares about the main brand color for now.

        localStorage.setItem('themeColor', currentThemeColor);
    }, [currentThemeColor]);

    const toggleTheme = () => setIsDarkMode(prev => !prev);
    const changeThemeColor = (color) => setCurrentThemeColor(color);

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme, currentThemeColor, changeThemeColor }}>
            {children}
        </ThemeContext.Provider>
    );
};
