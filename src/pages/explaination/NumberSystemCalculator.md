# Number System Calculator Page

## Overview
The Number System Calculator page provides a comprehensive tool for performing arithmetic operations (addition, subtraction, multiplication, division) in different number systems (decimal, binary, octal, hexadecimal) with support for different binary representation methods.

## Functionality
- **Multi-base Arithmetic**: Perform operations in decimal, binary, octal, and hexadecimal
- **Binary Representation**: Choose between two's complement and signed magnitude
- **Step-by-step Solutions**: Detailed operation breakdown with intermediate steps
- **Real-time Calculation**: Instant results as you input values
- **Input Validation**: Ensure valid input for each number system

## Key Features

### Supported Number Systems
- **Decimal (Base 10)**: Standard decimal arithmetic
- **Binary (Base 2)**: Binary arithmetic with different representation methods
- **Octal (Base 8)**: Octal arithmetic operations
- **Hexadecimal (Base 16)**: Hexadecimal arithmetic with A-F digits

### Binary Representation Methods
- **Two's Complement**: Standard method for signed binary numbers
- **Signed Magnitude**: Alternative signed binary representation
- **8-bit Fixed**: Consistent 8-bit representation for all operations

### Arithmetic Operations
- **Addition (+)**: Multi-base addition with carry handling
- **Subtraction (−)**: Multi-base subtraction with borrow handling
- **Multiplication (×)**: Multi-base multiplication algorithms
- **Division (÷)**: Multi-base division with quotient and remainder

### Advanced Features
- **Step-by-step Display**: Detailed operation process
- **Carry/Borrow Tracking**: Visual representation of carries and borrows
- **Error Handling**: Comprehensive input validation and error messages
- **Real-time Updates**: Instant calculation as you type
- **Educational Mode**: Toggle detailed explanations

## Technical Implementation

### Binary Conversion Algorithms
```javascript
const decimalToBinaryOutput = (num, bits = 8) => {
    if (binaryRepresentation === 'twos-complement') {
        if (num >= 0) {
            return num.toString(2).padStart(bits, '0');
        }
        // Two's complement for negative numbers
        const positive = -num;
        let bin = positive.toString(2).padStart(bits, '0');
        bin = bin.split('').map(b => b === '0' ? '1' : '0').join('');
        return (parseInt(bin, 2) + 1).toString(2).padStart(bits, '0');
    }
    // Signed magnitude representation
    const sign = num < 0 ? '1' : '0';
    const magnitude = Math.abs(num).toString(2).padStart(bits - 1, '0');
    return sign + magnitude;
};
```

### Arithmetic Algorithms
- **Addition**: Digit-by-digit addition with carry propagation
- **Subtraction**: Digit-by-digit subtraction with borrow handling
- **Multiplication**: Standard multiplication algorithm adapted for different bases
- **Division**: Long division algorithm adapted for different bases

### Input Validation
- **Pattern Matching**: Regex validation for each number system
- **Range Checking**: Ensure numbers fit within selected bit width
- **Real-time Validation**: Immediate feedback on invalid input
- **Error Recovery**: Graceful handling of invalid inputs

## Educational Value

### Understanding Number System Arithmetic
- **Base-independent Operations**: Learn how arithmetic works in different bases
- **Carry/Borrow Concepts**: Understand fundamental arithmetic concepts
- **Binary Representation**: Learn different ways to represent signed numbers
- **Algorithm Visualization**: See step-by-step operation processes

### Binary Representation Mastery
- **Two's Complement**: Understand the most common signed binary method
- **Signed Magnitude**: Learn alternative signed binary representation
- **Range Limitations**: Understand limitations of fixed-bit representations
- **Overflow Handling**: See what happens when numbers exceed bit limits

### Practical Skills
- **Computer Arithmetic**: Essential for computer science and engineering
- **Digital Logic**: Foundation for understanding computer arithmetic units
- **Programming**: Understanding how computers perform arithmetic
- **Problem Solving**: Systematic approach to multi-base arithmetic

## User Interface
- **Control Panel**: Organized input controls for all parameters
- **Number System Selection**: Dropdown for choosing base
- **Operation Selection**: Dropdown for arithmetic operation
- **Binary Representation**: Radio buttons for binary method
- **Input Fields**: Validated input fields for operands
- **Results Display**: Clear presentation of results and steps

## Operation Examples

### Binary Addition (Two's Complement)
- **5 + 3**: 00000101 + 00000011 = 00001000 (8)
- **(-5) + 3**: 11111011 + 00000011 = 11111110 (-2)

### Hexadecimal Multiplication
- **A × F**: 10 × 15 = 150 = 96₁₆
- **FF + 1**: 255 + 1 = 256 = 100₁₆

### Octal Subtraction
- **20 - 5**: 16 - 5 = 11 = 13₈
- **100 - 1**: 64 - 1 = 63 = 77₈

## Advanced Features
- **Step Display**: Detailed operation process with carries/borrows
- **Multiple Representations**: Support for different binary methods
- **Error Handling**: Comprehensive input validation
- **Educational Mode**: Toggle between simple and detailed views
- **Copy Functionality**: Easy copying of results

## Learning Progression
1. **Basic Operations**: Simple addition and subtraction
2. **Multi-base Mastery**: Operations in different number systems
3. **Binary Representation**: Understanding signed binary methods
4. **Advanced Operations**: Multiplication and division
5. **Practical Application**: Real-world arithmetic scenarios

## Practical Applications
- **Computer Architecture**: Understanding CPU arithmetic units
- **Programming**: Low-level arithmetic operations
- **Digital Design**: Circuit design for arithmetic operations
- **Education**: Teaching number system arithmetic
- **Engineering**: Working with different number bases in technical fields

## Learning Outcomes
After using this page, users will understand:
- How to perform arithmetic in different number systems
- The difference between two's complement and signed magnitude
- How carries and borrows work in multi-base arithmetic
- Why different binary representations are used
- Practical applications of multi-base arithmetic
