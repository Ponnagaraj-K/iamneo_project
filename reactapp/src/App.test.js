import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import App from './App';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ApplyForm from './components/ApplyForm';
import DisplayBikes from './components/DisplayBikes';

// Mock fetch for API calls
global.fetch = jest.fn();

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('React App Tests', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders_home_component_with_title_and_description', () => {
    renderWithRouter(<Home />);
    expect(screen.getByText('Welcome to Faster Bike Taxi')).toBeInTheDocument();
    expect(screen.getByText('Apply now to become a bike taxi driver and start earning!')).toBeInTheDocument();
  });

  test('renders_apply_now_button_with_link_to_apply', () => {
    renderWithRouter(<Home />);
    const applyButton = screen.getByText('Apply Now');
    expect(applyButton).toBeInTheDocument();
    expect(applyButton.closest('a')).toHaveAttribute('href', '/apply');
  });

  test('renders_navbar_component_with_links', () => {
    renderWithRouter(<NavBar />);
    expect(screen.getByText('Faster Bike Taxi')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Bike Details')).toBeInTheDocument();
  });

  test('checks_link_destinations', () => {
    renderWithRouter(<NavBar />);
    const homeLink = screen.getByText('Home').closest('a');
    const bikeDetailsLink = screen.getByText('Bike Details').closest('a');
    expect(homeLink).toHaveAttribute('href', '/');
    expect(bikeDetailsLink).toHaveAttribute('href', '/bikedetails');
  });

  test('renders_footer_component_with_copyright_text', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText(/© 2024 Faster Bike Taxi/)).toBeInTheDocument();
  });

  test('fetching_and_displaying_bike_applications', async () => {
    const mockData = [
      { id: 1, name: 'John Doe', phoneNumber: '1234567890', bikeNumber: 'TN01AB1234' }
    ];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    renderWithRouter(<DisplayBikes />);
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });

  test('submits_valid_application_form', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Success' }),
    });

    renderWithRouter(<ApplyForm />);
    
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText(/bike/i), { target: { value: 'TN01AB1234' } });
    fireEvent.change(screen.getByLabelText(/age/i), { target: { value: '25' } });
    
    fireEvent.click(screen.getByText(/submit/i));
    
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:8080/addBiketaxi',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'John Doe',
            bikeNumber: 'TN01AB1234',
            age: expect.any(Number),
            phoneNumber: '1234567890'
          })
        })
      );
    });
  });

  test('submits_invalid_application_form', () => {
    renderWithRouter(<ApplyForm />);
    
    fireEvent.click(screen.getByText(/submit/i));
    
    expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
  });

  test('checks_all_components_and_routes', () => {
    render(<App />);
    expect(screen.getByText('Faster Bike Taxi')).toBeInTheDocument();
    expect(screen.getByText('Welcome to Faster Bike Taxi')).toBeInTheDocument();
  });
});