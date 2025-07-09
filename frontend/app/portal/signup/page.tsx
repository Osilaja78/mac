"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Lock,
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    full_name: '',
    gender: '',
    date_of_birth: '',
    current_class: '',
    guardian_name: '',
    guardian_phone: '',
    guardian_email: '',
    password: '',
    confirmPassword: '',
    state_of_origin: '',
    local_government: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/students/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: formData.full_name,
          gender: formData.gender,
          date_of_birth: formData.date_of_birth,
          current_class: formData.current_class,
          guardian_name: formData.guardian_name,
          guardian_phone: formData.guardian_phone,
          guardian_email: formData.guardian_email,
          password: formData.password,
          state_of_origin: formData.state_of_origin,
          local_government: formData.local_government,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Registration failed');
      }

      toast({
        title: "Registration successful",
        description: `Your admission number is ${data.admission_number}. Please save it for login.\nIt has also been sent to your email address.`,
      });

      setTimeout(() => {
        router.push('/portal/login')
      }, 4000);
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-12 bg-[#f9f7f4]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Student Registration</h1>
              <p className="text-gray-600">
                Create your student account to access the portal
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="full_name" className="text-sm font-medium">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="full_name"
                      placeholder="John Doe"
                      className="pl-10"
                      required
                      value={formData.full_name}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Gender</label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => handleSelectChange('gender', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="date_of_birth" className="text-sm font-medium">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="date_of_birth"
                      type="date"
                      className="pl-10"
                      required
                      value={formData.date_of_birth}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Class</label>
                  <Select
                    value={formData.current_class}
                    onValueChange={(value) => handleSelectChange('current_class', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="JSS1">JSS 1</SelectItem>
                      <SelectItem value="JSS2">JSS 2</SelectItem>
                      <SelectItem value="JSS3">JSS 3</SelectItem>
                      <SelectItem value="SSS1">SSS 1</SelectItem>
                      <SelectItem value="SSS2">SSS 2</SelectItem>
                      <SelectItem value="SSS3">SSS 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* State and local government information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Additional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">State of Origin</label>
                    <Select
                      value={formData.state_of_origin}
                      onValueChange={(value) => handleSelectChange('state_of_origin', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="abia">Abia</SelectItem>
                        <SelectItem value="adamawa">Adamawa</SelectItem>
                        <SelectItem value="akwa_ibom">Akwa Ibom</SelectItem>
                        <SelectItem value="anambra">Anambra</SelectItem>
                        <SelectItem value="bauchi">Bauchi</SelectItem>
                        <SelectItem value="bayelsa">Bayelsa</SelectItem>
                        <SelectItem value="benue">Benue</SelectItem>
                        <SelectItem value="borno">Borno</SelectItem>
                        <SelectItem value="cross_river">Cross River</SelectItem>
                        <SelectItem value="delta">Delta</SelectItem>
                        <SelectItem value="ebonyi">Ebonyi</SelectItem>
                        <SelectItem value="edo">Edo</SelectItem>
                        <SelectItem value="ekiti">Ekiti</SelectItem>
                        <SelectItem value="enugu">Enugu</SelectItem>
                        <SelectItem value="gombe">Gombe</SelectItem>
                        <SelectItem value="imo">Imo</SelectItem>
                        <SelectItem value="jigawa">Jigawa</SelectItem>
                        <SelectItem value="kaduna">Kaduan</SelectItem>
                        <SelectItem value="kastina">Kastina</SelectItem>
                        <SelectItem value="kano">Kano</SelectItem>
                        <SelectItem value="kebbi">Kebbi</SelectItem>
                        <SelectItem value="kogi">Kogi</SelectItem>
                        <SelectItem value="kwara">Kwara</SelectItem>
                        <SelectItem value="lagos">Lagos</SelectItem>
                        <SelectItem value="nassarawa">Nassarawa</SelectItem>
                        <SelectItem value="niger">Niger</SelectItem>
                        <SelectItem value="ogun">Ogun</SelectItem>
                        <SelectItem value="ondo">Ondo</SelectItem>
                        <SelectItem value="osun">Osun</SelectItem>
                        <SelectItem value="oyo">Oyo</SelectItem>
                        <SelectItem value="plateau">Plateau</SelectItem>
                        <SelectItem value="rivers">Rivers</SelectItem>
                        <SelectItem value="sokoto">Sokoto</SelectItem>
                        <SelectItem value="taraba">Taraba</SelectItem>
                        <SelectItem value="yobe">Yobe</SelectItem>
                        <SelectItem value="zamfara">Zamfara</SelectItem>
                        <SelectItem value="fct">F.C.T</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="local_government" className="text-sm font-medium">
                      Local Government
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="local_government"
                        placeholder="Enter Local Government"
                        className="pl-10"
                        required
                        value={formData.local_government}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Guardian Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="guardian_name" className="text-sm font-medium">
                    Guardian Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="guardian_name"
                      placeholder="Guardian's full name"
                      className="pl-10"
                      required
                      value={formData.guardian_name}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="guardian_phone" className="text-sm font-medium">
                    Guardian Phone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="guardian_phone"
                      placeholder="Guardian's phone number"
                      className="pl-10"
                      required
                      value={formData.guardian_phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="guardian_email" className="text-sm font-medium">
                    Guardian Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="guardian_email"
                      type="email"
                      placeholder="guardian@example.com"
                      className="pl-10"
                      required
                      value={formData.guardian_email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Password Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a password"
                      className="pl-10"
                      required
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      className="pl-10"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </main>
  )
}
