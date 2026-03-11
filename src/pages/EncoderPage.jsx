import React, { useState, useMemo } from 'react';
import ToolLayout from '../components/ToolLayout';
import ExplanationBlock from '../components/ExplanationBlock';
import CircuitModal from '../components/CircuitModal';

// ─── Encoder Logic ──────────────────────────────────────────────────────────

const ENCODER_TYPES = {
  '4to2': {
    label: '4-to-2 Priority Encoder',
    inputs: ['I0', 'I1', 'I2', 'I3'],
    outputs: ['A1', 'A0', 'V'],
    description: '4 data inputs → 2-bit binary code + Valid flag',
    encode: (vals) => {
      // Priority: I3 > I2 > I1 > I0
      const [i0, i1, i2, i3] = vals;
      if (i3) return { A1: 1, A0: 1, V: 1, active: 3 };
      if (i2) return { A1: 1, A0: 0, V: 1, active: 2 };
      if (i1) return { A1: 0, A0: 1, V: 1, active: 1 };
      if (i0) return { A1: 0, A0: 0, V: 1, active: 0 };
      return { A1: 0, A0: 0, V: 0, active: -1 };
    },
    booleanEqs: [
      { out: 'A1', eq: 'A1 = I2 + I3' },
      { out: 'A0', eq: "A0 = I1·I2' + I3" },
      { out: 'V',  eq: 'V = I0 + I1 + I2 + I3' },
    ],
    truthRows: [
      ['0','0','0','0', '—','—','0'],
      ['1','0','0','0', '0','0','1'],
      ['0','1','0','0', '0','1','1'],
      ['0','0','1','0', '1','0','1'],
      ['0','0','0','1', '1','1','1'],
    ],
  },
  '8to3': {
    label: '8-to-3 Priority Encoder',
    inputs: ['I0','I1','I2','I3','I4','I5','I6','I7'],
    outputs: ['A2', 'A1', 'A0', 'V'],
    description: '8 data inputs → 3-bit binary code + Valid flag',
    encode: (vals) => {
      for (let i = 7; i >= 0; i--) {
        if (vals[i]) {
          return {
            A2: (i >> 2) & 1,
            A1: (i >> 1) & 1,
            A0:  i & 1,
            V: 1,
            active: i,
          };
        }
      }
      return { A2: 0, A1: 0, A0: 0, V: 0, active: -1 };
    },
    booleanEqs: [
      { out: 'A2', eq: 'A2 = I4 + I5 + I6 + I7' },
      { out: 'A1', eq: "A1 = I2 + I3 + I6 + I7" },
      { out: 'A0', eq: "A0 = I1 + I3 + I5 + I7" },
      { out: 'V',  eq: 'V = I0 + I1 + ... + I7' },
    ],
    truthRows: [
      ['00000001','0','0','0','1'],
      ['00000010','0','0','1','1'],
      ['00000100','0','1','0','1'],
      ['00001000','0','1','1','1'],
      ['00010000','1','0','0','1'],
      ['00100000','1','0','1','1'],
      ['01000000','1','1','0','1'],
      ['10000000','1','1','1','1'],
    ],
  },
  'BCD': {
    label: 'Decimal-to-BCD Encoder',
    inputs: ['D0','D1','D2','D3','D4','D5','D6','D7','D8','D9'],
    outputs: ['A', 'B', 'C', 'D'],
    description: 'Decimal digit (0–9) → 4-bit BCD code',
    encode: (vals) => {
      for (let i = 9; i >= 0; i--) {
        if (vals[i]) {
          return {
            A: (i >> 3) & 1,
            B: (i >> 2) & 1,
            C: (i >> 1) & 1,
            D:  i & 1,
            active: i,
          };
        }
      }
      return { A: 0, B: 0, C: 0, D: 0, active: -1 };
    },
    booleanEqs: [
      { out: 'A (8)', eq: 'A = D8 + D9' },
      { out: 'B (4)', eq: 'B = D4 + D5 + D6 + D7' },
      { out: 'C (2)', eq: 'C = D2 + D3 + D6 + D7' },
      { out: 'D (1)', eq: 'D = D1 + D3 + D5 + D7 + D9' },
    ],
    truthRows: [
      ['D0 (0)','0','0','0','0'],
      ['D1 (1)','0','0','0','1'],
      ['D2 (2)','0','0','1','0'],
      ['D3 (3)','0','0','1','1'],
      ['D4 (4)','0','1','0','0'],
      ['D5 (5)','0','1','0','1'],
      ['D6 (6)','0','1','1','0'],
      ['D7 (7)','0','1','1','1'],
      ['D8 (8)','1','0','0','0'],
      ['D9 (9)','1','0','0','1'],
    ],
  },
};

// ─── Component ───────────────────────────────────────────────────────────────

const EncoderPage = () => {
  const [selectedType, setSelectedType] = useState('4to2');
  const [inputVals, setInputVals] = useState(Array(10).fill(0));
  const [open, setOpen] = useState(false);

  const config = ENCODER_TYPES[selectedType];

  const toggleInput = (idx) => {
    const next = [...inputVals];
    next[idx] = next[idx] ? 0 : 1;
    setInputVals(next);
  };

  const resetInputs = () => setInputVals(Array(10).fill(0));

  const activeVals = inputVals.slice(0, config.inputs.length);
  const result = useMemo(() => config.encode(activeVals), [config, activeVals]);

  const outputEntries = config.outputs.map((name) => ({
    name,
    val: result[name] ?? 0,
  }));

  // Expression for CircuitModal (use A1 output formula as representative)
  const modalExpr = config.booleanEqs[0].eq;
  const modalVars = config.inputs.slice(0, 4);

  return (
    <ToolLayout
      title="Encoders"
      subtitle="Convert active input lines into compact binary codes"
    >
      {/* ── What is an Encoder ─────────────────────────────────────── */}
      <ExplanationBlock title="What is an Encoder?">
        <p className="explanation-intro">
          An <strong>encoder</strong> is a combinational logic circuit that converts
          an active input signal into a coded binary output. It performs the
          <em> inverse</em> operation of a decoder: given 2ⁿ (or fewer) input
          lines, it produces an n-bit binary code identifying which input is active.
        </p>
        <div className="info-card">
          <h4>Core Properties:</h4>
          <ul>
            <li><strong>Compression:</strong> Reduces many input lines to fewer output bits</li>
            <li><strong>Valid Flag (V):</strong> Priority encoders include a V output — 1 when any input is active</li>
            <li><strong>Priority:</strong> When multiple inputs are high, the highest-numbered input wins</li>
            <li><strong>Combinational:</strong> Output depends only on current inputs — no memory</li>
          </ul>
        </div>
        <div className="example-box">
          <h4>Real-World Uses:</h4>
          <ul>
            <li>Keyboard scanners — encode key position to binary code</li>
            <li>Interrupt controllers (e.g., Intel 8259A) — prioritize CPU interrupts</li>
            <li>Analog-to-Digital Converters — flash ADC uses a priority encoder</li>
            <li>Display multiplexers and position sensors</li>
          </ul>
        </div>
        <div className="key-insight">
          <h4>Encoder vs Decoder:</h4>
          <p>
            A decoder takes an n-bit code and activates <em>one</em> of 2ⁿ outputs.
            An encoder does the opposite: one active input line from 2ⁿ lines produces
            an n-bit binary code. Together they form the compression/expansion pair
            of combinational circuits.
          </p>
        </div>
      </ExplanationBlock>

      {/* ── Types of Encoders ─────────────────────────────────────── */}
      <ExplanationBlock title="Types of Encoders">
        <div className="comparison-grid">
          <div className="comparison-card">
            <h5>🔢 Binary Encoder</h5>
            <ul>
              <li>Exactly one input active at a time</li>
              <li>4-to-2, 8-to-3, 16-to-4 variants</li>
              <li>Simple OR-gate implementation</li>
              <li>No priority handling</li>
            </ul>
          </div>
          <div className="comparison-card">
            <h5>⭐ Priority Encoder</h5>
            <ul>
              <li>Handles multiple simultaneous inputs</li>
              <li>Highest-numbered active input takes priority</li>
              <li>Outputs a Valid (V) flag</li>
              <li>Used in interrupt systems</li>
            </ul>
          </div>
          <div className="comparison-card">
            <h5>🔟 Decimal-to-BCD</h5>
            <ul>
              <li>10 inputs (one per decimal digit)</li>
              <li>4-bit BCD output (8-4-2-1 weighted)</li>
              <li>Used in calculators, displays</li>
              <li>Special case of binary encoder</li>
            </ul>
          </div>
        </div>
        <div className="key-insight">
          <h4>Priority vs. Non-Priority:</h4>
          <p>
            A plain binary encoder produces undefined / garbage output if more than one
            input is simultaneously high. Priority encoders solve this by always
            encoding the highest-priority (highest-index) active input, making them
            safe for real-world noisy environments.
          </p>
        </div>
      </ExplanationBlock>

      {/* ── Interactive Simulator ─────────────────────────────────── */}
      <ExplanationBlock title="Interactive Encoder Simulator">
        {/* Type Selector */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
          {Object.entries(ENCODER_TYPES).map(([key, cfg]) => (
            <button
              key={key}
              className={`kmap-btn ${selectedType === key ? 'kmap-btn-primary' : 'kmap-btn-secondary'}`}
              onClick={() => { setSelectedType(key); resetInputs(); }}
            >
              {cfg.label}
            </button>
          ))}
        </div>

        <p className="explanation-intro" style={{ marginBottom: '16px' }}>
          <strong>{config.label}</strong> — {config.description}.<br/>
          Click input buttons to toggle them. Watch the outputs update in real time.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', flexWrap: 'wrap' }}>
          {/* Inputs */}
          <div>
            <h4 style={{ color: '#93c5fd', marginBottom: '12px' }}>Inputs</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {config.inputs.map((label, idx) => (
                <button
                  key={label}
                  onClick={() => toggleInput(idx)}
                  style={{
                    padding: '10px 16px',
                    borderRadius: '8px',
                    border: `2px solid ${inputVals[idx] ? 'var(--accent-primary, #00ff88)' : 'rgba(148,163,184,0.3)'}`,
                    background: inputVals[idx]
                      ? 'rgba(0,255,136,0.15)'
                      : 'rgba(15,23,42,0.6)',
                    color: inputVals[idx] ? '#00ff88' : '#9ca3af',
                    fontFamily: 'monospace',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span>{label}</span>
                  <span style={{
                    width: '24px', height: '24px', borderRadius: '50%',
                    background: inputVals[idx] ? '#00ff88' : '#334155',
                    boxShadow: inputVals[idx] ? '0 0 8px #00ff88' : 'none',
                    display: 'inline-block',
                  }} />
                </button>
              ))}
            </div>
            <button
              className="kmap-btn kmap-btn-secondary"
              style={{ marginTop: '12px', width: '100%' }}
              onClick={resetInputs}
            >
              Reset All Inputs
            </button>
          </div>

          {/* Outputs */}
          <div>
            <h4 style={{ color: '#fbbf24', marginBottom: '12px' }}>
              Outputs {result.active >= 0 ? `(I${result.active} active)` : '(no input)'}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {outputEntries.map(({ name, val }) => (
                <div
                  key={name}
                  style={{
                    padding: '10px 16px',
                    borderRadius: '8px',
                    border: `2px solid ${val ? 'var(--accent-secondary, #00d4ff)' : 'rgba(148,163,184,0.3)'}`,
                    background: val
                      ? 'rgba(0,212,255,0.12)'
                      : 'rgba(15,23,42,0.4)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontFamily: 'monospace', fontWeight: '600', color: '#e2e8f0' }}>
                    {name}
                  </span>
                  <span style={{
                    fontFamily: 'monospace',
                    fontSize: '1.4rem',
                    fontWeight: '700',
                    color: val ? '#00d4ff' : '#475569',
                    textShadow: val ? '0 0 10px #00d4ff' : 'none',
                  }}>
                    {val}
                  </span>
                </div>
              ))}
            </div>

            {/* Active input summary */}
            <div style={{
              marginTop: '16px',
              padding: '12px',
              borderRadius: '8px',
              background: result.active >= 0 ? 'rgba(251,191,36,0.1)' : 'rgba(148,163,184,0.05)',
              border: `1px solid ${result.active >= 0 ? 'rgba(251,191,36,0.4)' : 'rgba(148,163,184,0.2)'}`,
            }}>
              {result.active >= 0 ? (
                <>
                  <p style={{ color: '#fbbf24', fontWeight: '600', margin: 0 }}>
                    ✅ Active input: <strong>{config.inputs[result.active]}</strong> (index {result.active})
                  </p>
                  <p style={{ color: '#9ca3af', margin: '4px 0 0', fontFamily: 'monospace', fontSize: '0.9rem' }}>
                    Binary output: {config.outputs.filter(o => o !== 'V').map(o => result[o] ?? 0).join('')}
                  </p>
                </>
              ) : (
                <p style={{ color: '#6b7280', margin: 0 }}>No inputs active — V = 0</p>
              )}
            </div>
          </div>
        </div>
      </ExplanationBlock>

      {/* ── Boolean Equations ─────────────────────────────────────── */}
      <ExplanationBlock title={`Boolean Equations — ${config.label}`}>
        <p className="explanation-intro">
          Each output is derived from an OR of specific input lines. This makes
          encoders extremely simple to implement — just OR gates!
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
          {config.booleanEqs.map(({ out, eq }) => (
            <div key={out} style={{
              padding: '14px 18px',
              background: 'rgba(99,102,241,0.08)',
              border: '1px solid rgba(99,102,241,0.3)',
              borderRadius: '8px',
              fontFamily: 'monospace',
              fontSize: '1rem',
              color: '#c4b5fd',
            }}>
              <strong style={{ color: '#a5b4fc' }}>{out}:</strong>&nbsp; {eq}
            </div>
          ))}
        </div>
        <div className="key-insight" style={{ marginTop: '16px' }}>
          <h4>Implementation Insight:</h4>
          <p>
            Because every output is a simple OR of selected inputs, encoders require
            only OR gates — no AND or NOT gates needed (except for priority logic).
            This makes them one of the most gate-efficient combinational circuits.
          </p>
        </div>
      </ExplanationBlock>

      {/* ── Truth Table ───────────────────────────────────────────── */}
      <ExplanationBlock title={`Truth Table — ${config.label}`}>
        <div className="binary-table-container">
          <table className="binary-table">
            <thead className="binary-table-header">
              <tr>
                {selectedType === '8to3'
                  ? <><th>Active Input</th>{config.outputs.map(o => <th key={o}>{o}</th>)}</>
                  : selectedType === 'BCD'
                    ? <><th>Active Input</th>{config.outputs.map(o => <th key={o}>{o}</th>)}</>
                    : <>{config.inputs.map(i => <th key={i}>{i}</th>)}{config.outputs.map(o => <th key={o}>{o}</th>)}</>
                }
              </tr>
            </thead>
            <tbody>
              {config.truthRows.map((row, ri) => (
                <tr key={ri} className="binary-table-row">
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className={`binary-table-cell ${cell === '1' ? 'binary-table-cell-primary' : ''}`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ExplanationBlock>

      {/* ── How Priority Works ───────────────────────────────────── */}
      <ExplanationBlock title="How Priority Encoding Works">
        <p className="explanation-intro">
          In a priority encoder, if multiple inputs are simultaneously asserted,
          the output reflects only the highest-priority (highest-index) active input.
        </p>
        <div className="comparison-grid">
          <div className="comparison-card">
            <h5>Step-by-Step Priority Resolution</h5>
            <ul>
              <li>Check highest input (I3 / I7) first</li>
              <li>If high → encode that index, set V=1, stop</li>
              <li>Move to next lower input, repeat</li>
              <li>If none active → all outputs 0, V=0</li>
            </ul>
          </div>
          <div className="comparison-card">
            <h5>Example: I1 and I3 both high (4-to-2)</h5>
            <ul>
              <li>I3 has higher priority</li>
              <li>Output: A1=1, A0=1, V=1</li>
              <li>I1 is effectively ignored</li>
              <li>Valid flag confirms a real input was detected</li>
            </ul>
          </div>
        </div>
        <div className="key-insight">
          <h4>Hardware Priority Circuit:</h4>
          <p>
            Priority logic is achieved using masked OR expressions.
            For A0 in a 4-to-2 encoder: <code>A0 = I3 + I1·I2'</code>
            — meaning I1 only contributes to A0 when I2 is not active (I2 takes
            priority over I1). This cascading masking produces the correct
            priority behavior with just a handful of AND/OR gates.
          </p>
        </div>
      </ExplanationBlock>

      {/* ── Circuit Visualization ─────────────────────────────────── */}
      <ExplanationBlock title="Applications & Design Considerations">
        <div className="comparison-grid">
          <div className="comparison-card">
            <h5>Flash ADC</h5>
            <ul>
              <li>2ⁿ comparators feed an encoder</li>
              <li>Fastest ADC topology</li>
              <li>Encoder converts thermometer code to binary</li>
              <li>Used in high-speed oscilloscopes</li>
            </ul>
          </div>
          <div className="comparison-card">
            <h5>Keyboard Encoder</h5>
            <ul>
              <li>Each key maps to one input line</li>
              <li>Encoder outputs ASCII or scan code</li>
              <li>Debouncing needed before encoding</li>
              <li>Priority handles held + new keys</li>
            </ul>
          </div>
          <div className="comparison-card">
            <h5>Interrupt Priority Controller</h5>
            <ul>
              <li>CPU has limited interrupt inputs</li>
              <li>Many devices compete for attention</li>
              <li>Priority encoder selects highest urgency</li>
              <li>Vector sent to CPU for ISR lookup</li>
            </ul>
          </div>
        </div>
      </ExplanationBlock>

      <div className="kmap-card">
        <button className="kmap-btn kmap-btn-primary kmap-btn-full" onClick={() => setOpen(true)}>
          🔌 Visualize Encoder Circuit
        </button>
      </div>

      <CircuitModal
        open={open}
        onClose={() => setOpen(false)}
        expression={modalExpr}
        variables={modalVars}
      />

      <style jsx>{`
        .comparison-card h5 { color: #93c5fd; margin-bottom: 10px; font-size: 0.95rem; }
        .comparison-card ul { color: #9ca3af; padding-left: 18px; margin: 0; }
        .comparison-card li { margin-bottom: 6px; line-height: 1.5; }
        .info-card { background: rgba(15,23,42,0.6); border: 1px solid rgba(148,163,184,0.25); border-radius: 12px; padding: 20px; margin-top: 16px; }
        .info-card h4 { color: #93c5fd; margin-bottom: 10px; }
        .info-card ul, .info-card p { color: #9ca3af; padding-left: 18px; margin: 0; }
        .info-card li { margin-bottom: 6px; line-height: 1.5; }
        .example-box { background: rgba(251,191,36,0.07); border: 1px solid rgba(251,191,36,0.3); border-radius: 12px; padding: 20px; margin-top: 16px; }
        .example-box h4 { color: #fbbf24; margin-bottom: 10px; }
        .example-box ul { color: #9ca3af; padding-left: 18px; margin: 0; }
        .example-box li { margin-bottom: 6px; line-height: 1.5; }
        .key-insight { background: rgba(34,197,94,0.08); border: 1px solid rgba(34,197,94,0.3); border-radius: 12px; padding: 20px; margin-top: 16px; }
        .key-insight h4 { color: #86efac; margin-bottom: 10px; }
        .key-insight p, .key-insight code { color: #9ca3af; margin: 0; line-height: 1.6; }
        .key-insight code { background: rgba(0,0,0,0.3); padding: 2px 6px; border-radius: 4px; font-family: monospace; color: #c4b5fd; }
        .comparison-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-top: 16px; }
        .comparison-card { background: rgba(15,23,42,0.5); border: 1px solid rgba(148,163,184,0.2); border-radius: 10px; padding: 16px; }
        .binary-table-container { overflow-x: auto; margin-top: 16px; }
        .binary-table { width: 100%; border-collapse: collapse; }
        .binary-table-header th { background: rgba(99,102,241,0.2); color: #93c5fd; padding: 10px 14px; text-align: center; border: 1px solid rgba(148,163,184,0.2); font-family: monospace; }
        .binary-table-row td { padding: 8px 14px; text-align: center; border: 1px solid rgba(148,163,184,0.1); color: #e2e8f0; font-family: monospace; }
        .binary-table-cell-primary { color: #00ff88 !important; font-weight: 700; }
      `}</style>
    </ToolLayout>
  );
};

export default EncoderPage;