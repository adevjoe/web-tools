import React from 'react';
import { Wrench, Type, FileDiff, Hash, Braces, Binary } from 'lucide-react';

export default function Navbar({ activeTool, setActiveTool }) {
  const tools = [
    { id: 'string-sort', name: 'String Sort', icon: Type },
    { id: 'string-dedupe', name: 'Deduplicate', icon: Hash },
    { id: 'diff', name: 'Diff Viewer', icon: FileDiff },
    { id: 'json', name: 'JSON', icon: Braces },
    { id: 'base64', name: 'Base64', icon: Binary },
  ];

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <button className="logo" onClick={() => setActiveTool('home')}>
          <Wrench size={24} className="text-blue-400" />
          <span>DevTools</span>
        </button>
        <div className="nav-links">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                className={`nav-item ${activeTool === tool.id ? 'active' : ''}`}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Icon size={16} />
                  {tool.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
