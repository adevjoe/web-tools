import React, { useState, useEffect } from 'react';
import { Zap, Trash2, Copy, CheckCircle, AlertCircle } from 'lucide-react';

export default function CronParser() {
  const [cron, setCron] = useState('* * * * *');
  const [explanation, setExplanation] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!cron) {
      setExplanation('');
      setError(null);
      return;
    }

    const parts = cron.trim().split(/\s+/);
    if (parts.length !== 5) {
      setError('Standard cron expressions must have 5 parts (minute, hour, day, month, day of week)');
      setExplanation('');
      return;
    }

    try {
      // Very simplified logic for demonstration
      const [m, h, d, mo, dw] = parts;
      let text = 'Runs ';
      
      if (m === '*' && h === '*' && d === '*' && mo === '*' && dw === '*') {
        text += 'every minute.';
      } else {
        text += `at minute ${m}, hour ${h}, day ${d}, month ${mo}, and day-of-week ${dw}.`;
      }
      
      setExplanation(text);
      setError(null);
    } catch (err) {
      setError('Invalid cron expression format');
      setExplanation('');
    }
  }, [cron]);

  return (
    <div className="animate-fade-in">
      <div className="tool-header-area">
        <div>
          <h2 className="text-gradient" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <Zap className="text-primary" />
            Cron Parser
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>Translate cron expressions into human-readable text.</p>
        </div>
      </div>

      <div className="input-area">
        <div className="glass-card">
          <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '1rem', display: 'block' }}>
            Cron Expression
          </label>
          <input
            className="styled-textarea"
            style={{ minHeight: 'auto', height: '3.5rem', fontSize: '1.25rem' }}
            value={cron}
            onChange={(e) => setCron(e.target.value)}
            placeholder="* * * * *"
          />
          
          <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(0, 0, 0, 0.3)', borderRadius: '12px', borderLeft: '4px solid var(--primary)' }}>
            {error ? (
              <div style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertCircle size={18} />
                {error}
              </div>
            ) : (
              <div>
                <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '1rem' }}>Explanation:</h4>
                <p style={{ fontSize: '1.125rem', color: 'var(--text-main)' }}>{explanation}</p>
              </div>
            )}
          </div>
          
          <p style={{ marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--text-dimmed)' }}>
            Format: [minute] [hour] [day of month] [month] [day of week]
          </p>
        </div>
      </div>
    </div>
  );
}
