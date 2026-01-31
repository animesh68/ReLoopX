import Hero from "../components/Hero";
import UploadWasteSection from "../components/UploadWasteSection";
import NGODashboardSection from "../components/NGODashboardSection";
import Footer from "../components/Footer";
import LocationTracker from "../components/LocationTracker";
export default function Home() {
  return (
    <>
      <Hero />
      <UploadWasteSection />
      <NGODashboardSection />
      <Footer />
      <LocationTracker />
    </>
  );
}
