import React from "react";
import { Mail, Twitter, Linkedin, MessageCircle } from "lucide-react";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "madhavpanchal1716@gmail.com",
    href: "mailto:madhavpanchal1716@gmail.com",
    gradient: "from-[#49a8b0] to-[#23394a]",
  },
  {
    icon: Twitter,
    label: "Twitter",
    value: "@yourhandle",
    href: "https://twitter.com/yourhandle",
    gradient: "from-[#fc6c2c] to-[#f5a94d]",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/madhav1716",
    href: "https://linkedin.com/in/madhav1716",
    gradient: "from-[#23394a] to-[#49a8b0]",
  },
];

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <section className="container mx-auto px-4 py-12 sm:py-16">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#23394a] mb-6">
            Contact Us
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Got feedback, want to collaborate, or have a question? We'd love to
            hear from you.
          </p>
        </div>
        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {contactLinks.map((link, idx) => (
            <div
              key={link.label}
              className={`rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm p-6 flex flex-col items-center border-0`}>
              <div
                className={`w-12 h-12 mb-4 rounded-lg flex items-center justify-center bg-gradient-to-br ${link.gradient}`}>
                <link.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-[#23394a] mb-1">
                {link.label}
              </h3>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-logo-blue underline break-all text-center">
                {link.value}
              </a>
            </div>
          ))}
        </div>
        {/* Feedback Form Card */}
        <div className="max-w-2xl mx-auto">
          <div className="rounded-2xl shadow-xl bg-white/90 backdrop-blur-sm p-8 border-0">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center justify-center bg-gradient-to-br from-[#49a8b0] to-[#23394a] text-white rounded-lg p-3">
                <MessageCircle size={28} />
              </span>
              <h2 className="text-2xl font-bold text-[#23394a] tracking-tight">
                Send Us Feedback
              </h2>
            </div>
            <form
              action="https://formspree.io/f/YOUR_ID"
              method="POST"
              className="space-y-6">
              <div>
                <label className="block mb-2 font-medium text-[#23394a]">
                  Your Feedback
                </label>
                <textarea
                  name="message"
                  required
                  placeholder="Write your thoughts here..."
                  className="w-full p-3 h-32 border border-logo-navy/20 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-logo-blue bg-logo-light/40 text-logo-navy"></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-logo-blue hover:bg-logo-orange text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all text-base md:text-lg">
                Send Feedback
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
