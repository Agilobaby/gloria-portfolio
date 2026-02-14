import React, { useState, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, ArrowLeft } from 'lucide-react';
import Sidebar from './components/Sidebar';
import RightNavbar from './components/RightNavbar';
import Hero from './components/Hero';
import Services from './components/Services';
import ExperienceSection from './components/ExperienceSection';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Login from './pages/Login';
import Admin from './pages/Admin';
import ServiceDetail from './pages/ServiceDetail';

const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const Layout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#E4E5EA] dark:bg-dark-bg transition-colors duration-300">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden lg:mr-[80px] transition-all">
        {children}
      </main>
      <RightNavbar />
    </div>
  );
};

const RECOMMENDATIONS = [
  {
    id: 1,
    rating: 5,
    title: "Highly Recommended",
    text: "I needed a simple website for my bakery, and Gloria delivered exactly that. It is beautiful, easy to update, and customers love it.",
    author: "Talan Westervelt",
    role: "Small Business Owner",
    image: "https://picsum.photos/id/100/100/100"
  },
  {
    id: 2,
    rating: 5,
    title: "Expert Guidance",
    text: "We were struggling with our new iPads until Gloria stepped in. Her knowledge is impressive, and she saved us countless hours of frustration.",
    author: "Sarah Jenkins",
    role: "Curriculum Director",
    image: "https://picsum.photos/id/101/100/100"
  },
  {
    id: 3,
    rating: 5,
    title: "Incredible Tech Support",
    text: "Gloria helped us migrate our school to Google Workspace seamlessly. Her training sessions were clear and very practical for our teachers.",
    author: "David Mckenzie",
    role: "School Principal",
    image: "https://picsum.photos/id/102/100/100"
  },
  {
    id: 4,
    rating: 5,
    title: "Creative & Professional",
    text: "The branding package Gloria designed for our STEM fair was top-notch. She really understood our vision and executed it perfectly.",
    author: "Lisa Chen",
    role: "Program Coordinator",
    image: "https://picsum.photos/id/103/100/100"
  }
];

const RecommendationCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % RECOMMENDATIONS.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + RECOMMENDATIONS.length) % RECOMMENDATIONS.length);
  };

  // Automatic slide every 10 seconds
  useEffect(() => {
    const interval = setInterval(next, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mb-20 px-4 md:px-0">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Recommendations</h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-sm">
          Here is what people are saying about my work in education and technology.
        </p>
      </div>

      <div className="relative group max-w-5xl mx-auto">
        {/* Navigation Buttons */}
        <button 
          onClick={prev}
          className="absolute left-[-20px] md:left-[-60px] top-1/2 -translate-y-1/2 z-20 bg-primary p-3 rounded-full text-black shadow-lg hover:scale-110 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
          aria-label="Previous recommendation"
        >
          <ChevronLeft size={24} />
        </button>

        <button 
          onClick={next}
          className="absolute right-[-20px] md:right-[-60px] top-1/2 -translate-y-1/2 z-20 bg-primary p-3 rounded-full text-black shadow-lg hover:scale-110 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
          aria-label="Next recommendation"
        >
          <ChevronRight size={24} />
        </button>

        {/* Carousel Content */}
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out" 
            style={{ transform: `translateX(-${currentIndex * (100 / (window.innerWidth >= 768 ? 2 : 1))}%)` }}
          >
            {RECOMMENDATIONS.map((rec) => (
              <div key={rec.id} className="w-full md:w-1/2 flex-shrink-0 p-4">
                <div className="bg-white dark:bg-dark-card p-8 shadow-md h-full flex flex-col transition-colors duration-300 border border-transparent hover:border-primary/20 rounded-sm">
                  <div className="flex text-primary mb-3">
                    {[...Array(rec.rating)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <h4 className="font-bold text-gray-800 dark:text-white mb-3 text-lg">{rec.title}</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 leading-relaxed italic flex-1">
                    "{rec.text}"
                  </p>
                  <div className="flex items-center gap-4 mt-auto">
                    <img 
                      src={rec.image} 
                      className="rounded-full w-12 h-12 object-cover border-2 border-primary/20" 
                      alt={rec.author}
                    />
                    <div>
                      <div className="font-bold text-sm dark:text-white">{rec.author}</div>
                      <div className="text-xs text-gray-400">{rec.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {RECOMMENDATIONS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-all ${currentIndex === i ? 'bg-primary w-6' : 'bg-gray-300 dark:bg-gray-700'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const HomePage = () => (
  <Layout>
    <div id="home">
      <Hero />
    </div>
    <div className="px-4 md:px-8 lg:px-12 max-w-6xl mx-auto">
      <div id="services">
        <Services />
      </div>
      
      <RecommendationCarousel />
      
      <div id="education">
        <ExperienceSection />
      </div>
      
      <div id="portfolio">
        <Portfolio />
      </div>
      
      <div id="contact">
        <Contact />
      </div>
      
      <footer className="bg-white dark:bg-dark-card py-6 text-center text-gray-500 dark:text-gray-400 text-sm mt-12 shadow-inner transition-colors duration-300">
         &copy; 2024 Gloria Kato. All Rights Reserved.
      </footer>
    </div>
  </Layout>
);

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/service/:id" element={<ServiceDetail />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </HashRouter>
  );
};

export default App;