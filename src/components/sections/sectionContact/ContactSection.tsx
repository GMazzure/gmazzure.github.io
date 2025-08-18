import { useState, useRef, FormEvent } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

// Define the form data interface
interface FormData {
  name: string;
  email: string;
  message: string;
  website?: string; // Honeypot field
}

// Define the form errors interface
interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  recaptcha?: string;
}

export default function ContactSection() {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    website: '' // Honeypot field
  });
  
  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);
  const [submitMessage, setSubmitMessage] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({});
  
  // reCAPTCHA reference
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  // Handle reCAPTCHA verification
  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
    if (errors.recaptcha) {
      setErrors(prev => ({
        ...prev,
        recaptcha: undefined
      }));
    }
  };
  
  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Check if honeypot field is filled (bot detection)
    if (formData.website && formData.website.length > 0) {
      // Silently fail but pretend success to confuse bots
      return false;
    }
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    if (!recaptchaToken) {
      newErrors.recaptcha = 'Please verify you are not a robot';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // If honeypot is triggered, silently pretend success
      if (formData.website && formData.website.length > 0) {
        setSubmitSuccess(true);
        setSubmitMessage('Thank you! Your message has been sent successfully.');
        setFormData({ name: '', email: '', message: '', website: '' });
        return;
      }
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Replace with your actual AWS Lambda endpoint
      const response = await fetch('https://your-api-gateway-url.amazonaws.com/prod/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          recaptchaToken
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSubmitSuccess(true);
        setSubmitMessage('Thank you! Your message has been sent successfully.');
        // Reset form
        setFormData({ name: '', email: '', message: '', website: '' });
        recaptchaRef.current?.reset();
        setRecaptchaToken(null);
      } else {
        setSubmitSuccess(false);
        setSubmitMessage(data.message || 'Something went wrong. Please try again later.');
      }
    } catch (error) {
      setSubmitSuccess(false);
      setSubmitMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section className="contact-section py-16 bg-gray-50" id="contact">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-800 mb-4">Get in touch!</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Always open to connecting, exchanging ideas, and exploring opportunities.
            Feel free to reach out here, via gmazzure.dev@gmail.com or by <a href="https://www.linkedin.com/in/gustavo-mazzure/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 underline">LinkedIn</a>.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          {submitSuccess === true ? (
            <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-lg mb-6 flex items-center gap-3">
              <span className="text-green-500 text-xl">✓</span>
              <p className="font-medium">{submitMessage}</p>
            </div>
          ) : submitSuccess === false ? (
            <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg mb-6 flex items-center gap-3">
              <span className="text-red-500 text-xl">⚠</span>
              <p className="font-medium">{submitMessage}</p>
            </div>
          ) : null}
          
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Honeypot field - hidden from humans but bots might fill it */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Website (Leave this empty)</label>
              <input
                type="text"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            
              <div className="space-y-6">
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder=" "
                    className={`peer w-full px-4 py-3 border-2 rounded-lg bg-gray-50 focus:bg-white transition-all duration-200 placeholder-transparent ${
                      errors.name 
                        ? 'border-red-400 focus:border-red-500' 
                        : 'border-gray-200 focus:border-emerald-500'
                    } focus:outline-none`}
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-4 -top-2.5 bg-white px-2 text-sm font-medium text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-emerald-600 peer-focus:bg-white"
                  >
                    What's your name?
                  </label>
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <span>⚠</span> {errors.name}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder=" "
                    className={`peer w-full px-4 py-3 border-2 rounded-lg bg-gray-50 focus:bg-white transition-all duration-200 placeholder-transparent ${
                      errors.email 
                        ? 'border-red-400 focus:border-red-500' 
                        : 'border-gray-200 focus:border-emerald-500'
                    } focus:outline-none`}
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-4 -top-2.5 bg-white px-2 text-sm font-medium text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-emerald-600 peer-focus:bg-white"
                  >
                    Your email address
                  </label>
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <span>⚠</span> {errors.email}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder=" "
                    className={`peer w-full px-4 py-3 border-2 rounded-lg bg-gray-50 focus:bg-white transition-all duration-200 placeholder-transparent resize-none ${
                      errors.message 
                        ? 'border-red-400 focus:border-red-500' 
                        : 'border-gray-200 focus:border-emerald-500'
                    } focus:outline-none`}
                  ></textarea>
                  <label
                    htmlFor="message"
                    className="absolute left-4 -top-2.5 bg-white px-2 text-sm font-medium text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-emerald-600 peer-focus:bg-white"
                  >
                    Tell me about your project
                  </label>
                  {errors.message && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <span>⚠</span> {errors.message}
                    </p>
                  )}
                </div>
              </div>
            
              <div className="flex justify-center pt-4">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || ""}
                  onChange={handleRecaptchaChange}
                />
              </div>
              {errors.recaptcha && (
                <p className="text-sm text-red-600 text-center flex items-center justify-center gap-1">
                  <span>⚠</span> {errors.recaptcha}
                </p>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 transform ${
                  isSubmitting 
                    ? 'bg-emerald-400 cursor-not-allowed' 
                    : 'bg-emerald-600 hover:bg-emerald-700 hover:scale-[1.02] active:scale-[0.98]'
                } shadow-lg hover:shadow-xl`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⏳</span>
                    Sending your message...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Send Message
                  </span>
                )}
              </button>
            </form>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-neutral-600 mb-3">Prefer email?</p>
            <a
              href="mailto:gmazzure.dev@gmail.com"
              className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
            >
              gmazzure.dev@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}