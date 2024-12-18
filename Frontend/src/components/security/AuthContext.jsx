import { createContext, useContext, useState, useEffect } from "react";
import { executeBasicAuthenticationService } from "../api/HelloWorldService copy";
import apiClient from "../api/ApiClient";

// 1: Create a Context
export const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    // Initialize state from localStorage
    const [isAuthenticated, setAuthenticated] = useState(() => !!localStorage.getItem('token'));
    const [token, setToken] = useState(() => localStorage.getItem('token') || '');
    const [username, setUsername] = useState(() => localStorage.getItem('username') || '');

    // Ensure API client interceptor uses the token if it exists
    useEffect(() => {
        if (token) {
            apiClient.interceptors.request.use(
                (config) => {
                    config.headers.Authorization = token;
                    return config;
                },
                (error) => Promise.reject(error)
            );
        }
    }, [token]);

    // Login function
    async function login(username, password) {
        try {
            const response = await executeBasicAuthenticationService(username, password);

            if (response.status === 200) {
                const jwtToken = 'Bearer ' + response.data.token;
                setAuthenticated(true);
                setUsername(username);
                setToken(jwtToken);

                // Persist to localStorage
                localStorage.setItem('username', username);
                localStorage.setItem('token', jwtToken);

                // Add token to interceptor
                apiClient.interceptors.request.use(
                    (config) => {
                        config.headers.Authorization = jwtToken;
                        return config;
                    },
                    (error) => Promise.reject(error)
                );

                return true;
            } else {
                throw new Error("Authentication failed");
            }
        } catch (error) {
            // Reset state on failure
            setAuthenticated(false);
            setUsername('');
            setToken('');
            localStorage.removeItem('username');
            localStorage.removeItem('token');
            return false;
        }
    }

    // Logout function
    function logout() {
        setAuthenticated(false);
        setUsername('');
        setToken('');
        localStorage.removeItem('username');
        localStorage.removeItem('token');
    }

    // Providing the context value
    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, username, token }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
