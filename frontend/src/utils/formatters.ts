import type { BugSeverity, BugStatus } from '../types';

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

export const getSeverityColor = (severity: BugSeverity): string => {
  switch (severity) {
    case 'low':
      return '#2196f3'; // Blue
    case 'medium':
      return '#ff9800'; // Orange
    case 'high':
      return '#f44336'; // Red
    case 'critical':
      return '#9c27b0'; // Purple
    default:
      return '#757575'; // Grey
  }
};

export const getStatusColor = (status: BugStatus): string => {
  switch (status) {
    case 'open':
      return '#f44336'; // Red
    case 'in_progress':
      return '#ff9800'; // Orange
    case 'resolved':
      return '#4caf50'; // Green
    case 'closed':
      return '#9e9e9e'; // Grey
    default:
      return '#757575'; // Dark Grey
  }
};

export const formatSeverity = (severity: BugSeverity): string => {
  return severity.charAt(0).toUpperCase() + severity.slice(1);
};

export const formatStatus = (status: BugStatus): string => {
  return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};