import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/hero-section'
import { AboutSection } from '@/components/about-section'
import { FacilitiesSection } from '@/components/facilities-section'
import { AcademicsSection } from '@/components/academics-section'
import { AdmissionsSection } from '@/components/admissions-section'
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
      {/* <AcademicsSection /> */}
      <AdmissionsSection />
      <NewsSection />
      <CTASection />
      <div className="py-16 bg-[#f9f7f4]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Find Us</h2>
          <div className="w-full h-96 rounded-xl overflow-hidden shadow-lg">
            {/* Replace with an actual map component if needed */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.2424568945526!2d3.5234462757696603!3d6.616771293377354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103befe9b18fd95b%3A0xdf2304fa764d1dde!2sMother&#39;s%20Aid%20Schools!5e0!3m2!1sen!2sng!4v1750458345157!5m2!1sen!2sng" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="School Location"
            ></iframe>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}