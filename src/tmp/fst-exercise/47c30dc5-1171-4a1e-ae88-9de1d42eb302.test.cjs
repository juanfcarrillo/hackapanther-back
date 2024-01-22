const assert = require('assert');

const twoSum = require("./8810f598-23ec-4960-838a-09ace62e3c62.cjs");

describe('twoSum', function() {
    it('should return indices of two numbers that add up to the target', () => {
        assert.deepEqual(twoSum([2, 7, 11, 15], 9), [0, 1])
    });

    it('should handle negative numbers', () => {
        assert.deepEqual(twoSum([-3, 4, 3, 90], 0), [0, 2]);
    });

    it('should return correct indices for non-adjacent elements', () => {
        assert.deepEqual(twoSum([3, 2, 4], 6), [1, 2]);
    });
});