import React from 'react';
import { INITIAL_SERVICES } from '../constants';
import { Code, Layout, Smartphone, Cloud, Bot, PenTool, Monitor, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const iconMap: Record<string, React.ReactNode> = {
  'code': <Code size={40} className="text-primary" />,
  'layout': <Layout size={40} className="text-primary" />,
  'smartphone': <Smartphone size={40} className="text-primary" />,
  'cloud': <Cloud size={40} className="text-primary" />,
  'bot': <Bot size={40} className="text-primary" />,
  'pen-tool': <PenTool size={40} className="text-primary" />,
  'monitor': <Monitor size={40} className="text-primary" />,
};

const Services = () => {
  return (
    <section className="my-12 text-center">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">My Services</h2>
      <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-10 text-sm">
        Specialized solutions in technology, education, and design. Click on a service to learn more about how I can help.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {INITIAL_SERVICES.map((service) => (
          <Link 
            to={`/service/${service.id}`}
            key={service.id} 
            className="bg-white dark:bg-dark-card p-8 shadow-sm flex flex-col items-center justify-center gap-4 transition-all duration-300 group hover:shadow-xl hover:-translate-y-1 relative overflow-hidden rounded-sm"
          >
            {/* Hover Indicator Bar - uses theme color */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>

            <div className="mb-2 transition-transform duration-300 group-hover:scale-110">
                {iconMap[service.icon]}
            </div>
            
            <h3 className="text-lg font-bold text-gray-800 dark:text-white group-hover:text-primary transition-colors duration-300">
                {service.title}
            </h3>
            
            <p className="text-gray-500 dark:text-gray-400 text-sm text-center line-clamp-3">
              {service.desc}
            </p>
            
            <span 
              className="text-primary text-xs font-bold uppercase flex items-center gap-1 mt-2 group-hover:opacity-80 transition-opacity"
            >
              Read More <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Services;