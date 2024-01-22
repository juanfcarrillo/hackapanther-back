const assert = require('assert');

const twoSum = require("{{exercise_name}}");

describe('twoSum', function() {
    it('should return indices of two numbers such that they add up to a specific target', function() {
        assert.deepEqual(twoSum([2, 7, 11, 15], 9), [0, 1]);
    });
});