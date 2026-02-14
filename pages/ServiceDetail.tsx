
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { INITIAL_SERVICES, getHireMeLink } from '../constants';
import { ArrowLeft, CheckCircle, Smartphone, Layout, Code, Cloud, Bot, PenTool, Monitor, X, BookOpen, ArrowRight, GraduationCap } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import RightNavbar from '../components/RightNavbar';

const iconMap: Record<string, React.ReactNode> = {
  'code': <Code size={64} className="text-primary" />,
  'layout': <Layout size={64} className="text-primary" />,
  'smartphone': <Smartphone size={64} className="text-primary" />,
  'cloud': <Cloud size={64} className="text-primary" />,
  'bot': <Bot size={64} className="text-primary" />,
  'pen-tool': <PenTool size={64} className="text-primary" />,
  'monitor': <Monitor size={64} className="text-primary" />,
};

const ServiceDetail = () => {
  const { id } = useParams();
  const service = INITIAL_SERVICES.find(s => s.id === id);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#E4E5EA] dark:bg-dark-bg text-gray-800 dark:text-white transition-colors duration-300">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Service Not Found</h2>
          <Link to="/" className="text-primary hover:underline">Go Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#E4E5EA] dark:bg-dark-bg transition-colors duration-300">
      <Sidebar />
      
      <main className="flex-1 overflow-x-hidden lg:mr-[80px] p-4 md:p-8 lg:p-12 transition-all">
        {/* Top Header Card - Updated from blue to match theme */}
        <div className="bg-white dark:bg-dark-card text-gray-800 dark:text-white p-8 md:p-12 rounded-sm relative shadow-sm mb-12 border border-transparent dark:border-gray-800 transition-colors duration-300">
          <Link to="/" className="absolute top-6 right-6 text-gray-400 hover:text-primary transition-colors bg-gray-100 dark:bg-gray-800/50 p-2 rounded-full">
            <X size={24} />
          </Link>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
            <div className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-gray-100 dark:border-gray-800 flex items-center justify-center bg-gray-50 dark:bg-dark-bg shadow-inner">
              {iconMap[service.icon]}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
                {service.title}
              </h1>
              <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 leading-relaxed max-w-3xl">
                {service.desc}
              </p>
              <div className="mt-8 flex justify-center md:justify-start">
                <a 
                  href={getHireMeLink(service.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary hover:opacity-80 text-black font-bold py-4 px-10 rounded-sm flex items-center gap-3 uppercase text-sm tracking-wider no-underline transition-all shadow-lg"
                >
                  Hire Me For {service.title} <ArrowRight size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Features & Why Us Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 px-4">
          {/* Left Column: Key Features */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <CheckCircle className="text-primary" size={28} />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white tracking-tight">Key Features</h2>
            </div>
            <div className="space-y-4">
              {service.features.map((feature, idx) => (
                <div key={idx} className="bg-white dark:bg-dark-card p-5 rounded-sm border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4 group hover:border-primary transition-all duration-300">
                  <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_var(--primary-color)]" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-primary transition-colors">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Tools & Why Me */}
          <div className="space-y-12">
            {/* Tools Used */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <PenTool className="text-primary" size={28} />
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white tracking-tight">Tools & Technologies</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {service.tools.map((tool, idx) => (
                  <span key={idx} className="px-5 py-2 rounded-sm bg-white dark:bg-dark-card text-gray-700 dark:text-gray-300 text-xs font-bold border border-gray-200 dark:border-gray-800 hover:border-primary transition-all uppercase tracking-widest shadow-sm">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Why Choose Me? */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <GraduationCap className="text-primary" size={28} />
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white tracking-tight">Why Choose Me?</h2>
              </div>
              <div className="space-y-4">
                {service.whyMe.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-gray-500 dark:text-gray-400">
                    <ArrowRight className="text-primary flex-shrink-0 mt-1" size={18} />
                    <span className="font-medium text-sm leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Case Studies Section */}
        {service.caseStudies && service.caseStudies.length > 0 && (
          <div className="px-4">
            <div className="flex items-center gap-3 mb-10">
              <BookOpen className="text-primary" size={28} />
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white tracking-tight">Case Studies</h2>
            </div>

            {service.caseStudies.map((study, idx) => (
              <div key={study.id} className="bg-white dark:bg-dark-card rounded-sm overflow-hidden shadow-sm mb-12 border border-transparent dark:border-gray-800 transition-colors duration-300">
                <div className="p-8 md:p-12 text-center">
                  <span className="text-primary uppercase tracking-widest text-[10px] font-bold mb-4 block">PORTFOLIO PROJECT #{idx + 1}</span>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">{study.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed text-sm">
                    {study.desc}
                  </p>
                  
                  {/* Image Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    {study.images.map((img, i) => (
                      <div key={i} className="aspect-square rounded-sm overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 group">
                        <img 
                          src={img} 
                          alt={`${study.title} image ${i + 1}`} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        />
                      </div>
                    ))}
                  </div>

                  {/* Call to Action Button */}
                  <div className="flex justify-center">
                    <a 
                      href={getHireMeLink(service.title, study.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary hover:opacity-80 transition-all text-black font-bold py-4 px-10 rounded-sm flex items-center gap-3 uppercase text-xs tracking-widest no-underline shadow-lg"
                    >
                      Inquire About This Project <ArrowRight size={18} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Navigation */}
        <div className="flex justify-center mt-20 pb-10">
          <Link to="/" className="inline-flex items-center gap-3 text-gray-500 dark:text-gray-400 hover:text-primary transition-all font-bold uppercase tracking-widest text-xs">
            <ArrowLeft size={16} /> Back to Portfolio Home
          </Link>
        </div>
      </main>

      <RightNavbar />
    </div>
  );
};

export default ServiceDetail;
