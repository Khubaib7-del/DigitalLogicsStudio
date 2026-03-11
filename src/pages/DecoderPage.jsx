import React, { useState, useMemo } from 'react';
import ToolLayout from '../components/ToolLayout';
import ExplanationBlock from '../components/ExplanationBlock';
import CircuitModal from '../components/CircuitModal';

// ─── Decoder Logic ───────────────────────────────────────────────────────────

const DECODER_TYPES = {
  '1to2': {
    label: '1-to-2 Decoder',
    codeInputs: ['A'],
    enableInput: true,
    outputs: ['D0', 'D1'],
    description: '1-bit input + Enable → 2 output lines',
    decode: (code, en) => {
      if (!en) return { D0: 0, D1: 0, active: -1 };
      const idx = code[0];
      return { D0: idx === 0 ? 1 : 0, D1: idx === 1 ? 1 : 0, active: idx };
    },
    booleanEqs: [
      { out: 'D0', eq: "D0 = E · A'" },
      { out: 'D1', eq: 'D1 = E · A' },
    ],
    truthRows: [
      ['0','x','x', '0','0'],
      ['1','0','-', '1','0'],
      ['1','1','-', '0','1'],
    ],
    truthHeaders: ['E','A','–','D0','D1'],
  },
  '2to4': {
    label: '2-to-4 Decoder',
    codeInputs: ['A1', 'A0'],
    enableInput: true,
    outputs: ['D0', 'D1', 'D2', 'D3'],
    description: '2-bit binary code + Enable → 4 output lines',
    decode: (code, en) => {
      if (!en) return { D0: 0, D1: 0, D2: 0, D3: 0, active: -1 };
      const idx = (code[0] << 1) | code[1];
      return {
        D0: idx === 0 ? 1 : 0,
        D1: idx === 1 ? 1 : 0,
        D2: idx === 2 ? 1 : 0,
        D3: idx === 3 ? 1 : 0,
        active: idx,
      };
    },
    booleanEqs: [
      { out: 'D0', eq: "D0 = E · A1' · A0'" },
      { out: 'D1', eq: "D1 = E · A1' · A0" },
      { out: 'D2', eq: "D2 = E · A1 · A0'" },
      { out: 'D3', eq: 'D3 = E · A1 · A0' },
    ],
    truthRows: [
      ['0','x','x','0','0','0','0'],
      ['1','0','0','1','0','0','0'],
      ['1','0','1','0','1','0','0'],
      ['1','1','0','0','0','1','0'],
      ['1','1','1','0','0','0','1'],
    ],
    truthHeaders: ['E','A1','A0','D0','D1','D2','D3'],
  },
  '3to8': {
    label: '3-to-8 Decoder',
    codeInputs: ['A2', 'A1', 'A0'],
    enableInput: true,
    outputs: ['D0','D1','D2','D3','D4','D5','D6','D7'],
    description: '3-bit binary code + Enable → 8 output lines',
    decode: (code, en) => {
      if (!en) return Object.fromEntries([...Array(8)].map((_,i) => [`D${i}`, 0]).concat([['active',-1]]));
      const idx = (code[0] << 2) | (code[1] << 1) | code[2];
      const out = {};
      for (let i = 0; i < 8; i++) out[`D${i}`] = i === idx ? 1 : 0;
      out.active = idx;
      return out;
    },
    booleanEqs: [
      { out: 'D0', eq: "D0 = E · A2' · A1' · A0'" },
      { out: 'D1', eq: "D1 = E · A2' · A1' · A0" },
      { out: 'D2', eq: "D2 = E · A2' · A1 · A0'" },
      { out: 'D3', eq: "D3 = E · A2' · A1 · A0" },
      { out: 'D4', eq: "D4 = E · A2 · A1' · A0'" },
      { out: 'D5', eq: "D5 = E · A2 · A1' · A0" },
      { out: 'D6', eq: "D6 = E · A2 · A1 · A0'" },
      { out: 'D7', eq: 'D7 = E · A2 · A1 · A0' },
    ],
    truthRows: Array.from({ length: 8 }, (_, i) => {
      const a2 = (i >> 2) & 1, a1 = (i >> 1) & 1, a0 = i & 1;
      const row = ['1', String(a2), String(a1), String(a0)];
      for (let j = 0; j < 8; j++) row.push(j === i ? '1' : '0');
      return row;
    }),
    truthHeaders: ['E','A2','A1','A0','D0','D1','D2','D3','D4','D5','D6','D7'],
  },
  'BCD7seg': {
    label: 'BCD-to-7-Segment',
    codeInputs: ['A', 'B', 'C', 'D'],
    enableInput: false,
    outputs: ['a','b','c','d','e','f','g'],
    description: '4-bit BCD → 7 segment display signals',
    decode: (code) => {
      // 7-segment truth table (common anode, active high)
      const table = [
        [1,1,1,1,1,1,0], // 0: a b c d e f
        [0,1,1,0,0,0,0], // 1
        [1,1,0,1,1,0,1], // 2
        [1,1,1,1,0,0,1], // 3
        [0,1,1,0,0,1,1], // 4
        [1,0,1,1,0,1,1], // 5
        [1,0,1,1,1,1,1], // 6
        [1,1,1,0,0,0,0], // 7
        [1,1,1,1,1,1,1], // 8
        [1,1,1,1,0,1,1], // 9
      ];
      const idx = (code[0] << 3) | (code[1] << 2) | (code[2] << 1) | code[3];
      if (idx > 9) return { a:0,b:0,c:0,d:0,e:0,f:0,g:0, active: -1 };
      const segs = table[idx];
      return { a:segs[0],b:segs[1],c:segs[2],d:segs[3],e:segs[4],f:segs[5],g:segs[6], active: idx };
    },
    booleanEqs: [
      { out: 'a', eq: "a = A + C + B'D' + BD" },
      { out: 'b', eq: "b = B' + CD + C'D'" },
      { out: 'c', eq: "c = B + C' + D" },
      { out: 'd', eq: "d = A + B'C' + C'D' + BC'D + CD'" },
      { out: 'e', eq: "e = B'D' + CD'" },
      { out: 'f', eq: "f = A + BC' + BD' + C'D'" },
      { out: 'g', eq: "g = A + BC' + BC + C'D" },
    ],
    truthRows: [
      ['0','0','0','0','1','1','1','1','1','1','0'],
      ['0','0','0','1','0','1','1','0','0','0','0'],
      ['0','0','1','0','1','1','0','1','1','0','1'],
      ['0','0','1','1','1','1','1','1','0','0','1'],
      ['0','1','0','0','0','1','1','0','0','1','1'],
      ['0','1','0','1','1','0','1','1','0','1','1'],
      ['0','1','1','0','1','0','1','1','1','1','1'],
      ['0','1','1','1','1','1','1','0','0','0','0'],
      ['1','0','0','0','1','1','1','1','1','1','1'],
      ['1','0','0','1','1','1','1','1','0','1','1'],
    ],
    truthHeaders: ['A','B','C','D','a','b','c','d','e','f','g'],
  },
};

// ─── 7-Segment SVG Display ───────────────────────────────────────────────────

const SevenSegDisplay = ({ segs }) => {
  const on = '#00ff88';
  const off = 'rgba(0,255,136,0.08)';
  const s = (name) => segs[name] ? on : off;
  return (
    <svg viewBox="0 0 60 100" width="80" height="130" style={{ filter: 'drop-shadow(0 0 6px rgba(0,255,136,0.4))' }}>
      {/* a - top */}
      <rect x="8" y="4"  width="44" height="8"  rx="3" fill={s('a')} />
      {/* b - top-right */}
      <rect x="50" y="8" width="8" height="40" rx="3" fill={s('b')} />
      {/* c - bottom-right */}
      <rect x="50" y="52" width="8" height="40" rx="3" fill={s('c')} />
      {/* d - bottom */}
      <rect x="8" y="88" width="44" height="8"  rx="3" fill={s('d')} />
      {/* e - bottom-left */}
      <rect x="2" y="52" width="8" height="40" rx="3" fill={s('e')} />
      {/* f - top-left */}
      <rect x="2" y="8"  width="8" height="40" rx="3" fill={s('f')} />
      {/* g - middle */}
      <rect x="8" y="46" width="44" height="8"  rx="3" fill={s('g')} />
    </svg>
  );
};

// ─── Component ───────────────────────────────────────────────────────────────

const DecoderPage = () => {
  const [selectedType, setSelectedType] = useState('2to4');
  const [codeVals, setCodeVals] = useState([0, 0, 0, 0]);
  const [enable, setEnable] = useState(1);
  const [open, setOpen] = useState(false);

  const config = DECODER_TYPES[selectedType];

  const toggleBit = (idx) => {
    const next = [...codeVals];
    next[idx] = next[idx] ? 0 : 1;
    setCodeVals(next);
  };

  const resetInputs = () => { setCodeVals([0, 0, 0, 0]); setEnable(1); };

  const activeCode = codeVals.slice(0, config.codeInputs.length);
  const result = useMemo(
    () => selectedType === 'BCD7seg'
      ? config.decode(activeCode)
      : config.decode(activeCode, enable),
    [config, activeCode, enable, selectedType]
  );

  const outputEntries = config.outputs.map((name) => ({
    name,
    val: result[name] ?? 0,
  }));

  // Decimal value of code
  const codeDecimal = activeCode.reduce((acc, bit, i) => acc | (bit << (activeCode.length - 1 - i)), 0);

  return (
    <ToolLayout
      title="Decoders"
      subtitle="Convert binary codes into single activated output lines"
    >
      {/* ── What is a Decoder ─────────────────────────────────────── */}
      <ExplanationBlock title="What is a Decoder?">
        <p className="explanation-intro">
          A <strong>decoder</strong> is a combinational circuit that converts an
          n-bit binary code into one (and only one) of up to 2ⁿ unique output lines.
          It is the fundamental building block for memory address decoding,
          instruction decoding, and display driving.
        </p>
        <div className="info-card">
          <h4>Core Properties:</h4>
          <ul>
            <li><strong>One-Hot Output:</strong> Exactly one output line is HIGH at a time (when enabled)</li>
            <li><strong>Enable Input (E):</strong> When E=0, all outputs go LOW — acts as a chip select</li>
            <li><strong>Minterm Generator:</strong> Each output implements one minterm of the input variables</li>
            <li><strong>Combinational:</strong> No memory — output changes immediately with input</li>
          </ul>
        </div>
        <div className="example-box">
          <h4>Real-World Applications:</h4>
          <ul>
            <li>Memory chips — address decoder selects which chip/bank responds</li>
            <li>Seven-segment displays — BCD decoder drives display segments</li>
            <li>CPU instruction decoding — opcode selects the correct operation</li>
            <li>Demultiplexer (DEMUX) — a decoder + data input routes data to one output</li>
            <li>Function generators — any Boolean function via OR of decoder outputs</li>
          </ul>
        </div>
        <div className="key-insight">
          <h4>Minterm Generator Property:</h4>
          <p>
            Every output of an n-to-2ⁿ decoder is the AND of some combination of the n
            input variables and their complements. This means output Dᵢ = mᵢ (minterm i).
            Any Boolean function of those n variables can be implemented by ORing the
            appropriate decoder outputs — making a decoder a universal function generator!
          </p>
        </div>
      </ExplanationBlock>

      {/* ── Types of Decoders ─────────────────────────────────────── */}
      <ExplanationBlock title="Types of Decoders">
        <div className="comparison-grid">
          <div className="comparison-card">
            <h5>🔌 Binary Decoder</h5>
            <ul>
              <li>n inputs → 2ⁿ outputs</li>
              <li>Exactly one output HIGH</li>
              <li>Enable input for cascading</li>
              <li>Pure AND-gate implementation</li>
            </ul>
          </div>
          <div className="comparison-card">
            <h5>📺 BCD-to-7-Segment</h5>
            <ul>
              <li>4-bit BCD → 7 segment signals</li>
              <li>Multiple outputs may be HIGH</li>
              <li>Drives LED/LCD displays</li>
              <li>Complex Boolean equations</li>
            </ul>
          </div>
          <div className="comparison-card">
            <h5>🔀 Decoder as DEMUX</h5>
            <ul>
              <li>Enable pin acts as data input</li>
              <li>Code selects which output gets the data</li>
              <li>Routes 1 line to N destinations</li>
              <li>Common in bus switching</li>
            </ul>
          </div>
        </div>
        <div className="key-insight">
          <h4>Cascading Decoders:</h4>
          <p>
            Larger decoders can be built by cascading smaller ones. Two 2-to-4
            decoders can form one 3-to-8 decoder: the MSB drives the enable of each
            2-to-4 decoder (one active-high, one active-low), while the lower 2 bits
            provide the code. The enable inputs serve as the most-significant address bit.
          </p>
        </div>
      </ExplanationBlock>

      {/* ── Interactive Simulator ─────────────────────────────────── */}
      <ExplanationBlock title="Interactive Decoder Simulator">
        {/* Type Selector */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
          {Object.entries(DECODER_TYPES).map(([key, cfg]) => (
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
          Toggle the binary code bits to see which output activates.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* Inputs */}
          <div>
            <h4 style={{ color: '#93c5fd', marginBottom: '12px' }}>
              Code Inputs
              {selectedType !== 'BCD7seg' && (
                <span style={{ color: '#9ca3af', fontSize: '0.85rem', marginLeft: '8px' }}>
                  (decimal: {codeDecimal})
                </span>
              )}
            </h4>

            {/* Enable toggle */}
            {config.enableInput && (
              <button
                onClick={() => setEnable(e => e ? 0 : 1)}
                style={{
                  marginBottom: '10px',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  width: '100%',
                  border: `2px solid ${enable ? '#fbbf24' : 'rgba(148,163,184,0.3)'}`,
                  background: enable ? 'rgba(251,191,36,0.15)' : 'rgba(15,23,42,0.6)',
                  color: enable ? '#fbbf24' : '#9ca3af',
                  fontFamily: 'monospace', fontWeight: '600', cursor: 'pointer',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}
              >
                <span>Enable (E)</span>
                <span style={{
                  width: '24px', height: '24px', borderRadius: '50%',
                  background: enable ? '#fbbf24' : '#334155',
                  boxShadow: enable ? '0 0 8px #fbbf24' : 'none',
                }} />
              </button>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {config.codeInputs.map((label, idx) => (
                <button
                  key={label}
                  onClick={() => toggleBit(idx)}
                  style={{
                    padding: '10px 16px',
                    borderRadius: '8px',
                    border: `2px solid ${codeVals[idx] ? 'var(--accent-secondary, #00d4ff)' : 'rgba(148,163,184,0.3)'}`,
                    background: codeVals[idx] ? 'rgba(0,212,255,0.15)' : 'rgba(15,23,42,0.6)',
                    color: codeVals[idx] ? '#00d4ff' : '#9ca3af',
                    fontFamily: 'monospace', fontWeight: '600', cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}
                >
                  <span>{label}</span>
                  <span style={{
                    width: '24px', height: '24px', borderRadius: '50%',
                    background: codeVals[idx] ? '#00d4ff' : '#334155',
                    boxShadow: codeVals[idx] ? '0 0 8px #00d4ff' : 'none',
                  }} />
                </button>
              ))}
            </div>

            <button
              className="kmap-btn kmap-btn-secondary"
              style={{ marginTop: '12px', width: '100%' }}
              onClick={resetInputs}
            >
              Reset
            </button>

            {/* Code summary */}
            <div style={{
              marginTop: '14px',
              padding: '12px',
              borderRadius: '8px',
              background: 'rgba(0,212,255,0.06)',
              border: '1px solid rgba(0,212,255,0.2)',
              fontFamily: 'monospace',
            }}>
              <p style={{ color: '#00d4ff', margin: 0 }}>
                Binary: <strong>{activeCode.join('')}</strong>
                {selectedType !== 'BCD7seg' && <> = Decimal <strong>{codeDecimal}</strong></>}
              </p>
              {config.enableInput && (
                <p style={{ color: enable ? '#fbbf24' : '#6b7280', margin: '4px 0 0' }}>
                  Enable: {enable ? '✅ Active' : '❌ Disabled (all outputs LOW)'}
                </p>
              )}
            </div>
          </div>

          {/* Outputs */}
          <div>
            <h4 style={{ color: '#fbbf24', marginBottom: '12px' }}>
              {selectedType === 'BCD7seg' ? 'Segment Outputs' : 'Decoded Outputs'}
            </h4>

            {/* 7-Segment visual */}
            {selectedType === 'BCD7seg' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '16px' }}>
                <SevenSegDisplay segs={result} />
                <div style={{ color: '#9ca3af', fontSize: '0.85rem' }}>
                  {result.active >= 0
                    ? <><p style={{ color: '#00ff88', fontWeight: '700', fontSize: '1.2rem', margin: 0 }}>Digit: {result.active}</p><p style={{ margin: '4px 0 0' }}>BCD: {activeCode.join('')}</p></>
                    : <p style={{ color: '#6b7280', margin: 0 }}>Invalid BCD (≥10)</p>
                  }
                </div>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {outputEntries.map(({ name, val }) => (
                <div
                  key={name}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    border: `2px solid ${val ? 'var(--accent-primary, #00ff88)' : 'rgba(148,163,184,0.15)'}`,
                    background: val ? 'rgba(0,255,136,0.1)' : 'rgba(15,23,42,0.4)',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span style={{ fontFamily: 'monospace', fontWeight: '600', color: '#e2e8f0', fontSize: '0.9rem' }}>
                    {name}
                  </span>
                  <span style={{
                    fontFamily: 'monospace', fontSize: '1.2rem', fontWeight: '700',
                    color: val ? '#00ff88' : '#475569',
                    textShadow: val ? '0 0 10px #00ff88' : 'none',
                  }}>
                    {val}
                  </span>
                </div>
              ))}
            </div>

            {selectedType !== 'BCD7seg' && result.active >= 0 && (
              <div style={{
                marginTop: '12px', padding: '12px', borderRadius: '8px',
                background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.3)',
              }}>
                <p style={{ color: '#00ff88', fontWeight: '600', margin: 0 }}>
                  ✅ D{result.active} is HIGH
                </p>
                <p style={{ color: '#9ca3af', margin: '4px 0 0', fontFamily: 'monospace', fontSize: '0.85rem' }}>
                  Minterm m{result.active} = {activeCode.map((b, i) => b ? config.codeInputs[i] : config.codeInputs[i] + "'").join('·')}
                </p>
              </div>
            )}
          </div>
        </div>
      </ExplanationBlock>

      {/* ── Boolean Equations ─────────────────────────────────────── */}
      <ExplanationBlock title={`Boolean Equations — ${config.label}`}>
        <p className="explanation-intro">
          Each decoder output is a unique AND (product) of the input variables
          and their complements — one for each minterm. For the BCD-to-7-segment,
          the equations are more complex multi-level Boolean expressions.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
          {config.booleanEqs.map(({ out, eq }) => (
            <div key={out} style={{
              padding: '12px 18px',
              background: 'rgba(99,102,241,0.08)',
              border: '1px solid rgba(99,102,241,0.3)',
              borderRadius: '8px',
              fontFamily: 'monospace',
              fontSize: '0.95rem',
              color: '#c4b5fd',
            }}>
              <strong style={{ color: '#a5b4fc' }}>{out}:</strong>&nbsp; {eq}
            </div>
          ))}
        </div>
        <div className="key-insight" style={{ marginTop: '16px' }}>
          <h4>AND Gate Implementation:</h4>
          <p>
            Each output of a binary decoder requires exactly one AND gate with n inputs
            (one per variable, either true or complemented). This means an n-to-2ⁿ
            decoder requires 2ⁿ AND gates of n inputs each, plus n NOT gates for the
            complements. The Enable signal is simply ANDed into every output gate.
          </p>
        </div>
      </ExplanationBlock>

      {/* ── Truth Table ───────────────────────────────────────────── */}
      <ExplanationBlock title={`Truth Table — ${config.label}`}>
        <div className="binary-table-container">
          <table className="binary-table">
            <thead className="binary-table-header">
              <tr>
                {config.truthHeaders.map(h => <th key={h}>{h}</th>)}
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

      {/* ── Implementing Functions ──────────────────────────────── */}
      <ExplanationBlock title="Implementing Boolean Functions with a Decoder">
        <p className="explanation-intro">
          Because decoder outputs are minterms, any sum-of-minterms Boolean function
          can be implemented by simply ORing the correct decoder outputs together —
          no extra AND gates needed.
        </p>
        <div className="example-box">
          <h4>Example: F(A, B, C) = Σm(1, 3, 5, 7) = C</h4>
          <p>Using a 3-to-8 decoder:</p>
          <ul>
            <li>D1 = A'B'C, D3 = A'BC, D5 = AB'C, D7 = ABC</li>
            <li>F = D1 + D3 + D5 + D7 = one external OR gate</li>
            <li>Additional functions share the same decoder simultaneously</li>
          </ul>
        </div>
        <div className="example-box">
          <h4>Example: Full Adder using a 3-to-8 Decoder</h4>
          <p>Inputs: A, B, Cin</p>
          <ul>
            <li><strong>Sum S</strong> = Σm(1, 2, 4, 7) → D1 + D2 + D4 + D7</li>
            <li><strong>Carry Cout</strong> = Σm(3, 5, 6, 7) → D3 + D5 + D6 + D7</li>
            <li>Both outputs from one decoder + two OR gates</li>
          </ul>
        </div>
        <div className="key-insight">
          <h4>Design Advantage:</h4>
          <p>
            A single decoder can generate multiple Boolean functions simultaneously,
            with only OR gates. This is extremely area-efficient in PLAs (Programmable
            Logic Arrays) and FPGAs, where decoders form the AND plane of the structure.
          </p>
        </div>
      </ExplanationBlock>

      {/* ── Applications ─────────────────────────────────────────── */}
      <ExplanationBlock title="Applications & Advanced Topics">
        <div className="comparison-grid">
          <div className="comparison-card">
            <h5>🧠 Memory Address Decoding</h5>
            <ul>
              <li>CPU address bus → decoder inputs</li>
              <li>Each output selects one memory chip</li>
              <li>Prevents bus conflicts</li>
              <li>Cascading handles large address spaces</li>
            </ul>
          </div>
          <div className="comparison-card">
            <h5>📟 7-Segment Display</h5>
            <ul>
              <li>BCD code from counter/register</li>
              <li>Decoder drives each segment</li>
              <li>Common in digital clocks, meters</li>
              <li>Available as single ICs (74LS47)</li>
            </ul>
          </div>
          <div className="comparison-card">
            <h5>🔀 DEMUX (Demultiplexer)</h5>
            <ul>
              <li>Enable pin = data input</li>
              <li>Code selects destination line</li>
              <li>Reconstructs TDM data streams</li>
              <li>Same IC as decoder (pin dual-use)</li>
            </ul>
          </div>
          <div className="comparison-card">
            <h5>⚙️ Instruction Decoder</h5>
            <ul>
              <li>CPU opcode → control signals</li>
              <li>Activates ALU operation</li>
              <li>Enables correct register paths</li>
              <li>Core of hardwired control units</li>
            </ul>
          </div>
        </div>
      </ExplanationBlock>

      <div className="kmap-card">
        <button className="kmap-btn kmap-btn-primary kmap-btn-full" onClick={() => setOpen(true)}>
          🔌 Visualize Decoder Circuit
        </button>
      </div>

      <CircuitModal
        open={open}
        onClose={() => setOpen(false)}
        expression={"F = A'B' + AB"}
        variables={['A', 'B']}
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
        .example-box ul, .example-box p { color: #9ca3af; padding-left: 18px; margin: 4px 0 0; }
        .example-box li { margin-bottom: 6px; line-height: 1.5; }
        .key-insight { background: rgba(34,197,94,0.08); border: 1px solid rgba(34,197,94,0.3); border-radius: 12px; padding: 20px; margin-top: 16px; }
        .key-insight h4 { color: #86efac; margin-bottom: 10px; }
        .key-insight p { color: #9ca3af; margin: 0; line-height: 1.6; }
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

export default DecoderPage;