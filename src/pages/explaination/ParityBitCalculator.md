# Parity Bit Calculator Page

## Overview
The Parity Bit Calculator page provides a comprehensive tool for calculating and understanding parity bits for error detection in digital communication. It supports both even and odd parity generation with detailed examples and educational content.

## Functionality
- **Parity Bit Calculation**: Generate even and odd parity bits for decimal numbers
- **Binary Conversion**: Convert decimal to 7-bit and 8-bit binary representations
- **Hexadecimal Display**: Show 8-bit results in hexadecimal format
- **Multi-row Support**: Calculate parity for multiple numbers simultaneously
- **Educational Examples**: Pre-configured examples demonstrating parity concepts

## Key Features

### Parity Bit Types
- **Even Parity**: Ensures total number of 1s is even
- **Odd Parity**: Ensures total number of 1s is odd
- **7-bit Data**: Standard 7-bit ASCII/character representation
- **8-bit Result**: Data bit plus parity bit

### Calculation Process
1. **Decimal Input**: Enter decimal number (0-127)
2. **Binary Conversion**: Convert to 7-bit binary
3. **Parity Calculation**: Count 1s and determine parity bit
4. **8-bit Assembly**: Combine parity bit with 7-bit data
5. **Hexadecimal Display**: Show 8-bit result in hex format

### Interactive Features
- **Dynamic Rows**: Add/remove calculation rows
- **Real-time Updates**: Instant calculation as you type
- **Example Tables**: Toggle reference tables for examples
- **Range Validation**: Ensure inputs are within valid range (0-127)

## Technical Implementation

### Parity Calculation Algorithms
```javascript
const calculateEvenParityBit = (binary7) => {
    const ones = binary7.split('').filter(bit => bit === '1').length;
    return ones % 2 === 0 ? '0' : '1';
};

const calculateOddParityBit = (binary7) => {
    const ones = binary7.split('').filter(bit => bit === '1').length;
    return ones % 2 === 0 ? '1' : '0';
};

const calculate8BitWithParity = (binary7, parityType = 'even') => {
    const parityBit = parityType === 'even'
        ? calculateEvenParityBit(binary7)
        : calculateOddParityBit(binary7);
    return parityBit + binary7;
};
```

### Binary Conversion
- **7-bit Conversion**: `num.toString(2).padStart(7, '0')`
- **Range Checking**: Validate 0-127 range for 7-bit representation
- **Hexadecimal Conversion**: `parseInt(binary8, 2).toString(16).toUpperCase().padStart(2, '0')`

### State Management
- **Dynamic Rows**: Array of row objects with decimal input
- **Real-time Calculation**: Immediate updates on input change
- **Example Toggle**: Show/hide reference examples
- **Input Validation**: Range and format checking

## Educational Value

### Understanding Error Detection
- **Parity Concepts**: Learn how parity bits detect errors
- **Single-bit Detection**: Understand parity can detect single-bit errors
- **Limitations**: Learn why parity can't detect even-numbered bit errors
- **Practical Applications**: Real-world usage in communication systems

### Binary Representation
- **7-bit Systems**: Understanding standard data representation
- **8-bit Assembly**: How parity bits are added to data
- **Hexadecimal Conversion**: Relationship between binary and hex
- **Range Limitations**: Understanding 7-bit number range (0-127)

### Communication Systems
- **Data Integrity**: How parity protects data transmission
- **Error Detection**: Principles of error detection in digital systems
- **Protocol Design**: Understanding parity in communication protocols
- **System Design**: How parity fits into larger system designs

## User Interface
- **Input Table**: Dynamic table for multiple calculations
- **Real-time Results**: Instant display of all conversions
- **Example Sections**: Toggle-able reference examples
- **Clear Layout**: Organized display of binary and hex results
- **Responsive Design**: Works well on different screen sizes

## Calculation Examples

### Even Parity Examples
- **Decimal 6**: 0000110 → Parity 0 → 00000110 → 0x06
- **Decimal 15**: 0001111 → Parity 1 → 10001111 → 0x8F
- **Decimal 24**: 0011000 → Parity 0 → 00011000 → 0x18

### Odd Parity Examples
- **Decimal 6**: 0000110 → Parity 1 → 10000110 → 0x86
- **Decimal 15**: 0001111 → Parity 0 → 00001111 → 0x0F
- **Decimal 24**: 0011000 → Parity 1 → 10011000 → 0x98

## Advanced Features
- **Multi-row Calculations**: Process multiple numbers simultaneously
- **Dynamic Interface**: Add/remove rows as needed
- **Reference Tables**: Pre-calculated examples for learning
- **Range Validation**: Automatic checking of input validity
- **Format Flexibility**: Multiple output formats (binary, hex)

## Learning Progression
1. **Basic Parity**: Understanding even vs odd parity
2. **Binary Conversion**: Converting decimal to binary
3. **Parity Calculation**: Counting bits and determining parity
4. **8-bit Assembly**: Combining data and parity bits
5. **Practical Applications**: Real-world usage scenarios

## Practical Applications
- **Communication Systems**: Error detection in data transmission
- **Memory Systems**: Error detection in computer memory
- **Storage Systems**: Data integrity in storage devices
- **Network Protocols**: Parity in network communication
- **Embedded Systems**: Error detection in microcontroller systems

## Limitations and Considerations
- **Single-bit Only**: Parity detects only single-bit errors
- **Even Errors**: Cannot detect even number of bit errors
- **Range Limits**: 7-bit limitation (0-127)
- **Position Choice**: Parity bit placement (MSB vs LSB)

## Learning Outcomes
After using this page, users will understand:
- How parity bits are calculated and used
- The difference between even and odd parity
- How to convert between decimal, binary, and hexadecimal
- The limitations of parity-based error detection
- Practical applications of parity in digital systems
