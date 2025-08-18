import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContactSection from './ContactSection';

// Mock ReCAPTCHA component
vi.mock('react-google-recaptcha', () => ({
  default: vi.fn().mockImplementation(({ onChange }) => {
    return (
      <div data-testid="recaptcha-mock">
        <button 
          onClick={() => onChange('test-token')}
          data-testid="recaptcha-button"
        >
          Verify
        </button>
      </div>
    );
  }),
}));

// Mock fetch
global.fetch = vi.fn();

describe('ContactSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock successful fetch response
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ message: 'Message sent successfully' }),
    });
  });

  it('renders the contact form', () => {
    render(<ContactSection />);
    
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByTestId('recaptcha-mock')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('shows validation errors when submitting empty form', async () => {
    render(<ContactSection />);
    
    // Submit the form without filling it
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    
    // Check for validation errors
    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/message is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/please verify you are not a robot/i)).toBeInTheDocument();
  });

  it('submits the form successfully when all fields are filled', async () => {
    render(<ContactSection />);
    
    // Fill the form
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'This is a test message' } });
    
    // Verify reCAPTCHA
    fireEvent.click(screen.getByTestId('recaptcha-button'));
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    
    // Wait for the form submission to complete
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
    
    // Check that fetch was called with the correct arguments
    expect(global.fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          name: 'Test User',
          email: 'test@example.com',
          message: 'This is a test message',
          recaptchaToken: 'test-token',
        }),
      })
    );
    
    // Check for success message
    expect(await screen.findByText(/thank you! your message has been sent successfully/i)).toBeInTheDocument();
  });

  it('shows error message when form submission fails', async () => {
    // Mock failed fetch response
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: async () => ({ message: 'Something went wrong' }),
    });
    
    render(<ContactSection />);
    
    // Fill the form
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'This is a test message' } });
    
    // Verify reCAPTCHA
    fireEvent.click(screen.getByTestId('recaptcha-button'));
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    
    // Wait for the form submission to complete
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
    
    // Check for error message
    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('handles network errors gracefully', async () => {
    // Mock network error
    (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));
    
    render(<ContactSection />);
    
    // Fill the form
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'This is a test message' } });
    
    // Verify reCAPTCHA
    fireEvent.click(screen.getByTestId('recaptcha-button'));
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    
    // Wait for the form submission to complete
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
    
    // Check for network error message
    expect(await screen.findByText(/network error/i)).toBeInTheDocument();
  });
});