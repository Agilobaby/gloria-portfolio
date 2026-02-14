
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PROFILE_IMAGE, getHireMeLink } from '../constants';

const Hero = () => {
  return (
    <section className="bg-white dark:bg-dark-card p-0 md:p-12 lg:p-16 relative overflow-hidden shadow-sm transition-colors duration-300">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between">
        <div className="w-full md:w-2/3 p-8 md:p-0 z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-2">
            I'm Gloria Kato
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 dark:text-white">
            <span className="text-primary">Tech Integrator & IT</span> Specialist
          </h2>
          <p className="text-gray-400 text-sm font-medium mb-4">
             Google Workspace | AWS Certified | STEM Educator | Hardware Support
          </p>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-xl leading-relaxed">
            I am a dedicated Educational Technology Integrator and IT professional based in Nairobi. With a Diploma in Business & IT and AWS Certification, I bridge the gap between complex technology and effective learning. I have hands-on experience transforming classrooms with Google Workspace and iPads, managing school IT infrastructure at institutions like the International School of Kenya, and empowering students through digital literacy.
          </p>
          <a 
            href={getHireMeLink("General Professional Inquiry")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary hover:opacity-80 text-black font-bold py-3 px-8 rounded-sm transition-all uppercase text-sm no-underline"
          >
            Hire Me <ArrowRight size={18} />
          </a>
        </div>
        <div className="w-full md:w-1/3 relative flex justify-center md:justify-end">
             {/* Decorative Elements */}
             <div className="absolute top-4 left-10 w-3 h-3 rounded-full border-2 border-primary"></div>
             <div className="absolute bottom-10 left-10 w-3 h-3 rounded-full border-2 border-[#7EB942]"></div>
             <div className="absolute top-10 right-20 w-3 h-3 rounded-full border-2 border-primary rotate-45"></div>

             <img 
               src={PROFILE_IMAGE} 
               alt="Gloria Kato" 
               referrerPolicy="no-referrer"
               onError={(e) => {
                 const target = e.target as HTMLImageElement;
                 target.onerror = null; 
                 target.src = "https://picsum.photos/400/500"; // Fallback image
               }}
               className="w-[250px] md:w-[320px] h-[320px] md:h-[400px] object-cover object-center rounded-lg shadow-xl z-10 border-4 border-white dark:border-gray-800"
             />
        </div>
      </div>
    </section>
  );
};

export default Hero;
