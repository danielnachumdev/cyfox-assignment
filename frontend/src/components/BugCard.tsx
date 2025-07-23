import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import type { Bug } from '../types';
import { formatDate } from '../utils/formatters';
import SeverityChip from './SeverityChip';
import StatusChip from './StatusChip';

interface BugCardProps {
  bug: Bug;
  onClick?: () => void;
}

const BugCard = ({ bug, onClick }: BugCardProps) => {
  return (
    <Card 
      sx={{ 
        mb: 2, 
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': onClick ? { boxShadow: 3 } : {}
      }}
      onClick={onClick}
    >
      <CardContent>
        <Typography variant="h6" component="h3" gutterBottom>
          {bug.title}
        </Typography>
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 2,
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
          }}
        >
          {bug.description}
        </Typography>
        
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <SeverityChip severity={bug.severity} />
          </Grid>
          <Grid item>
            <StatusChip status={bug.status} />
          </Grid>
          <Grid item xs>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="caption" color="text.secondary">
                Created: {formatDate(bug.createdAt)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default BugCard;