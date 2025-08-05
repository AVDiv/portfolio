"use client";
import React, { useRef, useEffect, useState } from "react";
import { animate, createScope, onScroll } from "animejs";
import { Github, Linkedin, Trophy } from "iconoir-react";
import { ContactForm } from "./ContactForm";

const Contact: React.FC = () => {
  const root = useRef<HTMLDivElement>(null);
  const scope = useRef<any>(null);
  const contactContentRef = useRef<HTMLDivElement>(null);

  // Obfuscated contact details using character encoding
  const getEmail = () => {
    const encoded = "100,105,118,97,107,97,114,97,97,118,105,110,64,103,109,97,105,108,46,99,111,109";
    return encoded.split(',').map(code => String.fromCharCode(parseInt(code))).join('');
  };

  const getPhone = () => {
    const encoded = "43,57,52,55,50,49,54,48,49,53,49,49";
    return encoded.split(',').map(code => String.fromCharCode(parseInt(code))).join('');
  };

  const getFormattedPhone = () => {
    const phone = getPhone();
    return phone.slice(0, 3) + ' ' + phone.slice(3, 5) + ' ' + phone.slice(5, 8) + ' ' + phone.slice(8);
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:' + getEmail();
  };

  const handlePhoneClick = () => {
    window.location.href = 'tel:' + getPhone();
  };

  // Scroll blur-in animation effect
  useEffect(() => {
    scope.current = createScope({ root }).add(self => {
      if (root.current && contactContentRef.current) {
        animate(contactContentRef.current, {
          filter: 'blur(0px)',
          scale: 1.05,
          opacity: 1,
          ease: 'outCubic',
          autoplay: onScroll({
            target: root.current,
            container: document.body,
            enter: {target: "top", container: "top+=20vh"},
            leave: {target: "center-=35vh", container: "top"},
            sync: 'outCubic',
          })
        });
      }
    });

    return () => {
      if (scope && scope.current.revert) {
        scope.current.revert();
      }
    };
  }, []);

  return (
    <section 
      id="contact" 
      className="w-full min-h-screen bg-white relative overflow-hidden flex justify-center items-center py-20"
      ref={root}
      style={{ isolation: 'isolate' }}
    >
      {/* Contact content */}
      <div 
        className="w-full px-6 md:px-12 lg:px-20 py-10 md:py-20 blur-[30px] scale-[0.9] opacity-10 relative z-10 pointer-events-none"
        ref={contactContentRef}
        style={{ pointerEvents: 'none' }}
      >
        <div className="max-w-7xl mx-auto pointer-events-auto">
          {/* Section header */}
          <div className="mb-8 md:mb-16 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black mb-4 md:mb-6">
              Contact<span className="text-red-600">.</span>
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto">
              Ready to collaborate on data science projects or discuss innovative AI solutions? Let's connect.
            </p>
          </div>

          {/* Contact grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 pointer-events-auto">
            {/* Form column */}
            <div className="flex flex-col space-y-4 md:space-y-6 bg-white rounded-xl p-6 md:p-8 shadow-lg h-full">
              <h3 className="text-xl md:text-2xl font-bold text-black">
                Send a Message<span className="text-red-600">.</span>
              </h3>
              <ContactForm />
            </div>
            
            {/* Contact info column */}
            <div className="space-y-6 md:space-y-8">
              <h3 className="text-xl md:text-2xl font-bold text-black">
                Connect<span className="text-red-600">.</span>
              </h3>
              
              <div className="space-y-4 md:space-y-6">
                <div>
                  <h4 className="text-base md:text-lg font-semibold text-black mb-2">Email</h4>
                  <button 
                    onClick={handleEmailClick}
                    className="text-gray-700 hover:text-red-600 transition-colors cursor-pointer bg-transparent border-none p-0 font-inherit text-left text-sm md:text-base break-all"
                  >
                    {getEmail()}
                  </button>
                </div>
                
                <div>
                  <h4 className="text-base md:text-lg font-semibold text-black mb-2">Phone</h4>
                  <button 
                    onClick={handlePhoneClick}
                    className="text-gray-700 hover:text-red-600 transition-colors cursor-pointer bg-transparent border-none p-0 font-inherit text-left text-sm md:text-base"
                  >
                    {getFormattedPhone()}
                  </button>
                </div>
                
                <div>
                  <h4 className="text-base md:text-lg font-semibold text-black mb-2">Social & Professional</h4>
                  <div className="flex flex-col space-y-2">
                    <a href="https://github.com/AVDiv" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-red-600 transition-colors text-sm md:text-base flex items-center gap-2">
                      <Github width={16} height={16} />
                      GitHub [AVDiv]
                    </a>
                    <a href="https://www.linkedin.com/in/avin-divakara/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-red-600 transition-colors text-sm md:text-base flex items-center gap-2">
                      <Linkedin width={16} height={16} />
                      LinkedIn [avin-divakara]
                    </a>
                    <a href="https://www.kaggle.com/avindivakara" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-red-600 transition-colors text-sm md:text-base flex items-center gap-2">
                      <Trophy width={16} height={16} />
                      Kaggle [avindivakara]
                    </a>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-base md:text-lg font-semibold text-black mb-2">Location</h4>
                  <p className="text-gray-700 text-sm md:text-base">
                    Horana, Western Province, Sri Lanka
                  </p>
                  <p className="text-xs md:text-sm text-gray-600 mt-1">
                    Available for remote collaboration worldwide
                  </p>
                </div>
              </div>
              
              <div className="mt-6 md:mt-8 p-4 md:p-6 bg-black text-white rounded-xl">
                <h4 className="text-base md:text-lg font-bold mb-3 md:mb-4">Let's build something impactful together</h4>
                <p className="text-gray-300 mb-3 md:mb-4 text-sm md:text-base">
                  I'm passionate about creating data-driven solutions that make a real difference. Whether you need:
                </p>
                <ul className="text-gray-300 space-y-1 md:space-y-2 text-xs md:text-sm">
                  <li>• Machine Learning models and AI systems</li>
                  <li>• Real-time data analytics dashboards</li>
                  <li>• Full-stack web applications</li>
                  <li>• Process mining and optimization</li>
                  <li>• Bias-aware AI implementations</li>
                </ul>
                <p className="text-gray-300 mt-3 md:mt-4 text-sm md:text-base">
                  I'm here to help transform your ideas into reality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
