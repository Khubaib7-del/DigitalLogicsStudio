# Bit Extension Page

## Overview
The Bit Extension page provides an interactive tool for demonstrating and comparing unsigned zero-extension versus signed two's complement sign extension when expanding binary numbers to larger bit widths.

## Functionality
- **Binary Input**: Accepts binary strings (0s and 1s only)
- **Target Bit-width**: Allows expansion from 1 to 32 bits
- **Extension Modes**: 
  - Signed (two's complement) - sign extension
  - Unsigned - zero extension
- **Real-time Validation**: Ensures input is valid binary and target width is appropriate

## Key Features
1. **Extension Comparison**: Shows the difference between:
   - **Zero-extension**: Pads with 0s on the left for unsigned values
   - **Sign extension**: Copies the sign bit for signed two's complement values

2. **Visual Results**: Displays:
   - Original binary value and bit count
   - Extended binary value and new bit count
   - Detailed explanation of the extension process

## Technical Implementation
- Validates binary input using regex `/^[01]+$/`
- Handles target bit-width validation (1-32 bits)
- Implements two extension algorithms:
  - Unsigned: `value.padStart(n, '0')`
  - Signed: `value.padStart(n, signBit)`
- Provides error handling for invalid inputs

## Educational Value
- **Signed vs Unsigned Intuition**: Explains fundamental differences:
  - Unsigned: Leftmost bit is magnitude, new bits must be 0
  - Signed: Leftmost bit encodes sign, must be repeated to preserve value
- **Two's Complement Understanding**: Demonstrates how sign extension preserves numeric values
- **Bit-width Awareness**: Shows how changing word size affects binary representation

## User Interface
- Clean control panel with binary input field
- Number selector for target bit-width
- Dropdown for extension mode selection
- Result cards with clear before/after comparison
- Educational explanations with highlighted key terms
- Real-time validation and error feedback
