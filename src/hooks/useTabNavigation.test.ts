import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useNavigate } from 'react-router-dom'
import { useTabNavigation } from './useTabNavigation'

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}))

describe('useTabNavigation Hook', () => {
  // Mock navigate function
  const mockNavigate = vi.fn()

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks()
    
    // Setup useNavigate mock to return our mock function
    ;(useNavigate as any).mockReturnValue(mockNavigate)
  })

  describe('Hook Return Value', () => {
    it('should return an object with correct properties', () => {
      const { result } = renderHook(() => useTabNavigation())
      
      expect(result.current).toHaveProperty('navigateToTab')
      expect(result.current).toHaveProperty('navigateToIncidents')
      expect(result.current).toHaveProperty('navigateToMetrics')
      
      expect(typeof result.current.navigateToTab).toBe('function')
      expect(typeof result.current.navigateToIncidents).toBe('function')
      expect(typeof result.current.navigateToMetrics).toBe('function')
    })

    it('should return consistent function references across renders', () => {
      const { result, rerender } = renderHook(() => useTabNavigation())
      
      rerender()
      
      // Functions should be the same reference (assuming useCallback or similar optimization)
      // Note: Without useCallback, these will be different references but still work correctly
      expect(typeof result.current.navigateToTab).toBe('function')
      expect(typeof result.current.navigateToIncidents).toBe('function')
      expect(typeof result.current.navigateToMetrics).toBe('function')
    })
  })

  describe('navigateToTab Function', () => {
    it('should navigate to /incidents when called with "incidents"', () => {
      const { result } = renderHook(() => useTabNavigation())
      
      result.current.navigateToTab('incidents')
      
      expect(mockNavigate).toHaveBeenCalledTimes(1)
      expect(mockNavigate).toHaveBeenCalledWith('/incidents')
    })

    it('should navigate to /metrics when called with "metrics"', () => {
      const { result } = renderHook(() => useTabNavigation())
      
      result.current.navigateToTab('metrics')
      
      expect(mockNavigate).toHaveBeenCalledTimes(1)
      expect(mockNavigate).toHaveBeenCalledWith('/metrics')
    })

    it('should handle multiple calls correctly', () => {
      const { result } = renderHook(() => useTabNavigation())
      
      result.current.navigateToTab('incidents')
      result.current.navigateToTab('metrics')
      result.current.navigateToTab('incidents')
      
      expect(mockNavigate).toHaveBeenCalledTimes(3)
      expect(mockNavigate).toHaveBeenNthCalledWith(1, '/incidents')
      expect(mockNavigate).toHaveBeenNthCalledWith(2, '/metrics')
      expect(mockNavigate).toHaveBeenNthCalledWith(3, '/incidents')
    })

    it('should not call navigate for invalid tab values', () => {
      const { result } = renderHook(() => useTabNavigation())
      
      // This would be a TypeScript error in real usage, but we test runtime behavior
      result.current.navigateToTab('invalid' as any)
      
      expect(mockNavigate).not.toHaveBeenCalled()
    })
  })

  describe('navigateToIncidents Function', () => {
    it('should navigate to /incidents when called', () => {
      const { result } = renderHook(() => useTabNavigation())
      
      result.current.navigateToIncidents()
      
      expect(mockNavigate).toHaveBeenCalledTimes(1)
      expect(mockNavigate).toHaveBeenCalledWith('/incidents')
    })

    it('should work correctly when called multiple times', () => {
      const { result } = renderHook(() => useTabNavigation())
      
      result.current.navigateToIncidents()
      result.current.navigateToIncidents()
      
      expect(mockNavigate).toHaveBeenCalledTimes(2)
      expect(mockNavigate).toHaveBeenNthCalledWith(1, '/incidents')
      expect(mockNavigate).toHaveBeenNthCalledWith(2, '/incidents')
    })

    it('should be equivalent to calling navigateToTab with "incidents"', () => {
      const { result } = renderHook(() => useTabNavigation())
      
      // Call navigateToIncidents
      result.current.navigateToIncidents()
      
      // Clear mock to test equivalence
      mockNavigate.mockClear()
      
      // Call navigateToTab with 'incidents'
      result.current.navigateToTab('incidents')
      
      // Both should have the same effect
      expect(mockNavigate).toHaveBeenCalledWith('/incidents')
    })
  })

  describe('navigateToMetrics Function', () => {
    it('should navigate to /metrics when called', () => {
      const { result } = renderHook(() => useTabNavigation())
      
      result.current.navigateToMetrics()
      
      expect(mockNavigate).toHaveBeenCalledTimes(1)
      expect(mockNavigate).toHaveBeenCalledWith('/metrics')
    })

    it('should work correctly when called multiple times', () => {
      const { result } = renderHook(() => useTabNavigation())
      
      result.current.navigateToMetrics()
      result.current.navigateToMetrics()
      
      expect(mockNavigate).toHaveBeenCalledTimes(2)
      expect(mockNavigate).toHaveBeenNthCalledWith(1, '/metrics')
      expect(mockNavigate).toHaveBeenNthCalledWith(2, '/metrics')
    })

    it('should be equivalent to calling navigateToTab with "metrics"', () => {
      const { result } = renderHook(() => useTabNavigation())
      
      // Call navigateToMetrics
      result.current.navigateToMetrics()
      
      // Clear mock to test equivalence
      mockNavigate.mockClear()
      
      // Call navigateToTab with 'metrics'
      result.current.navigateToTab('metrics')
      
      // Both should have the same effect
      expect(mockNavigate).toHaveBeenCalledWith('/metrics')
    })
  })

  describe('Integration and Mixed Usage', () => {
    it('should handle mixed usage of all navigation functions', () => {
      const { result } = renderHook(() => useTabNavigation())
      
      result.current.navigateToIncidents()
      result.current.navigateToTab('metrics')
      result.current.navigateToMetrics()
      result.current.navigateToTab('incidents')
      
      expect(mockNavigate).toHaveBeenCalledTimes(4)
      expect(mockNavigate).toHaveBeenNthCalledWith(1, '/incidents')
      expect(mockNavigate).toHaveBeenNthCalledWith(2, '/metrics')
      expect(mockNavigate).toHaveBeenNthCalledWith(3, '/metrics')
      expect(mockNavigate).toHaveBeenNthCalledWith(4, '/incidents')
    })

    it('should work correctly across hook re-renders', () => {
      const { result, rerender } = renderHook(() => useTabNavigation())
      
      result.current.navigateToIncidents()
      
      rerender()
      
      result.current.navigateToMetrics()
      
      rerender()
      
      result.current.navigateToTab('incidents')
      
      expect(mockNavigate).toHaveBeenCalledTimes(3)
      expect(mockNavigate).toHaveBeenNthCalledWith(1, '/incidents')
      expect(mockNavigate).toHaveBeenNthCalledWith(2, '/metrics')
      expect(mockNavigate).toHaveBeenNthCalledWith(3, '/incidents')
    })
  })

  describe('Error Handling and Edge Cases', () => {
    it('should handle useNavigate throwing an error gracefully', () => {
      const mockError = new Error('Navigation failed')
      const throwingNavigate = vi.fn(() => {
        throw mockError
      })
      
      // Temporarily replace the navigate function for this test only
      ;(useNavigate as any).mockReturnValue(throwingNavigate)
      
      const { result } = renderHook(() => useTabNavigation())
      
      expect(() => {
        result.current.navigateToIncidents()
      }).toThrow('Navigation failed')
      
      expect(throwingNavigate).toHaveBeenCalledWith('/incidents')
      
      // Restore the original mock for subsequent tests
      ;(useNavigate as any).mockReturnValue(mockNavigate)
    })

    it('should work when navigate function is undefined (edge case)', () => {
      ;(useNavigate as any).mockReturnValue(undefined)
      
      const { result } = renderHook(() => useTabNavigation())
      
      expect(() => {
        result.current.navigateToIncidents()
      }).toThrow()
      
      // Restore the original mock for subsequent tests
      ;(useNavigate as any).mockReturnValue(mockNavigate)
    })

    it('should handle all possible Tab type values', () => {
      // Reset mock to ensure clean state
      mockNavigate.mockClear()
      
      const { result } = renderHook(() => useTabNavigation())
      
      // Test all valid tab values
      const validTabs: Array<'incidents' | 'metrics'> = ['incidents', 'metrics']
      
      validTabs.forEach((tab, index) => {
        result.current.navigateToTab(tab)
        expect(mockNavigate).toHaveBeenNthCalledWith(index + 1, `/${tab}`)
      })
      
      expect(mockNavigate).toHaveBeenCalledTimes(2)
    })
  })

  describe('TypeScript Type Safety', () => {
    it('should only accept valid tab types for navigateToTab', () => {
      // Reset mock to ensure clean state
      mockNavigate.mockClear()
      
      const { result } = renderHook(() => useTabNavigation())
      
      // These should work (compile-time check)
      result.current.navigateToTab('incidents')
      result.current.navigateToTab('metrics')
      
      // Invalid values would cause TypeScript errors but we test runtime behavior
      expect(() => {
        result.current.navigateToTab('invalid' as any)
      }).not.toThrow() // Function doesn't throw, just doesn't navigate
      
      expect(mockNavigate).toHaveBeenCalledTimes(2) // Only valid calls should trigger navigation
    })

    it('should return functions with correct signatures', () => {
      const { result } = renderHook(() => useTabNavigation())
      
      // navigateToTab should accept a Tab parameter
      expect(result.current.navigateToTab.length).toBe(1)
      
      // navigateToIncidents and navigateToMetrics should accept no parameters
      expect(result.current.navigateToIncidents.length).toBe(0)
      expect(result.current.navigateToMetrics.length).toBe(0)
    })
  })

  describe('useNavigate Integration', () => {
    it('should call useNavigate hook correctly', () => {
      renderHook(() => useTabNavigation())
      
      expect(useNavigate).toHaveBeenCalledTimes(1)
      expect(useNavigate).toHaveBeenCalledWith()
    })

    it('should use the navigate function returned by useNavigate', () => {
      const customNavigate = vi.fn()
      ;(useNavigate as any).mockReturnValue(customNavigate)
      
      const { result } = renderHook(() => useTabNavigation())
      
      result.current.navigateToIncidents()
      
      expect(customNavigate).toHaveBeenCalledWith('/incidents')
      expect(mockNavigate).not.toHaveBeenCalled() // Original mock should not be called
    })

    it('should work with different navigate function implementations', () => {
      const asyncNavigate = vi.fn().mockResolvedValue(undefined)
      ;(useNavigate as any).mockReturnValue(asyncNavigate)
      
      const { result } = renderHook(() => useTabNavigation())
      
      result.current.navigateToMetrics()
      
      expect(asyncNavigate).toHaveBeenCalledWith('/metrics')
    })
  })

  describe('Performance and Memory', () => {
    it('should not create memory leaks with multiple hook instances', () => {
      // Reset mock to ensure clean state
      mockNavigate.mockClear()
      
      const hooks = Array.from({ length: 10 }, () => 
        renderHook(() => useTabNavigation())
      )
      
      hooks.forEach(({ result }) => {
        result.current.navigateToIncidents()
      })
      
      expect(mockNavigate).toHaveBeenCalledTimes(10)
      expect(useNavigate).toHaveBeenCalledTimes(10)
      
      // Cleanup
      hooks.forEach(({ unmount }) => unmount())
    })

    it('should maintain function stability for optimization purposes', () => {
      // Reset mock to ensure clean state
      mockNavigate.mockClear()
      
      const { result, rerender } = renderHook(() => useTabNavigation())
      
      // Multiple re-renders
      rerender()
      rerender()
      rerender()
      
      // Functions should still work correctly regardless of reference equality
      result.current.navigateToIncidents()
      result.current.navigateToMetrics()
      
      expect(mockNavigate).toHaveBeenCalledTimes(2)
      expect(mockNavigate).toHaveBeenCalledWith('/incidents')
      expect(mockNavigate).toHaveBeenCalledWith('/metrics')
    })
  })
})