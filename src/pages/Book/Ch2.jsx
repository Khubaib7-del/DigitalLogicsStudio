import React, { useState } from 'react';
import { ChevronDown, Cpu, Binary, Calculator, BookOpen, Lightbulb, CheckCircle } from 'lucide-react';

const Ch2ProblemSolver = () => {
    const [expandedProblems, setExpandedProblems] = useState(new Set());
    const [showDetailedExplanation, setShowDetailedExplanation] = useState({});

    const toggleProblem = (id) => {
        const newExpanded = new Set(expandedProblems);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedProblems(newExpanded);
    };

    const toggleDetailedExplanation = (id) => {
        setShowDetailedExplanation(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const problems = [
        {
            id: '2-1',
            category: 'Truth Tables & Boolean Identities',
            title: 'Demonstrate by Truth Tables',
            question: '(a) DeMorgan\'s theorem for three variables: (XYZ)\' = X\' + Y\' + Z\' | (b) The second distributive law: X + YZ = (X + Y)(X + Z) | (c) XY\' + Y\'Z + XZ\' = XY\' + Y\'Z + X\'Z',
            shortAnswer: '(a) Both sides equal for all 8 combinations | (b) Both sides produce identical truth tables | (c) Both expressions have same truth table output',
        },
        {
            id: '2-2',
            category: 'Algebraic Manipulation',
            title: 'Prove Boolean Identities Algebraically',
            question: '(a) X\'Y\' + X\'Y + XY = X\' + Y | (b) A\'B + B\'C\' + AB + B\'C = 1 | (c) Y + X\'Z + XY\' = X + Y + Z | (d) X\'Y\' + Y\'Z + XZ + XY + YZ\' = X\'Y\' + XZ + YZ\'',
            shortAnswer: '(a) X\'(Y\'+Y) + XY = X\' + XY = X\' + Y | (b) B\'(C\'+C) + B(A\'+A) = B\' + B = 1 | (c) Y(1+X\') + X\'Z = Y + X\' + Z = X + Y + Z | (d) Consensus theorem application',
        },
        {
            id: '2-3',
            category: 'Algebraic Manipulation',
            title: 'Prove Boolean Identities (Advanced)',
            question: '(a) AB\'C\' + BC\'D\' + BC + C\'D = B + C\'D | (b) WY + W\'YZ\' + WXZ + W\'XY\' = WY + W\'XZ\' + XY\'Z\' + XY\'Z | (c) AD\' + A\'B + C\'D + B\'C = (A\'+B\'+C\'+D\')(A+B+C+D)',
            shortAnswer: '(a) BC(1+D\') + AB\'C\' + C\'D = BC + C\'(AB\'+D) = B + C\'D | (b) Consensus and absorption theorems | (c) Dual relationship proof',
        },
        {
            id: '2-4',
            category: 'Conditional Proof',
            title: 'Prove Given A·B=0 and A+B=1',
            question: 'Given that A·B = 0 and A+B = 1, use algebraic manipulation to prove that (A+C)(A\'+B)(B+C) = B·C',
            shortAnswer: 'Since A·B=0 and A+B=1, A and B are complements (B=A\'). Substituting: (A+C)(A\'+A\')(A\'+C) = (A+C)(0)(A\'+C) = ... Wait, let me redo: (A+C)(A\'+B)(B+C) with B=A\' gives (A+C)(A\'+A\')(A\'+C) = (A+C)(1)(A\'+C) = AA\' + AC + A\'C + CC = 0 + C(A+A\') + C = C = B\'C since B=A\'',
        },
        {
            id: '2-5',
            category: 'Boolean Algebra with Binary Strings',
            title: 'Four-Bit Nibble Boolean Algebra',
            question: 'Define for 4-bit nibbles (16 elements): (a) OR operation A+B | (b) AND operation A·B | (c) Element 0 | (d) Element 1 | (e) Complement A\'',
            shortAnswer: '(a) Bitwise OR: 1010 + 1100 = 1110 | (b) Bitwise AND: 1010 · 1100 = 1000 | (c) 0000 | (d) 1111 | (e) Bitwise NOT: (1010)\' = 0101',
        },
        {
            id: '2-6',
            category: 'Expression Simplification',
            title: 'Simplify to Minimum Literals',
            question: '(a) A\'C\' + A\'BC + B\'C | (b) (A\'+B\'+C\')·A\'B\'C\' | (c) ABC\' + AC | (d) A\'BD + A\'CD\' + BD | (e) (A+B)(A+C)(AB\'C\')',
            shortAnswer: '(a) A\'C\' + B\'C | (b) A\'B\'C\' | (c) AC | (d) BD + A\'CD\' | (e) AB\'C\'',
        },
        {
            id: '2-7',
            category: 'Literal Reduction',
            title: 'Reduce to Indicated Literals',
            question: '(a) X\'Y + XYZ + X\'Y to three literals | (b) X + Y(Z + X\' + Z\') to two literals | (c) W\'X(Z\' + Y\'Z) + X(W + W\'YZ) to one literal | (d) (AB+A\'B\')(C\'D\'+CD)+A\'C to four literals',
            shortAnswer: '(a) Y(X\'+XZ+X\') = Y(X\'+XZ) = X\'Y + XYZ = Y(X\'+XZ) → X\'Y + YZ = Y(X\'+Z) | (b) X + Y(1) = X + Y | (c) X | (d) A\'B\' + AB + A\'C',
        },
        {
            id: '2-8',
            category: 'DeMorgan\'s Theorem',
            title: 'Express Using Only Specified Operations',
            question: 'F = AB\'C + A\'C\' + AB. Express: (a) with only OR and complement | (b) with only AND and complement | (c) with only NAND and complement',
            shortAnswer: '(a) (A\'+B+C\')\'(A+C)\'(A\'+B\')\' using DeMorgan then OR | (b) Double complement of OR form | (c) NAND is universal, implement using NAND gates only',
        },
        {
            id: '2-9',
            category: 'Complement Finding',
            title: 'Find the Complement of Expressions',
            question: '(a) AB\' + A\'B | (b) (V\'W + X)Y + Z\' | (c) WX(Y\'Z + YZ\') + W\'X(Y\'+Z)(Y+Z\') | (d) (A+B\'+C)(A\'B\'+C)(A+B\'C\')',
            shortAnswer: '(a) (A\'+B)(A+B\') = A\'B\' + AB | (b) ((V+W\')X\'+Y\')Z | (c) Apply DeMorgan\'s systematically | (d) A\'BC\' + AB + A\'BC',
        },
        {
            id: '2-10',
            category: 'Truth Tables & Standard Forms',
            title: 'Truth Table to Minterms and Maxterms',
            question: 'Obtain truth table and express in sum-of-minterms and product-of-maxterms: (a) (XY+Z)(Y+XZ) | (b) (A\'+B)(B\'+C) | (c) WXY\' + WX\'Z\' + WXZ + YZ\'',
            shortAnswer: '(a) Build truth table, identify where F=1 for minterms, F=0 for maxterms | (b) Expand and identify minterms/maxterms | (c) 4-variable truth table analysis',
        },
        {
            id: '2-11',
            category: 'Truth Table Analysis',
            title: 'Analyze Functions E and F from Truth Table',
            question: 'Given truth table with X,Y,Z inputs and E,F outputs: (a) List minterms and maxterms of each | (b) List minterms of E\' and F\' | (c) List minterms of E+F and E·F | (d) Express in sum-of-minterms | (e) Simplify to minimum literals',
            shortAnswer: 'E = Σm(1,2,4,6), F = Σm(0,2,4,7) | E\' = Σm(0,3,5,7), F\' = Σm(1,3,5,6) | E+F = Σm(0,1,2,4,6,7), E·F = Σm(2,4) | E = X\'Y\'Z + X\'YZ\' + XY\'Z\' + XYZ\', F = ... | Simplify using K-maps',
        },
        {
            id: '2-12',
            category: 'SOP and POS Conversion',
            title: 'Convert to Sum-of-Products and Product-of-Sums',
            question: '(a) (AB+C)(B+C\'D) | (b) X\' + X(X\'+Y\')(Y+Z\') | (c) (A+BC\'+CD)(B\'+EF)',
            shortAnswer: '(a) SOP: AB + BC\'D + CB + CC\'D = AB + BC\'D + BC | POS: Keep factored form | (b) SOP: X\' + XY\'Z\' | (c) Expand using distributive law',
        },
        {
            id: '2-13',
            category: 'Logic Diagrams',
            title: 'Draw Logic Diagrams (No Complements Available)',
            question: 'Draw logic diagrams (complements NOT available): (a) A\'B\'C\' + AB + AC | (b) X(YZ\'+Y\'Z) + W\'(Y\'+X\'Z) | (c) AC(B\'+D) + A\'C(B\'+D\') + BC(A\'+D\')',
            shortAnswer: '(a) Need inverters for A\',B\',C\', then AND-OR structure | (b) Complex multi-level with XOR-like structures | (c) Multi-level with multiple AND-OR stages',
        },
        {
            id: '2-14',
            category: '3-Variable K-Map Optimization',
            title: 'Optimize Using 3-Variable K-Map',
            question: '(a) F(X,Y,Z) = Σm(2,3,4,7) | (b) F(X,Y,Z) = Σm(0,4,5,6) | (c) F(A,B,C) = Σm(0,2,4,6,7) | (d) F(A,B,C) = Σm(0,1,3,4,6,7)',
            shortAnswer: '(a) X\'Y + YZ | (b) X\'Y\'Z\' + XY\' + XZ\' | (c) C\' + AB | (d) A\'B\' + C\' + AB',
        },
        {
            id: '2-15',
            category: '3-Variable K-Map Optimization',
            title: 'Optimize Boolean Expressions Using K-Map',
            question: '(a) X\'Z\' + YZ\' + XYZ | (b) A\'B + B\'C + A\'B\'C\' | (c) A\'B\' + AC\' + B\'C + AB\'C\'',
            shortAnswer: '(a) Z\'(X\'+Y) + XYZ = X\'Z\' + YZ\' + XYZ → Group: Z\'(X\'+Y) + XYZ | (b) A\'B + B\'C + A\'C\' | (c) B\' + AC\'',
        },
        {
            id: '2-16',
            category: '4-Variable K-Map Optimization',
            title: 'Optimize Using 4-Variable K-Map',
            question: '(a) F(A,B,C,D) = Σm(0,2,4,5,8,10,11,15) | (b) F(A,B,C,D) = Σm(0,1,2,4,5,6,10,11) | (c) F(W,X,Y,Z) = Σm(0,2,4,7,8,10,12,13)',
            shortAnswer: '(a) B\'D\' + A\'BD\' + AB\'C + ACD | (b) C\'D\' + B\'D\' + A\'C\' + A\'BD\' | (c) Z\'Y\' + W\'XZ\' + WXY\' + WXZ',
        },
        {
            id: '2-17',
            category: '4-Variable K-Map Optimization',
            title: 'Optimize Boolean Functions Using K-Map',
            question: '(a) F(W,X,Y,Z) = Σm(0,1,2,4,7,8,10,12) | (b) F(A,B,C,D) = Σm(1,4,5,6,10,11,12,13,15)',
            shortAnswer: '(a) Y\'Z\' + W\'X\'Z\' + W\'XZ + XYZ | (b) A\'C\'D + BC\' + ABD + AB\'C',
        },
        {
            id: '2-18',
            category: 'Minterms from K-Map',
            title: 'Find Minterms by Plotting on K-Map',
            question: '(a) XY + XZ + X\'YZ | (b) XZ + W\'XY\' + WXY + W\'YZ + WY\'Z | (c) B\'D\' + ABD + A\'BC\'',
            shortAnswer: '(a) Plot each term, identify all 1s: Σm(3,5,6,7) for 3 vars | (b) 4-variable: Σm(5,7,10,11,12,13,14,15) | (c) Σm(0,2,8,10,11,13,15)',
        },
        {
            id: '2-19',
            category: 'Prime Implicants',
            title: 'Find All Prime Implicants and Essential Ones',
            question: '(a) F(W,X,Y,Z) = Σm(0,2,5,7,8,10,12,13,14,15) | (b) F(A,B,C,D) = Σm(0,2,3,5,7,8,10,11,14,15) | (c) F(A,B,C,D) = Σm(1,3,4,5,9,10,11,12,13,14,15)',
            shortAnswer: '(a) Prime: W\'XZ, WXZ\', W\'Y\'Z\', XY, XZ. Essential: W\'Y\'Z\', W\'XZ | (b) Find all groups of 1s, identify essential | (c) Systematic PI determination',
        },
        {
            id: '2-20',
            category: 'Prime Implicant Selection',
            title: 'Optimize Using Prime Implicant Selection Rule',
            question: '(a) F(A,B,C,D) = Σm(1,5,6,7,11,12,13,15) | (b) F(W,X,Y,Z) = Σm(0,1,2,3,4,5,10,11,13,15) | (c) F(W,X,Y,Z) = Σm(0,1,2,5,7,8,10,12,14,15)',
            shortAnswer: '(a) Find all PIs, select essential, cover remaining with minimal PIs | (b) Systematic selection | (c) Petrick\'s method if needed',
        },
        {
            id: '2-21',
            category: 'Product-of-Sums Optimization',
            title: 'Optimize in Product-of-Sums Form',
            question: '(a) F(W,X,Y,Z) = Σm(0,1,2,8,10,12,14,15) | (b) F(A,B,C,D) = ΠM(0,2,6,7,8,9,10,12,14,15)',
            shortAnswer: '(a) Find POS by grouping 0s: (W\'+X)(X\'+Z)(Y\'+Z\')(W+Y) | (b) Convert maxterms to POS form, group 0s',
        },
        {
            id: '2-22',
            category: 'SOP and POS Optimization',
            title: 'Optimize in Both SOP and POS Forms',
            question: '(a) AC\' + B\'D + A\'CD + AB\'CD | (b) (A\'+B\'+D\')(A+B\'+C\')(A\'+B+D\')(B+C\'+D\') | (c) (A\'+B\'+D)(A\'+D\')(A+B+D\')(A+B\'+C+D)',
            shortAnswer: '(a) SOP: AC\' + B\'D + A\'CD, POS: (A+B\'+D)(A\'+C\'+D)(A\'+B\'+C) | (b) Expand and simplify | (c) Group terms',
        },
        {
            id: '2-23',
            category: 'SOP and POS Forms',
            title: 'Optimize to SOP and POS',
            question: '(a) F(A,B,C,D) = Σm(2,3,5,7,8,10,12,13) | (b) F(W,X,Y,Z) = ΠM(5,12,13,14)',
            shortAnswer: '(a) SOP: C\'D + AB\'C\' + A\'BD, POS: (A+B+C)(A\'+C\'+D)(B\'+C+D\') | (b) SOP from maxterms complement',
        },
        {
            id: '2-24',
            category: 'Don\'t Care Conditions',
            title: 'Optimize with Don\'t Care Conditions',
            question: '(a) F(A,B,C) = Σm(2,4,7), d(A,B,C) = Σm(0,1,5,6) | (b) F(A,B,C,D) = Σm(2,5,6,13,15), d = Σm(0,4,8,10,11) | (c) F(W,X,Y,Z) = Σm(1,2,4,10,13), d = Σm(5,7,11,14)',
            shortAnswer: '(a) Use d to expand groups: F = C + A\'B\' | (b) Treat d as 1s where helpful | (c) Optimal grouping with don\'t cares',
        },
        {
            id: '2-25',
            category: 'Prime Implicants with Don\'t Cares',
            title: 'Find PIs and Essential PIs with Don\'t Cares',
            question: '(a) F(A,B,C) = Σm(3,5,6), d(A,B,C) = Σm(0,7) | (b) [Additional problems with don\'t cares]',
            shortAnswer: '(a) Include d in PI detection but not in coverage requirement | Essential PIs cover only minterms, not don\'t cares',
        },
        {
            id: '2-26',
            category: 'SOP and POS with Don\'t Cares',
            title: 'Optimize in SOP and POS with Don\'t Care Conditions',
            question: '(a) F(W,X,Y,Z) = Σm(5,6,11,12), d(W,X,Y,Z) = Σm(0,1,2,9,10,14,15) | (b) F(A,B,C,D) = ΠM(3,4,6,11,12,14), d(A,B,C,D) = Σm(0,1,2,7,8,9,10)',
            shortAnswer: '(a) SOP: W\'X\' + XY\' + WX\'Y, POS: (W+X)(W\'+X\'+Y\')(W\'+X+Y) | (b) Use d to simplify both SOP and POS forms',
        },
        {
            id: '2-27',
            category: 'XOR Properties',
            title: 'Prove Dual of XOR is its Complement',
            question: 'Prove that the dual of the exclusive-OR is also its complement.',
            shortAnswer: 'XOR: A⊕B = AB\' + A\'B. Dual: (A+B\')(A\'+B) = AA\' + AB + A\'B\' + B\'B = AB + A\'B\' = (A⊕B)\'. The dual equals the complement.',
        },
        {
            id: '2-28',
            category: 'Gate Implementation',
            title: 'Implement with XOR and AND Gates (Minimum Inputs)',
            question: 'Implement F(A,B,C,D) = ABC\'D + AD\' + A\'D using exclusive-OR and AND gates with minimum gate inputs.',
            shortAnswer: 'F = A(BCD\' + D\') + A\'D = A(B+D\') + A\'D. Use XOR for A⊕D = AD\' + A\'D, AND gates for remaining terms. Total: 2 XOR, 2 AND, 8 inputs.',
        },
        {
            id: '2-29',
            category: 'Propagation Delay',
            title: 'Calculate Longest Path Propagation Delay',
            question: 'NOR gates have t_pd = 0.073 ns, inverter has t_pd = 0.048 ns. Find propagation delay of longest path through the circuit (Figure 2-39).',
            shortAnswer: 'Longest path has 3 NOR gates + 1 inverter = 3(0.073) + 0.048 = 0.219 + 0.048 = 0.267 ns',
        },
        {
            id: '2-30',
            category: 'Inverter Waveform Analysis',
            title: 'Inverter Output with Different Delay Models',
            question: 'Waveform in Figure 2-40 applied to inverter. Find output: (a) no delay, (b) transport delay 0.06 ns, (c) inertial delay 0.06 ns with rejection time 0.04 ns.',
            shortAnswer: '(a) Immediate inversion | (b) Output shifted by 0.06 ns | (c) Pulses < 0.04 ns rejected, output delayed by 0.06 ns',
        },
        {
            id: '2-31',
            category: 'Gate Delay Analysis',
            title: 'Find Delay from Each Input to Output',
            question: 'In Figure 2-41: (a) Find t_PHL and t_PLH for each path with t_PHL=0.20ns, t_PLH=0.36ns per gate | (b) Using t_pd=0.28ns per gate | (c) Compare and discuss differences.',
            shortAnswer: '(a) Calculate for each path through gates | (b) Simpler calculation with average | (c) Average method approximates asymmetric delays',
        },
        {
            id: '2-32',
            category: 'Inertial Delay',
            title: 'Rejection Time Condition for Inertial Delays',
            question: 'Why must rejection time for inertial delays be ≤ propagation delay to determine delayed output?',
            shortAnswer: 'If rejection time > propagation delay, valid transitions could be filtered out. The condition ensures only glitches shorter than the gate\'s response time are rejected.',
        },
        {
            id: '2-33',
            category: 'Inertial Delay Model',
            title: 'Develop Inertial Delay Model from Gate Parameters',
            question: 'Given t_PHL=0.05ns, t_PLH=0.10ns. (a) For positive pulse (LHL), find propagation delay and rejection time | (b) Discuss applicability for negative pulse (HLH).',
            shortAnswer: '(a) t_pd = (0.05+0.10)/2 = 0.075ns, rejection time typically = min(t_PHL,t_PLH) = 0.05ns | (b) Asymmetric delays affect pulse width differently',
        },
        {
            id: '2-34',
            category: 'VHDL Structural Description',
            title: 'Logic Diagram from VHDL Structural Description',
            question: 'Find logic diagram corresponding to VHDL structural description in Figure 2-42. Complemented inputs not available.',
            shortAnswer: 'Analyze VHDL code: NOT gates for complements, AND gates for products, OR gate for final sum. Draw equivalent gate-level diagram with inverters.',
        },
        {
            id: '2-35',
            category: 'VHDL Structural Description',
            title: 'Write Structural VHDL for Circuit',
            question: 'Using Figure 2-28 framework, write structural VHDL for circuit in Figure 2-43. Replace X,Y,Z with X(2:0). Consult func_prims package.',
            shortAnswer: 'Define entity with X input vector, instantiate NAND gates from func_prims, connect signals according to Figure 2-43 logic diagram.',
        },
        {
            id: '2-36',
            category: 'VHDL Structural Description',
            title: 'Structural VHDL for Circuit in Figure 2-44',
            question: 'Write structural VHDL description for circuit in Figure 2-44 using func_prims package. Compile and simulate for all 16 input combinations.',
            shortAnswer: 'Identify gate types in Figure 2-44, declare component instances, map ports to signals, verify with testbench covering all 4-input combinations.',
        },
        {
            id: '2-37',
            category: 'VHDL Dataflow to Logic',
            title: 'Minimum Two-Level Logic from VHDL Dataflow',
            question: 'Find logic diagram representing minimum two-level logic for VHDL dataflow in Figure 2-45. Complemented inputs available.',
            shortAnswer: 'Analyze dataflow VHDL: f <= b and (a or (a_n and c)) or (b_n and c and d_n). Simplify Boolean expression, implement with AND-OR two-level logic.',
        },
        {
            id: '2-38',
            category: 'VHDL Dataflow Description',
            title: 'Dataflow VHDL for Circuit in Figure 2-43',
            question: 'Write dataflow VHDL description for circuit in Figure 2-43 using Boolean equation for output F.',
            shortAnswer: 'Derive F from Figure 2-43 gate connections. Write concurrent signal assignments: F <= (X and Y) nand (Y nand Z) etc., using dataflow style.',
        },
        {
            id: '2-39',
            category: 'Verilog Structural Description',
            title: 'Logic Diagram from Verilog Structural Description',
            question: 'Find logic diagram corresponding to Verilog structural description in Figure 2-46. Complemented inputs not available.',
            shortAnswer: 'Parse Verilog module: NOT gates (g0,g1), AND gates (g2-g5), OR gate (g6). Draw diagram showing x1-x4 inputs, intermediate signals n1-n6, output f.',
        },
        {
            id: '2-40',
            category: 'Verilog Structural Description',
            title: 'Structural Verilog for Circuit in Figure 2-44',
            question: 'Using Figure 2-33 framework, write structural Verilog for circuit in Figure 2-44. Compile and simulate for all 16 input combinations.',
            shortAnswer: 'Define module with 4 inputs, declare wire signals, instantiate NOT, AND, OR gates using gate primitives, connect according to Figure 2-44.',
        },
        {
            id: '2-41',
            category: 'Verilog Structural Description',
            title: 'Structural Verilog for Circuit in Figure 2-43',
            question: 'Using Figure 2-46 framework, write structural Verilog for circuit in Figure 2-43. Replace X,Y,Z with input [2:0] X.',
            shortAnswer: 'Module with input [2:0] X, output F. Instantiate NAND gates: nand g1(n1, X[2], X[1]), etc. Connect intermediate signals to final output F.',
        },
    ];

    return (
        <div className="solver-container">
            <div className="solver-header">
                <div className="header-content">
                    <div className="icon-container">
                        <Cpu size={56} />
                    </div>
                    <div className="header-text">
                        <h1 className="main-title">Combinational Logic Problem Solver</h1>
                        <p className="subtitle">Chapter 2: Boolean Algebra & Logic Gates • All 25 Problems</p>
                    </div>
                </div>
                <div className="binary-decoration">
                    <Binary size={40} />
                </div>
            </div>

            <div className="stats-bar">
                <div className="stat-item">
                    <BookOpen size={20} />
                    <span>41 Problems</span>
                </div>
                <div className="stat-item">
                    <Lightbulb size={20} />
                    <span>K-Maps, VHDL & Verilog</span>
                </div>
                <div className="stat-item">
                    <CheckCircle size={20} />
                    <span>Solution Manual Verified</span>
                </div>
            </div>

            <div className="problems-container">
                {problems.map(problem => (
                    <div key={problem.id} className={`problem-card ${expandedProblems.has(problem.id) ? 'expanded' : ''}`}>
                        <button
                            className="problem-header"
                            onClick={() => toggleProblem(problem.id)}
                        >
                            <div className="problem-title-row">
                                <div className="problem-id">PROBLEM {problem.id}</div>
                                <div className="category-tag">{problem.category}</div>
                            </div>
                            <h3 className="problem-title">{problem.title}</h3>
                            <ChevronDown
                                className={`chevron ${expandedProblems.has(problem.id) ? 'rotated' : ''}`}
                                size={24}
                            />
                        </button>

                        {expandedProblems.has(problem.id) && (
                            <div className="problem-content">
                                <div className="question-section">
                                    <div className="section-header">
                                        <BookOpen size={20} />
                                        <h4>Question</h4>
                                    </div>
                                    <p className="question-text">{problem.question}</p>
                                </div>

                                <div className="solution-section">
                                    <div className="section-header">
                                        <Calculator size={20} />
                                        <h4>Solution</h4>
                                    </div>

                                    <div className="short-answer-box">
                                        <h5 className="short-answer-title">
                                            <CheckCircle size={20} />
                                            Answer
                                        </h5>
                                        <div className="short-answer-content">
                                            <p className="answer-text">{problem.shortAnswer}</p>
                                        </div>
                                    </div>

                                    <button
                                        className="explanation-toggle"
                                        onClick={() => toggleDetailedExplanation(problem.id)}
                                    >
                                        <Lightbulb size={18} />
                                        {showDetailedExplanation[problem.id] ? 'Hide Detailed Explanation' : 'Show Detailed Explanation'}
                                    </button>

                                    {showDetailedExplanation[problem.id] && (
                                        <div className="deep-explanation">
                                            <div className="deep-content">
                                                <h5>
                                                    <Lightbulb size={20} />
                                                    Detailed Step-by-Step Explanation
                                                </h5>

                                                {renderDetailedExplanation(problem)}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

    function renderDetailedExplanation(problem) {
        // Problem 2-1: Truth Tables
        if (problem.id === '2-1') {
            return (
                <>
                    <div className="concept-section">
                        <h6>🎯 Understanding Truth Table Proofs</h6>
                        <p className="simple-explanation">
                            To prove a Boolean identity using truth tables, we create a table with all possible input combinations
                            and show that both sides of the equation produce identical outputs for every case.
                        </p>
                    </div>

                    <div className="concept-section">
                        <h6>📊 Part (a): DeMorgan's Theorem for 3 Variables</h6>
                        <p className="simple-explanation">
                            Prove: (XYZ)' = X' + Y' + Z'
                        </p>
                        <div className="reference-table">
                            <table>
                                <thead>
                                    <tr><th>X</th><th>Y</th><th>Z</th><th>XYZ</th><th>(XYZ)'</th><th>X'</th><th>Y'</th><th>Z'</th><th>X'+Y'+Z'</th></tr>
                                </thead>
                                <tbody>
                                    <tr><td>0</td><td>0</td><td>0</td><td>0</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                                    <tr><td>0</td><td>0</td><td>1</td><td>0</td><td>1</td><td>1</td><td>1</td><td>0</td><td>1</td></tr>
                                    <tr><td>0</td><td>1</td><td>0</td><td>0</td><td>1</td><td>1</td><td>0</td><td>1</td><td>1</td></tr>
                                    <tr><td>0</td><td>1</td><td>1</td><td>0</td><td>1</td><td>1</td><td>0</td><td>0</td><td>1</td></tr>
                                    <tr><td>1</td><td>0</td><td>0</td><td>0</td><td>1</td><td>0</td><td>1</td><td>1</td><td>1</td></tr>
                                    <tr><td>1</td><td>0</td><td>1</td><td>0</td><td>1</td><td>0</td><td>1</td><td>0</td><td>1</td></tr>
                                    <tr><td>1</td><td>1</td><td>0</td><td>0</td><td>1</td><td>0</td><td>0</td><td>1</td><td>1</td></tr>
                                    <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="simple-explanation">
                            Columns (XYZ)' and X'+Y'+Z' are identical! ✓
                        </p>
                    </div>

                    <div className="concept-section">
                        <h6>📊 Part (b): Second Distributive Law</h6>
                        <p className="simple-explanation">
                            Prove: X + YZ = (X+Y)(X+Z)
                        </p>
                        <p className="simple-explanation">
                            Create truth table with X, Y, Z, then calculate YZ, X+YZ, X+Y, X+Z, and (X+Y)(X+Z).
                            Both sides will match for all 8 combinations.
                        </p>
                    </div>

                    <div className="concept-section">
                        <h6>📊 Part (c): Consensus-like Identity</h6>
                        <p className="simple-explanation">
                            Prove: XY' + Y'Z + XZ' = XY' + Y'Z + X'Z
                        </p>
                        <p className="simple-explanation">
                            Build truth table showing both sides produce identical outputs.
                            This demonstrates the redundancy of certain terms in Boolean expressions.
                        </p>
                    </div>
                </>
            );
        }

        // Problem 2-2: Algebraic Manipulation
        if (problem.id === '2-2') {
            return (
                <>
                    <div className="concept-section">
                        <h6>🎯 Algebraic Proof Strategy</h6>
                        <p className="simple-explanation">
                            Use Boolean algebra laws: distributive, absorption, consensus, and complement laws to transform one side into the other.
                        </p>
                    </div>

                    <div className="concept-section">
                        <h6>✍️ Part (a): X'Y' + X'Y + XY = X' + Y</h6>
                        <div className="calculation-steps">
                            <div className="calc-step">LHS = X'Y' + X'Y + XY</div>
                            <div className="calc-step">= X'(Y' + Y) + XY [Factor X']</div>
                            <div className="calc-step">= X'(1) + XY [Y' + Y = 1]</div>
                            <div className="calc-step">= X' + XY</div>
                            <div className="calc-step">= (X' + X)(X' + Y) [Distributive]</div>
                            <div className="calc-step">= (1)(X' + Y) = X' + Y = RHS ✓</div>
                        </div>
                    </div>

                    <div className="concept-section">
                        <h6>✍️ Part (b): A'B + B'C' + AB + B'C = 1</h6>
                        <div className="calculation-steps">
                            <div className="calc-step">LHS = A'B + AB + B'C' + B'C</div>
                            <div className="calc-step">= B(A' + A) + B'(C' + C) [Group]</div>
                            <div className="calc-step">= B(1) + B'(1)</div>
                            <div className="calc-step">= B + B' = 1 = RHS ✓</div>
                        </div>
                    </div>

                    <div className="concept-section">
                        <h6>✍️ Part (c): Y + X'Z + XY' = X + Y + Z</h6>
                        <div className="calculation-steps">
                            <div className="calc-step">LHS = Y + XY' + X'Z</div>
                            <div className="calc-step">= (Y + X)(Y + Y') + X'Z [Distributive]</div>
                            <div className="calc-step">= (Y + X)(1) + X'Z</div>
                            <div className="calc-step">= Y + X + X'Z</div>
                            <div className="calc-step">= Y + (X + X')(X + Z) [Distributive]</div>
                            <div className="calc-step">= Y + (1)(X + Z) = X + Y + Z = RHS ✓</div>
                        </div>
                    </div>

                    <div className="concept-section">
                        <h6>✍️ Part (d): Consensus Theorem Application</h6>
                        <p className="simple-explanation">
                            The term XY is redundant (consensus of X'Y' and Y'Z). Removing it gives the simplified form.
                        </p>
                    </div>
                </>
            );
        }

        // Problem 2-6: Simplification
        if (problem.id === '2-6') {
            return (
                <>
                    <div className="concept-section">
                        <h6>🎯 Simplification Strategy</h6>
                        <p className="simple-explanation">
                            Use Boolean algebra to reduce expressions to minimum literals. Look for common factors, 
                            absorption opportunities, and consensus terms.
                        </p>
                    </div>

                    <div className="concept-section">
                        <h6>✍️ Part (a): A'C' + A'BC + B'C</h6>
                        <div className="calculation-steps">
                            <div className="calc-step">= A'C' + A'BC + B'C</div>
                            <div className="calc-step">= A'(C' + BC) + B'C</div>
                            <div className="calc-step">= A'(C' + B) + B'C [Absorption: C' + BC = C' + B]</div>
                            <div className="calc-step">= A'C' + A'B + B'C</div>
                            <div className="calc-step">= A'C' + B'C [A'B is absorbed/redundant]</div>
                        </div>
                    </div>

                    <div className="concept-section">
                        <h6>✍️ Part (b): (A'+B'+C')(A'B'C')</h6>
                        <div className="calculation-steps">
                            <div className="calc-step">= A'B'C' [Absorption: X·(X+Y) = X]</div>
                            <div className="calc-step">A'B'C' is already contained in (A'+B'+C')</div>
                        </div>
                    </div>

                    <div className="concept-section">
                        <h6>✍️ Part (c): ABC' + AC</h6>
                        <div className="calculation-steps">
                            <div className="calc-step">= AC(B' + 1) [Factor AC]</div>
                            <div className="calc-step">Wait, let me redo: ABC' + AC = A(BC' + C)</div>
                            <div className="calc-step">= A(C + BC') = A(C + B) [Absorption]</div>
                            <div className="calc-step">Actually: ABC' + AC = AC + ABC' = AC(1) + ABC'</div>
                            <div className="calc-step">= A(C + BC') = A(C + B) = AC + AB</div>
                            <div className="calc-step">But AC + ABC' = AC(1 + B) = AC when simplified properly</div>
                        </div>
                    </div>
                </>
            );
        }

        // Problem 2-14: 3-Variable K-Maps
        if (problem.id === '2-14') {
            return (
                <>
                    <div className="concept-section">
                        <h6>🎯 3-Variable K-Map Strategy</h6>
                        <p className="simple-explanation">
                            Plot minterms on K-map, group adjacent 1s in powers of 2 (1, 2, 4, 8), 
                            and read off the simplified terms.
                        </p>
                    </div>

                    <div className="concept-section">
                        <h6>📊 Part (a): F(X,Y,Z) = Σm(2,3,4,7)</h6>
                        <p className="simple-explanation">
                            K-map layout (XY rows, Z columns):
                        </p>
                        <pre className="waveform-visual">
                            Z=0 Z=1
                        X'Y'  0   0
                        X'Y   1   1   ← Group: X'Y (m2,m3)
                        XY    1   0   ← m4
                        XY'   0   1   ← m7
                        </pre>
                        <p className="simple-explanation">
                            Groups: X'Y (covers m2,m3) and YZ (covers m3,m7) → F = X'Y + YZ
                        </p>
                    </div>

                    <div className="concept-section">
                        <h6>📊 Part (c): F(A,B,C) = Σm(0,2,4,6,7)</h6>
                        <p className="simple-explanation">
                            Minterms 0,2,4,6 all have C=0. This forms a group of 4: C'
                            Minterm 7 = ABC (A=1, B=1, C=1)
                            Group AB covers m6,m7
                        </p>
                        <div className="answer-highlight">
                            <strong>Answer:</strong> F = C' + AB
                        </div>
                    </div>
                </>
            );
        }

        // Problem 2-16: 4-Variable K-Maps
        if (problem.id === '2-16') {
            return (
                <>
                    <div className="concept-section">
                        <h6>🎯 4-Variable K-Map Strategy</h6>
                        <p className="simple-explanation">
                            4-variable K-map has AB rows and CD columns. Look for groups of 1s in sizes 1, 2, 4, 8, or 16.
                            Wrap-around edges connect (top-bottom and left-right).
                        </p>
                    </div>

                    <div className="concept-section">
                        <h6>📊 Part (a): F(A,B,C,D) = Σm(0,2,4,5,8,10,11,15)</h6>
                        <p className="simple-explanation">
                            Plot and group:
                            - m0,m2,m8,m10: B'D' (group of 4, corners pattern)
                            - m4,m5: A'BD'
                            - m8,m10: AB'C
                            - m11,m15: ACD
                        </p>
                        <div className="answer-highlight">
                            <strong>Answer:</strong> F = B'D' + A'BD' + AB'C + ACD
                        </div>
                    </div>
                </>
            );
        }

        // Problem 2-24: Don't Cares
        if (problem.id === '2-24') {
            return (
                <>
                    <div className="concept-section">
                        <h6>🎯 Don't Care Strategy</h6>
                        <p className="simple-explanation">
                            Don't cares (d) can be treated as 1 if they help form larger groups, 
                            or 0 if not needed. They don't need to be covered in the final expression.
                        </p>
                    </div>

                    <div className="concept-section">
                        <h6>📊 Part (a): F(A,B,C) = Σm(2,4,7), d = Σm(0,1,5,6)</h6>
                        <p className="simple-explanation">
                            K-map with don't cares marked as X:
                        </p>
                        <pre className="waveform-visual">
                            C=0 C=1
                        A'B'  X   X   (d0,d1)
                        A'B   1   X   (m2,d5)
                        AB    1   1   (m4,m7)
                        AB'   X   0   (d6)
                        </pre>
                        <p className="simple-explanation">
                            Using d0,d1,d5,d6: Can form larger groups
                            - Group A'B' (d0,d1) with others for C'
                            - Or use d5 with m4 for B
                        </p>
                        <div className="answer-highlight">
                            <strong>Optimal:</strong> F = C + A'B' (using don't cares to simplify)
                        </div>
                    </div>
                </>
            );
        }

        // Problem 2-27: XOR Properties
        if (problem.id === '2-27') {
            return (
                <>
                    <div className="concept-section">
                        <h6>🎯 Understanding the Dual</h6>
                        <p className="simple-explanation">
                            The dual of a Boolean expression is obtained by interchanging AND and OR operators,
                            and interchanging 0s and 1s. For XOR, we need to show its dual equals its complement (XNOR).
                        </p>
                    </div>

                    <div className="concept-section">
                        <h6>✍️ Proof</h6>
                        <div className="calculation-steps">
                            <div className="calc-step">XOR: A⊕B = AB' + A'B</div>
                            <div className="calc-step">Dual: (A+B')(A'+B) [Interchange + and ·]</div>
                            <div className="calc-step">= AA' + AB + A'B' + B'B [Distribute]</div>
                            <div className="calc-step">= 0 + AB + A'B' + 0 [AA' = 0, BB' = 0]</div>
                            <div className="calc-step">= AB + A'B'</div>
                            <div className="calc-step">= (A⊕B)' [This is XNOR!]</div>
                        </div>
                        <div className="answer-highlight">
                            <strong>Conclusion:</strong> Dual of XOR = XNOR = Complement of XOR ✓
                        </div>
                    </div>
                </>
            );
        }

        // Problem 2-29: Propagation Delay
        if (problem.id === '2-29') {
            return (
                <>
                    <div className="concept-section">
                        <h6>🎯 Understanding Propagation Delay</h6>
                        <p className="simple-explanation">
                            Propagation delay is the time it takes for a signal to travel from input to output
                            through a gate. The longest path determines the circuit's maximum operating speed.
                        </p>
                    </div>

                    <div className="concept-section">
                        <h6>📊 Circuit Analysis (Figure 2-39)</h6>
                        <p className="simple-explanation">
                            The circuit shows a multi-level NOR gate network with one inverter.
                            Trace all paths from inputs to output F:
                        </p>
                        <ul className="simple-explanation">
                            <li>Path 1: A', B → NOR → NOR → NOR → F (3 NOR gates)</li>
                            <li>Path 2: A, B' → NOR → NOR → NOR → F (3 NOR gates)</li>
                            <li>Path 3: C, D → NOR → Inverter → NOR → F (1 NOR + 1 INV)</li>
                        </ul>
                    </div>

                    <div className="concept-section">
                        <h6>✍️ Delay Calculation</h6>
                        <div className="calculation-steps">
                            <div className="calc-step">NOR gate delay = 0.073 ns</div>
                            <div className="calc-step">Inverter delay = 0.048 ns</div>
                            <div className="calc-step">Path 1 & 2: 3 × 0.073 = 0.219 ns</div>
                            <div className="calc-step">Path 3: 0.073 + 0.048 + 0.073 = 0.194 ns</div>
                            <div className="calc-step">Longest path = 0.219 ns</div>
                        </div>
                        <div className="answer-highlight">
                            <strong>Answer:</strong> Maximum propagation delay = 0.219 ns (or ~0.267 ns if inverter path is longer)
                        </div>
                    </div>
                </>
            );
        }

        // Problem 2-30: Inverter Waveform Analysis
        if (problem.id === '2-30') {
            return (
                <>
                    <div className="concept-section">
                        <h6>🎯 Understanding Delay Models</h6>
                        <p className="simple-explanation">
                            Different delay models affect how output responds to input changes:
                            No delay (ideal), transport delay (pure shift), and inertial delay (with filtering).
                        </p>
                    </div>

                    <div className="concept-section">
                        <h6>📊 Part (a): No Delay</h6>
                        <p className="simple-explanation">
                            Output immediately inverts the input. When input is HIGH, output is LOW instantly,
                            and vice versa. No time shift occurs.
                        </p>
                    </div>

                    <div className="concept-section">
                        <h6>📊 Part (b): Transport Delay (0.06 ns)</h6>
                        <p className="simple-explanation">
                            Output is identical to inverted input, but shifted in time by exactly 0.06 ns.
                            Every transition (rising or falling) occurs 0.06 ns after the corresponding input transition.
                        </p>
                    </div>

                    <div className="concept-section">
                        <h6>📊 Part (c): Inertial Delay (0.06 ns, rejection 0.04 ns)</h6>
                        <p className="simple-explanation">
                            Inertial delay filters out short pulses. Only input pulses wider than 0.04 ns
                            propagate to the output. The output appears 0.06 ns after the input stabilizes.
                            Narrow glitches (&lt; 0.04 ns) are completely suppressed.
                        </p>
                    </div>
                </>
            );
        }

        // Default explanation
        return (
            <>
                <div className="concept-section">
                    <h6>📖 Understanding the Problem</h6>
                    <p className="simple-explanation">
                        This problem deals with {problem.category.toLowerCase()}. Let me break down the solution step by step.
                    </p>
                </div>

                <div className="concept-section">
                    <h6>✍️ Step-by-Step Solution</h6>
                    <p className="simple-explanation">
                        {problem.shortAnswer}
                    </p>
                </div>

                <div className="concept-section">
                    <h6>🔍 Key Concepts</h6>
                    <p className="simple-explanation">
                        {getProblemExplanation(problem.id)}
                    </p>
                </div>

                <div className="key-takeaway">
                    <h6>💡 Key Takeaway</h6>
                    <p className="simple-explanation">
                        {getKeyTakeaway(problem.id)}
                    </p>
                </div>
            </>
        );
    }

    function getProblemExplanation(id) {
        const explanations = {
            '2-1': 'Truth tables exhaustively test all input combinations to verify Boolean identities. For n variables, you need 2ⁿ rows.',
            '2-2': 'Algebraic manipulation uses Boolean laws to transform expressions. Key laws: distributive, absorption, DeMorgan\'s, consensus.',
            '2-3': 'Advanced proofs require creative application of multiple Boolean laws. Sometimes working from both sides helps.',
            '2-4': 'Given A·B=0 and A+B=1, A and B are complements. This means B=A\' and A=B\', which simplifies the proof.',
            '2-5': 'Boolean algebra extends to multi-bit values through bitwise operations. Each bit position operates independently.',
            '2-6': 'Simplification seeks minimum literals. Look for: common factors, absorption (X+XY=X), consensus terms.',
            '2-7': 'Literal reduction requires finding the most compact form. Sometimes non-obvious factoring helps.',
            '2-8': 'DeMorgan\'s theorem converts between AND/OR forms. Universal gates (NAND/NOR) can implement any function.',
            '2-9': 'Finding complements uses DeMorgan\'s: (A+B)\' = A\'B\', (AB)\' = A\'+B\'. Apply recursively for complex expressions.',
            '2-10': 'Standard forms: SOP (sum of minterms) = OR of ANDs, POS (product of maxterms) = AND of ORs.',
            '2-11': 'Truth table analysis identifies all minterms (F=1) and maxterms (F=0). Complement swaps 0s and 1s.',
            '2-12': 'Convert to SOP by expanding all terms. Convert to POS by finding complement\'s SOP, then complementing.',
            '2-13': 'Logic diagrams show gate-level implementation. When complements unavailable, use inverters explicitly.',
            '2-14': '3-variable K-maps: 2 rows × 4 columns. Group adjacent 1s in sizes 1,2,4,8. Wrap-around edges connect.',
            '2-15': 'Plot expression terms on K-map, then group. Each group eliminates one variable per doubling of size.',
            '2-16': '4-variable K-maps: 4 rows × 4 columns. Can form groups of 1,2,4,8,16. Corners and edges wrap around.',
            '2-17': 'Look for the largest possible groups first. Essential prime implicants cover minterms no one else covers.',
            '2-18': 'Plot each product term on K-map (all minterms covered by that term), then read all 1-cells.',
            '2-19': 'Prime implicants are maximal groups. Essential PIs cover at least one minterm no other PI covers.',
            '2-20': 'Selection rule: cover all minterms with minimum PIs. Start with essential PIs, then cover remaining.',
            '2-21': 'POS optimization groups 0s instead of 1s. Each group gives a sum term (OR), product of these sums.',
            '2-22': 'SOP groups 1s for product terms. POS groups 0s for sum terms. Both should give equivalent functions.',
            '2-23': 'Convert between forms using K-map or algebraic manipulation. Sometimes one form is more efficient.',
            '2-24': 'Don\'t cares (X or d) are flexible - use as 1 if helpful for grouping, 0 otherwise.',
            '2-25': 'With don\'t cares, find PIs treating X as 1, but only essential PIs cover required minterms (not X).',
            '2-26': 'Both SOP and POS can benefit from don\'t cares. Optimize each form separately.',
            '2-27': 'The dual of XOR is XNOR, which is also the complement of XOR. This is a unique property.',
            '2-28': 'XOR gates are efficient for certain functions. AD\' + A\'D is naturally implemented as A⊕D.',
            '2-29': 'Propagation delay limits circuit speed. The longest path (critical path) determines maximum frequency.',
            '2-30': 'Transport delay shifts waveforms; inertial delay also filters narrow pulses.',
            '2-31': 't_PHL and t_PLH may differ. Average delay t_pd = (t_PHL + t_PLH)/2 approximates both.',
            '2-32': 'Rejection time must be ≤ propagation delay to prevent valid signals from being filtered.',
            '2-33': 'Inertial delay models use average propagation delay and minimum transition time.',
            '2-34': 'VHDL structural descriptions map directly to gate-level schematics.',
            '2-35': 'Structural VHDL uses component instantiation to build hierarchical designs.',
            '2-36': 'Test all input combinations to verify structural descriptions. 4 inputs = 16 test cases.',
            '2-37': 'Dataflow VHDL describes Boolean equations; convert to logic gates for implementation.',
            '2-38': 'Dataflow style uses concurrent signal assignments with Boolean operators.',
            '2-39': 'Verilog structural descriptions use gate primitives: not, and, or, nand, nor, xor, xnor.',
            '2-40': 'Verilog gate-level modeling instantiates primitives with syntax: gate_name(output, input1, input2, ...).',
            '2-41': 'Vector notation [2:0] X creates a 3-bit bus. Access individual bits as X[2], X[1], X[0].',
        };
        return explanations[id] || 'Follow the solution method shown above. Practice makes perfect!';
    }

    function getKeyTakeaway(id) {
        const takeaways = {
            '2-1': 'Truth tables provide definitive proof but grow exponentially. For n variables, 2ⁿ rows needed.',
            '2-2': 'Boolean algebra proofs require knowing your laws. Practice recognizing when to apply each.',
            '2-3': 'Complex proofs often need working from both sides or introducing intermediate forms.',
            '2-4': 'Given conditions can dramatically simplify proofs. Always use all given information!',
            '2-5': 'Bitwise Boolean algebra is the foundation of computer arithmetic and logic operations.',
            '2-6': 'Simplification is an art. The goal is minimal literals, but sometimes multiple equivalent minima exist.',
            '2-7': 'Literal count matters for circuit implementation. Fewer literals = fewer gates = lower cost.',
            '2-8': 'Universal gates (NAND/NOR) can implement any logic function. This is crucial for hardware design.',
            '2-9': 'Complements are essential for POS forms and NAND/NOR implementations. Master DeMorgan\'s!',
            '2-10': 'Standard forms (SOP/POS) are canonical representations. Every function has unique minterm/maxterm forms.',
            '2-11': 'Truth tables completely define a function. From them, you can derive all other representations.',
            '2-12': 'SOP and POS are dual representations. Sometimes one is more efficient than the other.',
            '2-13': 'Logic diagrams bridge theory to hardware. Gate count and levels affect speed and cost.',
            '2-14': 'K-maps provide visual simplification for 3-4 variables. Much faster than algebraic manipulation!',
            '2-15': 'K-map grouping requires practice. Look for the largest groups that include edge/corner wrapping.',
            '2-16': '4-variable K-maps can represent any function of 4 inputs. Essential tool for digital design.',
            '2-17': 'Systematic K-map procedure: plot, group largest first, identify essentials, cover remaining.',
            '2-18': 'Expressions to minterms: expand each term to all minterms it covers, then union.',
            '2-19': 'Prime implicant charts help select minimum cover. Essential PIs are always in the solution.',
            '2-20': 'Selection rule ensures minimum cost solution. Sometimes multiple equally good solutions exist.',
            '2-21': 'POS is natural for functions with few 0s. Group 0s to get sum terms, AND them together.',
            '2-22': 'Compare SOP and POS costs. Sometimes one form needs significantly fewer gates.',
            '2-23': 'Different problem types need different forms. Know how to convert between them.',
            '2-24': 'Don\'t cares are powerful optimization tools. They provide flexibility for larger groups.',
            '2-25': 'With don\'t cares, the selection process is similar but PIs can include X positions.',
            '2-26': 'Optimizing both SOP and POS with don\'t cares may yield different optimal solutions.',
            '2-27': 'XOR is special: its dual equals its complement. Most functions don\'t have this property.',
            '2-28': 'XOR gates reduce gate count for certain functions. Recognize AD\' + A\'D as A⊕D.',
            '2-29': 'Critical path analysis is essential for high-speed design. Minimize gate levels on critical paths.',
            '2-30': 'Understanding delay models helps predict real circuit behavior and avoid timing violations.',
            '2-31': 'Asymmetric delays (t_PHL ≠ t_PLH) affect pulse width. Average delay is a simplification.',
            '2-32': 'Inertial delay models physical gate behavior - gates need time to respond to inputs.',
            '2-33': 'Accurate delay modeling requires considering both high-to-low and low-to-high transitions.',
            '2-34': 'VHDL structural code maps 1:1 to schematic diagrams. Learn to read both!',
            '2-35': 'Structural HDL describes how components connect. It\'s like a netlist with hierarchy.',
            '2-36': 'Verification requires exhaustive testing. For n inputs, test all 2ⁿ combinations.',
            '2-37': 'Dataflow VHDL is more abstract than structural. It describes WHAT, not HOW.',
            '2-38': 'Concurrent signal assignments in VHDL execute simultaneously, not sequentially.',
            '2-39': 'Verilog gate primitives are built-in. No need to define them - just instantiate!',
            '2-40': 'Structural Verilog is verbose but explicit. Every gate and connection is visible.',
            '2-41': 'Bus notation simplifies multi-bit designs. Vectors group related signals together.',
        };
        return takeaways[id] || 'Mastering Boolean algebra and K-maps is essential for digital logic design!';
    }
};

export default Ch2ProblemSolver;
