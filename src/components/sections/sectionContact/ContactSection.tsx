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
    <section className="contact-section py-16" id="contact">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-neutral-800 mb-0">Contact me</h2>
        <p className="text-stone-400 mb-4">Let's get in touch!</p>
        <div className="max-w-2xl mx-auto">
          {submitSuccess === true ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              <p>{submitMessage}</p>
            </div>
          ) : submitSuccess === false ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <p>{submitMessage}</p>
            </div>
          ) : null}
          
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
            
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-neutral-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`mt-1 p-2 block w-full rounded-md border ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                } shadow-sm focus:border-emerald-500 focus:ring-emerald-500`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-neutral-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 p-2 block w-full rounded-md border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } shadow-sm focus:border-emerald-500 focus:ring-emerald-500`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-neutral-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className={`mt-1 p-2 block w-full rounded-md border ${
                  errors.message ? 'border-red-500' : 'border-gray-300'
                } shadow-sm focus:border-emerald-500 focus:ring-emerald-500`}
              ></textarea>
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">{errors.message}</p>
              )}
            </div>
            
            <div className="flex justify-center">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || ""}
                onChange={handleRecaptchaChange}
              />
            </div>
            {errors.recaptcha && (
              <p className="text-sm text-red-600 text-center">{errors.recaptcha}</p>
            )}
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full ${
                isSubmitting ? 'bg-emerald-400' : 'bg-emerald-600 hover:bg-emerald-700'
              } text-white px-4 py-2 rounded-md transition-colors`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-neutral-600">Or reach out directly:</p>
            <a
              href="mailto:gmazzure.dev@gmail.com"
              className="text-emerald-600 hover:text-emerald-700"
            >
              gmazzure.dev@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}