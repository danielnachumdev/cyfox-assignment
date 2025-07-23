import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorAlert from '../components/ErrorAlert';

describe('ErrorAlert Component', () => {
    it('renders error message correctly', () => {
        const errorMessage = 'This is a test error message';
        render(<ErrorAlert message={errorMessage} />);

        expect(screen.getByText('Error')).toBeInTheDocument();
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    it('renders with different error messages', () => {
        const customError = 'Custom error message';
        render(<ErrorAlert message={customError} />);

        expect(screen.getByText('Error')).toBeInTheDocument();
        expect(screen.getByText(customError)).toBeInTheDocument();
    });
}); 