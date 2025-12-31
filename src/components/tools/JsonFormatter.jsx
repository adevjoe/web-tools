import React, { useState, useEffect } from 'react';
import { Copy, Trash2, Minimize2, Maximize2, CheckCircle, AlertCircle, Braces } from 'lucide-react';

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState(null);
  const [minify, setMinify] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!input) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      const parsed = JSON.parse(input);
      if (minify) {
        setOutput(JSON.stringify(parsed));
      } else {
        setOutput(JSON.stringify(parsed, null, 2));
      }
      setError(null);
    } catch (err) {
      setError(err.message);
      setOutput(''); 
    }
  }, [input, minify]);

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
            <Braces className="text-primary" />
            JSON Formatter
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>Validate, format and minify your JSON data.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn-premium btn-ghost" onClick={() => setInput('')}>
            <Trash2 size={16} />
            Clear
          </button>
          <button 
            className="btn-premium btn-primary-gradient" 
            onClick={copyToClipboard}
            disabled={!output}
          >
            {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
            {copied ? 'Copied!' : 'Copy Result'}
          </button>
        </div>
      </div>

      <div className="input-area two-col">
        <div className="control-group">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>Input JSON</label>
            {error && (
              <span style={{ color: '#ef4444', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <AlertCircle size={12} />
                Invalid JSON
              </span>
            )}
          </div>
          <textarea
            className="styled-textarea"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your JSON here..."
            style={{ borderColor: error ? '#ef4444' : 'var(--border-bright)' }}
          />
          {error && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>{error}</p>}
        </div>

        <div className="control-group">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              {minify ? 'Minified JSON' : 'Formatted JSON'}
            </label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                className={`btn-premium ${minify ? 'btn-primary-gradient' : 'btn-ghost'}`}
                onClick={() => setMinify(!minify)}
                style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem', height: 'auto' }}
              >
                {minify ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
                {minify ? 'Expand' : 'Minify'}
              </button>
            </div>
          </div>
          <textarea
            className="styled-textarea"
            value={output}
            readOnly
            placeholder="Result will appear here..."
            style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.45)',
              borderColor: output && !error ? 'rgba(34, 197, 94, 0.3)' : 'var(--border-bright)'
            }}
          />
        </div>
      </div>
    </div>
  );
}
