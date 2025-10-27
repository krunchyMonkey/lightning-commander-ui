import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Pane } from './Pane'

describe('Pane Component', () => {
  describe('Rendering', () => {
    it('should render with required title prop', () => {
      const { container } = render(<Pane title="Test Title" />)
      
      const section = container.querySelector('section')
      expect(section).toBeInTheDocument()
      
      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('Test Title')
    })

    it('should render as a section element with proper structure', () => {
      const { container } = render(<Pane title="Test Section" />)
      
      const section = container.querySelector('section')
      expect(section).toBeInTheDocument()
      expect(section).not.toBeNull()
      expect(section!.tagName).toBe('SECTION')
      
      const header = section!.querySelector('header')
      expect(header).toBeInTheDocument()
      
      const contentDiv = section!.querySelector('div:not(header *)')
      expect(contentDiv).toBeInTheDocument()
    })

    it('should display the correct title text', () => {
      const testTitle = 'My Pane Title'
      render(<Pane title={testTitle} />)
      
      expect(screen.getByText(testTitle)).toBeInTheDocument()
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(testTitle)
    })

    it('should render with empty title string', () => {
      render(<Pane title="" />)
      
      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('')
    })

    it('should handle special characters in title', () => {
      const specialTitle = 'Title with <special> & characters!'
      render(<Pane title={specialTitle} />)
      
      expect(screen.getByText(specialTitle)).toBeInTheDocument()
    })
  })

  describe('Children Content', () => {
    it('should render without children prop', () => {
      const { container } = render(<Pane title="No Children" />)
      
      const section = container.querySelector('section')
      expect(section).toBeInTheDocument()
      
      const contentDiv = section!.querySelector('div:not(header *)')
      expect(contentDiv).toBeInTheDocument()
      expect(contentDiv).toBeEmptyDOMElement()
    })

    it('should render with text children', () => {
      const textContent = 'This is some text content'
      render(<Pane title="With Text">{textContent}</Pane>)
      
      expect(screen.getByText(textContent)).toBeInTheDocument()
    })

    it('should render with JSX element children', () => {
      render(
        <Pane title="With JSX">
          <div data-testid="child-element">
            <p>Paragraph content</p>
            <button>Click me</button>
          </div>
        </Pane>
      )
      
      expect(screen.getByTestId('child-element')).toBeInTheDocument()
      expect(screen.getByText('Paragraph content')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
    })

    it('should render with multiple children', () => {
      render(
        <Pane title="Multiple Children">
          <span>First child</span>
          <span>Second child</span>
          <div>Third child</div>
        </Pane>
      )
      
      expect(screen.getByText('First child')).toBeInTheDocument()
      expect(screen.getByText('Second child')).toBeInTheDocument()
      expect(screen.getByText('Third child')).toBeInTheDocument()
    })

    it('should render with nested components as children', () => {
      const NestedComponent = () => <span data-testid="nested">Nested Component</span>
      
      render(
        <Pane title="Nested Components">
          <NestedComponent />
        </Pane>
      )
      
      expect(screen.getByTestId('nested')).toBeInTheDocument()
      expect(screen.getByText('Nested Component')).toBeInTheDocument()
    })

    it('should handle null and undefined children gracefully', () => {
      render(
        <Pane title="Null Children">
          {null}
          {undefined}
          <span>Visible content</span>
        </Pane>
      )
      
      expect(screen.getByText('Visible content')).toBeInTheDocument()
    })

    it('should handle conditional children', () => {
      const showContent = true
      render(
        <Pane title="Conditional">
          {showContent && <span>Conditional content</span>}
          {!showContent && <span>Alternative content</span>}
        </Pane>
      )
      
      expect(screen.getByText('Conditional content')).toBeInTheDocument()
      expect(screen.queryByText('Alternative content')).not.toBeInTheDocument()
    })
  })

  describe('CSS Classes and Styling', () => {
    it('should apply correct CSS classes to section element', () => {
      const { container } = render(<Pane title="Styled Pane" />)
      
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

    it('should apply correct CSS classes to header element', () => {
      const { container } = render(<Pane title="Header Styles" />)
      
      const section = container.querySelector('section')
      const header = section!.querySelector('header')
      expect(header).toHaveClass('mb-3')
    })

    it('should apply correct CSS classes to heading element', () => {
      render(<Pane title="Heading Styles" />)
      
      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toHaveClass('text-lg', 'font-semibold')
    })

    it('should maintain CSS classes with children present', () => {
      const { container } = render(
        <Pane title="Styles with Children">
          <div>Some content</div>
        </Pane>
      )
      
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
      render(<Pane title="Accessibility Test" />)
      
      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toBeInTheDocument()
      expect(heading.tagName).toBe('H2')
    })

    it('should be accessible as a section landmark', () => {
      const { container } = render(<Pane title="Region Test" />)
      
      const section = container.querySelector('section')
      expect(section).toBeInTheDocument()
      expect(section!.tagName).toBe('SECTION')
    })

    it('should maintain semantic structure with complex children', () => {
      const { container } = render(
        <Pane title="Complex Structure">
          <article>
            <h3>Article Title</h3>
            <p>Article content</p>
          </article>
          <nav>
            <ul>
              <li><a href="#1">Link 1</a></li>
              <li><a href="#2">Link 2</a></li>
            </ul>
          </nav>
        </Pane>
      )
      
      // Verify main structure
      expect(container.querySelector('section')).toBeInTheDocument()
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Complex Structure')
      
      // Verify nested semantic elements
      expect(screen.getByRole('article')).toBeInTheDocument()
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Article Title')
      expect(screen.getByRole('navigation')).toBeInTheDocument()
      expect(screen.getAllByRole('link')).toHaveLength(2)
    })
  })

  describe('Edge Cases and Prop Variations', () => {
    it('should handle very long title text', () => {
      const longTitle = 'This is a very long title that might wrap to multiple lines and should still render correctly without breaking the component layout or functionality'
      render(<Pane title={longTitle} />)
      
      expect(screen.getByText(longTitle)).toBeInTheDocument()
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(longTitle)
    })

    it('should handle title with whitespace', () => {
      const whitespaceTitle = '   Title with spaces   '
      render(<Pane title={whitespaceTitle} />)
      
      // Check that the title is rendered (whitespace will be normalized by HTML)
      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toHaveTextContent('Title with spaces')
      // Verify the original title prop is still passed through
      expect(heading.textContent).toContain('Title with spaces')
    })

    it('should handle numeric title', () => {
      const numericTitle = '12345'
      render(<Pane title={numericTitle} />)
      
      expect(screen.getByText(numericTitle)).toBeInTheDocument()
    })

    it('should handle title with emoji and unicode', () => {
      const emojiTitle = '🚀 Rocket Pane 🌟'
      render(<Pane title={emojiTitle} />)
      
      expect(screen.getByText(emojiTitle)).toBeInTheDocument()
    })

    it('should handle React fragments as children', () => {
      render(
        <Pane title="Fragment Children">
          <>
            <span>Fragment child 1</span>
            <span>Fragment child 2</span>
          </>
        </Pane>
      )
      
      expect(screen.getByText('Fragment child 1')).toBeInTheDocument()
      expect(screen.getByText('Fragment child 2')).toBeInTheDocument()
    })

    it('should handle arrays as children', () => {
      const arrayChildren = [
        <span key="1">Array item 1</span>,
        <span key="2">Array item 2</span>,
        <span key="3">Array item 3</span>
      ]
      
      render(<Pane title="Array Children">{arrayChildren}</Pane>)
      
      expect(screen.getByText('Array item 1')).toBeInTheDocument()
      expect(screen.getByText('Array item 2')).toBeInTheDocument()
      expect(screen.getByText('Array item 3')).toBeInTheDocument()
    })

    it('should handle boolean and number children', () => {
      render(
        <Pane title="Primitive Children">
          {42}
          {true && <span>Boolean true</span>}
          {false && <span>Boolean false</span>}
        </Pane>
      )
      
      expect(screen.getByText('42')).toBeInTheDocument()
      expect(screen.getByText('Boolean true')).toBeInTheDocument()
      expect(screen.queryByText('Boolean false')).not.toBeInTheDocument()
    })
  })

  describe('Component Integration', () => {
    it('should work correctly when nested inside other components', () => {
      const WrapperComponent = ({ children }: { children: React.ReactNode }) => (
        <div data-testid="wrapper">{children}</div>
      )
      
      const { container } = render(
        <WrapperComponent>
          <Pane title="Nested Pane">
            <p>Nested content</p>
          </Pane>
        </WrapperComponent>
      )
      
      expect(screen.getByTestId('wrapper')).toBeInTheDocument()
      expect(container.querySelector('section')).toBeInTheDocument()
      expect(screen.getByText('Nested Pane')).toBeInTheDocument()
      expect(screen.getByText('Nested content')).toBeInTheDocument()
    })

    it('should work correctly with multiple Pane instances', () => {
      const { container } = render(
        <div>
          <Pane title="First Pane">
            <span>First content</span>
          </Pane>
          <Pane title="Second Pane">
            <span>Second content</span>
          </Pane>
        </div>
      )
      
      expect(container.querySelectorAll('section')).toHaveLength(2)
      expect(screen.getByText('First Pane')).toBeInTheDocument()
      expect(screen.getByText('Second Pane')).toBeInTheDocument()
      expect(screen.getByText('First content')).toBeInTheDocument()
      expect(screen.getByText('Second content')).toBeInTheDocument()
    })
  })

  describe('TypeScript Interface Compliance', () => {
    it('should accept all valid prop combinations', () => {
      // Test that the component accepts the props as defined in the interface
      const validProps = {
        title: 'Valid Title',
        children: <div>Valid children</div>
      }
      
      expect(() => render(<Pane {...validProps} />)).not.toThrow()
    })

    it('should render correctly with only required props', () => {
      expect(() => render(<Pane title="Required Only" />)).not.toThrow()
      
      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toHaveTextContent('Required Only')
    })
  })
})