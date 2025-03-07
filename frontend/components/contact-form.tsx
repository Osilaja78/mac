"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { Send } from 'lucide-react'

export function ContactForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll get back to you soon!",
      })
      
      // Reset form
      const form = e.target as HTMLFormElement
      form.reset()
    }, 1500)
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl shadow-lg p-8"
    >
      <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="firstName" className="text-sm font-medium">
              First Name <span className="text-primary">*</span>
            </label>
            <Input 
              id="firstName" 
              name="firstName" 
              required 
              placeholder="Enter your first name"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="lastName" className="text-sm font-medium">
              Last Name <span className="text-primary">*</span>
            </label>
            <Input 
              id="lastName" 
              name="lastName" 
              required 
              placeholder="Enter your last name"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email <span className="text-primary">*</span>
          </label>
          <Input 
            id="email" 
            name="email" 
            type="email" 
            required 
            placeholder="Enter your email address"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium">
            Phone Number
          </label>
          <Input 
            id="phone" 
            name="phone" 
            type="tel" 
            placeholder="Enter your phone number"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-medium">
            Subject <span className="text-primary">*</span>
          </label>
          <Input 
            id="subject" 
            name="subject" 
            required 
            placeholder="Enter message subject"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium">
            Message <span className="text-primary">*</span>
          </label>
          <Textarea 
            id="message" 
            name="message" 
            required 
            placeholder="Enter your message"
            rows={5}
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-primary hover:bg-primary/90 text-white rounded-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>Sending Message...</>
          ) : (
            <>
              Send Message
              <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </motion.div>
  )
}