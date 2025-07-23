import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoadingSpinner from '../components/LoadingSpinner';

describe('LoadingSpinner Component', () => {
    it('renders with default message', () => {
        render(<LoadingSpinner />);

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders with custom message', () => {
        render(<LoadingSpinner message="Custom loading message" />);

        expect(screen.getByText('Custom loading message')).toBeInTheDocument();
    });

    it('displays a loading spinner', () => {
        render(<LoadingSpinner />);

        // Check if the circular progress is present
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
}); 