import Hero from "../components/Hero";
import UploadWasteSection from "../components/UploadWasteSection";
import LocationTracker from "../components/LocationTracker";
import NGODashboardSection from "../components/NGODashboardSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <UploadWasteSection />
      <LocationTracker />
      <NGODashboardSection />
      <Footer />
    </>
  );
}
