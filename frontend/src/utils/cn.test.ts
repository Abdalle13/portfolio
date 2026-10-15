import { describe, it, expect } from 'vitest';
import { cn } from './cn';

describe('cn utility', () => {
  it('should merge class names correctly', () => {
    expect(cn('bg-blue-600', 'text-white')).toBe('bg-blue-600 text-white');
  });

  it('should resolve conflicting tailwind classes with last win', () => {
    expect(cn('p-4', 'p-8')).toBe('p-8');
  });

  it('should ignore conditional falsy values', () => {
    const isHidden = false;
    expect(cn('flex', isHidden && 'hidden', null, undefined, 'items-center')).toBe('flex items-center');
  });
});
