# EVM Puzzles - Solutions and Walkthrough

## Introduction
This repository contains my solutions and explanations for various EVM puzzles. Each puzzle is analyzed, broken down into opcodes, and solved using precise transaction values.

## How I Solved the Puzzles
Each puzzle follows this structured approach:
1. **Extract the Bytecode** - Analyze the provided bytecode.
2. **Disassemble into Opcodes** - Decode the bytecode into readable EVM instructions.
3. **Understand the Logic** - Identify jumps, conditions, and required inputs.
4. **Calculate the Correct Transaction Value** - Ensure the right `msg.value` or `msg.data` is sent.
5. **Send Transaction** - Use Foundry, Hardhat, or Remix to submit the solution.
6. **Verify Execution** - Confirm that the transaction does not revert and successfully reaches the STOP or RETURN opcode.

## Example Solution
### Puzzle Code:
```json
{
  "code": "34380356FDFD5B00FDFD",
  "askForValue": true,
  "askForData": false
}
```

### Breakdown:
| Bytecode | Opcode      | Description |
|----------|------------|-------------|
| `34`     | CALLVALUE  | Gets `msg.value` |
| `38`     | CODESIZE   | Gets the contract’s code size (10 in this case) |
| `03`     | SUB        | Subtracts `msg.value` from `CODESIZE` |
| `56`     | JUMP       | Jumps to the specified position |
| `FD`     | REVERT     | Reverts if conditions are not met |
| `5B`     | JUMPDEST   | Valid jump destination |
| `00`     | STOP       | Ends execution |

### Solution:
To reach the `JUMPDEST`, we need:
```
CODESIZE (10) - msg.value = 6  (which is the jump destination)
```
Thus, **msg.value must be 4 wei**.

#### Execution
**Using Foundry:**
```sh
cast send 0xCONTRACT_ADDRESS --value 4wei
```

**Using Hardhat:**
```javascript
await signer.sendTransaction({
  to: "0xCONTRACT_ADDRESS",
  value: 4 // 4 wei
});
```

**Using Remix:**
1. Open the contract in Remix
2. Set `Value` to `4 wei`
3. Send the transaction

## Other Puzzles
| Puzzle | Solution Summary |
|--------|-----------------|
| Puzzle 1 | Requires sending X wei to pass validation |
| Puzzle 2 | Needs specific calldata manipulation |
| Puzzle 3 | Involves handling storage layout |

## Lessons Learned
- **Opcode Analysis**: Understanding low-level EVM execution flow.
- **Gas Optimization**: Learning how transactions affect execution costs.
- **Security Awareness**: Identifying vulnerabilities in smart contract logic.

## Next Steps
- Solve more puzzles and explore gas optimizations.
- Experiment with more EVM bytecode patterns.
- Document edge cases and failure scenarios.

---

🚀 **Happy Hacking!**

