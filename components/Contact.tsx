
import React, { useState } from 'react';
import { sendMessage } from '../services/api';
import { MapPin, Mail, Smartphone, ExternalLink, Send, Info } from 'lucide-react';
import { getContactFormMailLink, getHireMeLink } from '../constants';

const Contact = () => {
  const [formData, setFormData] = useState({ fullName: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendMessage(formData);
      setStatus('success');
      setFormData({ fullName: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
    }
  };

  const isFormFilled = formData.fullName && formData.email && formData.message;

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 my-20">
      {/* Form Side */}
      <div className="flex flex-col">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-3">Get In Touch</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-md">
            Whether you have a project in mind or just want to say hi, I'm all ears. Fill out the form below or reach out directly.
          </p>
        </div>
        
        <div className="bg-white dark:bg-dark-card p-8 shadow-2xl transition-all duration-300 border border-transparent dark:border-gray-800 rounded-sm relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

          {status === 'success' && (
            <div className="mb-6 bg-green-500/10 border border-green-500/20 text-green-500 p-4 rounded-sm text-sm flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
              <Info size={18} /> Message logged successfully!
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-gray-400 dark:text-gray-500 text-[10px] font-bold uppercase tracking-[2px]">Full Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Jane Recruiter"
                  className="w-full bg-[#E4E5EA] dark:bg-dark-bg border border-transparent dark:border-gray-800 text-gray-800 dark:text-white p-4 rounded-sm focus:outline-none focus:border-primary transition-all text-sm placeholder:opacity-30"
                  value={formData.fullName}
                  onChange={e => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-gray-400 dark:text-gray-500 text-[10px] font-bold uppercase tracking-[2px]">Email Address</label>
                <input 
                  type="email" 
                  required 
                  placeholder="name@company.com"
                  className="w-full bg-[#E4E5EA] dark:bg-dark-bg border border-transparent dark:border-gray-800 text-gray-800 dark:text-white p-4 rounded-sm focus:outline-none focus:border-primary transition-all text-sm placeholder:opacity-30"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-gray-400 dark:text-gray-500 text-[10px] font-bold uppercase tracking-[2px]">Subject</label>
              <input 
                type="text" 
                placeholder="Collaboration Opportunity"
                className="w-full bg-[#E4E5EA] dark:bg-dark-bg border border-transparent dark:border-gray-800 text-gray-800 dark:text-white p-4 rounded-sm focus:outline-none focus:border-primary transition-all text-sm placeholder:opacity-30"
                value={formData.subject}
                onChange={e => setFormData({...formData, subject: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-gray-400 dark:text-gray-500 text-[10px] font-bold uppercase tracking-[2px]">Your Message</label>
              <textarea 
                rows={6}
                required
                placeholder="Write your message here..."
                className="w-full bg-[#E4E5EA] dark:bg-dark-bg border border-transparent dark:border-gray-800 text-gray-800 dark:text-white p-4 rounded-sm focus:outline-none focus:border-primary transition-all text-sm resize-none placeholder:opacity-30"
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>
            
            <div className="flex flex-col gap-4 pt-6">
              {/* PRIMARY ACTION: GMAIL (Guarantees record in recruiter's sent folder) */}
              <div className="relative group/btn">
                <a 
                  href={isFormFilled ? getContactFormMailLink(formData) : '#'}
                  onClick={(e) => {
                    if (!isFormFilled) {
                      e.preventDefault();
                      alert("Please provide your Name, Email, and Message to pre-fill your Gmail draft.");
                    }
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full inline-flex items-center justify-center gap-3 bg-primary text-black font-extrabold py-4 px-8 rounded-sm uppercase text-xs tracking-[2px] transition-all shadow-[0_10px_20px_-10px_var(--primary-color)] no-underline ${!isFormFilled ? 'opacity-50 grayscale cursor-not-allowed' : 'hover:scale-[1.02] hover:shadow-[0_15px_30px_-10px_var(--primary-color)] active:scale-[0.98]'}`}
                >
                  Send via Gmail <ExternalLink size={16} />
                </a>
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-3 py-1.5 rounded-sm opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 border border-gray-800">
                  Recommended: Automatically saves to your Sent folder.
                </div>
              </div>

              {/* SECONDARY ACTION: INTERNAL LOG */}
              <button 
                type="submit" 
                className="w-full bg-transparent border border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 font-bold py-4 px-8 rounded-sm uppercase text-xs tracking-[2px] hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-white transition-all flex items-center justify-center gap-3"
              >
                Log to Portfolio DB <Send size={14} />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Info Side */}
      <div className="flex flex-col justify-center gap-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Contact Details</h2>
          <div className="grid grid-cols-1 gap-4">
            <ContactInfoCard 
              icon={<MapPin size={24} />} 
              label="Location" 
              value="Nairobi, Kenya" 
            />
            <ContactInfoCard 
              icon={<Mail size={24} />} 
              label="Email" 
              value="ayirogloria@gmail.com" 
              isHighlighted
            />
            <ContactInfoCard 
              icon={<Smartphone size={24} />} 
              label="Work Status" 
              value="Available for Freelance" 
            />
          </div>
        </div>

        {/* Specialized Recruiter Card */}
        <div className="bg-[#161616] p-8 rounded-sm border-l-4 border-primary shadow-2xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
              <Info className="text-primary" size={20} />
            </div>
            <h3 className="text-white font-bold text-lg">For Recruiters</h3>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            By using the <strong>Send via Gmail</strong> button, you will send the message directly from your own email account. This ensures:
          </p>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center gap-3 text-xs text-gray-300">
              <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
              Copy saved in your <strong>Sent Folder</strong>
            </li>
            <li className="flex items-center gap-3 text-xs text-gray-300">
              <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
              Direct delivery to Gloria's Inbox
            </li>
            <li className="flex items-center gap-3 text-xs text-gray-300">
              <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
              Higher priority response time
            </li>
          </ul>
          <a 
            href={getHireMeLink("General Collaboration")}
            className="block text-center bg-primary text-black font-extrabold py-3 px-6 rounded-sm uppercase text-[10px] tracking-[2px] no-underline hover:opacity-80 transition-opacity"
          >
            Open Quick Draft
          </a>
        </div>
      </div>
    </section>
  );
};

const ContactInfoCard = ({ icon, label, value, isHighlighted = false }: { icon: React.ReactNode, label: string, value: string, isHighlighted?: boolean }) => (
  <div className={`bg-white dark:bg-dark-card p-6 flex items-center gap-6 border border-transparent dark:border-gray-800 rounded-sm transition-all duration-300 ${isHighlighted ? 'ring-1 ring-primary/30' : ''}`}>
    <div className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 border ${isHighlighted ? 'bg-primary/20 border-primary/40' : 'bg-gray-50 dark:bg-dark-bg border-gray-100 dark:border-gray-800'}`}>
      <div className={isHighlighted ? 'text-primary' : 'text-gray-400'}>{icon}</div>
    </div>
    <div>
      <h4 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[2px] mb-1">{label}</h4>
      <p className={`font-bold transition-colors ${isHighlighted ? 'text-primary' : 'text-gray-700 dark:text-gray-300'}`}>{value}</p>
    </div>
  </div>
);

export default Contact;
