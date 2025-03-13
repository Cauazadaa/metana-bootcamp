module.exports = {
    // Specify the contracts you want to test
    contracts: [
        "contracts/ERCRefund.sol", // Adjust the path as necessary
    ],
    // Specify the test files
    tests: [
        "test/Lock.ts", // Adjust the path as necessary
    ],
    // Specify the mutation strategies
    strategies: [
        "mutate", // This is the default strategy
    ],
};
