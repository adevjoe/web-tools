import React, { useState, useEffect } from 'react';
import { Copy, Trash2, ArrowRightLeft } from 'lucide-react';

export default function Base64Converter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('encode'); // encode, decode

  useEffect(() => {
    if (!input) {
      setOutput('');
      return;
    }

    try {
      if (mode === 'encode') {
        setOutput(btoa(input));
      } else {
        setOutput(atob(input));
      }
    } catch (err) {
      setOutput('Invalid Base64 input');
    }
  }, [input, mode]);

  const copyToClipboard = () => {
    if (output && output !== 'Invalid Base64 input') {
      navigator.clipboard.writeText(output);
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '1.5rem' }}>
      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: 600 }}>Base64 Converter</h2>
      
      <div className="tool-grid">
        <div className="tool-col">
          <div className="tool-header">
            <label className="label">{mode === 'encode' ? 'Text Input' : 'Base64 Input'}</label>
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
            placeholder={mode === 'encode' ? "Enter text to encode..." : "Enter Base64 to decode..."}
          />
        </div>

        <div className="tool-col">
          <div className="tool-header">
            <label className="label">{mode === 'encode' ? 'Base64 Output' : 'Text Output'}</label>
            <div className="tool-actions">
              <button
                className="btn btn-primary"
                onClick={() => setMode(mode === 'encode' ? 'decode' : 'encode')}
                title="Switch Mode"
              >
                <ArrowRightLeft size={16} />
                {mode === 'encode' ? 'Encode' : 'Decode'}
              </button>
              <button
                className="btn btn-secondary"
                onClick={copyToClipboard}
                title="Copy"
                disabled={!output || output === 'Invalid Base64 input'}
              >
                <Copy size={16} />
              </button>
            </div>
          </div>
          <textarea
            className="textarea"
            value={output}
            readOnly
            placeholder="Output will appear here..."
          />
        </div>
      </div>
    </div>
  );
}
