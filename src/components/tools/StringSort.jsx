import React, { useState, useEffect } from 'react';
import { ArrowDownAZ, ArrowUpAZ, Type, Trash2, Copy, CheckCircle } from 'lucide-react';

export default function StringSort() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // asc, desc
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!input) {
      setOutput('');
      return;
    }

    const lines = input.split('\n');
    const sorted = [...lines].sort((a, b) => {
      let valA = caseSensitive ? a : a.toLowerCase();
      let valB = caseSensitive ? b : b.toLowerCase();
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setOutput(sorted.join('\n'));
  }, [input, sortOrder, caseSensitive]);

  const copyToClipboard = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="tool-header-area">
        <div>
          <h2 className="text-gradient" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <Type className="text-primary" />
            String Sort
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>Sort lines of text alphabetically or numerically.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn-premium btn-ghost" onClick={() => setInput('')}>
            <Trash2 size={16} />
            Clear
          </button>
          <button className="btn-premium btn-primary-gradient" onClick={copyToClipboard} disabled={!output}>
            {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
            {copied ? 'Copied!' : 'Copy Result'}
          </button>
        </div>
      </div>

      <div className="input-area two-col">
        <div className="control-group">
          <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Input (one per line)</label>
          <textarea
            className="styled-textarea"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter lines to sort..."
          />
        </div>

        <div className="control-group">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>Sorted Output</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
               <button 
                className={`btn-premium ${sortOrder === 'asc' ? 'btn-primary-gradient' : 'btn-ghost'}`}
                onClick={() => setSortOrder('asc')}
                style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem', height: 'auto' }}
              >
                <ArrowDownAZ size={14} /> Asc
              </button>
              <button 
                className={`btn-premium ${sortOrder === 'desc' ? 'btn-primary-gradient' : 'btn-ghost'}`}
                onClick={() => setSortOrder('desc')}
                style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem', height: 'auto' }}
              >
                <ArrowUpAZ size={14} /> Desc
              </button>
              <button 
                className={`btn-premium ${caseSensitive ? 'btn-primary-gradient' : 'btn-ghost'}`}
                onClick={() => setCaseSensitive(!caseSensitive)}
                style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem', height: 'auto' }}
              >
                Aa
              </button>
            </div>
          </div>
          <textarea
            className="styled-textarea"
            value={output}
            readOnly
            placeholder="Result will appear here..."
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.45)' }}
          />
        </div>
      </div>
    </div>
  );
}
