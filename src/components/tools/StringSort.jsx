import React, { useState, useEffect } from 'react';
import { ArrowDownAZ, ArrowUpAZ } from 'lucide-react';

export default function StringSort() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // asc, desc
  const [caseSensitive, setCaseSensitive] = useState(false);

  useEffect(() => {
    if (!input) {
      setOutput('');
      return;
    }

    const lines = input.split('\n');
    const sorted = [...lines].sort((a, b) => {
      if (!caseSensitive) {
        a = a.toLowerCase();
        b = b.toLowerCase();
      }
      if (a < b) return sortOrder === 'asc' ? -1 : 1;
      if (a > b) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setOutput(sorted.join('\n'));
  }, [input, sortOrder, caseSensitive]);

  return (
    <div className="glass-panel" style={{ padding: '1.5rem' }}>
      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: 600 }}>String Sort</h2>
      
      <div className="tool-grid">
        <div className="tool-col">
          <div className="tool-header">
            <label className="label">Input</label>
          </div>
          <textarea
            className="textarea"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to sort (one item per line)..."
          />
        </div>

        <div className="tool-col">
          <div className="tool-header">
            <label className="label">Output</label>
            <div className="tool-actions">
              <button
                className={`btn ${sortOrder === 'asc' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setSortOrder('asc')}
                title="Ascending"
              >
                <ArrowDownAZ size={16} />
              </button>
              <button
                className={`btn ${sortOrder === 'desc' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setSortOrder('desc')}
                title="Descending"
              >
                <ArrowUpAZ size={16} />
              </button>
              <button
                className={`btn ${caseSensitive ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setCaseSensitive(!caseSensitive)}
                title="Case Sensitive"
              >
                Aa
              </button>
            </div>
          </div>
          <textarea
            className="textarea"
            value={output}
            readOnly
            placeholder="Sorted output will appear here..."
          />
        </div>
      </div>
    </div>
  );
}
