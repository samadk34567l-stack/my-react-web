import { useState } from "react";
import { FaSlidersH } from "react-icons/fa";
import ReviewCard from "./ReviewCard.jsx";

const PAGE_SIZE = 6;

export default function ReviewsList({ reviews }) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const shown = reviews.slice(0, visible);
  const hasMore = visible < reviews.length;

  return (
    <section className="reviews-section">
      <div className="reviews-header">
        <h3>
          All Reviews <span className="reviews-count">({reviews.length * 75})</span>
        </h3>
        <div className="reviews-actions">
          <button className="filter-btn" aria-label="Filter reviews">
            <FaSlidersH />
          </button>
          <select className="sort-select" defaultValue="latest">
            <option value="latest">Latest</option>
            <option value="highest">Highest Rated</option>
            <option value="lowest">Lowest Rated</option>
          </select>
          <button className="write-review-btn">Write a Review</button>
        </div>
      </div>

      <div className="reviews-grid">
        {shown.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {hasMore && (
        <button className="load-more-btn" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
          Load More Reviews
        </button>
      )}
    </section>
  );
}
