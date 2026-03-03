# BCD Notation Page

## Overview
The BCD Notation page provides an interactive tool for converting decimal numbers to Binary Coded Decimal (BCD) representation, where each decimal digit is encoded separately using 4 binary bits.

## Functionality
- **Decimal Input**: Accepts non-negative integers (digits 0-9 only)
- **BCD Conversion**: Converts each decimal digit to its 4-bit binary representation
- **Input Validation**: Only accepts decimal digits, rejects signs, spaces, and non-digit characters

## Key Features
1. **Per-digit Encoding**: Displays a table showing:
   - Each decimal digit
   - Its corresponding 4-bit BCD representation
   - Clear visual mapping between decimal and binary

2. **Combined BCD Word**: Shows the complete BCD representation by joining all digit blocks
- Displays the original decimal number
- Shows the space-separated BCD representation
- Explains the difference between BCD and pure binary

## Technical Implementation
- Splits input string into individual digits
- Converts each digit using `parseInt(d, 10).toString(2).padStart(4, '0')`
- Validates input using regex `/^[0-9]+$/`
- Handles edge cases with user-friendly error messages

## Educational Value
- Demonstrates how BCD preserves decimal digit boundaries
- Explains why BCD is useful in display hardware and decimal arithmetic
- Shows the difference between BCD and standard binary representation
- Highlights that BCD uses more bits than pure binary but maintains decimal structure

## User Interface
- Simple input field with real-time validation
- Clear table format for per-digit breakdown
- Combined result display with educational explanations
- Responsive design with proper error handling
