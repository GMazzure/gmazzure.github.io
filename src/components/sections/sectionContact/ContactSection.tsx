export default function ContactSection() {
  return (
    <section className="contact-section py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-neutral-800 mb-8">Contact</h2>
        <div className="max-w-2xl mx-auto">
          <form className="space-y-6">
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              />
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              />
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors"
            >
              Send Message
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-neutral-600">Or reach out directly:</p>
            <a
              href="mailto:your.email@example.com"
              className="text-emerald-600 hover:text-emerald-700"
            >
              gustavomazzure@hotmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}