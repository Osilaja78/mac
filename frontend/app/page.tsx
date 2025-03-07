import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/hero-section'
import { AboutSection } from '@/components/about-section'
import { FacilitiesSection } from '@/components/facilities-section'
import { AcademicsSection } from '@/components/academics-section'
import { AdmissionsSection } from '@/components/admissions-section'
// import { TestimonialsSection } from '@/components/testimonials-section'
import { NewsSection } from '@/components/news-section'
import { CTASection } from '@/components/cta-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FacilitiesSection />
      <AcademicsSection />
      <AdmissionsSection />
      {/* <TestimonialsSection /> */}
      <NewsSection />
      <CTASection />
      <Footer />
    </main>
  );
}