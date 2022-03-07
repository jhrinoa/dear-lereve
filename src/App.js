import './App.css';
import { Routes, Route } from 'react-router-dom';
import AdminLogin from './features/admin/AdminLogin.component';
import ProductRegister from './features/admin/ProductRegister.component';
import Products from './features/products/Products.components';
import { PrivateRoute } from './utils/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Products></Products>} />
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
  );
}

export default App;
