import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaUser, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { useCart } from "../context/CartContext.jsx";
import { newArrivals, topSelling } from "../data/products.js";

const allProducts = [...newArrivals, ...topSelling];

export default function Header({ onCartClick }) {
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    return allProducts
      .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 5);
  }, [query]);

  return (
    <header className="site-header">
      <div className="header-inner">
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <Link className="logo" to="/">SHOP.CO</Link>

        <nav className={`main-nav ${menuOpen ? "open" : ""}`}>
          <Link to="/">Shop <FaChevronDown className="chevron" /></Link>
          <Link to="/#newarrivals">On Sale</Link>
          <Link to="/#newarrivals">New Arrivals</Link>
          <Link to="/#brands">Brands</Link>
        </nav>

        <div className="search-wrap">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search for products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {suggestions.length > 0 && (
            <ul className="search-suggestions">
              {suggestions.map((p) => (
                <li key={p.id} onClick={() => { setQuery(""); navigate(`/product/${p.id}`); }}>
                  <img src={p.image} alt={p.name} />
                  <span>{p.name}</span>
                  <span className="sug-price">${p.price}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="header-actions">
          <button className="icon-btn cart-icon-btn" onClick={onCartClick} aria-label="Open cart">
            <FaShoppingCart />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </button>
          <button className="icon-btn" aria-label="Account">
            <FaUser />
          </button>
        </div>
      </div>
    </header>
  );
}
