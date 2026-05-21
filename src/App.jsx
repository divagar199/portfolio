import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import MeshBackground from './components/MeshBackground';
import Navigation from './components/Navigation';
import Hero from './pages/Hero';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Timeline from './pages/Timeline';
import Education from './pages/Education';
import Contact from './pages/Contact';

// AnimatedRoutes handles individual route loading with exit/enter transitions inside AnimatePresence
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Hero /></PageWrapper>} />
        <Route path="/projects" element={<PageWrapper><Projects /></PageWrapper>} />
        <Route path="/skills" element={<PageWrapper><Skills /></PageWrapper>} />
        <Route path="/experience" element={<PageWrapper><Timeline /></PageWrapper>} />
        <Route path="/education" element={<PageWrapper><Education /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

// PageWrapper sets consistent Framer Motion animation offsets for smooth page transitions
const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
      style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      {children}
    </motion.div>
  );
};

function App() {
  return (
    <Router>
      <div 
        className="app-container" 
        style={{ 
          position: 'relative', 
          width: '100%', 
          minHeight: '100vh', 
          display: 'flex', 
          flexDirection: 'column',
          boxSizing: 'border-box'
        }}
      >
        {/* Absolute liquid background mesh */}
        <MeshBackground />
        
        {/* Central Component Rendering Viewport */}
        <main 
          style={{ 
            flexGrow: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            width: '100%',
            position: 'relative',
            zIndex: 10
          }}
        >
          <AnimatedRoutes />
        </main>
        
        {/* Sticky Global Navigation Panel */}
        <Navigation />
      </div>
    </Router>
  );
}

export default App;
