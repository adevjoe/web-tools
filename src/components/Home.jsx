import React from 'react';
import { Type, Hash, FileDiff, Braces, Binary } from 'lucide-react';

export default function Home({ setActiveTool }) {
  const tools = [
    { 
      id: 'string-sort', 
      name: 'String Sort', 
      icon: Type,
      description: 'Sort text lines alphabetically or numerically with various options.'
    },
    { 
      id: 'string-dedupe', 
      name: 'Deduplicate', 
      icon: Hash,
      description: 'Remove duplicate lines from text, ignoring case or whitespace.'
    },
    { 
      id: 'diff', 
      name: 'Diff Viewer', 
      icon: FileDiff,
      description: 'Compare two text blocks and highlight differences.'
    },
    { 
      id: 'json', 
      name: 'JSON Formatter', 
      icon: Braces,
      description: 'Format, validate, and minify JSON data.'
    },
    { 
      id: 'base64', 
      name: 'Base64 Converter', 
      icon: Binary,
      description: 'Encode and decode Base64 strings.'
    },
  ];

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', background: 'linear-gradient(to right, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Developer Tools
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>
          A collection of essential utilities for developers.
        </p>
      </div>

      <div className="dashboard-grid">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className="tool-card"
            >
              <div className="tool-icon-wrapper">
                <Icon size={32} />
              </div>
              <div className="tool-content">
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>{tool.name}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.5 }}>
                  {tool.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
