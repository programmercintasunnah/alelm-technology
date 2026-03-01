import { useState, useEffect, type FormEvent } from 'react';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const [lang, setLang] = useState('id');
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem('alelm-lang') || 'id';
    setLang(savedLang);

    const handleLangChange = (e: CustomEvent) => {
      setLang(e.detail);
    };

    window.addEventListener('alelm-lang-change', handleLangChange as EventListener);
    return () => window.removeEventListener('alelm-lang-change', handleLangChange as EventListener);
  }, []);

  const t = {
    title: lang === 'id' ? 'Hubungi Kami' : 'Contact Us',
    subtitle: lang === 'id' ? 'Mari Diskusikan Proyek Anda' : "Let's Discuss Your Project",
    description: lang === 'id' 
      ? 'Kami siap membantu Anda merealisasikan ide dan proyek teknologi Anda. Silakan hubungi kami melalui form di samping atau langsung melalui kontak yang tersedia.'
      : 'We are ready to help you realize your technology ideas and projects. Please contact us through the form or directly through the available contacts.',
    labels: {
      name: lang === 'id' ? 'Nama *' : 'Name *',
      email: lang === 'id' ? 'Email *' : 'Email *',
      phone: lang === 'id' ? 'No. Telepon' : 'Phone',
      subject: lang === 'id' ? 'Subjek *' : 'Subject *',
      message: lang === 'id' ? 'Pesan *' : 'Message *',
      selectSubject: lang === 'id' ? 'Pilih Subjek' : 'Select Subject',
      placeholder: {
        name: lang === 'id' ? 'Nama Anda' : 'Your Name',
        email: lang === 'id' ? 'email@anda.com' : 'your@email.com',
        phone: lang === 'id' ? '+62 812 3456 7890' : '+62 812 3456 7890',
        message: lang === 'id' ? 'Ceritakan proyek Anda...' : 'Tell us about your project...',
      },
    },
    subjects: {
      web: lang === 'id' ? 'Web Development' : 'Web Development',
      mobile: lang === 'id' ? 'Mobile App Development' : 'Mobile App Development',
      uiux: lang === 'id' ? 'UI/UX Design' : 'UI/UX Design',
      cloud: lang === 'id' ? 'Cloud Solutions' : 'Cloud Solutions',
      consulting: lang === 'id' ? 'IT Consulting' : 'IT Consulting',
      other: lang === 'id' ? 'Lainnya' : 'Other',
    },
    contactInfo: {
      email: lang === 'id' ? 'Email' : 'Email',
      phone: lang === 'id' ? 'Telepon' : 'Phone',
      address: lang === 'id' ? 'Alamat' : 'Address',
    },
    button: {
      sending: lang === 'id' ? 'Mengirim...' : 'Sending...',
      send: lang === 'id' ? 'Kirim Pesan' : 'Send Message',
    },
    success: lang === 'id' ? 'Pesan berhasil dikirim!' : 'Message sent successfully!',
    error: lang === 'id' ? 'Terjadi kesalahan. Silakan coba lagi.' : 'An error occurred. Please try again.',
    networkError: lang === 'id' ? 'Terjadi kesalahan jaringan. Silakan coba lagi.' : 'Network error. Please try again.',
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (data.success) {
        setSubmitStatus({
          success: true,
          message: data.message || t.success
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus({
          success: false,
          message: data.message || t.error
        });
      }
    } catch {
      setSubmitStatus({
        success: false,
        message: t.networkError
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) {
    return <div className="py-20 bg-[#0d1b2a]" id="contact"></div>;
  }

  return (
    <div className="py-20 bg-[#0d1b2a]" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-sm text-blue-500 font-semibold uppercase tracking-wider mb-2">{t.title}</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t.subtitle}
            </h3>
            <p className="text-gray-400 mb-8">
              {t.description}
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-white">{t.contactInfo.email}</h4>
                  <p className="text-gray-400">hello@alelmtechnology.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-white">{t.contactInfo.phone}</h4>
                  <p className="text-gray-400">+62 812 3456 7890</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-white">{t.contactInfo.address}</h4>
                  <p className="text-gray-400">Jakarta, Indonesia</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#1b3a5f]/50 rounded-2xl p-8 border border-blue-800/30">
            {submitStatus && (
              <div className={`mb-6 p-4 rounded-lg ${submitStatus.success ? 'bg-green-500/10 border border-green-500/20 text-green-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'}`}>
                {submitStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    {t.labels.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-blue-800/30 bg-[#0d1b2a] text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder={t.labels.placeholder.name}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    {t.labels.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-blue-800/30 bg-[#0d1b2a] text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder={t.labels.placeholder.email}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                    {t.labels.phone}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-blue-800/30 bg-[#0d1b2a] text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder={t.labels.placeholder.phone}
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    {t.labels.subject}
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-blue-800/30 bg-[#0d1b2a] text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    <option value="">{t.labels.selectSubject}</option>
                    <option value="web">{t.subjects.web}</option>
                    <option value="mobile">{t.subjects.mobile}</option>
                    <option value="uiux">{t.subjects.uiux}</option>
                    <option value="cloud">{t.subjects.cloud}</option>
                    <option value="consulting">{t.subjects.consulting}</option>
                    <option value="other">{t.subjects.other}</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  {t.labels.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-blue-800/30 bg-[#0d1b2a] text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                  placeholder={t.labels.placeholder.message}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:transform-none disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t.button.sending}
                  </span>
                ) : (
                  t.button.send
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
