import React, { useState, useEffect } from 'react';
import { Copy, Trash2 } from 'lucide-react';

export default function StringDedupe() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [trimWhitespace, setTrimWhitespace] = useState(true);

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

      if (!seen.has(processLine)) {
        seen.add(processLine);
        // Keep original line formatting if possible, but if trimmed/lowercased matches, we skip.
        // To keep original, we just check against the processed version.
        result.push(trimWhitespace ? line.trim() : line);
      }
    });

    setOutput(result.join('\n'));
  }, [input, ignoreCase, trimWhitespace]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="glass-panel" style={{ padding: '1.5rem' }}>
      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: 600 }}>String Deduplication</h2>
      
      <div className="tool-grid">
        <div className="tool-col">
          <div className="tool-header">
            <label className="label">Input</label>
          </div>
          <textarea
            className="textarea"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to deduplicate..."
          />
        </div>

        <div className="tool-col">
          <div className="tool-header">
            <label className="label">Output</label>
            <div className="tool-actions">
              <button
                className={`btn ${ignoreCase ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setIgnoreCase(!ignoreCase)}
                title="Ignore Case"
              >
                Aa
              </button>
              <button
                className={`btn ${trimWhitespace ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setTrimWhitespace(!trimWhitespace)}
                title="Trim Whitespace"
              >
                _
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setInput('')}
                title="Clear"
              >
                <Trash2 size={16} />
              </button>
               <button
                className="btn btn-secondary"
                onClick={copyToClipboard}
                title="Copy"
              >
                <Copy size={16} />
              </button>
            </div>
          </div>
          <textarea
            className="textarea"
            value={output}
            readOnly
            placeholder="Deduplicated output will appear here..."
          />
        </div>
      </div>
    </div>
  );
}
