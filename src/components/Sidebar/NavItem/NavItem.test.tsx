import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NavItem } from './NavItem'

describe('NavItem Component', () => {
  describe('Rendering', () => {
    it('should render with required label prop', () => {
      render(<NavItem label="Test Label" />)
      
      const button = screen.getByRole('button', { name: 'Test Label' })
      expect(button).toBeInTheDocument()
      expect(button).toHaveTextContent('Test Label')
    })

    it('should render as a button element', () => {
      render(<NavItem label="Test" />)
      
      const element = screen.getByRole('button')
      expect(element.tagName).toBe('BUTTON')
    })

    it('should display the correct label text', () => {
      const testLabel = 'Navigation Item'
      render(<NavItem label={testLabel} />)
      
      expect(screen.getByText(testLabel)).toBeInTheDocument()
    })
  })

  describe('Active State Styling', () => {
    it('should apply active styles when active is true', () => {
      render(<NavItem label="Active Item" active={true} />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-slate-800', 'text-white')
      expect(button).not.toHaveClass('text-slate-300', 'hover:bg-slate-900', 'hover:text-white')
    })

    it('should apply inactive styles when active is false', () => {
      render(<NavItem label="Inactive Item" active={false} />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('text-slate-300', 'hover:bg-slate-900', 'hover:text-white')
      expect(button).not.toHaveClass('bg-slate-800', 'text-white')
    })

    it('should apply inactive styles when active is undefined', () => {
      render(<NavItem label="Undefined Active Item" />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('text-slate-300', 'hover:bg-slate-900', 'hover:text-white')
      expect(button).not.toHaveClass('bg-slate-800', 'text-white')
    })

    it('should always include base styling classes', () => {
      render(<NavItem label="Base Styles Test" />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass(
        'text-left',
        'rounded-lg', 
        'px-3',
        'py-2',
        'transition'
      )
    })
  })

  describe('ARIA Attributes', () => {
    it('should set aria-pressed to true when active is true', () => {
      render(<NavItem label="Active ARIA Test" active={true} />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-pressed', 'true')
    })

    it('should set aria-pressed to false when active is false', () => {
      render(<NavItem label="Inactive ARIA Test" active={false} />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-pressed', 'false')
    })

    it('should set aria-pressed to false when active is undefined', () => {
      render(<NavItem label="Undefined ARIA Test" />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-pressed', 'false')
    })
  })

  describe('Click Handling', () => {
    it('should call onClick handler when clicked', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()
      
      render(<NavItem label="Clickable Item" onClick={handleClick} />)
      
      const button = screen.getByRole('button')
      await user.click(button)
      
      expect(handleClick).toHaveBeenCalledOnce()
    })

    it('should call onClick handler multiple times for multiple clicks', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()
      
      render(<NavItem label="Multi-click Item" onClick={handleClick} />)
      
      const button = screen.getByRole('button')
      await user.click(button)
      await user.click(button)
      await user.click(button)
      
      expect(handleClick).toHaveBeenCalledTimes(3)
    })

    it('should not throw error when clicked without onClick handler', async () => {
      const user = userEvent.setup()
      
      render(<NavItem label="No Handler Item" />)
      
      const button = screen.getByRole('button')
      
      // Should not throw an error
      expect(async () => {
        await user.click(button)
      }).not.toThrow()
    })

    it('should handle onClick with different active states', async () => {
      const handleActiveClick = vi.fn()
      const handleInactiveClick = vi.fn()
      const user = userEvent.setup()
      
      const { rerender } = render(
        <NavItem label="State Test" active={true} onClick={handleActiveClick} />
      )
      
      let button = screen.getByRole('button')
      await user.click(button)
      expect(handleActiveClick).toHaveBeenCalledOnce()
      
      rerender(<NavItem label="State Test" active={false} onClick={handleInactiveClick} />)
      button = screen.getByRole('button')
      await user.click(button)
      expect(handleInactiveClick).toHaveBeenCalledOnce()
    })
  })

  describe('Keyboard Interaction', () => {
    it('should be focusable via keyboard navigation', async () => {
      const user = userEvent.setup()
      
      render(<NavItem label="Focusable Item" />)
      
      const button = screen.getByRole('button')
      await user.tab()
      
      expect(button).toHaveFocus()
    })

    it('should trigger onClick when activated with Enter key', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()
      
      render(<NavItem label="Enter Key Test" onClick={handleClick} />)
      
      const button = screen.getByRole('button')
      button.focus()
      await user.keyboard('{Enter}')
      
      expect(handleClick).toHaveBeenCalledOnce()
    })

    it('should trigger onClick when activated with Space key', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()
      
      render(<NavItem label="Space Key Test" onClick={handleClick} />)
      
      const button = screen.getByRole('button')
      button.focus()
      await user.keyboard(' ')
      
      expect(handleClick).toHaveBeenCalledOnce()
    })
  })

  describe('Props Combination Testing', () => {
    it('should handle all props together - active with click handler', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()
      
      render(<NavItem label="Complete Props Test" active={true} onClick={handleClick} />)
      
      const button = screen.getByRole('button')
      
      // Test rendering
      expect(button).toBeInTheDocument()
      expect(button).toHaveTextContent('Complete Props Test')
      
      // Test active styling
      expect(button).toHaveClass('bg-slate-800', 'text-white')
      expect(button).toHaveAttribute('aria-pressed', 'true')
      
      // Test click functionality
      await user.click(button)
      expect(handleClick).toHaveBeenCalledOnce()
    })

    it('should handle all props together - inactive with click handler', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()
      
      render(<NavItem label="Complete Props Test" active={false} onClick={handleClick} />)
      
      const button = screen.getByRole('button')
      
      // Test rendering
      expect(button).toBeInTheDocument()
      expect(button).toHaveTextContent('Complete Props Test')
      
      // Test inactive styling
      expect(button).toHaveClass('text-slate-300', 'hover:bg-slate-900', 'hover:text-white')
      expect(button).toHaveAttribute('aria-pressed', 'false')
      
      // Test click functionality
      await user.click(button)
      expect(handleClick).toHaveBeenCalledOnce()
    })

    it('should handle minimal props - only label', () => {
      render(<NavItem label="Minimal Props" />)
      
      const button = screen.getByRole('button')
      
      // Test rendering
      expect(button).toBeInTheDocument()
      expect(button).toHaveTextContent('Minimal Props')
      
      // Test default inactive styling
      expect(button).toHaveClass('text-slate-300', 'hover:bg-slate-900', 'hover:text-white')
      expect(button).toHaveAttribute('aria-pressed', 'false')
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty label string', () => {
      render(<NavItem label="" />)
      
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(button).toHaveTextContent('')
    })

    it('should handle special characters in label', () => {
      const specialLabel = "Special & Characters! @#$%^&*()_+-=[]{}|;':\",./<>?"
      render(<NavItem label={specialLabel} />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveTextContent(specialLabel)
    })

    it('should handle unicode characters in label', () => {
      const unicodeLabel = "🚀 Rocket 中文 العربية"
      render(<NavItem label={unicodeLabel} />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveTextContent(unicodeLabel)
    })

    it('should handle very long label text', () => {
      const longLabel = 'A'.repeat(1000)
      render(<NavItem label={longLabel} />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveTextContent(longLabel)
    })
  })

  describe('className Generation', () => {
    it('should generate correct className string for active state', () => {
      render(<NavItem label="Class Test" active={true} />)
      
      const button = screen.getByRole('button')
      const expectedClasses = [
        'text-left',
        'rounded-lg', 
        'px-3',
        'py-2',
        'transition',
        'bg-slate-800',
        'text-white'
      ]
      
      expectedClasses.forEach(className => {
        expect(button).toHaveClass(className)
      })
    })

    it('should generate correct className string for inactive state', () => {
      render(<NavItem label="Class Test" active={false} />)
      
      const button = screen.getByRole('button')
      const expectedClasses = [
        'text-left',
        'rounded-lg', 
        'px-3',
        'py-2',
        'transition',
        'text-slate-300',
        'hover:bg-slate-900',
        'hover:text-white'
      ]
      
      expectedClasses.forEach(className => {
        expect(button).toHaveClass(className)
      })
    })
  })

  describe('Component Re-rendering', () => {
    it('should update when props change', () => {
      const { rerender } = render(<NavItem label="Initial Label" active={false} />)
      
      let button = screen.getByRole('button')
      expect(button).toHaveTextContent('Initial Label')
      expect(button).toHaveClass('text-slate-300')
      expect(button).toHaveAttribute('aria-pressed', 'false')
      
      rerender(<NavItem label="Updated Label" active={true} />)
      button = screen.getByRole('button')
      expect(button).toHaveTextContent('Updated Label')
      expect(button).toHaveClass('bg-slate-800')
      expect(button).toHaveAttribute('aria-pressed', 'true')
    })

    it('should maintain functionality across re-renders', async () => {
      const handleClick1 = vi.fn()
      const handleClick2 = vi.fn()
      const user = userEvent.setup()
      
      const { rerender } = render(<NavItem label="Test" onClick={handleClick1} />)
      
      let button = screen.getByRole('button')
      await user.click(button)
      expect(handleClick1).toHaveBeenCalledOnce()
      
      rerender(<NavItem label="Test" onClick={handleClick2} />)
      button = screen.getByRole('button')
      await user.click(button)
      expect(handleClick2).toHaveBeenCalledOnce()
    })
  })

  describe('Performance', () => {
    it('should render quickly with minimal computation', () => {
      const start = performance.now()
      
      for (let i = 0; i < 100; i++) {
        const { unmount } = render(<NavItem label={`Item ${i}`} active={i % 2 === 0} />)
        unmount()
      }
      
      const end = performance.now()
      const duration = end - start
      
      // Should render 100 components in reasonable time (less than 100ms)
      expect(duration).toBeLessThan(100)
    })
  })
})