// File: contexts/ThemeProvider.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeContextType = {
    darkMode: boolean;
    toggleDarkMode: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { readonly children: React.ReactNode }) {
    const [darkMode, setDarkMode] = useState(true);

    // Initialize theme from localStorage or system preference
    useEffect(() => {
        // Check if user has previously set theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setDarkMode(savedTheme === 'dark');
        } else {
            // Use system preference as default
            const prefersDark = window.matchMedia &&
                window.matchMedia('(prefers-color-scheme: dark)').matches;
            setDarkMode(prefersDark);
        }
    }, []);

    // Update localStorage when darkMode changes
    useEffect(() => {
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const contextValue = React.useMemo(() => ({ darkMode, toggleDarkMode }), [darkMode]);

    return (
        <ThemeContext.Provider value={contextValue}>
            <div className={`${darkMode ? 'dark' : 'light'}`}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}