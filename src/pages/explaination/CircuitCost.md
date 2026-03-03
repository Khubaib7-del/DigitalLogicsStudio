# Circuit Cost Page

## Overview
The Circuit Cost page provides interactive calculators for analyzing and comparing the cost of Boolean expressions in terms of literals and gate inputs, helping users understand circuit complexity and optimization opportunities.

## Functionality
- **Literal Cost Calculator**: Count literals in Boolean expressions
- **Gate Input Cost Calculator**: Calculate total gate input requirements
- **Circuit Visualization**: View circuit diagrams for expressions
- **Cost Comparison**: Compare different implementation approaches
- **Interactive Analysis**: Real-time cost calculation as you type

## Key Features

### Literal Cost Analysis
- **Expression Parsing**: Analyzes Boolean expressions for literal count
- **Variable Tracking**: Identifies unique variables used
- **Complement Handling**: Properly counts complemented variables
- **Cost Explanation**: Detailed breakdown of what contributes to literal cost

### Gate Input Cost Analysis
- **Gate Counting**: Identifies AND, OR, and NOT gates needed
- **Input Calculation**: Counts inputs required for each gate
- **Parentheses Handling**: Properly parses complex expressions
- **Total Cost**: Sum of all gate inputs in the circuit

### Cost Metrics
1. **Literal Cost**: Total number of literal occurrences
2. **Gate Input Cost**: Sum of all inputs to all gates
3. **Gate Count**: Number of individual gates required
4. **Variable Count**: Number of unique variables

## Technical Implementation

### Literal Cost Algorithm
```javascript
// Count literals (variables and their complements)
- Parse expression character by character
- Identify variables (A-Z)
- Handle complemented variables (A', B')
- Count each occurrence as 1 literal
- Track unique variables used
```

### Gate Input Cost Algorithm
```javascript
// Calculate gate input requirements
- Parse expression structure
- Count AND gates (+ operators)
- Count OR gates (• or * operators)
- Calculate inputs per gate based on expression structure
- Handle parentheses for complex expressions
```

### Expression Parsing
- **Space Removal**: Clean expression for parsing
- **Case Normalization**: Convert to uppercase for consistency
- **Operator Recognition**: Identify +, •, *, and ' operators
- **Variable Detection**: Find alphabetic characters representing variables

## Educational Value

### Understanding Circuit Complexity
- **Cost Metrics**: Learn different ways to measure circuit complexity
- **Optimization Insight**: See how simplification affects cost
- **Design Trade-offs**: Understand literal vs gate input cost trade-offs
- **Implementation Planning**: Plan circuits based on cost analysis

### Optimization Learning
- **Expression Impact**: See how different expressions affect cost
- **Simplification Benefits**: Understand why simplification matters
- **Gate Efficiency**: Learn about gate input efficiency
- **Design Principles**: Apply cost analysis to design decisions

## User Interface
- **ToolLayout Component**: Consistent page structure
- **InteractiveCalculator**: Custom component for cost calculations
- **CircuitModal**: Circuit visualization for expressions
- **ExplanationBlock**: Organized educational content
- **Real-time Results**: Immediate feedback as you type

## Cost Analysis Features

### Literal Cost Details
- **Expression Display**: Shows the analyzed expression
- **Literal Count**: Total number of literals
- **Unique Variables**: Number and list of unique variables
- **Cost Explanation**: Detailed breakdown of cost calculation

### Gate Input Cost Details
- **Gate Counts**: Number of each gate type
- **Input Requirements**: Total inputs per gate type
- **Overall Cost**: Sum of all gate inputs
- **Implementation Insight**: What the cost means for actual circuits

## Practical Applications
- **Circuit Design**: Plan circuits before implementation
- **Optimization**: Identify opportunities for simplification
- **Cost Comparison**: Compare different implementation approaches
- **Learning**: Understand relationship between expressions and hardware

## Advanced Features
- **Complex Expression Handling**: Parse nested parentheses and complex expressions
- **Multiple Cost Metrics**: Different ways to measure circuit complexity
- **Circuit Visualization**: See the actual circuit representation
- **Educational Explanations**: Learn why cost metrics matter

## Learning Outcomes
After using this page, users will understand:
- How to measure circuit complexity
- The relationship between expressions and hardware cost
- Why circuit optimization is important
- How to make informed design decisions based on cost analysis
