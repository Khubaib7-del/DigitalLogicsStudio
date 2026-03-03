# Binary Representation Page

## Overview
The Binary Representation page provides a comprehensive educational tool for understanding different binary number representation systems, including Signed Magnitude, Two's Complement, and Unsigned integers.

## Functionality
The page offers three main representation systems with interactive conversion tools:

### 1. Signed Magnitude Representation
- **Concept**: Leftmost bit represents sign (0=+, 1=-), remaining bits represent magnitude
- **Features**:
  - Bit range calculator (2-53 bits)
  - Real-time range calculation: -(2^(n-1)-1) to +(2^(n-1)-1)
  - Decimal to binary conversion with optional padding
  - Reference chart showing values -10 to 10
  - Visual sign bit highlighting

### 2. Two's Complement Representation
- **Concept**: Most common signed integer representation in computing
- **Features**:
  - Automatic bit-width calculation based on input
  - Range calculation: -2^(n-1) to +(2^(n-1)-1)
  - Proper negative number handling using two's complement
  - Reference chart for comparison with Signed Magnitude

### 3. Unsigned Representation
- **Concept**: Pure binary representation for non-negative integers
- **Features**:
  - Range calculation: 0 to (2^n)-1
  - Simple decimal to binary conversion
  - No sign bit consideration

## Key Features
1. **Interactive Conversion**: Real-time decimal to binary conversion for all three systems
2. **Range Calculators**: Dynamic range calculation based on bit width
3. **Reference Charts**: Toggle-able charts showing -10 to 10 decimal values in binary
4. **Padding Control**: Optional bit padding for consistent width
5. **Visual Learning**: Color-coded sign bits and clear formatting

## Technical Implementation
- **State Management**: Multiple useState hooks for each representation system
- **Real-time Calculation**: useEffect hooks for range and result updates
- **Input Validation**: Handles edge cases and large numbers (up to MAX_SAFE_INTEGER)
- **Binary Conversion**: Custom algorithms for each representation type
- **Chart Generation**: Dynamic data generation for reference tables

## Educational Value
- **Comparison Learning**: Side-by-side comparison of different representation systems
- **Practical Understanding**: Shows why two's complement is preferred in modern computing
- **Range Awareness**: Demonstrates the limitations and capabilities of each system
- **Visual Learning**: Color-coded sign bits and clear formatting aid understanding

## User Interface
- **Card-based Layout**: Each representation system in its own section
- **Progressive Disclosure**: Step-by-step conversion process
- **Interactive Controls**: Number inputs, bit selectors, padding controls
- **Toggle Features**: Show/hide reference charts
- **Responsive Design**: Clean, modern interface with clear visual hierarchy
