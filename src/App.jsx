import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
// import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Account from './pages/Account';
import Contact from './pages/Contact';
import Login from './pages/Login';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<Products />} />
                <Route path="/cart" element={<Checkout />} />
                <Route path="/account" element={<Account />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;