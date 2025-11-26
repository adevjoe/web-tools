import React, { useState, useEffect } from 'react';
import { Copy, Trash2, Minimize2, Maximize2, CheckCircle, AlertCircle } from 'lucide-react';

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState(null);
  const [minify, setMinify] = useState(false);

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
      // Keep previous output or clear it? Let's clear it to indicate error clearly, 
      // or maybe just don't update output? 
      // Better to show error and maybe keep old output or empty it.
      // Let's keep output empty on error to avoid confusion.
      setOutput(''); 
    }
  }, [input, minify]);

  const copyToClipboard = () => {
    if (output) {
      navigator.clipboard.writeText(output);
    }
  };

  const formatInput = () => {
      try {
          const parsed = JSON.parse(input);
          setInput(JSON.stringify(parsed, null, 2));
      } catch (e) {
          // ignore
      }
  }

  return (
    <div className="glass-panel" style={{ padding: '1.5rem' }}>
      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: 600 }}>JSON Formatter</h2>
      
      <div className="tool-grid">
        <div className="tool-col">
          <div className="tool-header">
            <label className="label">Input JSON</label>
             <div className="tool-actions">
                 <button
                    className="btn btn-secondary"
                    onClick={() => setInput('')}
                    title="Clear"
                  >
                    <Trash2 size={16} />
                  </button>
             </div>
          </div>
          <textarea
            className="textarea"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste JSON here..."
            style={{ borderColor: error ? '#ef4444' : 'var(--border-color)' }}
          />
          {error && (
            <div style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertCircle size={16} />
              {error}
            </div>
          )}
        </div>

        <div className="tool-col">
          <div className="tool-header">
            <label className="label">Formatted Output</label>
            <div className="tool-actions">
              <button
                className={`btn ${minify ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setMinify(!minify)}
                title={minify ? "Expand" : "Minify"}
              >
                {minify ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
              </button>
              <button
                className="btn btn-secondary"
                onClick={copyToClipboard}
                title="Copy"
                disabled={!output}
              >
                <Copy size={16} />
              </button>
            </div>
          </div>
          <textarea
            className="textarea"
            value={output}
            readOnly
            placeholder="Formatted JSON will appear here..."
            style={{ borderColor: output && !error ? '#22c55e' : 'var(--border-color)' }}
          />
           {output && !error && (
            <div style={{ color: '#22c55e', fontSize: '0.875rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle size={16} />
              Valid JSON
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
