import React, { useState } from "react";
import ToolLayout from "../../components/ToolLayout";
import ExplanationBlock from "../../components/ExplanationBlock";
import ControlPanel from "../../components/ControlPanel";
import ControlGroup from "../../components/ControlGroup";
import AFHDLSection from "./components/AFHDLSection";
import AFHDLCard from "./components/AFHDLCard";
import AFHDLToggle from "./components/AFHDLToggle";
import AFHDLDataRow from "./components/AFHDLDataRow";
import AFHDLActionRow from "./components/AFHDLActionRow";
import AFHDLStepList from "./components/AFHDLStepList";
import { arithmeticDescriptions } from "./utils/arithmeticDescriptions";
import {
  cleanBin,
  halfAdder,
  fullAdder,
  binaryAdd,
} from "../../utils/arithmeticHelpers";

const BinaryAdders = () => {
  const [a, setA] = useState("1010");
  const [b, setB] = useState("0101");
  const [cin, setCin] = useState("0");
  const [showSteps, setShowSteps] = useState(false);
  const [showTruthTable, setShowTruthTable] = useState(false);
  const [selectedExample, setSelectedExample] = useState("1010,0101,0");

  const examples = [
    { label: "Simple", a: "1010", b: "0101", cin: "0" },
    { label: "Carry path", a: "1111", b: "0001", cin: "0" },
    { label: "With carry in", a: "1101", b: "1011", cin: "1" },
    { label: "Zero edge", a: "0000", b: "0000", cin: "0" },
  ];

  const h = halfAdder(a.slice(-1), b.slice(-1));
  const f = fullAdder(a.slice(-1), b.slice(-1), cin);
  const ripple = binaryAdd(a, b, cin);

  return (
    <ToolLayout
      title="Binary Adders"
      subtitle="Half adder, full adder, ripple carry and CLA concept"
    >
      <AFHDLSection
        title="Quick summary"
        description={arithmeticDescriptions.adders}
      />

      <ExplanationBlock title="What is an Adder?">
        <p>
          Binary adders compute sum and carry bits for digital circuits. Start
          with half adder and full adder, then build a ripple carry chain.
        </p>
        <ul>
          <li>Half adder: adds two bits A and B, produces sum and carry.</li>
          <li>
            Full adder: adds A, B, and carry-in (Cin), produces sum and
            carry-out.
          </li>
          <li>
            Ripple carry: result chain where each stage waits for previous
            carry.
          </li>
          <li>
            CLA speed-up: generate (Gi=A&B) and propagate (Pi=A^B) signal logic.
          </li>
        </ul>
        <p>
          Practice with different inputs using example buttons and see how
          carries move through the adder, plus the LSB truth table for hands-on
          learning.
        </p>
      </ExplanationBlock>

      <ControlPanel>
        <ControlGroup label="A (binary)">
          <input
            className="tool-input"
            value={a}
            onChange={(e) => setA(cleanBin(e.target.value))}
          />
        </ControlGroup>
        <ControlGroup label="B (binary)">
          <input
            className="tool-input"
            value={b}
            onChange={(e) => setB(cleanBin(e.target.value))}
          />
        </ControlGroup>
        <ControlGroup label="Carry in">
          <input
            className="tool-input"
            maxLength={1}
            value={cin}
            onChange={(e) => setCin(cleanBin(e.target.value).slice(-1) || "0")}
          />
        </ControlGroup>
      </ControlPanel>

      <div
        className="arithmetic-card"
        style={{ display: "grid", gap: "0.8rem" }}
      >
        <AFHDLCard
          title="Adder results"
          subtitle="Half adder, full adder, and ripple-carry outputs"
        >
          <AFHDLDataRow label="Half adder (LSB) sum" value={h.sum} />
          <AFHDLDataRow label="Half adder (LSB) carry" value={h.carry} />
          <AFHDLDataRow label="Full adder (LSB) sum" value={f.sum} />
          <AFHDLDataRow label="Full adder (LSB) carry" value={f.carry} />
          <AFHDLDataRow label="Ripple full sum" value={ripple.sum} />
          <AFHDLDataRow label="Ripple carry out" value={ripple.carry} />
          <p style={{ marginTop: "0.6rem", fontStyle: "italic" }}>
            CLA idea: generate = A&B, propagate = A^B; C[i+1]=G[i]+P[i]*C[i]
          </p>
        </AFHDLCard>

        <AFHDLActionRow>
          {examples.map((entry) => (
            <button
              key={entry.label}
              className="kmap-btn kmap-btn-secondary"
              onClick={() => {
                setA(entry.a);
                setB(entry.b);
                setCin(entry.cin);
                setSelectedExample(`${entry.a},${entry.b},${entry.cin}`);
              }}
            >
              {entry.label}
            </button>
          ))}
        </AFHDLActionRow>

        <AFHDLToggle
          checked={showSteps}
          label="Show step-by-step guide"
          onChange={() => setShowSteps(!showSteps)}
        />

        <AFHDLToggle
          checked={showTruthTable}
          label="Show LSB truth table"
          onChange={() => setShowTruthTable(!showTruthTable)}
        />

        {showTruthTable && (
          <AFHDLCard
            title="LSB truth table"
            subtitle="Input a0 b0 cin => sum carry"
          >
            <AFHDLStepList
              steps={[
                "000 => sum 0 carry 0",
                "001 => sum 1 carry 0",
                "010 => sum 1 carry 0",
                "011 => sum 0 carry 1",
                "100 => sum 1 carry 0",
                "101 => sum 0 carry 1",
                "110 => sum 0 carry 1",
                "111 => sum 1 carry 1",
              ]}
            />
          </AFHDLCard>
        )}
      </div>

      {showSteps && (
        <AFHDLCard title="Step-by-step details">
          <p>1. Align input bit widths to same length.</p>
          <p>2. Compute bit sum and carry at each stage.</p>
          <p>3. Ripple carry waits for the previous stage carry.</p>
          <p>4. CLA precomputes Gi/Pi to reduce delay.</p>
        </AFHDLCard>
      )}
    </ToolLayout>
  );
};

export default BinaryAdders;
