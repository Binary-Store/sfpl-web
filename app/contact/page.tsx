'use client';

import { useState, useEffect } from 'react';
import { useContact } from '@/hooks/useContact';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    message: ''
  });
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState('');
  
  const { sendContactMutation, isLoading, error } = useContact();

  // Check localStorage on component mount
  useEffect(() => {
    const lastSubmission = localStorage.getItem('contactFormLastSubmission');
    if (lastSubmission) {
      const lastTime = parseInt(lastSubmission);
      const now = Date.now();
      const timeDiff = now - lastTime;
      const oneDay = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      
      if (timeDiff < oneDay) {
        setIsFormDisabled(true);
        const remainingTime = oneDay - timeDiff;
        updateTimeRemaining(remainingTime);
        
        const timer = setInterval(() => {
          const currentRemaining = oneDay - (Date.now() - lastTime);
          if (currentRemaining <= 0) {
            setIsFormDisabled(false);
            setTimeRemaining('');
            clearInterval(timer);
          } else {
            updateTimeRemaining(currentRemaining);
          }
        }, 1000);
        
        return () => clearInterval(timer);
      }
    }
  }, []);

  const updateTimeRemaining = (milliseconds: number) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isFormDisabled) return;
    
    sendContactMutation({
      name: formData.name,
      email: formData.email,
      message: formData.message,
      phone_number: formData.phone_number
    }, {
      onSuccess: () => {
        localStorage.setItem('contactFormLastSubmission', Date.now().toString());
        setIsFormDisabled(true);
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone_number: '',
          message: ''
        });
        
        // Start countdown timer
        const oneDay = 24 * 60 * 60 * 1000;
        const timer = setInterval(() => {
          const lastSubmission = localStorage.getItem('contactFormLastSubmission');
          if (lastSubmission) {
            const lastTime = parseInt(lastSubmission);
            const currentRemaining = oneDay - (Date.now() - lastTime);
            if (currentRemaining <= 0) {
              setIsFormDisabled(false);
              setTimeRemaining('');
              clearInterval(timer);
            } else {
              updateTimeRemaining(currentRemaining);
            }
          }
        }, 1000);
      }
    });
  };

  return (
    <section className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">Contact Us</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Have questions or need a fire safety solution? Reach out to our expert team. We're here to help you protect what matters most.
          </p>
        </div>
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name" 
                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" 
                required 
                disabled={isFormDisabled}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@email.com" 
                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" 
                required 
                disabled={isFormDisabled}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">phone_number</label>
              <input 
                type="tel" 
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                maxLength={10}
                placeholder="phone_number Number" 
                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" 
                disabled={isFormDisabled}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Message</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="How can we help you?" 
                rows={4} 
                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" 
                required 
                disabled={isFormDisabled}
              />
            </div>
            
            {isFormDisabled && timeRemaining && (
              <div className="text-center text-sm text-gray-600 bg-gray-100 p-3 rounded-lg">
                You can submit another message in: <span className="font-semibold text-primary">{timeRemaining}</span>
              </div>
            )}
            
            {error && (
              <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg border border-red-200">
                Failed to send message. Please try again.
              </div>
            )}
            
            <button 
              type="submit" 
              disabled={isFormDisabled || isLoading}
              className={`w-full font-bold py-3 rounded-lg shadow transition-colors text-lg ${
                isFormDisabled 
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                  : 'bg-primary text-white hover:bg-primary/90'
              }`}
            >
              {isLoading ? 'Sending...' : isFormDisabled ? 'Form Locked' : 'Send Message'}
            </button>
          </form>
          
          {/* Contact Info & Map */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary mb-4">Get in Touch</h2>
              <div className="space-y-3 text-gray-700">
                <div>
                  <span className="font-semibold">phone_number:</span> <a href="tel:+911234567890" className="text-primary hover:underline ml-1">+91 9512570090</a>
                </div>
                <div>
                  <span className="font-semibold">Email:</span> <a href="mailto:info@sfpl.com" className="text-primary hover:underline ml-1"> contact@specificfire.com</a>
                </div>
                <div>
                  <span className="font-semibold">Address:</span>
                  <a className="ml-1">105, A block,IIT resurch park, Gandhinagar</a>
                </div>
              </div>
            </div>
            {/* Google Maps Embed */}
            <div className="rounded-2xl overflow-hidden shadow-lg aspect-video">
              <iframe
                src="https://www.google.com/maps?q=Ahmedabad,+Gujarat,+India&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="SFPL Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
