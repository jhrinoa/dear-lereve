import './App.css';
import { Routes, Route } from 'react-router-dom';
import AdminLogin from './features/admin/AdminLogin.component';
import ProductRegister from './features/admin/ProductRegister.component';
import Main from './features/main/Main.component';
import ResponsiveAppBar from './features/navbar/NavBar.component';
import Products from './features/products/Products.components';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { PrivateRoute } from './utils/PrivateRoute';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Main></Main>} />
        <Route path="/products" element={<Products></Products>} />
        <Route path="/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            // <PrivateRoute>
            <ProductRegister />
            // </PrivateRoute>
          }
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
