# Odd Function (3-Variable XOR) Page

## Overview
The Odd Function page provides an interactive educational tool for understanding the 3-variable XOR function and its relationship to parity detection. This page demonstrates how XOR gates can be used to detect odd numbers of 1s in binary inputs.

## Functionality
- **Interactive Demo**: Real-time XOR calculation with 3 input variables
- **Parity Detection**: Visual demonstration of odd/even parity
- **Truth Table**: Complete truth table for 3-variable XOR
- **Circuit Visualization**: Access to circuit implementation
- **Mathematical Representation**: Multiple forms of the function

## Key Features

### Understanding the Odd Function
- **Mathematical Definition**: F(A,B,C) = A ⊕ B ⊕ C
- **Minterm Form**: F(A,B,C) = Σm(1,2,4,7)
- **Maxterm Form**: F(A,B,C) = ΠM(0,3,5,6)
- **Parity Detection**: Outputs 1 when odd number of inputs are 1

### Parity Detection Logic
- **Odd Count**: Output 1 when 1 or 3 inputs are 1
- **Even Count**: Output 0 when 0 or 2 inputs are 1
- **Real-time Calculation**: Immediate feedback as inputs change
- **Visual Examples**: Clear demonstration of parity concepts

### Interactive Features
- **Input Controls**: Toggle switches for A, B, C inputs
- **Real-time Output**: See XOR and parity results instantly
- **Truth Table**: Complete mapping of all input combinations
- **Circuit Access**: Direct link to circuit implementation

## Technical Implementation

### XOR Calculation Algorithm
```javascript
const calculateXOR3 = (inputs) => {
  const values = Object.values(inputs);
  // XOR of 3 variables: (A ⊕ B) ⊕ C
  return values[0] !== values[1] !== values[2];
};

const calculateParity = (inputs) => {
  const values = Object.values(inputs);
  const ones = values.filter(v => v).length;
  return ones % 2 === 1;
};
```

### Truth Table Data
Complete truth table showing all 8 combinations:
- 000 → 0 (even parity)
- 001 → 1 (odd parity)
- 010 → 1 (odd parity)
- 011 → 0 (even parity)
- 100 → 1 (odd parity)
- 101 → 0 (even parity)
- 110 → 0 (even parity)
- 111 → 1 (odd parity)

### Component Integration
- **InteractiveDemo**: Real-time input/output demonstration
- **CircuitModal**: Visual circuit representation
- **ExplanationBlock**: Structured educational content
- **ToolLayout**: Consistent page structure

## Educational Value

### Understanding XOR Gates
- **Multi-input XOR**: Learn how XOR extends beyond 2 inputs
- **Associative Property**: Understand (A ⊕ B) ⊕ C = A ⊕ (B ⊕ C)
- **Parity Applications**: See practical uses of XOR for error detection
- **Circuit Implementation**: Understand how to build multi-input XOR

### Parity Detection Concepts
- **Odd vs Even**: Understand parity detection principles
- **Error Detection**: Learn how parity is used in communication systems
- **Binary Analysis**: Develop skills for analyzing binary patterns
- **Practical Applications**: Real-world uses of parity detection

### Boolean Function Analysis
- **Function Representation**: Multiple ways to represent the same function
- **Minterm/Maxterm**: Understanding canonical forms
- **Circuit Design**: How to implement Boolean functions
- **Optimization**: Opportunities for circuit simplification

## User Interface
- **ToolLayout**: Consistent page structure
- **InteractiveDemo**: Hands-on experimentation area
- **ExplanationBlock**: Organized educational content
- **Circuit Access**: Prominent button for circuit experimentation
- **Clear Typography**: Mathematical notation and explanations

## Interactive Examples
- **Input Combinations**: Try all 8 possible input combinations
- **Parity Observation**: See how parity changes with inputs
- **Real-time Feedback**: Immediate visual feedback
- **Circuit Exploration**: Build and test circuits

## Step-by-Step Learning

### Understanding the Function
1. **Basic XOR**: Review 2-input XOR behavior
2. **Extension to 3-input**: Understand how XOR extends
3. **Parity Concept**: Connect XOR to parity detection
4. **Mathematical Forms**: Learn different representations

### Practical Application
1. **Error Detection**: Understand parity in communication
2. **Circuit Design**: See how to implement the function
3. **Optimization**: Look for simplification opportunities
4. **Testing**: Verify understanding with examples

## Advanced Features
- **Circuit Integration**: Direct access to circuit builder
- **Mathematical Rigor**: Multiple formal representations
- **Interactive Learning**: Hands-on experimentation
- **Real-time Feedback**: Immediate response to input changes

## Learning Progression
1. **XOR Basics**: Understanding 2-input XOR
2. **Multi-input Extension**: Extending to 3 inputs
3. **Parity Detection**: Understanding parity concepts
4. **Circuit Implementation**: Building the function
5. **Applications**: Real-world uses and examples

## Practical Applications
- **Error Detection**: Parity bits in communication systems
- **Data Validation**: Checking data integrity
- **Cryptography**: XOR in encryption algorithms
- **Signal Processing**: Parity in digital signal processing

## Learning Outcomes
After using this page, users will understand:
- How 3-input XOR functions work
- The relationship between XOR and parity detection
- Multiple representations of Boolean functions
- How to implement multi-input XOR circuits
- Practical applications of parity detection
