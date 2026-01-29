import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Calculations from '../components/Calculations';

describe('Calculations Component', () => {
  test('renders calculation interface', () => {
    render(<Calculations />);
    
    expect(screen.getByText('Result')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('Evaluate')).toBeInTheDocument();
    expect(screen.getByLabelText('operation')).toBeInTheDocument();
  });

  test('performs addition correctly', () => {
    render(<Calculations />);
    
    const firstInput = screen.getByLabelText('first number');
    const secondInput = screen.getByLabelText('second number');
    const evaluateButton = screen.getByText('Evaluate');
    
    fireEvent.input(firstInput, { target: { value: '5' } });
    fireEvent.input(secondInput, { target: { value: '3' } });
    fireEvent.click(evaluateButton);
    
    expect(screen.getByText('8')).toBeInTheDocument();
  });

  test('performs subtraction correctly', () => {
    render(<Calculations />);
    
    const firstInput = screen.getByLabelText('first number');
    const secondInput = screen.getByLabelText('second number');
    const evaluateButton = screen.getByText('Evaluate');
    const operationDropdown = screen.getByLabelText('operation');
    
    fireEvent.input(firstInput, { target: { value: '10' } });
    fireEvent.input(secondInput, { target: { value: '4' } });
    
    fireEvent.click(operationDropdown);
    const minusOption = screen.getByText('-');
    fireEvent.click(minusOption);
    
    fireEvent.click(evaluateButton);
    
    expect(screen.getByText('6')).toBeInTheDocument();
  });

  test('updates operation when dropdown is clicked', () => {
    render(<Calculations />);
    
    const operationDropdown = screen.getByLabelText('operation');
    fireEvent.click(operationDropdown);
    
    const minusOption = screen.getByText('-');
    fireEvent.click(minusOption);
    
    expect(screen.getByLabelText('operation')).toHaveTextContent('-');
  });

  test('calculates result after changing operation', () => {
    render(<Calculations />);
    
    const firstInput = screen.getByLabelText('first number');
    const secondInput = screen.getByLabelText('second number');
    const evaluateButton = screen.getByText('Evaluate');
    const operationDropdown = screen.getByLabelText('operation');
    
    fireEvent.input(firstInput, { target: { value: '7' } });
    fireEvent.input(secondInput, { target: { value: '2' } });
    
    fireEvent.click(evaluateButton);
    const beforeChange = screen.getByText(/\d/).textContent;
    
    fireEvent.click(operationDropdown);
    const minusOption = screen.getByText('-');
    fireEvent.click(minusOption);
    
    fireEvent.click(evaluateButton);
    const afterChange = screen.getByText(/\d/).textContent;
    expect(afterChange).not.toBe(beforeChange);
  });
});
