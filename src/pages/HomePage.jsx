import Hero from "../components/Hero.jsx";
import Brands from "../components/Brands.jsx";
import ProductSection from "../components/ProductSection.jsx";
import DressStyle from "../components/DressStyle.jsx";
import Testimonials from "../components/Testimonials.jsx";
import Newsletter from "../components/Newsletter.jsx";
import { newArrivals, topSelling } from "../data/products.js";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Brands />
      <ProductSection id="newarrivals" title="NEW ARRIVALS" products={newArrivals} />
      <div className="section-divider" />
      <ProductSection id="topselling" title="TOP SELLING" products={topSelling} />
      <DressStyle />
      <Testimonials />
      <Newsletter />
    </>
  );
}
