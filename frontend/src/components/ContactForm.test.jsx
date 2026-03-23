import '@testing-library/jest-dom/vitest'
import { describe, test, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactForm from './ContactForm.jsx'

afterEach(() => {
    cleanup();
});

describe('Contact Form Component', () => {
    test('Contact form renders', () => {
        render(<ContactForm />)
        expect(screen.getByText('Add Contact')).toBeInTheDocument();
    });

    test('name input field exists', () => {
        render(<ContactForm />)
        const nameInput = screen.getByLabelText(/name/i);
        expect(nameInput).toBeInTheDocument();
    });

    test('email input field exists', () => {
        render(<ContactForm />)
        const emailInput = screen.getByLabelText(/add email/i);
        expect(emailInput).toBeInTheDocument();
    });

    test('phone number input field exists', () => {
        render(<ContactForm />)
        const phoneNumber = screen.getByLabelText(/add phone number/i);
        expect(phoneNumber).toBeInTheDocument();
    });

    test('address input field exists', () => {
        render(<ContactForm />)
        const addressInput = screen.getByLabelText(/add address/i);
        expect(addressInput).toBeInTheDocument();
    });

    test('birthday input field exists', () => {
        render(<ContactForm />)
        const birthdayInput = screen.getByLabelText(/add birthday/i);
        expect(birthdayInput).toBeInTheDocument();
    });

    test('submit button exists', () => {
        render(<ContactForm />);
        const submitButton = screen.getByRole('button', { name: /submit/i });
        expect(submitButton).toBeInTheDocument();
    });

    test('user can add input to contact form for required fields', async () => {

    });
});