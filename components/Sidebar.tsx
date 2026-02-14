
import React from 'react';
import { PROFILE_IMAGE, CV_URL } from '../constants';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Download, Check } from 'lucide-react';

const Sidebar = () => {
  const socialClass = "bg-primary p-2 rounded-full text-black hover:opacity-80 transition-opacity cursor-pointer shadow-sm";
  
  return (
    <aside className="w-full lg:w-[305px] bg-white dark:bg-dark-card shadow-2xl border-b-2 lg:border-b-0 lg:border-r-[1.5px] border-gray-200 dark:border-gray-800 flex-shrink-0 flex flex-col h-auto lg:h-screen lg:sticky lg:top-0 overflow-y-auto scrollbar-hide z-30 relative transition-colors duration-300">
      {/* Profile Section */}
      <div className="p-8 text-center border-b border-gray-100 dark:border-gray-800 bg-gray-50/30 dark:bg-transparent">
        <div className="relative w-[150px] h-[150px] mx-auto mb-5 group">
          <img 
            src={PROFILE_IMAGE} 
            alt="Gloria Kato" 
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null; 
              target.src = "https://picsum.photos/200/200"; // Fallback image
            }}
            className="w-full h-full rounded-full object-cover object-center shadow-xl border-4 border-white dark:border-gray-800 group-hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute bottom-4 right-4 w-5 h-5 bg-[#7EB942] rounded-full border-4 border-white dark:border-dark-card shadow-lg animate-pulse"></span>
        </div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white tracking-tight">Gloria Kato</h2>
        <p className="text-primary text-xs font-semibold mt-1.5 uppercase tracking-widest">Tech Integrator & IT Specialist</p>
        
        <div className="flex justify-center gap-3 mt-6">
          <div className={socialClass}><Facebook size={14} /></div>
          <div className={socialClass}><Instagram size={14} /></div>
          <div className={socialClass}><Twitter size={14} /></div>
          <div className={socialClass}><Linkedin size={14} /></div>
          <div className={socialClass}><Youtube size={14} /></div>
        </div>
      </div>

      {/* Info List */}
      <div className="p-8 border-b border-gray-100 dark:border-gray-800 space-y-4">
        <InfoItem label="Age" value="24" />
        <InfoItem label="Residence" value="Kenya" />
        <InfoItem label="Freelance" value="Available" valueClass="text-[#7EB942] font-bold" />
        <InfoItem label="Address" value="Nairobi/Kiambu" />
      </div>

      {/* Languages */}
      <div className="p-8 border-b border-gray-100 dark:border-gray-800">
        <SectionHeader title="Languages" />
        <div className="space-y-4">
          <LanguageBar lang="English" percent={100} />
          <LanguageBar lang="Swahili" percent={100} />
        </div>
      </div>

      {/* Skills */}
      <div className="p-8 border-b border-gray-100 dark:border-gray-800">
        <SectionHeader title="Core Skills" />
        <div className="space-y-4">
          <LanguageBar lang="Google Workspace" percent={98} />
          <LanguageBar lang="STEM & Coding" percent={90} />
          <LanguageBar lang="Tech Integration" percent={95} />
          <LanguageBar lang="Web Design" percent={85} />
          <LanguageBar lang="Web Dev" percent={80} />
          <LanguageBar lang="Graphic Design" percent={85} />
          <LanguageBar lang="ICT Support" percent={90} />
        </div>
      </div>

      {/* Extra Skills */}
      <div className="p-8 border-b border-gray-100 dark:border-gray-800">
        <SectionHeader title="Extra Skills" />
        <ul className="space-y-2.5">
          <ExtraSkillItem label="AWS Cloud" />
          <ExtraSkillItem label="AppSheet" />
          <ExtraSkillItem label="Hardware Repair" />
          <ExtraSkillItem label="Data Analysis" />
          <ExtraSkillItem label="Virtual Assistance" />
          <ExtraSkillItem label="Woodworking" />
          <ExtraSkillItem label="Adobe Illustrator" />
        </ul>
      </div>

      {/* Download CV */}
      <div className="p-8 mt-auto sticky bottom-0 bg-white/80 dark:bg-dark-card/80 backdrop-blur-md">
         <a 
           href={CV_URL} 
           target="_blank"
           rel="noopener noreferrer"
           className="w-full flex items-center justify-center gap-3 bg-primary hover:shadow-[0_0_15px_rgba(255,180,0,0.4)] text-black font-bold py-3.5 px-4 rounded-sm transition-all uppercase text-sm no-underline"
         >
            Download CV <Download size={18} />
         </a>
      </div>
    </aside>
  );
};

const SectionHeader = ({ title }: { title: string }) => (
  <h3 className="font-bold text-gray-800 dark:text-white mb-5 flex items-center gap-2">
    <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_5px_var(--primary-color)]"></span>
    {title}
  </h3>
);

const InfoItem = ({ label, value, valueClass = "" }: { label: string; value: string; valueClass?: string }) => (
  <div className="flex justify-between items-center text-sm">
    <span className="bg-primary/10 dark:bg-primary/5 text-gray-800 dark:text-gray-200 px-2 py-0.5 rounded-sm font-medium border-l-2 border-primary">{label}:</span>
    <span className={`text-gray-600 dark:text-gray-400 ${valueClass}`}>{value}</span>
  </div>
);

const ExtraSkillItem = ({ label }: { label: string }) => (
  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400 text-sm group">
    <Check size={16} className="text-primary transition-transform group-hover:scale-125" /> 
    <span className="group-hover:text-gray-800 dark:group-hover:text-white transition-colors">{label}</span>
  </li>
);

const LanguageBar = ({ lang, percent }: { lang: string; percent: number }) => (
  <div className="group">
    <div className="flex justify-between text-gray-600 dark:text-gray-400 text-sm mb-1.5">
      <span className="font-medium group-hover:text-gray-800 dark:group-hover:text-white transition-colors">{lang}</span>
      <span className="text-xs opacity-70">{percent}%</span>
    </div>
    <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 p-[1.5px] overflow-hidden">
      <div 
        className="h-full bg-primary rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(255,180,0,0.3)]" 
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  </div>
);

export default Sidebar;
