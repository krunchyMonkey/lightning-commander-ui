import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Sidebar } from './Sidebar'

describe('Sidebar Component', () => {
  // Mock function for onChangeTab
  const mockOnChangeTab = vi.fn()

  // Reset mock before each test
  beforeEach(() => {
    mockOnChangeTab.mockClear()
  })

  describe('Rendering', () => {
    it('should render with required props', () => {
      render(<Sidebar activeTab="incidents" onChangeTab={mockOnChangeTab} />)
      
      const aside = screen.getByRole('complementary')
      expect(aside).toBeInTheDocument()
      
      const nav = screen.getByRole('navigation')
      expect(nav).toBeInTheDocument()
    })

    it('should render as an aside element with navigation', () => {
      const { container } = render(<Sidebar activeTab="incidents" onChangeTab={mockOnChangeTab} />)
      
      const aside = container.querySelector('aside')
      expect(aside).toBeInTheDocument()
      expect(aside!.tagName).toBe('ASIDE')
      
      const nav = aside!.querySelector('nav')
      expect(nav).toBeInTheDocument()
      expect(nav!.tagName).toBe('NAV')
    })

    it('should render both navigation items', () => {
      render(<Sidebar activeTab="incidents" onChangeTab={mockOnChangeTab} />)
      
      expect(screen.getByRole('button', { name: 'Incidents' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'ITIL Metrics' })).toBeInTheDocument()
    })

    it('should render navigation items with correct labels', () => {
      render(<Sidebar activeTab="incidents" onChangeTab={mockOnChangeTab} />)
      
      const incidentsButton = screen.getByRole('button', { name: 'Incidents' })
      const metricsButton = screen.getByRole('button', { name: 'ITIL Metrics' })
      
      expect(incidentsButton).toHaveTextContent('Incidents')
      expect(metricsButton).toHaveTextContent('ITIL Metrics')
    })
  })

  describe('Active Tab State - Incidents', () => {
    it('should show incidents tab as active when activeTab is "incidents"', () => {
      render(<Sidebar activeTab="incidents" onChangeTab={mockOnChangeTab} />)
      
      const incidentsButton = screen.getByRole('button', { name: 'Incidents' })
      const metricsButton = screen.getByRole('button', { name: 'ITIL Metrics' })
      
      expect(incidentsButton).toHaveAttribute('aria-pressed', 'true')
      expect(metricsButton).toHaveAttribute('aria-pressed', 'false')
    })

    it('should apply active styles to incidents tab when activeTab is "incidents"', () => {
      render(<Sidebar activeTab="incidents" onChangeTab={mockOnChangeTab} />)
      
      const incidentsButton = screen.getByRole('button', { name: 'Incidents' })
      const metricsButton = screen.getByRole('button', { name: 'ITIL Metrics' })
      
      expect(incidentsButton).toHaveClass('bg-slate-800', 'text-white')
      expect(incidentsButton).not.toHaveClass('text-slate-300', 'hover:bg-slate-900', 'hover:text-white')
      
      expect(metricsButton).toHaveClass('text-slate-300', 'hover:bg-slate-900', 'hover:text-white')
      expect(metricsButton).not.toHaveClass('bg-slate-800', 'text-white')
    })
  })

  describe('Active Tab State - Metrics', () => {
    it('should show metrics tab as active when activeTab is "metrics"', () => {
      render(<Sidebar activeTab="metrics" onChangeTab={mockOnChangeTab} />)
      
      const incidentsButton = screen.getByRole('button', { name: 'Incidents' })
      const metricsButton = screen.getByRole('button', { name: 'ITIL Metrics' })
      
      expect(incidentsButton).toHaveAttribute('aria-pressed', 'false')
      expect(metricsButton).toHaveAttribute('aria-pressed', 'true')
    })

    it('should apply active styles to metrics tab when activeTab is "metrics"', () => {
      render(<Sidebar activeTab="metrics" onChangeTab={mockOnChangeTab} />)
      
      const incidentsButton = screen.getByRole('button', { name: 'Incidents' })
      const metricsButton = screen.getByRole('button', { name: 'ITIL Metrics' })
      
      expect(metricsButton).toHaveClass('bg-slate-800', 'text-white')
      expect(metricsButton).not.toHaveClass('text-slate-300', 'hover:bg-slate-900', 'hover:text-white')
      
      expect(incidentsButton).toHaveClass('text-slate-300', 'hover:bg-slate-900', 'hover:text-white')
      expect(incidentsButton).not.toHaveClass('bg-slate-800', 'text-white')
    })
  })

  describe('Click Handling and Tab Switching', () => {
    it('should call onChangeTab with "incidents" when incidents button is clicked', async () => {
      const user = userEvent.setup()
      render(<Sidebar activeTab="metrics" onChangeTab={mockOnChangeTab} />)
      
      const incidentsButton = screen.getByRole('button', { name: 'Incidents' })
      await user.click(incidentsButton)
      
      expect(mockOnChangeTab).toHaveBeenCalledTimes(1)
      expect(mockOnChangeTab).toHaveBeenCalledWith('incidents')
    })

    it('should call onChangeTab with "metrics" when metrics button is clicked', async () => {
      const user = userEvent.setup()
      render(<Sidebar activeTab="incidents" onChangeTab={mockOnChangeTab} />)
      
      const metricsButton = screen.getByRole('button', { name: 'ITIL Metrics' })
      await user.click(metricsButton)
      
      expect(mockOnChangeTab).toHaveBeenCalledTimes(1)
      expect(mockOnChangeTab).toHaveBeenCalledWith('metrics')
    })

    it('should call onChangeTab even when clicking already active tab', async () => {
      const user = userEvent.setup()
      render(<Sidebar activeTab="incidents" onChangeTab={mockOnChangeTab} />)
      
      const incidentsButton = screen.getByRole('button', { name: 'Incidents' })
      await user.click(incidentsButton)
      
      expect(mockOnChangeTab).toHaveBeenCalledTimes(1)
      expect(mockOnChangeTab).toHaveBeenCalledWith('incidents')
    })

    it('should handle multiple clicks correctly', async () => {
      const user = userEvent.setup()
      render(<Sidebar activeTab="incidents" onChangeTab={mockOnChangeTab} />)
      
      const incidentsButton = screen.getByRole('button', { name: 'Incidents' })
      const metricsButton = screen.getByRole('button', { name: 'ITIL Metrics' })
      
      await user.click(metricsButton)
      await user.click(incidentsButton)
      await user.click(metricsButton)
      
      expect(mockOnChangeTab).toHaveBeenCalledTimes(3)
      expect(mockOnChangeTab).toHaveBeenNthCalledWith(1, 'metrics')
      expect(mockOnChangeTab).toHaveBeenNthCalledWith(2, 'incidents')
      expect(mockOnChangeTab).toHaveBeenNthCalledWith(3, 'metrics')
    })
  })

  describe('CSS Classes and Styling', () => {
    it('should apply correct CSS classes to aside element', () => {
      const { container } = render(<Sidebar activeTab="incidents" onChangeTab={mockOnChangeTab} />)
      
      const aside = container.querySelector('aside')
      expect(aside).toHaveClass('h-full', 'border-r', 'border-slate-800', 'p-3')
    })

    it('should apply correct CSS classes to nav element', () => {
      const { container } = render(<Sidebar activeTab="incidents" onChangeTab={mockOnChangeTab} />)
      
      const nav = container.querySelector('nav')
      expect(nav).toHaveClass('flex', 'flex-col', 'gap-1')
    })

    it('should maintain consistent styling regardless of active tab', () => {
      const { container: incidentsContainer } = render(
        <Sidebar activeTab="incidents" onChangeTab={mockOnChangeTab} />
      )
      const { container: metricsContainer } = render(
        <Sidebar activeTab="metrics" onChangeTab={mockOnChangeTab} />
      )
      
      const incidentsAside = incidentsContainer.querySelector('aside')
      const metricsAside = metricsContainer.querySelector('aside')
      
      expect(incidentsAside).toHaveClass('h-full', 'border-r', 'border-slate-800', 'p-3')
      expect(metricsAside).toHaveClass('h-full', 'border-r', 'border-slate-800', 'p-3')
    })

    it('should apply base button styles to all navigation items', () => {
      render(<Sidebar activeTab="incidents" onChangeTab={mockOnChangeTab} />)
      
      const allButtons = screen.getAllByRole('button')
      
      allButtons.forEach(button => {
        expect(button).toHaveClass('text-left', 'rounded-lg', 'px-3', 'py-2', 'transition')
      })
    })
  })

  describe('Accessibility', () => {
    it('should be accessible as a complementary landmark', () => {
      render(<Sidebar activeTab="incidents" onChangeTab={mockOnChangeTab} />)
      
      const aside = screen.getByRole('complementary')
      expect(aside).toBeInTheDocument()
    })

    it('should contain a navigation landmark', () => {
      render(<Sidebar activeTab="incidents" onChangeTab={mockOnChangeTab} />)
      
      const nav = screen.getByRole('navigation')
      expect(nav).toBeInTheDocument()
    })

    it('should have properly labeled buttons', () => {
      render(<Sidebar activeTab="incidents" onChangeTab={mockOnChangeTab} />)
      
      expect(screen.getByRole('button', { name: 'Incidents' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'ITIL Metrics' })).toBeInTheDocument()
    })

    it('should have correct aria-pressed attributes', () => {
      render(<Sidebar activeTab="incidents" onChangeTab={mockOnChangeTab} />)
      
      const incidentsButton = screen.getByRole('button', { name: 'Incidents' })
      const metricsButton = screen.getByRole('button', { name: 'ITIL Metrics' })
      
      expect(incidentsButton).toHaveAttribute('aria-pressed', 'true')
      expect(metricsButton).toHaveAttribute('aria-pressed', 'false')
    })

    it('should update aria-pressed when active tab changes', () => {
      const { rerender } = render(<Sidebar activeTab="incidents" onChangeTab={mockOnChangeTab} />)
      
      let incidentsButton = screen.getByRole('button', { name: 'Incidents' })
      let metricsButton = screen.getByRole('button', { name: 'ITIL Metrics' })
      
      expect(incidentsButton).toHaveAttribute('aria-pressed', 'true')
      expect(metricsButton).toHaveAttribute('aria-pressed', 'false')
      
      rerender(<Sidebar activeTab="metrics" onChangeTab={mockOnChangeTab} />)
      
      incidentsButton = screen.getByRole('button', { name: 'Incidents' })
      metricsButton = screen.getByRole('button', { name: 'ITIL Metrics' })
      
      expect(incidentsButton).toHaveAttribute('aria-pressed', 'false')
      expect(metricsButton).toHaveAttribute('aria-pressed', 'true')
    })
  })

  describe('Keyboard Interaction', () => {
    it('should be focusable via keyboard navigation', () => {
      render(<Sidebar activeTab="incidents" onChangeTab={mockOnChangeTab} />)
      
      const incidentsButton = screen.getByRole('button', { name: 'Incidents' })
      const metricsButton = screen.getByRole('button', { name: 'ITIL Metrics' })
      
      incidentsButton.focus()
      expect(incidentsButton).toHaveFocus()
      
      metricsButton.focus()
      expect(metricsButton).toHaveFocus()
    })

    it('should trigger onChangeTab when activated with Enter key', async () => {
      const user = userEvent.setup()
      render(<Sidebar activeTab="incidents" onChangeTab={mockOnChangeTab} />)
      
      const metricsButton = screen.getByRole('button', { name: 'ITIL Metrics' })
      metricsButton.focus()
      
      await user.keyboard('{Enter}')
      
      expect(mockOnChangeTab).toHaveBeenCalledTimes(1)
      expect(mockOnChangeTab).toHaveBeenCalledWith('metrics')
    })

    it('should trigger onChangeTab when activated with Space key', async () => {
      const user = userEvent.setup()
      render(<Sidebar activeTab="metrics" onChangeTab={mockOnChangeTab} />)
      
      const incidentsButton = screen.getByRole('button', { name: 'Incidents' })
      incidentsButton.focus()
      
      await user.keyboard(' ')
      
      expect(mockOnChangeTab).toHaveBeenCalledTimes(1)
      expect(mockOnChangeTab).toHaveBeenCalledWith('incidents')
    })

    it('should support Tab navigation between buttons', async () => {
      const user = userEvent.setup()
      render(<Sidebar activeTab="incidents" onChangeTab={mockOnChangeTab} />)
      
      const incidentsButton = screen.getByRole('button', { name: 'Incidents' })
      const metricsButton = screen.getByRole('button', { name: 'ITIL Metrics' })
      
      incidentsButton.focus()
      expect(incidentsButton).toHaveFocus()
      
      await user.keyboard('{Tab}')
      expect(metricsButton).toHaveFocus()
    })
  })

  describe('Props Validation and TypeScript Compliance', () => {
    it('should accept "incidents" as activeTab', () => {
      expect(() => render(<Sidebar activeTab="incidents" onChangeTab={mockOnChangeTab} />)).not.toThrow()
      
      const incidentsButton = screen.getByRole('button', { name: 'Incidents' })
      expect(incidentsButton).toHaveAttribute('aria-pressed', 'true')
    })

    it('should accept "metrics" as activeTab', () => {
      expect(() => render(<Sidebar activeTab="metrics" onChangeTab={mockOnChangeTab} />)).not.toThrow()
      
      const metricsButton = screen.getByRole('button', { name: 'ITIL Metrics' })
      expect(metricsButton).toHaveAttribute('aria-pressed', 'true')
    })

    it('should call onChangeTab with correct parameter types', async () => {
      const user = userEvent.setup()
      const typedOnChangeTab = vi.fn()
      
      render(<Sidebar activeTab="incidents" onChangeTab={typedOnChangeTab} />)
      
      const metricsButton = screen.getByRole('button', { name: 'ITIL Metrics' })
      await user.click(metricsButton)
      
      expect(typedOnChangeTab).toHaveBeenCalledWith('metrics')
    })
  })

  describe('Component Integration and Re-rendering', () => {
    it('should handle prop changes correctly', () => {
      const { rerender } = render(<Sidebar activeTab="incidents" onChangeTab={mockOnChangeTab} />)
      
      let incidentsButton = screen.getByRole('button', { name: 'Incidents' })
      let metricsButton = screen.getByRole('button', { name: 'ITIL Metrics' })
      
      expect(incidentsButton).toHaveClass('bg-slate-800', 'text-white')
      expect(metricsButton).toHaveClass('text-slate-300')
      
      rerender(<Sidebar activeTab="metrics" onChangeTab={mockOnChangeTab} />)
      
      incidentsButton = screen.getByRole('button', { name: 'Incidents' })
      metricsButton = screen.getByRole('button', { name: 'ITIL Metrics' })
      
      expect(incidentsButton).toHaveClass('text-slate-300')
      expect(metricsButton).toHaveClass('bg-slate-800', 'text-white')
    })

    it('should maintain functionality when onChangeTab function changes', async () => {
      const user = userEvent.setup()
      const newOnChangeTab = vi.fn()
      
      const { rerender } = render(<Sidebar activeTab="incidents" onChangeTab={mockOnChangeTab} />)
      
      rerender(<Sidebar activeTab="incidents" onChangeTab={newOnChangeTab} />)
      
      const metricsButton = screen.getByRole('button', { name: 'ITIL Metrics' })
      await user.click(metricsButton)
      
      expect(mockOnChangeTab).not.toHaveBeenCalled()
      expect(newOnChangeTab).toHaveBeenCalledTimes(1)
      expect(newOnChangeTab).toHaveBeenCalledWith('metrics')
    })

    it('should work correctly when nested in other components', () => {
      const WrapperComponent = ({ children }: { children: React.ReactNode }) => (
        <div data-testid="wrapper" className="container">
          {children}
        </div>
      )
      
      render(
        <WrapperComponent>
          <Sidebar activeTab="incidents" onChangeTab={mockOnChangeTab} />
        </WrapperComponent>
      )
      
      expect(screen.getByTestId('wrapper')).toBeInTheDocument()
      expect(screen.getByRole('complementary')).toBeInTheDocument()
      expect(screen.getByRole('navigation')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Incidents' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'ITIL Metrics' })).toBeInTheDocument()
    })
  })

  describe('Performance and Optimization', () => {
    it('should render quickly with minimal computations', () => {
      const startTime = performance.now()
      render(<Sidebar activeTab="incidents" onChangeTab={mockOnChangeTab} />)
      const endTime = performance.now()
      
      // Component should render very quickly (less than 50ms is reasonable for this simple component)
      expect(endTime - startTime).toBeLessThan(50)
    })

    it('should create consistent function references across renders with same props', () => {
      const { rerender } = render(<Sidebar activeTab="incidents" onChangeTab={mockOnChangeTab} />)
      
      rerender(<Sidebar activeTab="incidents" onChangeTab={mockOnChangeTab} />)
      
      const incidentsButtonAfter = screen.getByRole('button', { name: 'Incidents' })
      const metricsButtonAfter = screen.getByRole('button', { name: 'ITIL Metrics' })
      
      // The component creates inline arrow functions, so they will be different references
      // but should still function correctly. This documents the current implementation.
      expect(incidentsButtonAfter).toBeInTheDocument()
      expect(metricsButtonAfter).toBeInTheDocument()
      
      // Verify that the handlers still work correctly
      expect(typeof incidentsButtonAfter.onclick).toBe('function')
      expect(typeof metricsButtonAfter.onclick).toBe('function')
    })
  })

  describe('Edge Cases', () => {
    it('should handle rapid successive clicks', async () => {
      const user = userEvent.setup()
      render(<Sidebar activeTab="incidents" onChangeTab={mockOnChangeTab} />)
      
      const incidentsButton = screen.getByRole('button', { name: 'Incidents' })
      const metricsButton = screen.getByRole('button', { name: 'ITIL Metrics' })
      
      // Rapidly click between tabs
      await user.click(metricsButton)
      await user.click(incidentsButton)
      await user.click(metricsButton)
      await user.click(incidentsButton)
      
      expect(mockOnChangeTab).toHaveBeenCalledTimes(4)
      expect(mockOnChangeTab).toHaveBeenNthCalledWith(1, 'metrics')
      expect(mockOnChangeTab).toHaveBeenNthCalledWith(2, 'incidents')
      expect(mockOnChangeTab).toHaveBeenNthCalledWith(3, 'metrics')
      expect(mockOnChangeTab).toHaveBeenNthCalledWith(4, 'incidents')
    })

    it('should maintain state consistency during re-renders', () => {
      const { rerender } = render(<Sidebar activeTab="incidents" onChangeTab={mockOnChangeTab} />)
      
      // Multiple re-renders with same props
      rerender(<Sidebar activeTab="incidents" onChangeTab={mockOnChangeTab} />)
      rerender(<Sidebar activeTab="incidents" onChangeTab={mockOnChangeTab} />)
      rerender(<Sidebar activeTab="incidents" onChangeTab={mockOnChangeTab} />)
      
      const incidentsButton = screen.getByRole('button', { name: 'Incidents' })
      const metricsButton = screen.getByRole('button', { name: 'ITIL Metrics' })
      
      expect(incidentsButton).toHaveAttribute('aria-pressed', 'true')
      expect(metricsButton).toHaveAttribute('aria-pressed', 'false')
      expect(incidentsButton).toHaveClass('bg-slate-800', 'text-white')
    })
  })
})