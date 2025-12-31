import React, { useState, useEffect } from 'react';
import { Hash, Trash2, Copy, CheckCircle } from 'lucide-react';

export default function StringDedupe() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [trimWhitespace, setTrimWhitespace] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!input) {
      setOutput('');
      return;
    }

    const lines = input.split('\n');
    const seen = new Set();
    const result = [];

    lines.forEach((line) => {
      let processLine = line;
      if (trimWhitespace) processLine = processLine.trim();
      if (ignoreCase) processLine = processLine.toLowerCase();

      if (processLine && !seen.has(processLine)) {
        seen.add(processLine);
        result.push(trimWhitespace ? line.trim() : line);
      } else if (!processLine && !seen.has('__EMPTY_LINE__')) {
          // Track empty lines too if we want, or just skip. Let's keep one empty line if they exist.
          seen.add('__EMPTY_LINE__');
          result.push('');
      }
    });

    setOutput(result.join('\n'));
  }, [input, ignoreCase, trimWhitespace]);

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
            <Hash className="text-primary" />
            Deduplicate Lines
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>Remove duplicate lines from your text automatically.</p>
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
          <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Input Text</label>
          <textarea
            className="styled-textarea"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste text with duplicates here..."
          />
        </div>

        <div className="control-group">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>Deduplicated Output</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                className={`btn-premium ${ignoreCase ? 'btn-primary-gradient' : 'btn-ghost'}`}
                onClick={() => setIgnoreCase(!ignoreCase)}
                style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem', height: 'auto' }}
              >
                Ignore Case
              </button>
              <button 
                className={`btn-premium ${trimWhitespace ? 'btn-primary-gradient' : 'btn-ghost'}`}
                onClick={() => setTrimWhitespace(!trimWhitespace)}
                style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem', height: 'auto' }}
              >
                Trim Whitespace
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
