import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';

// Mock project data
const mockProject = {
  id: 1,
  name: 'Test Project',
  createdAt: '2025-07-23T10:00:00.000Z',
  bugCount: 5
};

describe('ProjectCard Component', () => {
  it('renders project information correctly', () => {
    render(
      <BrowserRouter>
        <ProjectCard project={mockProject} />
      </BrowserRouter>
    );
    
    // Check if project name is displayed
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    
    // Check if bug count is displayed
    expect(screen.getByText('5 bugs')).toBeInTheDocument();
    
    // Check if the "View Details" button is present
    expect(screen.getByText('View Details')).toBeInTheDocument();
  });
  
  it('displays singular "bug" text when bug count is 1', () => {
    const singleBugProject = { ...mockProject, bugCount: 1 };
    
    render(
      <BrowserRouter>
        <ProjectCard project={singleBugProject} />
      </BrowserRouter>
    );
    
    expect(screen.getByText('1 bug')).toBeInTheDocument();
  });
});