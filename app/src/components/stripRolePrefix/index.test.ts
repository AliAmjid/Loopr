import stripRolePrefix from '.';

describe('stripRolePrefix', () => {
  it('should strip', () => {
    expect(stripRolePrefix('ROLE_ROLE_NAME')).toBe('ROLE_NAME');
    expect(stripRolePrefix('ROLE_RANDOM_NAME')).toBe('RANDOM_NAME');
  });
});
