import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Animations CSS', () => {
  const getStyle = (element: HTMLElement, property: string) => {
    return window.getComputedStyle(element).getPropertyValue(property);
  };

  it('applies button hover animation correctly', () => {
    const { container } = render(
      <button className="button-hover">Test Button</button>
    );
    const button = container.firstChild as HTMLElement;

    expect(button).toHaveClass('button-hover');
    expect(getStyle(button, 'transition')).toBe('all 0.3s ease');
  });

  it('applies fade-in animation correctly', () => {
    const { container } = render(
      <div className="fade-in">Test Content</div>
    );
    const element = container.firstChild as HTMLElement;

    expect(element).toHaveClass('fade-in');
    expect(getStyle(element, 'animation')).toContain('fadeIn');
  });

  it('applies slide-in animation correctly', () => {
    const { container } = render(
      <div className="slide-in">Test Content</div>
    );
    const element = container.firstChild as HTMLElement;

    expect(element).toHaveClass('slide-in');
    expect(getStyle(element, 'animation')).toContain('slideIn');
  });

  it('applies button pulse animation correctly', () => {
    const { container } = render(
      <button className="button-animated">Test Button</button>
    );
    const button = container.firstChild as HTMLElement;

    expect(button).toHaveClass('button-animated');
    expect(getStyle(button, 'animation')).toContain('buttonPulse');
  });

  it('combines hover and pulse animations', () => {
    const { container } = render(
      <button className="button-hover button-animated">
        Test Button
      </button>
    );
    const button = container.firstChild as HTMLElement;

    expect(button).toHaveClass('button-hover', 'button-animated');
    expect(getStyle(button, 'transition')).toBe('all 0.3s ease');
    expect(getStyle(button, 'animation')).toContain('buttonPulse');
  });
}); 