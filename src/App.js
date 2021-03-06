import React, { Suspense } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import AdminLogin from './features/admin/AdminLogin.component';
import Main from './features/main/Main.component';
import ResponsiveAppBar from './features/navbar/NavBar.component';
import Products from './features/products/Products.components';
import Product from './features/products/Product.component';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { PrivateRoute } from './utils/PrivateRoute';

const ProductRegister = React.lazy(() =>
  import('./features/admin/ProductRegister.component')
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Main></Main>} />
        <Route path="/categories">
          <Route path=":category" element={<Products />} />
        </Route>
        <Route path="/product">
          <Route path=":productName" element={<Product />} />
        </Route>
        <Route path="/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Suspense fallback={<div>Loading...</div>}>
                <ProductRegister />
              </Suspense>
            </PrivateRoute>
          }
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
