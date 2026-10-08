import CategoryStoryBar from "@/components/home/CategoryStoryBar";
import CategoryVisualTiles from "@/components/home/CategoryVisualTiles";
import GiftsForEveryone from "@/components/home/GiftsForEveryone";
import PickFavouriteFlower from "@/components/home/PickFavouriteFlower";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import PromoBanner from "@/components/home/PromoBanner";
import GiftsForEveryFeeling from "@/components/home/GiftsForEveryFeeling";
import OccasionGifting from "@/components/home/OccasionGifting";
import NewlyLaunched from "@/components/home/NewlyLaunched";
import BestSellers from "@/components/home/BestSellers";
import Marquee from "@/components/home/Marquee";
import BrandStory from "@/components/home/BrandStory";
import WhyBloomsome from "@/components/home/WhyBloomsome";
import CustomerReviews from "@/components/home/CustomerReviews";
import InstagramGallery from "@/components/home/InstagramGallery";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-cream">
      {/* 1. Top Story / Quick Category Icons Bar */}
      <CategoryStoryBar />

      {/* 2. Visual Square Category Cards */}
      <CategoryVisualTiles />

      {/* 3. Gifts For Everyone (Personas Carousel with Progress Bar) */}
      <GiftsForEveryone />

      {/* 4. Pick Their Favourite Flower (Pedestal Botanical Showcase) */}
      <PickFavouriteFlower />

      {/* 5. Designer Floral Edit */}
      <FeaturedCategories />

      {/* 6. Joyful Gifts Festive Banner */}
      <PromoBanner />

      {/* 7. Gifts for Every Feeling (Emotional Moments) */}
      <GiftsForEveryFeeling />

      {/* 8. Gifts For Every Occasion (Milestone Date Tags) */}
      <OccasionGifting />

      {/* 9. Newly Launched (Product Showcase with Badges) */}
      <NewlyLaunched />

      {/* 10. Shop By Bestsellers with Thumbnail Tabs */}
      <BestSellers />

      {/* 11. Promotional Value Marquee */}
      <Marquee />

      {/* 12. Brand Story & Trust Pillars */}
      <BrandStory />
      <WhyBloomsome />

      {/* 13. Customer Reviews & Instagram Community */}
      <CustomerReviews />
      <InstagramGallery />
    </main>
  );
}
