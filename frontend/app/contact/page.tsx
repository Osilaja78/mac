import { Navbar } from '@/components/navbar'
import { ContactForm } from '@/components/contact-form'
import { ContactInfo } from '@/components/contact-info'
import { Footer } from '@/components/footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | Mother&apos;s Aid',
  description: 'Get in touch with Mother&apos;s Aid. Contact our admissions office, faculty, or administration.',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-12 bg-[#f9f7f4]">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Contact Us</h1>
          <div className="w-24 h-1 bg-secondary mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto">
            We're here to answer any questions you may have about Mother&apos;s Aid. 
            Reach out to us using the contact information below or fill out the form.
          </p>
        </div>
      </div>
      
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </div>
      
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
  )
}