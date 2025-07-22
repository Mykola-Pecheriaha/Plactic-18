import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../Button';

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    
    const button = screen.getByText('Click me');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('button', 'primary', 'medium');
    expect(button).toHaveClass('button-hover', 'button-animated');
  });

  it('applies variant classes correctly', () => {
    const { rerender } = render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByText('Secondary')).toHaveClass('secondary');

    rerender(<Button variant="outline">Outline</Button>);
    expect(screen.getByText('Outline')).toHaveClass('outline');
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<Button size="small">Small</Button>);
    expect(screen.getByText('Small')).toHaveClass('small');

    rerender(<Button size="large">Large</Button>);
    expect(screen.getByText('Large')).toHaveClass('large');
  });

  it('can disable animations', () => {
    render(<Button isAnimated={false}>Static</Button>);
    const button = screen.getByText('Static');
    expect(button).not.toHaveClass('button-hover', 'button-animated');
  });

  it('merges custom className with default classes', () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByText('Custom');
    expect(button).toHaveClass('custom-class', 'button');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('can be disabled', () => {
    const handleClick = jest.fn();
    render(<Button disabled onClick={handleClick}>Disabled</Button>);
    
    const button = screen.getByText('Disabled');
    expect(button).toBeDisabled();
    
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies hover styles on mouse over', () => {
    render(<Button>Hover me</Button>);
    const button = screen.getByText('Hover me');
    
    fireEvent.mouseOver(button);
    const styles = window.getComputedStyle(button);
    expect(styles.transform).toBe('translateY(-2px)');
    expect(styles.boxShadow).toBe('0 4px 8px rgba(0, 0, 0, 0.1)');
  });
}); 