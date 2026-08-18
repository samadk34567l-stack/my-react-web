import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaMinus, FaPlus, FaTag, FaArrowRight } from "react-icons/fa";
import Breadcrumb from "../components/Breadcrumb.jsx";
import { useCart } from "../context/CartContext.jsx";

export default function CartPage() {
  const {
    items,
    updateQty,
    removeFromCart,
    subtotal,
    promo,
    discountAmount,
    deliveryFee,
    totalPrice,
    applyPromoCode,
  } = useCart();

  const [promoInput, setPromoInput] = useState("");
  const [promoMessage, setPromoMessage] = useState("");
  const navigate = useNavigate();

  function handleApplyPromo() {
    if (!promoInput.trim()) return;
    const result = applyPromoCode(promoInput);
    setPromoMessage(result.message);
  }

  return (
    <div className="cart-page">
      <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Cart" }]} />
      <h1 className="cart-page-title">YOUR CART</h1>

      {items.length === 0 ? (
        <div className="cart-empty-state">
          <p>Your cart is empty.</p>
          <Link to="/" className="shop-now-btn">Continue Shopping</Link>
        </div>
      ) : (
        <div className="cart-page-grid">
          <div className="cart-items-panel">
            {items.map((item, i) => (
              <div className="cart-page-item" key={item.cartKey}>
                <img src={item.image} alt={item.name} />
                <div className="cart-page-item-info">
                  <div className="cart-page-item-top">
                    <h3>{item.name}</h3>
                    <button
                      className="cart-remove-btn"
                      onClick={() => removeFromCart(item.cartKey)}
                      aria-label="Remove item"
                    >
                      <FaTrash />
                    </button>
                  </div>
                  {item.size && <p className="variant-line">Size: <span>{item.size}</span></p>}
                  {item.color && <p className="variant-line">Color: <span>{item.color}</span></p>}
                  <div className="cart-page-item-bottom">
                    <p className="cart-page-item-price">${item.price}</p>
                    <div className="qty-controls">
                      <button onClick={() => updateQty(item.cartKey, item.qty - 1)}>
                        <FaMinus />
                      </button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.cartKey, item.qty + 1)}>
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                </div>
                {i < items.length - 1 && <div className="cart-item-divider" />}
              </div>
            ))}
          </div>

          <div className="order-summary-panel">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>
            {promo && (
              <div className="summary-row discount-row">
                <span>Discount (-{promo.percent}%)</span>
                <span>-${discountAmount}</span>
              </div>
            )}
            <div className="summary-row">
              <span>Delivery Fee</span>
              <span>${deliveryFee}</span>
            </div>

            <div className="summary-divider" />

            <div className="summary-row summary-total">
              <span>Total</span>
              <span>${totalPrice}</span>
            </div>

            <div className="promo-row">
              <div className="promo-input-wrap">
                <FaTag className="promo-icon" />
                <input
                  type="text"
                  placeholder="Add promo code"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                />
              </div>
              <button className="apply-btn" onClick={handleApplyPromo}>
                Apply
              </button>
            </div>
            {promoMessage && <p className="promo-message">{promoMessage}</p>}

            <button className="checkout-main-btn" onClick={() => navigate("/")}>
              Go to Checkout <FaArrowRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
