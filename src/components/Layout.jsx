import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <div className="content-inner">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
        
        <footer style={{ 
          padding: '2rem', 
          textAlign: 'center', 
          color: 'var(--text-dimmed)', 
          fontSize: '0.85rem',
          borderTop: '1px solid var(--border-subtle)',
          marginTop: 'auto'
        }}>
          <p>© 2025 DevTools Premium. Built for efficiency.</p>
        </footer>
      </main>
    </div>
  );
}
