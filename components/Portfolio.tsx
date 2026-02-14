import React, { useEffect, useState } from 'react';
import { Project } from '../types';
import { getProjects } from '../services/api';
import { Plus } from 'lucide-react';

const Portfolio = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const categories = ['All', 'UI Design', 'Web Templates', 'Logo', 'Branding'];
  
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  if (loading) return <div className="text-center py-10 dark:text-gray-400">Loading Portfolio...</div>;

  return (
    <section className="my-12 text-center">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Portfolio</h2>
      <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-8 text-sm">
        Amet Minim Mollit Non Deserunt Ullamco Est Sit Aliqua Dolor Do Amet Sint. Velit Officia Consequat Duis Enim Velit Mollit. Lorem Ipsum
      </p>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-10 font-medium text-gray-600 dark:text-gray-400">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`cursor-pointer hover:text-primary transition-colors ${filter === cat ? 'text-primary' : ''}`}
          >
            {cat === 'All' ? 'All Categories' : cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, idx) => (
          <div key={idx} className="group relative bg-white dark:bg-dark-card h-64 overflow-hidden shadow-sm cursor-pointer transition-colors duration-300">
            <img 
              src={project.image || "https://picsum.photos/400/300"} 
              alt={project.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-primary bg-opacity-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
              <Plus size={48} className="text-black mb-2" />
              <h3 className="text-xl font-bold text-black">{project.title}</h3>
              <p className="text-gray-800 text-sm">{project.category}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;