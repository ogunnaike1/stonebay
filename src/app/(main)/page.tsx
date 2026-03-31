
import Hero from "../components/buyer/Hero";
import Marquee from "../components/buyer/Marquee";
import Categories from "../components/buyer/Categories";
import FeaturedProducts from "../components/buyer/FeaturedProducts";
import HowItWorks from "../components/buyer/HowItWorks";
import PromoBanner from "../components/buyer/PromoBanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Categories />
      <FeaturedProducts />
      <HowItWorks />
      <PromoBanner />
    </>
  );
}