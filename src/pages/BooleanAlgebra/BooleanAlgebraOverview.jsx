import React, { useState, useMemo } from 'react';
import ToolLayout from '../../components/ToolLayout';
import ExplanationBlock from '../../components/ExplanationBlock';
import { generateTruthTable, getCanonicalForms } from '../../utils/boolMath';
import './BooleanAlgebra.css';

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const BooleanAlgebraOverview = () => {
  const [vars, setVars] = useState(['A', 'B']);
  const [expression, setExpression] = useState('A & B');

  const combinations = Math.pow(2, vars.length);
  const tt = useMemo(() => generateTruthTable(vars, expression), [vars, expression]);
  const canonical = useMemo(() => getCanonicalForms(vars, tt.rows), [vars, tt.rows]);

  const addVar = () => {
    if (vars.length < 8) {
      const next = letters[vars.length] || `V${vars.length + 1}`;
      setVars([...vars, next]);
    }
  };

  const removeVar = () => {
    if (vars.length > 1) setVars(vars.slice(0, -1));
  };

  const insertSymbol = (sym) => {
    setExpression(prev => prev + sym);
  };

  return (
    <ToolLayout title="Boolean Algebra" subtitle="Interactive Logic Explorer & Expression Evaluator">
      <div className="boolean-algebra-container">
        
        <ExplanationBlock title="Logic Expression Evaluator">
          <div className="evaluator-card">
            <p className="explanation-intro">
              Enter a boolean expression using variables ({vars.join(', ')}) and operators. 
              The truth table and canonical forms will update in real-time.
            </p>
            
            <div className="expression-input-wrapper">
              <input 
                type="text" 
                className="expression-input"
                value={expression}
                onChange={(e) => setExpression(e.target.value)}
                placeholder="e.g. (A & B) | !C"
              />
            </div>

            <div className="controls-row">
              <button className="glass-btn" onClick={() => insertSymbol(' & ')}>AND (&)</button>
              <button className="glass-btn" onClick={() => insertSymbol(' | ')}>OR (|)</button>
              <button className="glass-btn" onClick={() => insertSymbol(' ! ')}>NOT (!)</button>
              <button className="glass-btn" onClick={() => insertSymbol(' ^ ')}>XOR (^)</button>
              <button className="glass-btn" onClick={() => insertSymbol(' ( ')}>(</button>
              <button className="glass-btn" onClick={() => insertSymbol(' ) ')}>)</button>
              <div style={{ flexGrow: 1 }}></div>
              <button className="glass-btn primary" onClick={addVar}>+ Variable</button>
              <button className="glass-btn" onClick={removeVar}>- Variable</button>
            </div>

            <div className="truth-table-wrapper">
              <table className="premium-table">
                <thead>
                  <tr>
                    {tt.headers.map(h => <th key={h}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {tt.rows.map((row, i) => (
                    <tr key={i}>
                      {row.map((cell, j) => (
                        <td key={j} className={j === row.length - 1 ? '' : `cell-${cell}`}>
                          {j === row.length - 1 ? (
                            <span className={`result-badge badge-${cell}`}>{cell}</span>
                          ) : cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="canonical-forms">
              <div className="canonical-card">
                <h4>Sum of Products (SOP)</h4>
                <div className="canonical-expr">{canonical.sop}</div>
                <div className="subtext" style={{marginTop: '0.5rem', color: '#64748b'}}>{canonical.minterms}</div>
              </div>
              <div className="canonical-card" style={{ borderLeftColor: '#8b5cf6' }}>
                <h4>Product of Sums (POS)</h4>
                <div className="canonical-expr">{canonical.pos}</div>
                <div className="subtext" style={{marginTop: '0.5rem', color: '#64748b'}}>{canonical.maxterms}</div>
              </div>
            </div>
          </div>
        </ExplanationBlock>

        <ExplanationBlock title="Understanding the Basics">
          <div className="comparison-grid">
            <div className="info-card">
              <h4>Variables & Combinations</h4>
              <p>For {vars.length} variables, there are 2<sup>{vars.length}</sup> = {combinations} possible input combinations.</p>
              <ul>
                <li><strong>Literal:</strong> A variable (A) or its complement (A')</li>
                <li><strong>Minterm:</strong> A product term (AND) containing all variables</li>
                <li><strong>Maxterm:</strong> A sum term (OR) containing all variables</li>
              </ul>
            </div>
            
            <div className="key-insight">
              <h4>Standard Operators</h4>
              <ul>
                <li><strong>AND (&, •):</strong> 1 only if all inputs are 1</li>
                <li><strong>OR (|, +):</strong> 1 if at least one input is 1</li>
                <li><strong>NOT (!, '):</strong> Inverts the input (0→1, 1→0)</li>
                <li><strong>XOR (^):</strong> 1 if inputs are different</li>
              </ul>
            </div>
          </div>
        </ExplanationBlock>
      </div>
    </ToolLayout>
  );
};

export default BooleanAlgebraOverview;
