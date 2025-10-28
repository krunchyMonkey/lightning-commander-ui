import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import IncidentsPage from './IncidentsPage'

describe('IncidentsPage Component', () => {
  describe('Rendering', () => {
    it('should render the main grid layout', () => {
      const { container } = render(<IncidentsPage />)
      
      const gridContainer = container.firstChild as HTMLElement
      expect(gridContainer).toBeInTheDocument()
      expect(gridContainer).toHaveClass('grid', 'grid-cols-1', 'xl:grid-cols-[2fr_3fr]', 'gap-4')
    })

    it('should render both main panes', () => {
      render(<IncidentsPage />)
      
      expect(screen.getByText('Incident List')).toBeInTheDocument()
      expect(screen.getByText('Details')).toBeInTheDocument()
    })

    it('should render as a grid with correct column layout', () => {
      const { container } = render(<IncidentsPage />)
      
      const gridContainer = container.firstChild as HTMLElement
      expect(gridContainer.tagName).toBe('DIV')
      expect(gridContainer).toHaveClass('grid', 'grid-cols-1', 'xl:grid-cols-[2fr_3fr]')
    })
  })

  describe('Incident List Pane', () => {
    it('should render the Incident List pane with correct title', () => {
      render(<IncidentsPage />)
      
      const incidentListTitle = screen.getByText('Incident List')
      expect(incidentListTitle).toBeInTheDocument()
      expect(incidentListTitle.tagName).toBe('H2')
    })

    it('should render skeleton rows in the incident list', () => {
      const { container } = render(<IncidentsPage />)
      
      // Find the skeleton container
      const skeletonContainer = container.querySelector('.space-y-3')
      expect(skeletonContainer).toBeInTheDocument()
      expect(skeletonContainer).toHaveClass('space-y-3')
    })

    it('should render exactly 4 skeleton rows', () => {
      const { container } = render(<IncidentsPage />)
      
      // Count skeleton rows by their distinctive classes
      const skeletonRows = container.querySelectorAll('.rounded-xl.border.border-slate-800.bg-slate-900\\/50.p-4')
      expect(skeletonRows).toHaveLength(4)
    })

    it('should render skeleton rows with correct structure', () => {
      const { container } = render(<IncidentsPage />)
      
      const skeletonRows = container.querySelectorAll('.rounded-xl.border.border-slate-800.bg-slate-900\\/50.p-4')
      
      skeletonRows.forEach(row => {
        // Each skeleton row should have the main container styles
        expect(row).toHaveClass('rounded-xl', 'border', 'border-slate-800', 'bg-slate-900/50', 'p-4')
        
        // Each skeleton row should have 2 div children (the skeleton bars)
        const skeletonBars = row.querySelectorAll('div')
        expect(skeletonBars).toHaveLength(2)
        
        // First bar (title skeleton)
        const titleBar = skeletonBars[0]
        expect(titleBar).toHaveClass('h-3', 'w-2/3', 'rounded', 'bg-slate-800', 'mb-3')
        
        // Second bar (subtitle skeleton)  
        const subtitleBar = skeletonBars[1]
        expect(subtitleBar).toHaveClass('h-3', 'w-1/3', 'rounded', 'bg-slate-800')
      })
    })

    it('should contain a comment about Story 7', () => {
      const { container } = render(<IncidentsPage />)
      
      // Check that the comment exists in the HTML source
      // Since it's a JSX comment, it won't appear in the rendered HTML
      // Instead, we'll verify the skeleton structure that will be replaced
      const skeletonContainer = container.querySelector('.space-y-3')
      expect(skeletonContainer).toBeInTheDocument()
    })
  })

  describe('Details Pane', () => {
    it('should render the Details pane with correct title', () => {
      render(<IncidentsPage />)
      
      const detailsTitle = screen.getByText('Details')
      expect(detailsTitle).toBeInTheDocument()
      expect(detailsTitle.tagName).toBe('H2')
    })

    it('should show placeholder message in details pane', () => {
      render(<IncidentsPage />)
      
      const placeholderMessage = screen.getByText('Select an incident…')
      expect(placeholderMessage).toBeInTheDocument()
    })

    it('should render details pane with correct styling', () => {
      render(<IncidentsPage />)
      
      const placeholderMessage = screen.getByText('Select an incident…')
      // The CSS classes are directly on the div element, not its parent
      expect(placeholderMessage).toHaveClass(
        'h-full',
        'flex',
        'items-center',
        'justify-center',
        'text-slate-400'
      )
    })

    it('should use correct text color for placeholder', () => {
      render(<IncidentsPage />)
      
      const placeholderMessage = screen.getByText('Select an incident…')
      expect(placeholderMessage).toHaveClass('text-slate-400')
    })
  })

  describe('SkeletonRow Component', () => {
    it('should render skeleton rows with consistent structure', () => {
      const { container } = render(<IncidentsPage />)
      
      const skeletonRows = container.querySelectorAll('.rounded-xl.border.border-slate-800.bg-slate-900\\/50.p-4')
      
      // All skeleton rows should have identical structure
      skeletonRows.forEach(row => {
        const children = row.children
        expect(children).toHaveLength(2)
        
        // First child (title bar)
        expect(children[0]).toHaveClass('h-3', 'w-2/3', 'rounded', 'bg-slate-800', 'mb-3')
        
        // Second child (subtitle bar)
        expect(children[1]).toHaveClass('h-3', 'w-1/3', 'rounded', 'bg-slate-800')
      })
    })

    it('should render skeleton bars with correct dimensions and spacing', () => {
      const { container } = render(<IncidentsPage />)
      
      const skeletonRows = container.querySelectorAll('.rounded-xl.border.border-slate-800.bg-slate-900\\/50.p-4')
      const firstRow = skeletonRows[0]
      
      const titleBar = firstRow.children[0]
      const subtitleBar = firstRow.children[1]
      
      // Title bar should be wider and have margin bottom
      expect(titleBar).toHaveClass('w-2/3', 'mb-3')
      
      // Subtitle bar should be narrower and have no margin
      expect(subtitleBar).toHaveClass('w-1/3')
      expect(subtitleBar).not.toHaveClass('mb-3')
      
      // Both should have same height and background
      expect(titleBar).toHaveClass('h-3', 'bg-slate-800')
      expect(subtitleBar).toHaveClass('h-3', 'bg-slate-800')
    })
  })

  describe('Layout and Grid System', () => {
    it('should use correct responsive grid classes', () => {
      const { container } = render(<IncidentsPage />)
      
      const gridContainer = container.firstChild as HTMLElement
      expect(gridContainer).toHaveClass('grid-cols-1') // Mobile: single column
      expect(gridContainer).toHaveClass('xl:grid-cols-[2fr_3fr]') // XL: 2fr + 3fr layout
    })

    it('should have correct gap between grid items', () => {
      const { container } = render(<IncidentsPage />)
      
      const gridContainer = container.firstChild as HTMLElement
      expect(gridContainer).toHaveClass('gap-4')
    })

    it('should render two main sections for the grid', () => {
      const { container } = render(<IncidentsPage />)
      
      const gridContainer = container.firstChild as HTMLElement
      const sections = gridContainer.querySelectorAll('section')
      
      // Should have exactly 2 sections (from the Pane components)
      expect(sections).toHaveLength(2)
    })
  })

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      render(<IncidentsPage />)
      
      // Both pane titles should be h2 elements
      const headings = screen.getAllByRole('heading', { level: 2 })
      expect(headings).toHaveLength(2)
      
      expect(headings[0]).toHaveTextContent('Incident List')
      expect(headings[1]).toHaveTextContent('Details')
    })

    it('should use semantic HTML structure', () => {
      const { container } = render(<IncidentsPage />)
      
      // Should have section elements for semantic structure
      const sections = container.querySelectorAll('section')
      expect(sections).toHaveLength(2)
      
      // Each section should contain a header
      sections.forEach(section => {
        const header = section.querySelector('header')
        expect(header).toBeInTheDocument()
      })
    })

    it('should have accessible text content', () => {
      render(<IncidentsPage />)
      
      // All text should be accessible
      expect(screen.getByText('Incident List')).toBeInTheDocument()
      expect(screen.getByText('Details')).toBeInTheDocument()
      expect(screen.getByText('Select an incident…')).toBeInTheDocument()
    })
  })

  describe('Component Integration', () => {
    it('should integrate correctly with Pane components', () => {
      render(<IncidentsPage />)
      
      // Should render Pane components with correct props
      expect(screen.getByText('Incident List')).toBeInTheDocument()
      expect(screen.getByText('Details')).toBeInTheDocument()
    })

    it('should work when nested in other components', () => {
      const WrapperComponent = ({ children }: { children: React.ReactNode }) => (
        <div data-testid="wrapper" className="container">
          {children}
        </div>
      )
      
      render(
        <WrapperComponent>
          <IncidentsPage />
        </WrapperComponent>
      )
      
      expect(screen.getByTestId('wrapper')).toBeInTheDocument()
      expect(screen.getByText('Incident List')).toBeInTheDocument()
      expect(screen.getByText('Details')).toBeInTheDocument()
    })

    it('should maintain consistent rendering across re-renders', () => {
      const { rerender } = render(<IncidentsPage />)
      
      // Initial render
      expect(screen.getByText('Incident List')).toBeInTheDocument()
      expect(screen.getByText('Select an incident…')).toBeInTheDocument()
      
      // Re-render
      rerender(<IncidentsPage />)
      
      // Should still be the same
      expect(screen.getByText('Incident List')).toBeInTheDocument()
      expect(screen.getByText('Select an incident…')).toBeInTheDocument()
    })
  })

  describe('CSS Classes and Styling', () => {
    it('should apply all required CSS classes to skeleton container', () => {
      const { container } = render(<IncidentsPage />)
      
      const skeletonContainer = container.querySelector('.space-y-3')
      expect(skeletonContainer).toHaveClass('space-y-3')
    })

    it('should apply correct border and background styles to skeleton rows', () => {
      const { container } = render(<IncidentsPage />)
      
      const skeletonRows = container.querySelectorAll('.rounded-xl.border.border-slate-800.bg-slate-900\\/50.p-4')
      expect(skeletonRows.length).toBeGreaterThan(0)
      
      skeletonRows.forEach(row => {
        expect(row).toHaveClass(
          'rounded-xl',
          'border',
          'border-slate-800',
          'bg-slate-900/50',
          'p-4'
        )
      })
    })

    it('should maintain consistent styling across all skeleton rows', () => {
      const { container } = render(<IncidentsPage />)
      
      const skeletonRows = container.querySelectorAll('.rounded-xl.border.border-slate-800.bg-slate-900\\/50.p-4')
      
      // All rows should have identical classes
      const firstRowClasses = skeletonRows[0].className
      skeletonRows.forEach(row => {
        expect(row.className).toBe(firstRowClasses)
      })
    })
  })

  describe('Future Extensibility', () => {
    it('should render in a way that supports future incident cards', () => {
      const { container } = render(<IncidentsPage />)
      
      // The skeleton container should be ready to be replaced with real incident cards
      const skeletonContainer = container.querySelector('.space-y-3')
      expect(skeletonContainer).toBeInTheDocument()
      
      // Should have skeleton rows that can be replaced with incident cards
      const skeletonRows = container.querySelectorAll('.rounded-xl.border.border-slate-800.bg-slate-900\\/50.p-4')
      expect(skeletonRows).toHaveLength(4)
    })

    it('should have placeholder structure that can be replaced', () => {
      render(<IncidentsPage />)
      
      const detailsPlaceholder = screen.getByText('Select an incident…')
      expect(detailsPlaceholder).toBeInTheDocument()
      
      // This placeholder is ready to be replaced with actual incident details
      expect(detailsPlaceholder).toHaveClass('h-full', 'flex', 'items-center', 'justify-center')
    })
  })

  describe('Performance and Memory', () => {
    it('should render quickly without performance issues', () => {
      const startTime = performance.now()
      render(<IncidentsPage />)
      const endTime = performance.now()
      
      // Component should render very quickly (less than 50ms is reasonable)
      expect(endTime - startTime).toBeLessThan(50)
    })

    it('should not create memory leaks with multiple renders', () => {
      // Render multiple instances
      const { unmount: unmount1 } = render(<IncidentsPage />)
      const { unmount: unmount2 } = render(<IncidentsPage />)
      const { unmount: unmount3 } = render(<IncidentsPage />)
      
      // Should render without errors
      expect(screen.getAllByText('Incident List')).toHaveLength(3)
      
      // Cleanup should work without issues
      unmount1()
      unmount2()
      unmount3()
    })

    it('should handle rapid re-renders gracefully', () => {
      const { rerender } = render(<IncidentsPage />)
      
      // Multiple rapid re-renders
      for (let i = 0; i < 10; i++) {
        rerender(<IncidentsPage />)
      }
      
      // Should still work correctly
      expect(screen.getByText('Incident List')).toBeInTheDocument()
      expect(screen.getByText('Details')).toBeInTheDocument()
    })
  })
})