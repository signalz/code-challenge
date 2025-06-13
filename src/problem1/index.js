// # Task

// Provide 3 unique implementations of the following function in JavaScript.

// **Input**: `n` - any integer

// *Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.

// **Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.

// Assumptions:
// - The input will always be a non-negative integer.

// Validate the input to ensure it is a non-negative integer.
// If the input is invalid, throw an error with a descriptive message.
var validateInput = function (n) {
  if (!Number.isInteger(n)) {
    throw new Error("Input must be an integer");
  }
  if (n < 0) {
    throw new Error("Input must be a non-negative integer");
  }
};

var sum_to_n_a = function (n) {
  validateInput(n);
  // Using the mathematical formula n(n+1)/2
  // O(1) complexity
  // Works for any non-negative integer n
  return (n * (n + 1)) / 2;
};

var sum_to_n_b = function (n) {
  validateInput(n);
  // Using a for loop
  // O(n) complexity
  // Does not works well with very large numbers due to potential overflow
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

var sum_to_n_c = function (n) {
  validateInput(n);
  // Using recursion
  // O(n) complexity
  // Does not work well with very large numbers due to potential stack overflow
  if (n <= 0) return 0
  return n + sum_to_n_c(n - 1);
};

console.log("Testing sum_to_n(5):");
console.log("sum_to_n_a(5):", sum_to_n_a(5)); // Expected: 15
console.log("sum_to_n_b(5):", sum_to_n_b(5)); // Expected: 15
console.log("sum_to_n_c(5):", sum_to_n_c(5)); // Expected: 15

console.log("\nTesting sum_to_n(10):");
console.log("sum_to_n_a(10):", sum_to_n_a(10)); // Expected: 55
console.log("sum_to_n_b(10):", sum_to_n_b(10)); // Expected: 55
console.log("sum_to_n_c(10):", sum_to_n_c(10)); // Expected: 55

console.log("\nTesting sum_to_n(0):");
console.log("sum_to_n_a(0):", sum_to_n_a(0)); // Expected: 0
console.log("sum_to_n_b(0):", sum_to_n_b(0)); // Expected: 0
console.log("sum_to_n_c(0):", sum_to_n_c(0)); // Expected: 0

console.log("\nTesting sum_to_n(-10):");
try {
  console.log("sum_to_n_a(0):", sum_to_n_a(-10)); // Expected: Error
}
catch (error) {
  console.error("Error in sum_to_n_a:", error.message);
}

try {
  console.log("sum_to_n_b(0):", sum_to_n_b(-10)); // Expected: Error
}
catch (error) {
  console.error("Error in sum_to_n_b:", error.message);
}

try {
  console.log("sum_to_n_c(0):", sum_to_n_c(-10)); // Expected: Error
}
catch (error) {
  console.error("Error in sum_to_n_c:", error.message);
}
