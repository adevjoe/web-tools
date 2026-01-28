import React, { useState, useEffect } from 'react';
import { Zap, Trash2, AlertCircle, Clock } from 'lucide-react';

const PRESETS = [
  { label: 'Every minute', value: '* * * * *' },
  { label: 'Every hour', value: '0 * * * *' },
  { label: 'Every day at midnight', value: '0 0 * * *' },
  { label: 'Every Monday 9am', value: '0 9 * * 1' },
  { label: 'Every 5 minutes', value: '*/5 * * * *' },
  { label: 'Every 30 minutes', value: '*/30 * * * *' },
  { label: 'Twice a day (9am, 5pm)', value: '0 9,17 * * *' },
  { label: 'Weekdays at 8am', value: '0 8 * * 1-5' },
  { label: 'First of month at noon', value: '0 12 1 * *' },
  { label: 'Every Sunday at 3am', value: '0 3 * * 0' },
];

const FIELD_LABELS = ['Minute', 'Hour', 'Day of Month', 'Month', 'Day of Week'];
const FIELD_RANGES = ['0-59', '0-23', '1-31', '1-12', '0-6 (Sun=0)'];

const MONTH_NAMES = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function describeField(value, fieldIndex) {
  if (value === '*') return null; // wildcard

  // Step values: */5, 1-30/2
  if (value.includes('/')) {
    const [range, step] = value.split('/');
    const stepNum = parseInt(step, 10);
    if (range === '*') {
      return `every ${stepNum} ${FIELD_LABELS[fieldIndex].toLowerCase()}${stepNum > 1 ? 's' : ''}`;
    }
    return `every ${stepNum} ${FIELD_LABELS[fieldIndex].toLowerCase()}${stepNum > 1 ? 's' : ''} in range ${range}`;
  }

  // Range: 1-5
  if (value.includes('-') && !value.includes(',')) {
    const [start, end] = value.split('-');
    if (fieldIndex === 4) {
      return `${DAY_NAMES[parseInt(start, 10)] || start} through ${DAY_NAMES[parseInt(end, 10)] || end}`;
    }
    if (fieldIndex === 3) {
      return `${MONTH_NAMES[parseInt(start, 10)] || start} through ${MONTH_NAMES[parseInt(end, 10)] || end}`;
    }
    return `${FIELD_LABELS[fieldIndex].toLowerCase()} ${start} through ${end}`;
  }

  // List: 1,3,5
  if (value.includes(',')) {
    const items = value.split(',').map((v) => {
      const num = parseInt(v.trim(), 10);
      if (fieldIndex === 4) return DAY_NAMES[num] || v;
      if (fieldIndex === 3) return MONTH_NAMES[num] || v;
      return v.trim();
    });
    return `${FIELD_LABELS[fieldIndex].toLowerCase()} ${items.join(', ')}`;
  }

  // Single value
  const num = parseInt(value, 10);
  if (fieldIndex === 0) return `minute ${value}`;
  if (fieldIndex === 1) return `hour ${value} (${num < 12 ? `${num || 12}:00 AM` : num === 12 ? '12:00 PM' : `${num - 12}:00 PM`})`;
  if (fieldIndex === 2) return `day ${value} of the month`;
  if (fieldIndex === 3) return MONTH_NAMES[num] || `month ${value}`;
  if (fieldIndex === 4) return DAY_NAMES[num] || `day-of-week ${value}`;
  return value;
}

function parseCron(expression) {
  const parts = expression.trim().split(/\s+/);
  if (parts.length !== 5) {
    return { error: 'Standard cron expressions must have 5 parts (minute, hour, day, month, day of week)' };
  }

  const [m, h, d, mo, dw] = parts;

  // Special all-wildcards case
  if (m === '*' && h === '*' && d === '*' && mo === '*' && dw === '*') {
    return { text: 'Runs every minute.' };
  }

  const descriptions = parts.map((part, idx) => describeField(part, idx)).filter(Boolean);

  if (descriptions.length === 0) {
    return { text: 'Runs every minute.' };
  }

  // Build a more natural sentence
  let text = 'Runs ';
  if (descriptions.length === 1) {
    text += descriptions[0] + '.';
  } else {
    text += descriptions.join(', ') + '.';
  }

  // Capitalize first letter after "Runs "
  return { text: text.charAt(0).toUpperCase() + text.slice(1) };
}

export default function CronParser() {
  const [cron, setCron] = useState('* * * * *');
  const [result, setResult] = useState({ text: '' });

  useEffect(() => {
    if (!cron) {
      setResult({ text: '' });
      return;
    }
    setResult(parseCron(cron));
  }, [cron]);

  const parts = cron.trim().split(/\s+/);

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
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn-premium btn-ghost" onClick={() => setCron('* * * * *')}>
            <Trash2 size={16} />
            Reset
          </button>
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

          {/* Field breakdown */}
          {parts.length === 5 && !result.error && (
            <div className="cron-fields-grid">
              {parts.map((part, idx) => (
                <div key={idx} className="cron-field-item">
                  <span className="cron-field-value">{part}</span>
                  <span className="cron-field-label">{FIELD_LABELS[idx]}</span>
                  <span className="cron-field-range">{FIELD_RANGES[idx]}</span>
                </div>
              ))}
            </div>
          )}

          {/* Explanation */}
          <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: 'rgba(0, 0, 0, 0.3)', borderRadius: '12px', borderLeft: '4px solid var(--primary)' }}>
            {result.error ? (
              <div style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertCircle size={18} />
                {result.error}
              </div>
            ) : (
              <div>
                <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Clock size={16} />
                  Explanation
                </h4>
                <p style={{ fontSize: '1.125rem', color: 'var(--text-main)' }}>{result.text}</p>
              </div>
            )}
          </div>

          {/* Quick presets */}
          <div style={{ marginTop: '2rem' }}>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-dimmed)', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
              Quick Presets
            </h4>
            <div className="cron-presets-grid">
              {PRESETS.map((preset) => (
                <button
                  key={preset.value}
                  className={`cron-preset-btn ${cron.trim() === preset.value ? 'active' : ''}`}
                  onClick={() => setCron(preset.value)}
                >
                  <code>{preset.value}</code>
                  <span>{preset.label}</span>
                </button>
              ))}
            </div>
          </div>

          <p style={{ marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--text-dimmed)' }}>
            Format: [minute] [hour] [day of month] [month] [day of week]
          </p>
        </div>
      </div>
    </div>
  );
}
