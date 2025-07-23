import { Card, CardContent, CardActions, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { Project } from '../types';
import { formatDate } from '../utils/formatters';
import BugReportIcon from '@mui/icons-material/BugReport';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          {project.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Created: {formatDate(project.createdAt)}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <BugReportIcon color="action" sx={{ mr: 1 }} />
          <Typography variant="body1">
            {project.bugCount || 0} {project.bugCount === 1 ? 'bug' : 'bugs'}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button 
          size="small" 
          color="primary" 
          onClick={() => navigate(`/projects/${project.id}`)}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProjectCard;