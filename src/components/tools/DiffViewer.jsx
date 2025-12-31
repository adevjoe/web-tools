import React, { useState, useEffect } from 'react';
import * as Diff from 'diff';
import { FileDiff, Copy, Trash2, CheckCircle } from 'lucide-react';

export default function DiffViewer() {
  const [original, setOriginal] = useState('');
  const [modified, setModified] = useState('');
  const [diffResult, setDiffResult] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!original && !modified) {
      setDiffResult([]);
      return;
    }
    const diff = Diff.diffLines(original, modified);
    setDiffResult(diff);
  }, [original, modified]);

  const copyDiff = () => {
    const text = diffResult.map(p => (p.added ? '+ ' : p.removed ? '- ' : '  ') + p.value).join('');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-fade-in">
      <div className="tool-header-area">
        <div>
          <h2 className="text-gradient" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <FileDiff className="text-primary" />
            Diff Viewer
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>Compare two text blocks and visualize differences.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn-premium btn-ghost" onClick={() => { setOriginal(''); setModified(''); }}>
            <Trash2 size={16} />
            Clear All
          </button>
          <button className="btn-premium btn-primary-gradient" onClick={copyDiff} disabled={!diffResult.length}>
            {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
            {copied ? 'Copied!' : 'Copy Diff'}
          </button>
        </div>
      </div>

      <div className="input-area two-col">
        <div className="control-group">
          <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Original Text</label>
          <textarea
            className="styled-textarea"
            style={{ minHeight: '300px' }}
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            placeholder="Paste original text here..."
          />
        </div>
        <div className="control-group">
          <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Modified Text</label>
          <textarea
            className="styled-textarea"
            style={{ minHeight: '300px' }}
            value={modified}
            onChange={(e) => setModified(e.target.value)}
            placeholder="Paste modified text here..."
          />
        </div>
      </div>

      <div className="control-group" style={{ marginTop: '2rem' }}>
        <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Difference Output</label>
        <div 
          className="styled-textarea"
          style={{ 
            minHeight: '400px', 
            whiteSpace: 'pre', 
            overflowX: 'auto',
            background: 'rgba(0, 0, 0, 0.45)',
            padding: '1.5rem'
          }}
        >
          {diffResult.length > 0 ? (
            diffResult.map((part, index) => {
              const bg = part.added ? 'rgba(34, 197, 94, 0.15)' : part.removed ? 'rgba(239, 68, 68, 0.15)' : 'transparent';
              const color = part.added ? '#4ade80' : part.removed ? '#f87171' : 'inherit';
              const prefix = part.added ? '+' : part.removed ? '-' : ' ';
              return (
                <div key={index} style={{ backgroundColor: bg, color: color, padding: '0 0.5rem', display: 'block' }}>
                  <span style={{ opacity: 0.5, marginRight: '1rem', userSelect: 'none' }}>{prefix}</span>
                  {part.value}
                </div>
              );
            })
          ) : (
            <div style={{ color: 'var(--text-dimmed)', textAlign: 'center', marginTop: '5rem' }}>
              Comparison results will appear here...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
