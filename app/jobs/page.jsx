import { Mail, Phone, MapPin, Linkedin, Youtube, Instagram, Facebook } from 'lucide-react';

const jobs = [
  {
    title: "Site Incharge",
    positions: 1,
    description: "Perform assigned responsibilities, collaborate with team members, and adhere to company policies. Strong communication, problem-solving, and work ethic required. Adaptability, initiative, and willingness to learn are valued.",
    location: "Ahmedabad, India",
    url: "https://specificfire.odoo.com/jobs/site-incharge-2"
  },
  {
    title: "Sales Representative",
    positions: 1,
    description: "Perform assigned responsibilities, collaborate with team members, and adhere to company policies. Strong communication, problem-solving, and work ethic required. Adaptability, initiative, and willingness to learn are valued.",
    location: "Ahmedabad, India",
    url: "https://specificfire.odoo.com/jobs/sales-representative"
  }
];

export default function Jobs() {
  return (
    <section className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">Join Our Team</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            We're always looking for passionate people to join us in making the world safer.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Jobs List */}
          <div className="md:col-span-2 space-y-8">
            {jobs.map((job, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow p-8 flex flex-col gap-2 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900">{job.title}</h2>
                <div className="font-semibold text-primary">{job.positions} open position</div>
                <p className="text-gray-700">{job.description}</p>
                <div className="flex items-center gap-2 text-gray-600 mt-2">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                </div>
                <a
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block bg-primary text-white font-semibold px-6 py-2 rounded-lg shadow hover:bg-primary/90 transition-colors"
                >
                  Apply Now
                </a>
              </div>
            ))}
          </div>
          {/* Sidebar */}
          <div className="space-y-8">
            <img
              src="/images/team.jpg"
              alt="Our Team"
              className="rounded-2xl shadow w-full object-cover h-48"
            />
            <div>
              <p className="text-gray-800 font-medium mb-4">
                We are a team of passionate people whose goal is to improve everyone's life through disruptive products. We build great products to solve your business problems.
              </p>
              <div className="border-t pt-4 mt-4">
                <div className="flex items-center gap-2 text-primary font-semibold mb-2">
                  <Mail className="w-5 h-5" /> sales@specificfire.com
                </div>
                <div className="flex items-center gap-2 text-primary font-semibold mb-2">
                  <Phone className="w-5 h-5" /> +91 9512570092
                </div>
                <div className="flex gap-3 mt-4">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded border border-primary text-primary hover:bg-primary hover:text-white transition">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded border border-primary text-primary hover:bg-primary hover:text-white transition">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded border border-primary text-primary hover:bg-primary hover:text-white transition">
                    <Youtube className="w-5 h-5" />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded border border-primary text-primary hover:bg-primary hover:text-white transition">
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}