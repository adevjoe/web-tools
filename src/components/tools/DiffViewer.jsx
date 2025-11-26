import React, { useState, useEffect } from 'react';
import * as Diff from 'diff';

export default function DiffViewer() {
  const [original, setOriginal] = useState('');
  const [modified, setModified] = useState('');
  const [diffResult, setDiffResult] = useState([]);

  useEffect(() => {
    if (!original && !modified) {
      setDiffResult([]);
      return;
    }
    
    // Use diffLines for line-by-line comparison, which is usually what's expected for tools like this.
    // We could add a toggle for diffChars or diffWords later.
    const diff = Diff.diffLines(original, modified);
    setDiffResult(diff);
  }, [original, modified]);

  return (
    <div className="glass-panel" style={{ padding: '1.5rem' }}>
      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: 600 }}>Diff Viewer</h2>
      
      <div className="tool-grid" style={{ height: '300px' }}>
        <div className="tool-col">
          <div className="tool-header">
            <label className="label">Original Text</label>
          </div>
          <textarea
            className="textarea"
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            placeholder="Paste original text here..."
          />
        </div>
        <div className="tool-col">
          <div className="tool-header">
            <label className="label">Modified Text</label>
          </div>
          <textarea
            className="textarea"
            value={modified}
            onChange={(e) => setModified(e.target.value)}
            placeholder="Paste modified text here..."
          />
        </div>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <div className="tool-header">
          <label className="label">Difference</label>
        </div>
        <div 
          className="textarea" 
          style={{ 
            minHeight: '300px', 
            whiteSpace: 'pre-wrap', 
            overflowY: 'auto',
            fontFamily: 'monospace'
          }}
        >
          {diffResult.map((part, index) => {
            const color = part.added ? 'rgba(34, 197, 94, 0.2)' : part.removed ? 'rgba(239, 68, 68, 0.2)' : 'transparent';
            const textColor = part.added ? '#86efac' : part.removed ? '#fca5a5' : 'inherit';
            return (
              <span key={index} style={{ backgroundColor: color, color: textColor, display: 'inline' }}>
                {part.value}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
