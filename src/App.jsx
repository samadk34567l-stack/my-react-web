import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext.jsx";
import AnnouncementBar from "./components/AnnouncementBar.jsx";
import Header from "./components/Header.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import CartPage from "./pages/CartPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <CartProvider>
      <AnnouncementBar />
      <Header onCartClick={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/category/:style" element={<CategoryPage />} />
        </Routes>
      </main>

      <Footer />
    </CartProvider>
  );
}
