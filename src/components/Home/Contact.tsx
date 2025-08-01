import React, { useRef, useEffect, useState } from "react";
import { animate, createScope, onScroll } from "animejs";

const Contact: React.FC = () => {
  const root = useRef<HTMLDivElement>(null);
  const scope = useRef<any>(null);
  const contactContentRef = useRef<HTMLDivElement>(null);
  
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form after submission
      setFormState({
        name: '',
        email: '',
        message: ''
      });
      
      // Reset success message after a delay
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
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
      className="w-full h-screen bg-white relative overflow-hidden flex justify-center items-center"
      ref={root}
      style={{ isolation: 'isolate' }}
    >
      {/* Contact content */}
      <div 
        className="w-full px-6 md:px-12 lg:px-20 py-20 blur-[30px] scale-[0.9] opacity-10 relative z-10 pointer-events-none"
        ref={contactContentRef}
        style={{ pointerEvents: 'none' }}
      >
        <div className="max-w-7xl mx-auto pointer-events-auto">
          {/* Section header */}
          <div className="mb-16 text-center">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6">
              Contact<span className="text-red-600">.</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
              Have a project in mind? Let's collaborate and bring your ideas to life.
            </p>
          </div>

          {/* Contact grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pointer-events-auto">
            {/* Form column */}
            <div className="space-y-6 bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-3xl font-bold text-black">
                Send a Message<span className="text-red-600">.</span>
              </h3>
              
              {submitSuccess ? (
                <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg">
                  <p className="font-medium">Message sent successfully!</p>
                  <p className="text-sm mt-1">I'll get back to you as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
                      placeholder="Tell me about your project..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-6 rounded-lg text-white font-medium transition-all ${
                      isSubmitting ? 'bg-gray-400' : 'bg-black hover:bg-red-600'
                    }`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
            
            {/* Contact info column */}
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-black">
                Connect<span className="text-red-600">.</span>
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-black mb-2">Email</h4>
                  <a href="mailto:contact@avindivakara.com" className="text-gray-700 hover:text-red-600 transition-colors">
                    contact@avindivakara.com
                  </a>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-black mb-2">Social</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-700 hover:text-red-600 transition-colors">
                      GitHub
                    </a>
                    <a href="#" className="text-gray-700 hover:text-red-600 transition-colors">
                      LinkedIn
                    </a>
                    <a href="#" className="text-gray-700 hover:text-red-600 transition-colors">
                      Twitter
                    </a>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-black mb-2">Location</h4>
                  <p className="text-gray-700">
                    Based in [Your Location], available for remote work worldwide
                  </p>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-black text-white rounded-xl">
                <h4 className="text-xl font-bold mb-4">Let's create something amazing together</h4>
                <p className="text-gray-300">
                  Whether you need a custom web application, interactive experience, or creative coding project, I'm here to help turn your vision into reality.
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
