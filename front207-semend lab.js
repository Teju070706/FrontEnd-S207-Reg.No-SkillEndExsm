import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            style={{
                padding: '10px 20px',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: theme === 'light' ? '#333' : '#fff',
                color: theme === 'light' ? '#fff' : '#333',
                cursor: 'pointer',
                fontSize: '16px'
            }}
        >
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
    );
};

const Header = () => {
    const { theme } = useTheme();

    return (
        <header style={{
            padding: '20px',
            backgroundColor: theme === 'light' ? '#f5f5f5' : '#333',
            color: theme === 'light' ? '#333' : '#fff',
            marginBottom: '20px'
        }}>
            <h1>KL Student Portal</h1>
            <ThemeToggle />
        </header>
    );
};

const Dashboard = () => {
    const { theme } = useTheme();

    return (
        <div style={{
            padding: '20px',
            backgroundColor: theme === 'light' ? '#fff' : '#222',
            color: theme === 'light' ? '#333' : '#fff',
            minHeight: '200px',
            borderRadius: '8px',
            margin: '10px'
        }}>
            <h2>Student Dashboard</h2>
            <p>Welcome to your student portal. Current theme: {theme}</p>
        </div>
    );
};

const Courses = () => {
    const { theme } = useTheme();

    return (
        <div style={{
            padding: '20px',
            backgroundColor: theme === 'light' ? '#fff' : '#222',
            color: theme === 'light' ? '#333' : '#fff',
            minHeight: '200px',
            borderRadius: '8px',
            margin: '10px'
        }}>
            <h2>My Courses</h2>
            <p>View and manage your enrolled courses.</p>
        </div>
    );
};

const App = () => {
    return (
        <ThemeProvider>
            <div style={{ minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
                <Header />
                <main style={{ padding: '20px' }}>
                    <Dashboard />
                    <Courses />
                </main>
            </div>
        </ThemeProvider>
    );
};

export default App;
