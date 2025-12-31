import React from 'react';
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
  ArrowRight
} from 'lucide-react';

const tools = [
  { 
    id: 'string-sort', 
    name: 'String Sort', 
    icon: Type,
    path: '/string-sort',
    description: 'Sort text lines alphabetically or numerically with advanced options.'
  },
  { 
    id: 'string-dedupe', 
    name: 'Deduplicate', 
    icon: Hash,
    path: '/string-dedupe',
    description: 'Remove duplicate lines from text, ignoring case or whitespace.'
  },
  { 
    id: 'diff', 
    name: 'Diff Viewer', 
    icon: FileDiff,
    path: '/diff',
    description: 'Compare two text blocks and highlight differences with side-by-side view.'
  },
  { 
    id: 'json', 
    name: 'JSON Formatter', 
    icon: Braces,
    path: '/json',
    description: 'Format, validate, and minify JSON data with syntax highlighting.'
  },
  { 
    id: 'base64', 
    name: 'Base64 Converter', 
    icon: Binary,
    path: '/base64',
    description: 'Encode and decode Base64 strings and files securely.'
  },
  { 
    id: 'jwt', 
    name: 'JWT Debugger', 
    icon: ShieldCheck,
    path: '/jwt',
    description: 'Decode and inspect JSON Web Tokens (JWT) payload and headers.'
  },
  { 
    id: 'url', 
    name: 'URL Tools', 
    icon: Link2,
    path: '/url',
    description: 'Encode/Decode URLs and parse query parameters.'
  },
  { 
    id: 'cron', 
    name: 'Cron Parser', 
    icon: Zap,
    path: '/cron',
    description: 'Parse cron expressions into human-readable descriptions.'
  },
];

export default function Home() {
  return (
    <div className="animate-fade-in">
      <header style={{ marginBottom: '4rem' }}>
        <h1 className="text-gradient" style={{ marginBottom: '1rem' }}>
          Welcome back to DevTools
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', maxWidth: '600px' }}>
          The ultimate utility suite for modern developers. Fast, secure, and beautiful.
        </p>
      </header>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.id}
              to={tool.path}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="glass-card" style={{ 
                height: '100%', 
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.borderColor = 'var(--primary)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--glass-border)';
                e.currentTarget.style.background = 'var(--glass-bg)';
              }}
              >
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  background: 'rgba(99, 102, 241, 0.1)', 
                  borderRadius: '12px',
                  display: 'grid',
                  placeItems: 'center',
                  color: 'var(--primary)'
                }}>
                  <Icon size={24} />
                </div>
                
                <div>
                  <h3 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {tool.name}
                    <ArrowRight size={14} style={{ opacity: 0.5 }} />
                  </h3>
                  <p style={{ 
                    color: 'var(--text-muted)', 
                    fontSize: '0.9rem', 
                    lineHeight: 1.5 
                  }}>
                    {tool.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
