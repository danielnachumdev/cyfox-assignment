import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/Header';

describe('Header Component', () => {
    it('renders the header with correct title and navigation', () => {
        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        // Check if the title is displayed
        expect(screen.getByText('Bug Tracker')).toBeInTheDocument();

        // Check if the navigation link is present
        expect(screen.getByText('Projects')).toBeInTheDocument();

        // MUI SvgIcon renders an svg (not always role=img depending on version)
        expect(document.querySelector('svg')).toBeTruthy();
    });
}); 