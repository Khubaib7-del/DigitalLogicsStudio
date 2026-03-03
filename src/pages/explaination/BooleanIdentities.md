# Boolean Identities Page

## Overview
The Boolean Identities page provides an interactive reference for fundamental Boolean algebra identities, with circuit visualization capabilities and detailed explanations for each identity.

## Functionality
- **Interactive Identity Reference**: Comprehensive list of Boolean identities
- **Circuit Visualization**: Modal popup for visualizing Boolean expressions as circuits
- **Dual Representation**: Shows both addition (OR) and multiplication (AND) forms
- **Expression Expansion**: Handles complex Boolean expression transformations

## Key Identities Covered

### 1. Idempotent
- **Addition**: A + A = A
- **Multiplication**: A • A = A
- **Explanation**: Repeating the same input does not change the outcome

### 2. Identity Elements
- **Addition**: A + 0 = A
- **Multiplication**: A • 1 = A
- **Explanation**: 0 is the identity for OR; 1 is the identity for AND

### 3. Domination
- **Addition**: A + 1 = 1
- **Multiplication**: A • 0 = 0
- **Explanation**: 1 dominates OR; 0 dominates AND

### 4. Complementarity
- **Addition**: A + A' = 1
- **Multiplication**: A • A' = 0
- **Explanation**: A and its complement cover all cases for OR and exclude all cases for AND

### 5. Commutative
- **Addition**: A + B = B + A
- **Multiplication**: A • B = B • A
- **Explanation**: Order of operands does not affect the result

### 6. Associative
- **Addition**: A + (B + C) = (A + B) + C
- **Multiplication**: A • (B • C) = (A • B) • C
- **Explanation**: Grouping of operands does not affect the result

### 7. Distributive
- **Addition**: A + (B • C) = (A + B) • (A + C)
- **Multiplication**: A • (B + C) = A•B + A•C
- **Explanation**: OR distributes over AND and vice versa

### 8. Absorption
- **Addition**: A + A•B = A
- **Multiplication**: A • (A + B) = A
- **Explanation**: A absorbs redundant combinations with A

### 9. De Morgan
- **Addition**: (A + B)' = A' • B'
- **Multiplication**: (A • B)' = A' + B'
- **Explanation**: Complement of a sum equals product of complements, and vice versa

## Technical Features
- **Modal Integration**: CircuitModal component for visual representations
- **Expression Parsing**: Handles complex Boolean expressions with complements
- **Variable Management**: Dynamic variable assignment for circuit visualization
- **Expression Expansion**: `expandProductOfSum` function for simplifying expressions

## Interactive Elements
- **Circuit Visualization**: Click to see circuit representation of identities
- **Variable Tracking**: Automatic variable detection and management
- **Expression Transformation**: Real-time expression expansion and simplification

## Educational Value
- **Comprehensive Reference**: All fundamental Boolean identities in one place
- **Visual Learning**: Circuit diagrams help understand abstract concepts
- **Dual Representation**: Shows both OR and AND forms for completeness
- **Practical Application**: Each identity includes practical explanations

## User Interface
- **ToolLayout Component**: Consistent page structure
- **ExplanationBlock**: Organized content sections
- **Interactive Cards**: Each identity in its own clickable card
- **Modal System**: Popup for detailed circuit visualization
- **Clean Typography**: Clear mathematical notation and explanations

## Advanced Features
- **Expression Parsing**: Handles complex patterns like A•(B+C+...)
- **Complement Handling**: Proper processing of complemented variables
- **Variable Extraction**: Automatic variable detection from expressions
- **Circuit Generation**: Dynamic circuit diagram creation
