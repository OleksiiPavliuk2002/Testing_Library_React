import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ButtonGroup from '../components/ButtonGroup';

describe('ButtonGroup Component', () => {
  test('renders alignment interface', () => {
    render(<ButtonGroup />);
    
    expect(screen.getByText('Align')).toBeInTheDocument();
    expect(screen.getByTestId('button-group')).toBeInTheDocument();
    expect(screen.getByTestId('text')).toBeInTheDocument();
  });

  test('displays left alignment by default', () => {
    render(<ButtonGroup />);
    
    const textElement = screen.getByTestId('text');
    const leftRadio = screen.getByLabelText('left');
    
    expect(textElement).toHaveAttribute('align', 'left');
    expect(leftRadio).toBeChecked();
  });

  test('changes alignment to center when center button is clicked', () => {
    render(<ButtonGroup />);
    const centerRadio = screen.getByLabelText('center');
    const textElement = screen.getByTestId('text');
    fireEvent.click(centerRadio);
    expect(textElement).toHaveAttribute('align', 'center');
    expect(centerRadio).toBeChecked();
  });

  test('changes alignment to right when right button is clicked', () => {
    render(<ButtonGroup />);
    
    const rightRadio = screen.getByLabelText('right');
    const textElement = screen.getByTestId('text');
    
    fireEvent.click(rightRadio);
    
    expect(textElement).toHaveAttribute('align', 'right');
    expect(rightRadio).toBeChecked();
  });
});
