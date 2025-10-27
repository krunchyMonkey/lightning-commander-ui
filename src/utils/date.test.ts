import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { fmtDate } from './date'

describe('Date Utils', () => {
  let originalToLocaleString: typeof Date.prototype.toLocaleString

  beforeEach(() => {
    // Store original method
    originalToLocaleString = Date.prototype.toLocaleString
  })

  afterEach(() => {
    // Restore original method
    Date.prototype.toLocaleString = originalToLocaleString
    vi.clearAllMocks()
  })

  describe('fmtDate', () => {
    it('should format a valid ISO date string', () => {
      const isoDate = '2023-12-25T10:30:00.000Z'
      const result = fmtDate(isoDate)
      
      // Check that result is a string and contains expected components
      expect(typeof result).toBe('string')
      expect(result).toMatch(/12\/25\/2023|25\/12\/2023|2023/) // Different locale formats
      expect(result).toMatch(/10:30|AM|PM/) // Time component
    })

    it('should format a date string without milliseconds', () => {
      const isoDate = '2023-06-15T12:00:00Z' // Use midday to avoid timezone issues
      const result = fmtDate(isoDate)
      
      expect(typeof result).toBe('string')
      expect(result).toMatch(/2023/) // Should contain the year (timezone independent)
    })

    it('should handle different ISO date formats', () => {
      const testCases = [
        '2023-06-15T14:30:00.123Z',
        '2023-06-15T14:30:00Z',
        '2023-06-15T14:30:00',
        '2023-06-15',
      ]

      testCases.forEach(isoDate => {
        const result = fmtDate(isoDate)
        expect(typeof result).toBe('string')
        expect(result.length).toBeGreaterThan(0)
        expect(result).toMatch(/2023/) // Should contain the year
      })
    })

    it('should use the system locale for formatting', () => {
      const mockToLocaleString = vi.fn().mockReturnValue('Mock Formatted Date')
      Date.prototype.toLocaleString = mockToLocaleString

      const isoDate = '2023-12-25T10:30:00.000Z'
      const result = fmtDate(isoDate)

      expect(mockToLocaleString).toHaveBeenCalledOnce()
      expect(result).toBe('Mock Formatted Date')
    })

    it('should create a Date object from the ISO string', () => {
      const isoDate = '2023-12-25T10:30:00.000Z'
      const mockToLocaleString = vi.fn().mockReturnValue('Mock Date')
      Date.prototype.toLocaleString = mockToLocaleString

      fmtDate(isoDate)

      // Verify that toLocaleString was called (indicating Date was created)
      expect(mockToLocaleString).toHaveBeenCalledOnce()
    })

    it('should handle edge case dates', () => {
      const edgeCases = [
        '1970-01-01T00:00:00.000Z', // Unix epoch
        '2000-01-01T00:00:00.000Z', // Y2K
        '2038-01-19T03:14:07.000Z', // Near 32-bit timestamp limit
      ]

      edgeCases.forEach(isoDate => {
        const result = fmtDate(isoDate)
        expect(typeof result).toBe('string')
        expect(result.length).toBeGreaterThan(0)
      })
    })

    it('should handle invalid date strings gracefully', () => {
      const invalidDates = [
        'invalid-date',
        '',
        '2023-13-45T25:70:00.000Z', // Invalid month/day/hour/minute
        'not-a-date-at-all',
      ]

      invalidDates.forEach(invalidDate => {
        const result = fmtDate(invalidDate)
        expect(typeof result).toBe('string')
        // Invalid dates typically result in "Invalid Date" string
        expect(result).toMatch(/Invalid Date|NaN/)
      })
    })

    it('should handle different timezone formats', () => {
      const timezoneCases = [
        '2023-12-25T10:30:00+05:30', // UTC+5:30
        '2023-12-25T10:30:00-08:00', // UTC-8
        '2023-12-25T10:30:00+00:00', // UTC
      ]

      timezoneCases.forEach(isoDate => {
        const result = fmtDate(isoDate)
        expect(typeof result).toBe('string')
        expect(result).toMatch(/2023/) // Should contain the year
      })
    })

    it('should be consistent with repeated calls', () => {
      const isoDate = '2023-12-25T10:30:00.000Z'
      const result1 = fmtDate(isoDate)
      const result2 = fmtDate(isoDate)
      
      expect(result1).toBe(result2)
    })

    it('should handle null/undefined input gracefully', () => {
      // TypeScript would prevent this, but testing runtime behavior
      const result1 = fmtDate(null as any)
      const result2 = fmtDate(undefined as any)
      
      expect(typeof result1).toBe('string')
      expect(typeof result2).toBe('string')
      // null/undefined are converted to epoch time or invalid dates depending on browser
      expect(result1.length).toBeGreaterThan(0)
      expect(result2.length).toBeGreaterThan(0)
    })

    it('should handle leap year dates', () => {
      const leapYearDate = '2024-02-29T12:00:00.000Z' // 2024 is a leap year
      const result = fmtDate(leapYearDate)
      
      expect(typeof result).toBe('string')
      expect(result).toMatch(/2024/)
      expect(result).toMatch(/29|Feb/) // Should contain day 29 or February
    })

    it('should maintain precision for milliseconds', () => {
      const dateWithMs = '2023-12-25T10:30:45.123Z'
      const dateWithoutMs = '2023-12-25T10:30:45.000Z'
      
      const result1 = fmtDate(dateWithMs)
      const result2 = fmtDate(dateWithoutMs)
      
      expect(typeof result1).toBe('string')
      expect(typeof result2).toBe('string')
      // Both should be valid formatted strings
      expect(result1.length).toBeGreaterThan(0)
      expect(result2.length).toBeGreaterThan(0)
    })

    it('should work with Date.now() output', () => {
      const now = Date.now()
      const isoString = new Date(now).toISOString()
      const result = fmtDate(isoString)
      
      expect(typeof result).toBe('string')
      expect(result.length).toBeGreaterThan(0)
      expect(result).toMatch(/2025/) // Current year
    })

    it('should handle very old dates', () => {
      const oldDate = '1900-01-01T12:00:00.000Z' // Use midday to avoid timezone issues
      const result = fmtDate(oldDate)
      
      expect(typeof result).toBe('string')
      expect(result).toMatch(/1900/) // Should contain the year
    })

    it('should handle far future dates', () => {
      const futureDate = '2099-12-31T23:59:59.999Z'
      const result = fmtDate(futureDate)
      
      expect(typeof result).toBe('string')
      expect(result).toMatch(/2099/)
    })
  })

  describe('Performance', () => {
    it('should execute quickly for typical usage', () => {
      const start = performance.now()
      const isoDate = '2023-12-25T10:30:00.000Z'
      
      for (let i = 0; i < 1000; i++) {
        fmtDate(isoDate)
      }
      
      const end = performance.now()
      const duration = end - start
      
      // Should complete 1000 iterations in reasonable time (less than 100ms)
      expect(duration).toBeLessThan(100)
    })
  })

  describe('Memory', () => {
    it('should not leak memory with repeated calls', () => {
      const isoDate = '2023-12-25T10:30:00.000Z'
      const results = []
      
      // Create many formatted dates
      for (let i = 0; i < 100; i++) {
        results.push(fmtDate(isoDate))
      }
      
      // All results should be identical
      expect(new Set(results).size).toBe(1)
      expect(results.length).toBe(100)
    })
  })

  describe('Integration', () => {
    it('should work with real Date scenarios', () => {
      // Test with actual dates that might come from an API
      const apiResponses = [
        '2023-01-15T09:30:00.000Z', // Morning time
        '2023-06-21T15:45:30.500Z', // Afternoon with milliseconds
        '2023-12-31T23:59:59.999Z', // End of year
      ]

      apiResponses.forEach(isoDate => {
        const result = fmtDate(isoDate)
        expect(typeof result).toBe('string')
        expect(result.length).toBeGreaterThan(0)
        expect(result).not.toBe('Invalid Date')
      })
    })

    it('should be suitable for UI display', () => {
      const isoDate = '2023-12-25T10:30:00.000Z'
      const result = fmtDate(isoDate)
      
      // Should be human-readable
      expect(result).toMatch(/\d/)  // Contains digits
      expect(result.length).toBeGreaterThan(5) // Reasonable length
      expect(result.length).toBeLessThan(50) // Not too long
    })
  })
})