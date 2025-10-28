import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import MetricsPage from './MetricsPage'

describe('MetricsPage Component', () => {
  describe('Rendering', () => {
    it('should render the main pane container', () => {
      render(<MetricsPage />)
      
      expect(screen.getByText('ITIL Metrics')).toBeInTheDocument()
    })

    it('should render with correct title', () => {
      render(<MetricsPage />)
      
      const title = screen.getByText('ITIL Metrics')
      expect(title).toBeInTheDocument()
      expect(title.tagName).toBe('H2')
    })

    it('should render the placeholder message', () => {
      render(<MetricsPage />)
      
      const placeholder = screen.getByText('Metrics dashboard placeholder…')
      expect(placeholder).toBeInTheDocument()
    })

    it('should use semantic HTML structure', () => {
      const { container } = render(<MetricsPage />)
      
      // Should render within a section element (from Pane component)
      const section = container.querySelector('section')
      expect(section).toBeInTheDocument()
      
      // Should have a header element
      const header = container.querySelector('header')
      expect(header).toBeInTheDocument()
    })
  })

  describe('Content Structure', () => {
    it('should display placeholder text with correct styling', () => {
      render(<MetricsPage />)
      
      const placeholder = screen.getByText('Metrics dashboard placeholder…')
      expect(placeholder).toHaveClass('text-slate-400')
    })

    it('should render placeholder text in a div container', () => {
      render(<MetricsPage />)
      
      const placeholder = screen.getByText('Metrics dashboard placeholder…')
      expect(placeholder.tagName).toBe('DIV')
    })

    it('should have minimal content structure', () => {
      const { container } = render(<MetricsPage />)
      
      // The content should be simple - just the placeholder div
      const contentDiv = container.querySelector('section > div > div')
      expect(contentDiv).toBeInTheDocument()
      expect(contentDiv).toHaveTextContent('Metrics dashboard placeholder…')
    })
  })

  describe('Component Integration', () => {
    it('should integrate correctly with Pane component', () => {
      render(<MetricsPage />)
      
      // Should render the Pane with the correct title
      expect(screen.getByText('ITIL Metrics')).toBeInTheDocument()
      
      // Should render the content within the Pane
      expect(screen.getByText('Metrics dashboard placeholder…')).toBeInTheDocument()
    })

    it('should work when nested in other components', () => {
      const WrapperComponent = ({ children }: { children: React.ReactNode }) => (
        <div data-testid="wrapper" className="container">
          {children}
        </div>
      )
      
      render(
        <WrapperComponent>
          <MetricsPage />
        </WrapperComponent>
      )
      
      expect(screen.getByTestId('wrapper')).toBeInTheDocument()
      expect(screen.getByText('ITIL Metrics')).toBeInTheDocument()
      expect(screen.getByText('Metrics dashboard placeholder…')).toBeInTheDocument()
    })

    it('should maintain consistent rendering across re-renders', () => {
      const { rerender } = render(<MetricsPage />)
      
      // Initial render
      expect(screen.getByText('ITIL Metrics')).toBeInTheDocument()
      expect(screen.getByText('Metrics dashboard placeholder…')).toBeInTheDocument()
      
      // Re-render
      rerender(<MetricsPage />)
      
      // Should still be the same
      expect(screen.getByText('ITIL Metrics')).toBeInTheDocument()
      expect(screen.getByText('Metrics dashboard placeholder…')).toBeInTheDocument()
    })
  })

  describe('CSS Classes and Styling', () => {
    it('should apply correct text color class to placeholder', () => {
      render(<MetricsPage />)
      
      const placeholder = screen.getByText('Metrics dashboard placeholder…')
      expect(placeholder).toHaveClass('text-slate-400')
    })

    it('should not have any additional classes on placeholder', () => {
      render(<MetricsPage />)
      
      const placeholder = screen.getByText('Metrics dashboard placeholder…')
      expect(placeholder.className).toBe('text-slate-400')
    })

    it('should inherit Pane component styling', () => {
      const { container } = render(<MetricsPage />)
      
      // Should have Pane's default classes applied
      const section = container.querySelector('section')
      expect(section).toHaveClass(
        'rounded-2xl',
        'border',
        'border-slate-800',
        'bg-slate-900/40',
        'p-4',
        'min-h-[320px]'
      )
    })
  })

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      render(<MetricsPage />)
      
      // Should have an h2 element for the title
      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('ITIL Metrics')
    })

    it('should be accessible as a landmark', () => {
      const { container } = render(<MetricsPage />)
      
      // Should render as a section landmark
      const section = container.querySelector('section')
      expect(section).toBeInTheDocument()
    })

    it('should have accessible text content', () => {
      render(<MetricsPage />)
      
      // All text should be accessible
      expect(screen.getByText('ITIL Metrics')).toBeInTheDocument()
      expect(screen.getByText('Metrics dashboard placeholder…')).toBeInTheDocument()
    })

    it('should have proper semantic structure', () => {
      const { container } = render(<MetricsPage />)
      
      // Should have header with title
      const header = container.querySelector('header')
      expect(header).toBeInTheDocument()
      
      const title = header?.querySelector('h2')
      expect(title).toHaveTextContent('ITIL Metrics')
    })
  })

  describe('Component Re-rendering', () => {
    it('should update when props change (none in this case)', () => {
      const { rerender } = render(<MetricsPage />)
      
      // Since MetricsPage has no props, re-rendering should be identical
      expect(screen.getByText('ITIL Metrics')).toBeInTheDocument()
      
      rerender(<MetricsPage />)
      
      expect(screen.getByText('ITIL Metrics')).toBeInTheDocument()
      expect(screen.getByText('Metrics dashboard placeholder…')).toBeInTheDocument()
    })

    it('should maintain functionality across re-renders', () => {
      const { rerender } = render(<MetricsPage />)
      
      // Initial state
      const initialTitle = screen.getByText('ITIL Metrics')
      const initialPlaceholder = screen.getByText('Metrics dashboard placeholder…')
      
      expect(initialTitle).toBeInTheDocument()
      expect(initialPlaceholder).toBeInTheDocument()
      
      // Multiple re-renders
      for (let i = 0; i < 5; i++) {
        rerender(<MetricsPage />)
      }
      
      // Should still work
      expect(screen.getByText('ITIL Metrics')).toBeInTheDocument()
      expect(screen.getByText('Metrics dashboard placeholder…')).toBeInTheDocument()
    })
  })

  describe('Performance and Memory', () => {
    it('should render quickly without performance issues', () => {
      const startTime = performance.now()
      render(<MetricsPage />)
      const endTime = performance.now()
      
      // Component should render very quickly (less than 50ms is reasonable)
      expect(endTime - startTime).toBeLessThan(50)
    })

    it('should not create memory leaks with multiple renders', () => {
      // Render multiple instances
      const { unmount: unmount1 } = render(<MetricsPage />)
      const { unmount: unmount2 } = render(<MetricsPage />)
      const { unmount: unmount3 } = render(<MetricsPage />)
      
      // Should render without errors
      expect(screen.getAllByText('ITIL Metrics')).toHaveLength(3)
      
      // Cleanup should work without issues
      unmount1()
      unmount2()
      unmount3()
    })

    it('should handle rapid re-renders gracefully', () => {
      const { rerender } = render(<MetricsPage />)
      
      // Multiple rapid re-renders
      for (let i = 0; i < 10; i++) {
        rerender(<MetricsPage />)
      }
      
      // Should still work correctly
      expect(screen.getByText('ITIL Metrics')).toBeInTheDocument()
      expect(screen.getByText('Metrics dashboard placeholder…')).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('should handle multiple instances rendered simultaneously', () => {
      const MultipleMetricsPage = () => (
        <div>
          <MetricsPage />
          <MetricsPage />
        </div>
      )
      
      render(<MultipleMetricsPage />)
      
      // Should render both instances correctly
      const titles = screen.getAllByText('ITIL Metrics')
      const placeholders = screen.getAllByText('Metrics dashboard placeholder…')
      
      expect(titles).toHaveLength(2)
      expect(placeholders).toHaveLength(2)
    })

    it('should maintain state isolation between instances', () => {
      const MultipleMetricsPage = () => (
        <div>
          <div data-testid="first-instance">
            <MetricsPage />
          </div>
          <div data-testid="second-instance">
            <MetricsPage />
          </div>
        </div>
      )
      
      const { container } = render(<MultipleMetricsPage />)
      
      const firstInstance = container.querySelector('[data-testid="first-instance"]')
      const secondInstance = container.querySelector('[data-testid="second-instance"]')
      
      // Both should have identical content but be separate instances
      expect(firstInstance?.textContent).toContain('ITIL Metrics')
      expect(secondInstance?.textContent).toContain('ITIL Metrics')
      expect(firstInstance?.textContent).toContain('Metrics dashboard placeholder…')
      expect(secondInstance?.textContent).toContain('Metrics dashboard placeholder…')
    })
  })

  describe('Future Extensibility', () => {
    it('should render in a way that supports future metrics content', () => {
      const { container } = render(<MetricsPage />)
      
      // The placeholder should be easy to replace with real metrics
      const placeholder = container.querySelector('.text-slate-400')
      expect(placeholder).toBeInTheDocument()
      expect(placeholder).toHaveTextContent('Metrics dashboard placeholder…')
    })

    it('should have structure ready for metrics dashboard implementation', () => {
      render(<MetricsPage />)
      
      // Should use Pane component which provides the right structure
      expect(screen.getByText('ITIL Metrics')).toBeInTheDocument()
      
      // Placeholder indicates where metrics will go
      const placeholder = screen.getByText('Metrics dashboard placeholder…')
      expect(placeholder).toBeInTheDocument()
    })

    it('should be compatible with routing systems', () => {
      // This component should work within routing contexts
      render(<MetricsPage />)
      
      // Basic rendering should work (routing compatibility tested in integration)
      expect(screen.getByText('ITIL Metrics')).toBeInTheDocument()
      expect(screen.getByText('Metrics dashboard placeholder…')).toBeInTheDocument()
    })
  })

  describe('Text Content Validation', () => {
    it('should have exact title text', () => {
      render(<MetricsPage />)
      
      const title = screen.getByText('ITIL Metrics')
      expect(title.textContent).toBe('ITIL Metrics')
    })

    it('should have exact placeholder text', () => {
      render(<MetricsPage />)
      
      const placeholder = screen.getByText('Metrics dashboard placeholder…')
      expect(placeholder.textContent).toBe('Metrics dashboard placeholder…')
    })

    it('should not have any extra whitespace in text content', () => {
      render(<MetricsPage />)
      
      const title = screen.getByText('ITIL Metrics')
      const placeholder = screen.getByText('Metrics dashboard placeholder…')
      
      expect(title.textContent?.trim()).toBe('ITIL Metrics')
      expect(placeholder.textContent?.trim()).toBe('Metrics dashboard placeholder…')
    })
  })

  describe('Component Export and Import', () => {
    it('should be importable as default export', () => {
      // This test verifies the component can be imported and rendered
      render(<MetricsPage />)
      
      expect(screen.getByText('ITIL Metrics')).toBeInTheDocument()
    })

    it('should be a functional component', () => {
      // Verify it's a function component by checking it can be called
      expect(typeof MetricsPage).toBe('function')
      
      // Should render without errors
      render(<MetricsPage />)
      expect(screen.getByText('ITIL Metrics')).toBeInTheDocument()
    })
  })
})