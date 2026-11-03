import { buildOrderByClause } from '../src/database/utils';

describe('buildOrderByClause', () => {
  it('returns empty string when sortBy is omitted', () => {
    expect(buildOrderByClause()).toBe('');
    expect(buildOrderByClause(undefined, 'DESC')).toBe('');
  });

  it('maps allowlisted column and direction to literal ORDER BY fragments', () => {
    expect(buildOrderByClause('title', 'ASC')).toBe('ORDER BY title ASC');
    expect(buildOrderByClause('created_at', 'DESC')).toBe('ORDER BY created_at DESC');
    expect(buildOrderByClause('severity', 'ASC')).toBe('ORDER BY severity ASC');
    expect(buildOrderByClause('status', 'DESC')).toBe('ORDER BY status DESC');
  });

  it('defaults direction to ASC when omitted', () => {
    expect(buildOrderByClause('title')).toBe('ORDER BY title ASC');
  });

  it('rejects non-allowlisted sort columns (SQL injection attempts)', () => {
    expect(() => buildOrderByClause('title; DROP TABLE bugs;--', 'ASC')).toThrow(
      /Invalid sort column/
    );
    expect(() => buildOrderByClause('created_at DESC; SELECT 1', 'ASC')).toThrow(
      /Invalid sort column/
    );
    expect(() => buildOrderByClause('unknown_col', 'ASC')).toThrow(/Invalid sort column/);
  });

  it('rejects non-allowlisted sort directions (SQL injection attempts)', () => {
    expect(() => buildOrderByClause('title', 'ASC; DROP TABLE bugs;--')).toThrow(
      /Invalid sort order/
    );
    expect(() => buildOrderByClause('title', 'desc')).toThrow(/Invalid sort order/);
    expect(() => buildOrderByClause('title', 'DESC NULLS FIRST')).toThrow(
      /Invalid sort order/
    );
  });
});
