import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../components/App';

describe('App Component', () => {
  test('renders navigation tabs', () => {
    render(<App />);
    
    expect(screen.getByText('Picture')).toBeInTheDocument();
    expect(screen.getByText('Calculations')).toBeInTheDocument();
    expect(screen.getByText('Group')).toBeInTheDocument();
  });

  test('shows ImageCard when Picture tab is selected by default', () => {
    render(<App />);
    
    expect(screen.getByAltText('...')).toBeInTheDocument();
    expect(screen.getByText('Whiskers')).toBeInTheDocument();
    
    expect(screen.queryByText('Result')).not.toBeInTheDocument();
    expect(screen.queryByText('Align')).not.toBeInTheDocument();
  });

  test('shows Calculations component when Calculations tab is clicked', () => {
    render(<App />);
    
    const calculationsTab = screen.getByText('Calculations');
    fireEvent.click(calculationsTab);
    
    expect(screen.getByText('Result')).toBeInTheDocument();
    expect(screen.getByText('Evaluate')).toBeInTheDocument();
    
    expect(screen.queryByAltText('...')).not.toBeInTheDocument();
    expect(screen.queryByText('Whiskers')).not.toBeInTheDocument();
    expect(screen.queryByText('Align')).not.toBeInTheDocument();
  });

  test('shows ButtonGroup component when Group tab is clicked', () => {
    render(<App />);
    
    const groupTab = screen.getByText('Group');
    fireEvent.click(groupTab);
    
    expect(screen.getByText('Align')).toBeInTheDocument();
    expect(screen.getByTestId('button-group')).toBeInTheDocument();
    
    expect(screen.queryByAltText('...')).not.toBeInTheDocument();
    expect(screen.queryByText('Whiskers')).not.toBeInTheDocument();
    expect(screen.queryByText('Result')).not.toBeInTheDocument();
  });

  test('shows ImageCard when Picture tab is clicked after switching', () => {
    render(<App />);

    fireEvent.click(screen.getByText('Group'));
    expect(screen.getByText('Align')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Picture'));

    expect(screen.getByAltText('...')).toBeInTheDocument();
    expect(screen.getByText('Whiskers')).toBeInTheDocument();

    expect(screen.queryByText('Result')).not.toBeInTheDocument();
  });

  test('only one component is displayed at a time', () => {
    render(<App />);

    fireEvent.click(screen.getByText('Group'));
    expect(screen.getByText('Align')).toBeInTheDocument();
    expect(screen.queryByAltText('...')).not.toBeInTheDocument();
    expect(screen.queryByText('Result')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Picture'));
    expect(screen.getByAltText('...')).toBeInTheDocument();
    expect(screen.queryByText('Result')).not.toBeInTheDocument();
  });
});
