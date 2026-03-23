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

    });

    test('email input field exists', () => {

    });

    test('phone number input field exists', () => {

    });

    test('address input field exists', () => {

    });

    test('birthday input field exists', () => {

    });

    test('submit button exists', () => {

    });

    test('user can add input to contact form for required fields', async () => {

    });
});