import Hero from "@/components/sections/Hero";
import PopularTours from "@/components/sections/PopularTours";
import Advantages from "@/components/sections/Advantages";
import Reviews from "@/components/sections/Reviews";
import LeadForm from "@/components/sections/LeadForm";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <PopularTours />
      <Advantages />
      <Reviews />
      <LeadForm />
      <Footer />
    </main>
  );
}
