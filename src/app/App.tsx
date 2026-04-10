import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import MyToolsPage from './pages/MyToolsPage';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /**
   * TODO: fetch from backend
   * e.g., useEffect(() => {
   *   const token = localStorage.getItem('authToken');
   *   if (token) {
   *     fetch("/api/auth/verify", {
   *       headers: { "Authorization": `Bearer ${token}` }
   *     })
   *       .then(res => res.json())
   *       .then(data => {
   *         if (data.authenticated) {
   *           setIsAuthenticated(true);
   *         }
   *       })
   *       .catch(() => {
   *         localStorage.removeItem('authToken');
   *       });
   *   }
   * }, []);
   */

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={<LoginPage onLogin={() => setIsAuthenticated(true)} />}
          />
          <Route
            path="/"
            element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/search"
            element={isAuthenticated ? <SearchResultsPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/my-tools"
            element={isAuthenticated ? <MyToolsPage /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
