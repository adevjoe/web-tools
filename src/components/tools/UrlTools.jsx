import React, { useState, useEffect } from 'react';
import { Link2, Trash2, Copy, CheckCircle, ArrowRightLeft } from 'lucide-react';

export default function UrlTools() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('encode'); // encode, decode
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!input) {
      setOutput('');
      return;
    }

    try {
      if (mode === 'encode') {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
    } catch (err) {
      setOutput('Invalid input for URL ' + mode);
    }
  }, [input, mode]);

  const copyToClipboard = () => {
    if (output && !output.startsWith('Invalid')) {
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
            <Link2 className="text-primary" />
            URL Tools
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>Encode and decode URL-safe strings.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            className="btn-premium btn-ghost" 
            onClick={() => setMode(mode === 'encode' ? 'decode' : 'encode')}
          >
            <ArrowRightLeft size={16} />
            Switch to {mode === 'encode' ? 'Decode' : 'Encode'}
          </button>
          <button className="btn-premium btn-ghost" onClick={() => setInput('')}>
            <Trash2 size={16} />
            Clear
          </button>
          <button 
            className="btn-premium btn-primary-gradient" 
            onClick={copyToClipboard}
            disabled={!output || output.startsWith('Invalid')}
          >
            {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
            {copied ? 'Copied!' : 'Copy Result'}
          </button>
        </div>
      </div>

      <div className="input-area two-col">
        <div className="control-group">
          <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            {mode === 'encode' ? 'Plain String' : 'Encoded URL Component'}
          </label>
          <textarea
            className="styled-textarea"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? "Enter text to encode..." : "Enter encoded URL to decode..."}
          />
        </div>

        <div className="control-group">
          <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            Result
          </label>
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
