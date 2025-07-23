import { useState } from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Button,
  Grid,
  Chip
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import type { BugSeverity, BugStatus } from '../types';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';

interface BugFiltersProps {
  onFilterChange: (filters: { severity: BugSeverity | 'all', status: BugStatus | 'all' }) => void;
}

const BugFilters = ({ onFilterChange }: BugFiltersProps) => {
  const [severity, setSeverity] = useState<BugSeverity | 'all'>('all');
  const [status, setStatus] = useState<BugStatus | 'all'>('all');
  const [filtersApplied, setFiltersApplied] = useState(false);

  const handleSeverityChange = (event: SelectChangeEvent) => {
    setSeverity(event.target.value as BugSeverity | 'all');
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as BugStatus | 'all');
  };

  const handleApplyFilters = () => {
    onFilterChange({ severity, status });
    setFiltersApplied(true);
  };

  const handleClearFilters = () => {
    setSeverity('all');
    setStatus('all');
    onFilterChange({ severity: 'all', status: 'all' });
    setFiltersApplied(false);
  };

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <FilterListIcon sx={{ mr: 1 }} />
        <Typography variant="h6">Filter Bugs</Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel id="severity-filter-label">Severity</InputLabel>
            <Select
              labelId="severity-filter-label"
              value={severity}
              label="Severity"
              onChange={handleSeverityChange}
            >
              <MenuItem value="all">All Severities</MenuItem>
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="critical">Critical</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel id="status-filter-label">Status</InputLabel>
            <Select
              labelId="status-filter-label"
              value={status}
              label="Status"
              onChange={handleStatusChange}
            >
              <MenuItem value="all">All Statuses</MenuItem>
              <MenuItem value="open">Open</MenuItem>
              <MenuItem value="in_progress">In Progress</MenuItem>
              <MenuItem value="resolved">Resolved</MenuItem>
              <MenuItem value="closed">Closed</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Box>
          {filtersApplied && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {severity !== 'all' && (
                <Chip 
                  label={`Severity: ${severity}`} 
                  size="small" 
                  onDelete={handleClearFilters}
                />
              )}
              {status !== 'all' && (
                <Chip 
                  label={`Status: ${status}`} 
                  size="small" 
                  onDelete={handleClearFilters}
                />
              )}
            </Box>
          )}
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button 
            variant="outlined" 
            size="small" 
            startIcon={<ClearIcon />}
            onClick={handleClearFilters}
            disabled={!filtersApplied}
          >
            Clear
          </Button>
          <Button 
            variant="contained" 
            size="small" 
            onClick={handleApplyFilters}
          >
            Apply Filters
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default BugFilters;