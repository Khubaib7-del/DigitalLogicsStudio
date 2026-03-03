# ASCII Notation Page

## Overview
The ASCII Notation page provides an interactive tool for converting text characters to their corresponding ASCII codes in decimal, hexadecimal, and binary formats.

## Functionality
- **Text Input**: Users can type any text or phrase in the input textarea
- **Character Code Conversion**: Each character is converted to:
  - Decimal code (0-127 for ASCII characters)
  - Hexadecimal representation (0x00-0x7F)
  - 8-bit binary representation
- **Non-ASCII Handling**: Characters outside the ASCII range (0-127) are marked as "Non-ASCII character"

## Key Features
1. **Per-character Breakdown**: Displays a detailed table showing:
   - Character representation (spaces shown as ␣)
   - Decimal code value
   - Hexadecimal code with 0x prefix
   - 8-bit binary representation
   - Notes for non-ASCII characters

2. **Educational Content**: Explains why ASCII uses 7 bits (values 0-127) and how it's stored in 8-bit bytes

## Technical Implementation
- Uses `charCodeAt()` to get character codes
- Converts between number systems using `toString(16)` and `toString(2)`
- Pads binary representation to 8 bits and hex to 2 digits
- Validates input and handles edge cases for non-ASCII characters

## User Interface
- Clean, responsive layout with control panel and results section
- Table format for easy comparison of different number representations
- Highlighted key terms for educational emphasis
- Real-time conversion as user types
