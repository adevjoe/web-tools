import React, { useState, useEffect } from 'react';
import { ShieldCheck, Copy, Trash2, CheckCircle, AlertCircle } from 'lucide-react';

export default function JwtDebugger() {
  const [token, setToken] = useState('');
  const [header, setHeader] = useState(null);
  const [payload, setPayload] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!token) {
      setHeader(null);
      setPayload(null);
      setError(null);
      return;
    }

    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('JWT must have 3 parts separated by dots');
      }

      const decodedHeader = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
      const decodedPayload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));

      setHeader(decodedHeader);
      setPayload(decodedPayload);
      setError(null);
    } catch (err) {
      setError(err.message);
      setHeader(null);
      setPayload(null);
    }
  }, [token]);

  const copyPayload = () => {
    if (payload) {
      navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="tool-header-area">
        <div>
          <h2 className="text-gradient" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <ShieldCheck className="text-primary" />
            JWT Debugger
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>Decode and inspect JSON Web Tokens (JWT) easily.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn-premium btn-ghost" onClick={() => setToken('')}>
            <Trash2 size={16} />
            Clear
          </button>
          <button 
            className="btn-premium btn-primary-gradient" 
            onClick={copyPayload}
            disabled={!payload}
          >
            {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
            {copied ? 'Copied Payload' : 'Copy Payload'}
          </button>
        </div>
      </div>

      <div className="input-area">
        <div className="control-group">
          <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Encoded Token</label>
          <textarea
            className="styled-textarea"
            style={{ minHeight: '150px' }}
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Paste your JWT here..."
          />
        </div>
      </div>

      <div className="input-area two-col" style={{ marginTop: '2rem' }}>
        <div className="control-group">
          <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Header (Algorithm & Type)</label>
          <div 
            className="styled-textarea" 
            style={{ minHeight: '200px', background: 'rgba(0, 0, 0, 0.45)', overflowY: 'auto' }}
          >
            {header ? (
              <pre style={{ margin: 0 }}>{JSON.stringify(header, null, 2)}</pre>
            ) : error ? (
              <div style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertCircle size={16} />
                {error}
              </div>
            ) : (
              <span style={{ color: 'var(--text-dimmed)' }}>Decoded header will appear here...</span>
            )}
          </div>
        </div>

        <div className="control-group">
          <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Payload (Data)</label>
          <div 
            className="styled-textarea" 
            style={{ minHeight: '300px', background: 'rgba(0, 0, 0, 0.45)', overflowY: 'auto' }}
          >
            {payload ? (
              <pre style={{ margin: 0 }}>{JSON.stringify(payload, null, 2)}</pre>
            ) : (
              <span style={{ color: 'var(--text-dimmed)' }}>Decoded payload will appear here...</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
