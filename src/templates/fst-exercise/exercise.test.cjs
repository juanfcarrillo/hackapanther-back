const assert = require('assert');

const twoSum = require("{{exercise_name}}");

describe('twoSum', function() {
    it('test1', () => {
        assert.deepEqual(twoSum([2, 7, 11, 15], 9), [0, 1])
    });

    it('test2', () => {
        assert.deepEqual(twoSum([-3, 4, 3, 90], 0), [0, 2]);
    });

    it('test3', () => {
        assert.deepEqual(twoSum([3, 2, 4], 6), [1, 2]);
    });
});