export default function Contact() {
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
          <form className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Name</label>
              <input type="text" placeholder="Your Name" className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" required />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input type="email" placeholder="you@email.com" className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" required />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Phone</label>
              <input type="tel" placeholder="Phone Number" className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Message</label>
              <textarea placeholder="How can we help you?" rows={4} className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" required />
            </div>
            <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-lg shadow hover:bg-primary/90 transition-colors text-lg">Send Message</button>
          </form>
          {/* Contact Info & Map */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary mb-4">Get in Touch</h2>
              <div className="space-y-3 text-gray-700">
                <div>
                  <span className="font-semibold">Phone:</span> <a href="tel:+911234567890" className="text-primary hover:underline ml-1">+91 12345 67890</a>
                </div>
                <div>
                  <span className="font-semibold">Email:</span> <a href="mailto:info@sfpl.com" className="text-primary hover:underline ml-1">info@sfpl.com</a>
                </div>
                <div>
                  <span className="font-semibold">Address:</span>
                  <div className="ml-1">123, Fire Safety Avenue,<br />Ahmedabad, Gujarat, India</div>
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