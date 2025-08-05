"use client";
import { useState } from "react";

interface ContactFormState {
  name: string;
  email: string;
  message: string;
}

interface ContactFormEvent extends React.FormEvent<HTMLFormElement> {
  target: HTMLFormElement;
}

export function ContactForm() {
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
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      // Send form data to server or API
      const formData = new FormData(e.target as HTMLFormElement);
      await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(Array.from(formData.entries()) as [string, string][]).toString(),
      }).then(response => {
        if (response.ok) {
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
        } else {
          throw new Error("Failed to submit form");
        }
      }).catch(error => {
        console.error("Error submitting form:", error);
        setSubmitSuccess(false);
      }).finally(() => {
        setIsSubmitting(false);
      });
    };
 
  return (
    <>
    {submitSuccess ? (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg">
          <p className="font-medium">Message sent successfully!</p>
          <p className="text-sm mt-1">I'll get back to you as soon as possible.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} name="contact-form" className="flex flex-col space-y-4 md:space-y-6 h-full" data-netlify="true">
          <input type="hidden" name="form-name" value="contact-form" />
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
              className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all text-sm md:text-base"
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
              className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all text-sm md:text-base"
              placeholder="your.email@example.com"
            />
          </div>
          
          <div className="flex flex-col flex-1">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formState.message}
              onChange={handleChange}
              required
              className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all resize-none text-sm md:text-base flex-1 min-h-[120px]"
              placeholder="Tell me about your data science project or collaboration idea..."
            ></textarea>
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 md:py-3 px-4 md:px-6 rounded-lg text-white font-medium transition-all text-sm md:text-base mt-auto ${
              isSubmitting ? 'bg-gray-400' : 'bg-black hover:bg-red-600'
            }`}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      )}
    </>
  );
}