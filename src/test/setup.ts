// Test setup file for Vitest
import { beforeEach, vi } from 'vitest'
import '@testing-library/jest-dom'

// Mock implementations for testing
beforeEach(() => {
  // Reset all mocks before each test
  vi.clearAllMocks()
})

// Global test utilities
;(globalThis as any).ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))