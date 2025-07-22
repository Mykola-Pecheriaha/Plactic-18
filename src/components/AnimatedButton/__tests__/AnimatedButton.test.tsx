import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AnimatedButton from '../AnimatedButton';

describe('AnimatedButton', () => {
  it('renders with default props', () => {
    render(<AnimatedButton>Click me</AnimatedButton>);
    
    const button = screen.getByText('Click me');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('button-hover', 'button-animated');
  });

  it('applies hover animation class', () => {
    render(<AnimatedButton variant="hover">Hover me</AnimatedButton>);
    
    const button = screen.getByText('Hover me');
    expect(button).toHaveClass('button-hover');
    expect(button).not.toHaveClass('button-animated');
  });

  it('applies pulse animation class', () => {
    render(<AnimatedButton variant="pulse">Pulse me</AnimatedButton>);
    
    const button = screen.getByText('Pulse me');
    expect(button).toHaveClass('button-animated');
    expect(button).not.toHaveClass('button-hover');
  });

  it('applies both animation classes', () => {
    render(<AnimatedButton variant="both">Animate me</AnimatedButton>);
    
    const button = screen.getByText('Animate me');
    expect(button).toHaveClass('button-hover', 'button-animated');
  });

  it('merges custom className with animation classes', () => {
    render(
      <AnimatedButton className="custom-class">
        Custom Button
      </AnimatedButton>
    );
    
    const button = screen.getByText('Custom Button');
    expect(button).toHaveClass('custom-class', 'button-hover', 'button-animated');
  });

  it('handles click events', async () => {
    const handleClick = jest.fn();
    render(
      <AnimatedButton onClick={handleClick}>
        Click me
      </AnimatedButton>
    );
    
    const button = screen.getByText('Click me');
    await userEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('can be disabled', () => {
    render(<AnimatedButton disabled>Disabled</AnimatedButton>);
    
    const button = screen.getByText('Disabled');
    expect(button).toBeDisabled();
  });
}); 