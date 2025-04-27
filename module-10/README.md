# Solidity Assembly Exercises

This repository contains Solidity smart contracts that demonstrate the use of inline assembly (Yul) and bitwise operations. The exercises are designed to help understand low-level operations in Ethereum smart contracts.

## Contracts

### BitWise Contract

The `BitWise` contract implements functions to count the number of set bits (1s) in an 8-bit number using two different approaches:

1. `countBitSet(uint8 data)`: Pure Solidity implementation
   - Counts the number of 1s in a byte using standard bitwise operations
   - Example: `countBitSet(7)` returns `3` because 7 in binary is `0111`

2. `countBitSetAsm(uint8 data)`: Assembly implementation
   - Same functionality as `countBitSet` but using inline assembly
   - Demonstrates the use of Yul for low-level operations

### String Contract

The `String` contract provides functionality for string manipulation using inline assembly:

`charAt(string memory input, uint index)`: Returns a character at a specific index in a string
- Returns the character as a `bytes2` value
- Handles edge cases like empty strings and out-of-bounds indices

#### Test Cases
```solidity
charAt("abcdef", 2)    // Returns 0x6300 (character 'c')
charAt("", 0)          // Returns 0x0000 (empty string)
charAt("george", 10)   // Returns 0x0000 (out of bounds)
```

## Purpose

These exercises demonstrate:
1. Bitwise operations in Solidity
2. Use of inline assembly (Yul)
3. String manipulation at a low level
4. Handling edge cases in smart contracts

## Requirements

- Solidity ^0.8.4
- An Ethereum development environment (Hardhat, Truffle, or Remix)
