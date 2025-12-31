import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Type, 
  Hash, 
  FileDiff, 
  Braces, 
  Binary, 
  Settings,
  HelpCircle,
  Link2,
  ShieldCheck,
  Zap
} from 'lucide-react';

const tools = [
  { group: 'General', items: [
    { id: 'home', name: 'Dashboard', icon: Home, path: '/' },
  ]},
  { group: 'Text Utilities', items: [
    { id: 'string-sort', name: 'String Sort', icon: Type, path: '/string-sort' },
    { id: 'string-dedupe', name: 'Deduplicate', icon: Hash, path: '/string-dedupe' },
    { id: 'diff', name: 'Diff Viewer', icon: FileDiff, path: '/diff' },
  ]},
  { group: 'Data Tools', items: [
    { id: 'json', name: 'JSON Formatter', icon: Braces, path: '/json' },
    { id: 'base64', name: 'Base64', icon: Binary, path: '/base64' },
    { id: 'jwt', name: 'JWT Debugger', icon: ShieldCheck, path: '/jwt' },
    { id: 'url', name: 'URL Tools', icon: Link2, path: '/url' },
  ]},
  { group: 'Development', items: [
    { id: 'cron', name: 'Cron Parser', icon: Zap, path: '/cron' },
  ]}
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-icon">
          <Settings size={20} strokeWidth={2.5} />
        </div>
        <span style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em' }}>DevTools</span>
      </div>
      
      <nav className="sidebar-nav">
        {tools.map((group, idx) => (
          <div key={idx} className="nav-group">
            <h4 className="nav-label">{group.group}</h4>
            {group.items.map((tool) => {
              const Icon = tool.icon;
              return (
                <NavLink
                  key={tool.id}
                  to={tool.path}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  <Icon size={18} />
                  <span>{tool.name}</span>
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>
      
      <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-subtle)' }}>
        <button className="nav-link">
          <HelpCircle size={18} />
          <span>Feedback</span>
        </button>
      </div>
    </aside>
  );
}
