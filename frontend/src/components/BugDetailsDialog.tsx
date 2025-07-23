import { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import type { Bug, BugSeverity, BugStatus } from '../types';
import { formatDate } from '../utils/formatters';
import SeverityChip from './SeverityChip';
import StatusChip from './StatusChip';
import { updateBug } from '../services/api';

interface BugDetailsDialogProps {
  open: boolean;
  bug: Bug | null;
  onClose: () => void;
  onBugUpdated: () => void;
}

const BugDetailsDialog = ({ open, bug, onClose, onBugUpdated }: BugDetailsDialogProps) => {
  const [severity, setSeverity] = useState<BugSeverity>('medium');
  const [status, setStatus] = useState<BugStatus>('open');
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (bug) {
      setSeverity(bug.severity);
      setStatus(bug.status);
    }
  }, [bug]);

  const handleSeverityChange = (event: SelectChangeEvent) => {
    setSeverity(event.target.value as BugSeverity);
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as BugStatus);
  };

  const handleUpdate = async () => {
    if (!bug) return;
    
    // Only update if values have changed
    if (severity === bug.severity && status === bug.status) {
      onClose();
      return;
    }

    try {
      setIsUpdating(true);
      await updateBug(bug.projectId, bug.id, { severity, status });
      onBugUpdated();
      onClose();
    } catch (err) {
      setError('Failed to update bug. Please try again.');
      console.error('Error updating bug:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  if (!bug) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{bug.title}</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" paragraph>
            {bug.description}
          </Typography>
          
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
            Created: {formatDate(bug.createdAt)}
          </Typography>
          
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" sx={{ mr: 1 }}>
                  Current Severity:
                </Typography>
                <SeverityChip severity={bug.severity} />
              </Box>
              
              <FormControl fullWidth margin="dense">
                <InputLabel id="severity-update-label">Update Severity</InputLabel>
                <Select
                  labelId="severity-update-label"
                  value={severity}
                  label="Update Severity"
                  onChange={handleSeverityChange}
                  disabled={isUpdating}
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="critical">Critical</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" sx={{ mr: 1 }}>
                  Current Status:
                </Typography>
                <StatusChip status={bug.status} />
              </Box>
              
              <FormControl fullWidth margin="dense">
                <InputLabel id="status-update-label">Update Status</InputLabel>
                <Select
                  labelId="status-update-label"
                  value={status}
                  label="Update Status"
                  onChange={handleStatusChange}
                  disabled={isUpdating}
                >
                  <MenuItem value="open">Open</MenuItem>
                  <MenuItem value="in_progress">In Progress</MenuItem>
                  <MenuItem value="resolved">Resolved</MenuItem>
                  <MenuItem value="closed">Closed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isUpdating}>
          Cancel
        </Button>
        <Button 
          onClick={handleUpdate} 
          variant="contained" 
          color="primary"
          disabled={isUpdating || (bug.severity === severity && bug.status === status)}
          startIcon={isUpdating ? <CircularProgress size={20} /> : null}
        >
          {isUpdating ? 'Updating...' : 'Update Bug'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BugDetailsDialog;