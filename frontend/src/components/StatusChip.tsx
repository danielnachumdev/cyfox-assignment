import { Chip } from '@mui/material';
import type { BugStatus } from '../types';
import { getStatusColor, formatStatus } from '../utils/formatters';

interface StatusChipProps {
  status: BugStatus;
}

const StatusChip = ({ status }: StatusChipProps) => {
  return (
    <Chip
      label={formatStatus(status)}
      sx={{
        bgcolor: getStatusColor(status),
        color: 'white',
        fontWeight: 'bold',
      }}
      size="small"
    />
  );
};

export default StatusChip;