import React, { useState } from 'react';
import Navbar from './components/Navbar';
import StringSort from './components/tools/StringSort';
import StringDedupe from './components/tools/StringDedupe';
import DiffViewer from './components/tools/DiffViewer';
import JsonFormatter from './components/tools/JsonFormatter';
import Base64Converter from './components/tools/Base64Converter';
import Home from './components/Home';

function App() {
  const [activeTool, setActiveTool] = useState('home');

  const renderTool = () => {
    switch (activeTool) {
      case 'home':
        return <Home setActiveTool={setActiveTool} />;
      case 'string-sort':
        return <StringSort />;
      case 'string-dedupe':
        return <StringDedupe />;
      case 'diff':
        return <DiffViewer />;
      case 'json':
        return <JsonFormatter />;
      case 'base64':
        return <Base64Converter />;
      default:
        return <Home setActiveTool={setActiveTool} />;
    }
  };

  return (
    <>
      <Navbar activeTool={activeTool} setActiveTool={setActiveTool} />
      <main className="container" style={{ padding: '2rem 1.5rem', flex: 1 }}>
        {renderTool()}
      </main>
      <footer style={{ 
        textAlign: 'center', 
        padding: '1.5rem', 
        color: 'var(--text-secondary)',
        borderTop: '1px solid var(--glass-border)',
        marginTop: 'auto'
      }}>
        <p>© 2025 DevTools. Built with React & Vite.</p>
      </footer>
    </>
  );
}

export default App;
