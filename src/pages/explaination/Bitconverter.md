# Bit & Byte Converter Page

## Overview
The Bit & Byte Converter page provides a comprehensive tool for converting between digital storage units with precision, supporting both binary (1024-based) and decimal units.

## Functionality
- **Unit Conversion**: Convert between various digital storage units
- **Comprehensive Unit Support**: Covers from bits to petabytes
- **Real-time Calculation**: Instant conversion as you type
- **Reference Table**: Detailed unit comparison chart

## Supported Units
### Base Units
- **Bit** (bit): Fundamental unit of digital information
- **Byte** (B): 8 bits

### Binary Bits (1024-based)
- **Kibibit** (Kib): 1,024 bits (2¹⁰)
- **Mebibit** (Mib): 1,048,576 bits (2²⁰)
- **Gibibit** (Gib): 1,073,741,824 bits (2³⁰)
- **Tebibit** (Tib): 2⁴⁰ bits
- **Pebibit** (Pib): 2⁵⁰ bits

### Bytes (1024-based)
- **Kilobyte** (KB): 8,192 bits (8 × 2¹⁰)
- **Megabyte** (MB): 8,388,608 bits (8 × 2²⁰)
- **Gigabyte** (GB): 8,589,934,592 bits (8 × 2³⁰)
- **Terabyte** (TB): 8 × 2⁴⁰ bits
- **Petabyte** (PB): 8 × 2⁵⁰ bits

## Key Features
1. **Bidirectional Conversion**: Convert from any supported unit to any other unit
2. **High Precision**: Up to 10 decimal places for accurate conversions
3. **Large Number Support**: Handles values up to 1e15 with exponential notation
4. **Educational Content**: Explains the difference between binary and decimal units
5. **IEC Standards**: Clarifies KB/MB/GB (binary) vs kB/mB/gB (decimal) notation

## Technical Implementation
- **Conversion Algorithm**: Uses bit-based conversion for accuracy
  - Convert input to bits: `totalBits = inputValue × fromUnit.toBits`
  - Convert bits to target: `result = totalBits / toUnit.toBits`
- **Unit Definitions**: Structured object with bit conversion factors
- **Number Formatting**: Localized formatting with exponential fallback
- **Table Generation**: Dynamic reference table with categorized units

## Educational Value
- **Unit Understanding**: Teaches the relationship between different storage units
- **Binary vs Decimal**: Explains why computing uses 1024-based units
- **Scale Awareness**: Shows the dramatic differences between unit magnitudes
- **Standards Education**: Introduces IEC standardization for digital units

## User Interface
- **Clean Layout**: Card-based design with clear sections
- **Interactive Controls**: Dropdown selectors for source and target units
- **Real-time Results**: Instant conversion display
- **Toggle Reference**: Show/hide comprehensive unit comparison table
- **Visual Hierarchy**: Color-coded sections and highlighted key terms
- **Responsive Design**: Works well on different screen sizes
