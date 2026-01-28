import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Type,
  Hash,
  FileDiff,
  Braces,
  Binary,
  ShieldCheck,
  Link2,
  Zap,
  ArrowRight,
  Search,
  Sparkles
} from 'lucide-react';

const tools = [
  {
    id: 'string-sort',
    name: 'String Sort',
    icon: Type,
    path: '/string-sort',
    description: 'Sort text lines alphabetically or numerically with advanced options.',
    category: 'Text'
  },
  {
    id: 'string-dedupe',
    name: 'Deduplicate',
    icon: Hash,
    path: '/string-dedupe',
    description: 'Remove duplicate lines from text, ignoring case or whitespace.',
    category: 'Text'
  },
  {
    id: 'diff',
    name: 'Diff Viewer',
    icon: FileDiff,
    path: '/diff',
    description: 'Compare two text blocks and highlight differences with side-by-side view.',
    category: 'Text'
  },
  {
    id: 'json',
    name: 'JSON Formatter',
    icon: Braces,
    path: '/json',
    description: 'Format, validate, and minify JSON data with syntax highlighting.',
    category: 'Data'
  },
  {
    id: 'base64',
    name: 'Base64 Converter',
    icon: Binary,
    path: '/base64',
    description: 'Encode and decode Base64 strings and files securely.',
    category: 'Data'
  },
  {
    id: 'jwt',
    name: 'JWT Debugger',
    icon: ShieldCheck,
    path: '/jwt',
    description: 'Decode and inspect JSON Web Tokens (JWT) payload and headers.',
    category: 'Data'
  },
  {
    id: 'url',
    name: 'URL Tools',
    icon: Link2,
    path: '/url',
    description: 'Encode/Decode URLs and parse query parameters.',
    category: 'Data'
  },
  {
    id: 'cron',
    name: 'Cron Parser',
    icon: Zap,
    path: '/cron',
    description: 'Parse cron expressions into human-readable descriptions.',
    category: 'Dev'
  },
];

const categories = ['All', 'Text', 'Data', 'Dev'];

export default function Home() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredTools = tools.filter((tool) => {
    const matchesSearch = !search ||
      tool.name.toLowerCase().includes(search.toLowerCase()) ||
      tool.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="animate-fade-in">
      <header style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <Sparkles size={28} style={{ color: 'var(--primary)' }} />
          <h1 className="text-gradient">
            DevTools
          </h1>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', maxWidth: '600px' }}>
          Fast, secure developer utility suite. Pick a tool to get started.
        </p>
      </header>

      {/* Search and filter bar */}
      <div className="toolbar-bar">
        <div className="search-input-wrapper">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="category-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-tab ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tool cards grid */}
      <div className="tool-grid">
        {filteredTools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.id}
              to={tool.path}
              className="tool-card-link"
            >
              <div className="tool-card glass-card">
                <div className="tool-card-icon-wrapper">
                  <Icon size={24} />
                </div>
                <div className="tool-card-body">
                  <h3 className="tool-card-title">
                    {tool.name}
                    <ArrowRight size={14} className="tool-card-arrow" />
                  </h3>
                  <p className="tool-card-desc">
                    {tool.description}
                  </p>
                </div>
                <span className="tool-card-badge">{tool.category}</span>
              </div>
            </Link>
          );
        })}
      </div>

      {filteredTools.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          color: 'var(--text-dimmed)'
        }}>
          <Search size={40} style={{ marginBottom: '1rem', opacity: 0.4 }} />
          <p style={{ fontSize: '1.1rem' }}>No tools match your search.</p>
        </div>
      )}
    </div>
  );
}
