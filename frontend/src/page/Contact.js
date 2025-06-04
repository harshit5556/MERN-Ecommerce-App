import React, { useEffect, useState } from 'react';
import { toast } from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate form submission
    toast.success('Message sent successfully! ✅');

    // Clear form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-6 font-sans text-gray-800">
      
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md space-y-10">
        
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-green-700 mb-2">Contact Us</h1>
          <p className="text-gray-600 text-lg">Have questions or feedback? We'd love to hear from you!</p>
        </div>

        {/* Contact Info */}
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div>
            <h3 className="font-semibold text-lg mb-1">📍 Address</h3>
            <p>EcoMarket HQ, New Market<br />Bhopal, MP 462003</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">📞 Phone</h3>
            <p>+91 8840641186</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">📧 Email</h3>
            <p>support@EcoMarket.in</p>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                name="name"
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 font-medium">Subject</label>
            <input
              name="subject"
              type="text"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Message</label>
            <textarea
              name="message"
              rows="5"
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-all"
          >
            Send Message
          </button>
        </form>

        {/* Google Map */}
        <div className="pt-10">
          <h2 className="text-2xl font-bold mb-4 text-green-700">📍 Our Location</h2>
          <div className="w-full h-72">
            <iframe
              title="Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3664.1770821984623!2d77.4124462144457!3d23.255723784838716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c43be539db011%3A0xe12a5cb8a5b39f0!2sNew%20Market%2C%20TT%20Nagar%2C%20Bhopal%2C%20Madhya%20Pradesh%20462003!5e0!3m2!1sen!2sin!4v1625915284025!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg shadow"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
