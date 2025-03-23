import React from 'react';
import { Mail, Linkedin, Github, Phone } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#DAF1DE] dark:bg-[#0B2B26] flex items-center justify-center px-4">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#0B2B26] dark:text-[#DAF1DE] mb-2">Contact Me</h1>
          <p className="text-[#235347] dark:text-[#8EB69B]">Let's work together!</p>
        </div>

        <div className="bg-[#8EB69B] dark:bg-[#163832] rounded-lg p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Mail className="text-[#0B2B26] dark:text-[#8EB69B]" size={20} />
                <div>
                  <h3 className="text-[#0B2B26] dark:text-[#DAF1DE] text-sm font-semibold">Email</h3>
                  <a href="mailto:emiliano.dimartino.vega@gmail.com" 
                     className="text-[#235347] dark:text-[#8EB69B] text-sm hover:text-[#0B2B26] dark:hover:text-[#DAF1DE] transition-colors">
                    emiliano.dimartino.vega@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Linkedin className="text-[#0B2B26] dark:text-[#8EB69B]" size={20} />
                <div>
                  <h3 className="text-[#0B2B26] dark:text-[#DAF1DE] text-sm font-semibold">LinkedIn</h3>
                  <a href="#" className="text-[#235347] dark:text-[#8EB69B] text-sm hover:text-[#0B2B26] dark:hover:text-[#DAF1DE] transition-colors">
                    Connect with me
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Github className="text-[#0B2B26] dark:text-[#8EB69B]" size={20} />
                <div>
                  <h3 className="text-[#0B2B26] dark:text-[#DAF1DE] text-sm font-semibold">GitHub</h3>
                  <a href="https://github.com/EmiV3ga" 
                     className="text-[#235347] dark:text-[#8EB69B] text-sm hover:text-[#0B2B26] dark:hover:text-[#DAF1DE] transition-colors">
                    Check my repositories
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Phone className="text-[#0B2B26] dark:text-[#8EB69B]" size={20} />
                <div>
                  <h3 className="text-[#0B2B26] dark:text-[#DAF1DE] text-sm font-semibold">Phone</h3>
                  <p className="text-[#235347] dark:text-[#8EB69B] text-sm">+54 (2494)525601</p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <label className="text-[#0B2B26] dark:text-[#DAF1DE] text-sm font-semibold block mb-2">Name</label>
                <input
                  type="text"
                  className="w-full bg-[#DAF1DE] dark:bg-[#0B2B26] border border-[#235347] dark:border-[#8EB69B] rounded px-3 py-2 text-[#0B2B26] dark:text-[#DAF1DE] focus:outline-none focus:border-[#0B2B26] dark:focus:border-[#DAF1DE]"
                />
              </div>

              <div>
                <label className="text-[#0B2B26] dark:text-[#DAF1DE] text-sm font-semibold block mb-2">Email</label>
                <input
                  type="email"
                  className="w-full bg-[#DAF1DE] dark:bg-[#0B2B26] border border-[#235347] dark:border-[#8EB69B] rounded px-3 py-2 text-[#0B2B26] dark:text-[#DAF1DE] focus:outline-none focus:border-[#0B2B26] dark:focus:border-[#DAF1DE]"
                />
              </div>

              <div>
                <label className="text-[#0B2B26] dark:text-[#DAF1DE] text-sm font-semibold block mb-2">Message</label>
                <textarea
                  rows={4}
                  className="w-full bg-[#DAF1DE] dark:bg-[#0B2B26] border border-[#235347] dark:border-[#8EB69B] rounded px-3 py-2 text-[#0B2B26] dark:text-[#DAF1DE] focus:outline-none focus:border-[#0B2B26] dark:focus:border-[#DAF1DE] resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#0B2B26] dark:bg-[#DAF1DE] text-[#DAF1DE] dark:text-[#0B2B26] py-2 rounded hover:bg-[#235347] dark:hover:bg-[#8EB69B] transition-colors font-semibold"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;