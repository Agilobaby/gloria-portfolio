import React, { useEffect, useState } from 'react';
import { Experience } from '../types';
import { getExperience } from '../services/api';

const ExperienceSection = () => {
  const [data, setData] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getExperience();
        setData(res);
      } catch (err) {
        console.error("Failed to fetch experience", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const education = data.filter(d => d.type === 'education');
  const work = data.filter(d => d.type === 'work');

  if (loading) return <div className="text-center py-10 dark:text-gray-400">Loading History...</div>;

  return (
    <div className="space-y-12 mb-12">
      <div id="education-list">
        <HistoryBlock 
          title="Education" 
          subtitle="My academic background and specialized certifications in Cloud and Data Analysis." 
          items={education} 
        />
      </div>
      <hr className="border-gray-200 dark:border-gray-700" />
      <div id="work-history">
        <HistoryBlock 
          title="Work History" 
          subtitle="A timeline of my professional experience in educational technology and IT support." 
          items={work} 
        />
      </div>
    </div>
  );
};

const HistoryBlock = ({ title, subtitle, items }: { title: string; subtitle: string; items: Experience[] }) => (
  <section className="text-center">
    <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">{title}</h2>
    <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-10 text-sm">
      {subtitle}
    </p>

    <div className="bg-white dark:bg-dark-card p-8 md:p-12 shadow-sm text-left grid grid-cols-1 gap-8 transition-colors duration-300">
      {items.length === 0 && <p className="text-center text-gray-400">No entries found.</p>}
      {items.map((item, idx) => (
        <div key={idx} className="flex flex-col md:flex-row md:justify-between gap-4 md:gap-10 border-b border-gray-100 dark:border-gray-700 last:border-0 pb-6 last:pb-0">
          <div className="md:w-1/3">
            <h3 className="font-bold text-gray-800 dark:text-white text-lg">{item.title}</h3>
            <div className="flex items-center gap-3 mt-2">
              <span className="bg-primary text-black text-[10px] px-2 py-0.5 font-bold rounded-sm">
                {item.date}
              </span>
            </div>
          </div>
          <div className="md:w-2/3">
             <h4 className="font-bold text-gray-800 dark:text-white text-base mb-2">{item.role}</h4>
             <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default ExperienceSection;