import { Card, CardContent, Typography, Box, Grid, LinearProgress } from '@mui/material';
import type { BugStatistics } from '../types';
import { getSeverityColor, getStatusColor } from '../utils/formatters';

interface BugStatisticsCardProps {
  statistics: BugStatistics;
}

const BugStatisticsCard = ({ statistics }: BugStatisticsCardProps) => {
  const { totalBugs, byStatus, bySeverity } = statistics;
  
  // Helper function to calculate percentage
  const calculatePercentage = (value: number) => {
    if (totalBugs === 0) return 0;
    return (value / totalBugs) * 100;
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Bug Statistics
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 2 }}>
          Total Bugs: {totalBugs}
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            By Status
          </Typography>
          <Grid container spacing={2}>
            {Object.entries(byStatus).map(([status, count]) => (
              <Grid item xs={12} sm={6} key={status}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                  <Typography variant="body2" sx={{ minWidth: 100 }}>
                    {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}:
                  </Typography>
                  <Typography variant="body2" sx={{ ml: 1, minWidth: 30 }}>
                    {count}
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={calculatePercentage(count)} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 1,
                    bgcolor: 'grey.200',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: getStatusColor(status as any)
                    }
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            By Severity
          </Typography>
          <Grid container spacing={2}>
            {Object.entries(bySeverity).map(([severity, count]) => (
              <Grid item xs={12} sm={6} key={severity}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                  <Typography variant="body2" sx={{ minWidth: 100 }}>
                    {severity.charAt(0).toUpperCase() + severity.slice(1)}:
                  </Typography>
                  <Typography variant="body2" sx={{ ml: 1, minWidth: 30 }}>
                    {count}
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={calculatePercentage(count)} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 1,
                    bgcolor: 'grey.200',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: getSeverityColor(severity as any)
                    }
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BugStatisticsCard;