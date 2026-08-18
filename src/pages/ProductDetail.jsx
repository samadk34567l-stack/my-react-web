import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb.jsx";
import ProductGallery from "../components/ProductGallery.jsx";
import StarRating from "../components/StarRating.jsx";
import { ColorSelector, SizeSelector } from "../components/ColorSizeSelector.jsx";
import QuantityAddToCart from "../components/QuantityAddToCart.jsx";
import ProductTabs from "../components/ProductTabs.jsx";
import ReviewsList from "../components/ReviewsList.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { getProductById, getRelatedProducts } from "../data/products.js";
import { useCart } from "../context/CartContext.jsx";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = getProductById(id);

  const [color, setColor] = useState(product?.colors[0] ?? "");
  const [size, setSize] = useState(product?.sizes[2] ?? "");
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("Rating & Reviews");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) {
      setColor(product.colors[0]);
      setSize(product.sizes[2]);
      setQty(1);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="not-found">
        <h2>Product not found</h2>
        <Link to="/" className="shop-now-btn">Back to Home</Link>
      </div>
    );
  }

  const related = getRelatedProducts(product, 4);

  function handleAddToCart() {
    for (let i = 0; i < qty; i++) addToCart(product, { size, color });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="product-detail-page">
      <Breadcrumb
        items={[
          { label: "Home", to: "/" },
          { label: "Shop", to: "/" },
          { label: product.category, to: "/" },
          { label: product.name },
        ]}
      />

      <div className="product-detail-main">
        <ProductGallery images={product.images} name={product.name} />

        <div className="product-detail-info">
          <h1>{product.name.toUpperCase()}</h1>
          <StarRating rating={product.rating} />

          <div className="price-row">
            <span className="price">${product.price}</span>
            {product.oldPrice && <span className="old-price">${product.oldPrice}</span>}
            {product.discount && <span className="discount-badge">-{product.discount}%</span>}
          </div>

          <p className="product-description">{product.description}</p>

          <hr className="detail-divider" />

          <ColorSelector colors={product.colors} selected={color} onSelect={setColor} />
          <SizeSelector sizes={product.sizes} selected={size} onSelect={setSize} />

          <QuantityAddToCart qty={qty} setQty={setQty} onAdd={handleAddToCart} />
          {added && <p className="added-confirmation">Added {qty} item(s) to your cart!</p>}
        </div>
      </div>

      <ProductTabs active={tab} onChange={setTab} />

      {tab === "Product Details" && (
        <section className="tab-panel">
          <p>{product.description}</p>
          <ul>
            <li>Category: {product.category}</li>
            <li>Available sizes: {product.sizes.join(", ")}</li>
            <li>Fabric: Soft, breathable cotton blend</li>
            <li>Care: Machine wash cold, tumble dry low</li>
          </ul>
        </section>
      )}

      {tab === "Rating & Reviews" && <ReviewsList reviews={product.reviews} />}

      {tab === "FAQs" && (
        <section className="tab-panel">
          <p><strong>What sizes are available?</strong> {product.sizes.join(", ")}.</p>
          <p><strong>What is the return policy?</strong> Returns accepted within 30 days of delivery.</p>
          <p><strong>How long does shipping take?</strong> Typically 3–5 business days.</p>
        </section>
      )}

      <section className="related-section">
        <h2 className="section-title">You Might Also Like</h2>
        <div className="product-grid">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
