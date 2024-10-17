import { it, describe, expect } from '@jest/globals'

describe('Sample', () => {
  describe('Should pass', () => {
    it('Get', async () => {
      expect(2 + 2).toEqual(4)
    });
  });
});
