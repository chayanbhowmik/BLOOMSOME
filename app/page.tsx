import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import BestSellers from "@/components/home/BestSellers";
import BrandStory from "@/components/home/BrandStory";
import WhyBloomsome from "@/components/home/WhyBloomsome";
import CustomCTA from "@/components/home/CustomCTA";
import OccasionGifting from "@/components/home/OccasionGifting";
import CustomerReviews from "@/components/home/CustomerReviews";
import InstagramGallery from "@/components/home/InstagramGallery";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <FeaturedCategories />
      <BestSellers />
      <BrandStory />
      <WhyBloomsome />
      <CustomCTA />
      <OccasionGifting />
      <CustomerReviews />
      <InstagramGallery />
    </>
  );
}
