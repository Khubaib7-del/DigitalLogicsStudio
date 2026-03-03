# Consensus Theorem Page

## Overview
The Consensus Theorem page provides an interactive educational tool for understanding and applying the consensus theorem in Boolean algebra, which allows elimination of redundant terms for circuit optimization.

## Functionality
- **Pattern Recognition**: Automatically detects if consensus theorem applies
- **Expression Analysis**: Analyzes Boolean expressions for consensus patterns
- **Truth Table Generation**: Shows truth tables for original and simplified expressions
- **Interactive Examples**: Pre-configured examples demonstrating the theorem
- **Circuit Visualization**: View circuit representations of expressions

## Key Features

### The Consensus Theorem
- **Formula**: XY + X'Z + YZ = XY + X'Z
- **Consensus Term**: YZ is redundant and can be eliminated
- **Pattern Recognition**: Automatically identifies applicable expressions
- **Simplification**: Shows step-by-step reduction process

### Why It Works
The consensus term YZ is covered by the other two terms:
- When X=1: XY covers all cases where Y=1 (including YZ)
- When X=0: X'Z covers all cases where Z=1 (including YZ)
- Therefore, YZ is always covered by either XY or X'Z

### Pattern Detection
The consensus theorem applies when you have:
- Two terms where a variable appears in true form in one term and complemented in another
- A third term that contains all the literals from both terms except the complementary variable

## Technical Implementation

### Applicability Check
```javascript
const appliesConsensus = (expr) => {
    const e = expr.replace(/^F\s*=\s*/, '').trim();
    return /[A-Z][^+]*[A-Z]'\s*\+\s*[A-Z]'\s*[A-Z][^+]*\s*\+\s*[A-Z][^+]*[A-Z]/i.test(e);
};
```

### Expression Analysis
- **Pattern Matching**: Uses regex to identify consensus patterns
- **Variable Extraction**: Identifies variables involved in the pattern
- **Truth Table Generation**: Creates truth tables for verification
- **Simplification Logic**: Applies consensus theorem automatically

### Component Integration
- **CircuitModal**: Visual circuit representation
- **ControlPanel**: Input controls for expressions
- **ExplanationBlock**: Structured educational content
- **Truth Table**: Visual verification of equivalence

## Educational Value

### Understanding Redundancy
- **Redundant Terms**: Learn to identify unnecessary terms
- **Coverage Concept**: Understand how some terms cover others
- **Optimization Impact**: See practical benefits of simplification
- **Pattern Recognition**: Develop skills for identifying optimization opportunities

### Circuit Optimization
- **Gate Count Reduction**: Fewer gates needed after simplification
- **Power Savings**: Lower power consumption with fewer gates
- **Speed Improvement**: Reduced propagation delay
- **Cost Reduction**: Less silicon area required

### Learning Progression
1. **Pattern Recognition**: Learn to identify consensus patterns
2. **Understanding Coverage**: Grasp why consensus terms are redundant
3. **Application**: Apply theorem to real expressions
4. **Verification**: Use truth tables to confirm equivalence

## User Interface
- **ToolLayout**: Consistent page structure
- **ControlPanel**: Expression input controls
- **ExplanationBlock**: Organized educational content
- **Interactive Examples**: Quick-load example expressions
- **Truth Table**: Visual verification tool

## Interactive Examples
- **Basic Pattern**: AB + A'C + BC
- **Classic Example**: XY + X'Z + YZ
- **Variations**: Different variable combinations
- **Complex Cases**: Multi-variable expressions

## Step-by-Step Process

### Example: F = AB + A'C + BC
1. **Identify Pattern**:
   - Term 1: AB (X=A, Y=B)
   - Term 2: A'C (X'=A', Z=C)
   - Term 3: BC (consensus term)

2. **Apply Theorem**:
   - F = AB + A'C (BC term eliminated)

3. **Result**: 33% reduction in terms and literals!

## Practical Applications

### Circuit Design
- **Optimization**: Automatically identify optimization opportunities
- **Cost Reduction**: Minimize gate count and complexity
- **Performance**: Improve speed and power efficiency
- **Verification**: Ensure simplification maintains functionality

### Educational Benefits
- **Critical Thinking**: Develop pattern recognition skills
- **Problem Solving**: Learn systematic simplification approaches
- **Design Principles**: Understand optimization fundamentals
- **Real-world Context**: See practical applications of theory

## Advanced Features
- **Pattern Detection**: Automatic identification of applicable expressions
- **Truth Table Verification**: Mathematical proof of equivalence
- **Circuit Visualization**: See before/after circuit implementations
- **Interactive Learning**: Hands-on experimentation with examples

## Learning Outcomes
After using this page, users will understand:
- How to identify consensus theorem patterns
- Why consensus terms are redundant
- How to apply the theorem for optimization
- The practical benefits of circuit simplification
- Pattern recognition skills for Boolean expressions
