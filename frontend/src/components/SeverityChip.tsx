import { Chip } from '@mui/material';
import type { BugSeverity } from '../types';
import { getSeverityColor, formatSeverity } from '../utils/formatters';

interface SeverityChipProps {
  severity: BugSeverity;
}

const SeverityChip = ({ severity }: SeverityChipProps) => {
  return (
    <Chip
      label={formatSeverity(severity)}
      sx={{
        bgcolor: getSeverityColor(severity),
        color: 'white',
        fontWeight: 'bold',
      }}
      size="small"
    />
  );
};

export default SeverityChip;