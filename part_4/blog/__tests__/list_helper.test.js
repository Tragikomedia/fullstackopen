const listHelper = require('../utils/list_helper');

describe('List helpers', () => {
  it('Given an array of blogs, dummy should return 1', () => {
    const blogs = [];
    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
  });
});
