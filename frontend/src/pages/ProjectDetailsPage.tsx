import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Button, 
  Box,
  Paper,
  Divider,
  IconButton,
  Breadcrumbs,
  Link,
  Grid
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getProject, getBugsByProject, getBugStatistics } from '../services/api';
import type { Project, Bug, BugStatistics } from '../types';
import BugCard from '../components/BugCard';
import CreateBugDialog from '../components/CreateBugDialog';
import BugDetailsDialog from '../components/BugDetailsDialog';
import BugStatisticsCard from '../components/BugStatisticsCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import { formatDate } from '../utils/formatters';

const ProjectDetailsPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  
  const [project, setProject] = useState<Project | null>(null);
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [statistics, setStatistics] = useState<BugStatistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedBug, setSelectedBug] = useState<Bug | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

  const id = parseInt(projectId || '0');

  const fetchProjectData = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // Fetch project details, bugs, and statistics in parallel
      const [projectData, bugsData, statsData] = await Promise.all([
        getProject(id),
        getBugsByProject(id),
        getBugStatistics(id)
      ]);
      
      setProject(projectData);
      setBugs(bugsData);
      setStatistics(statsData);
    } catch (err) {
      console.error('Error fetching project data:', err);
      setError('Failed to load project data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectData();
  }, [id]);

  const handleBugCreated = () => {
    fetchProjectData();
  };

  const handleBugUpdated = () => {
    fetchProjectData();
  };

  const handleBugClick = (bug: Bug) => {
    setSelectedBug(bug);
    setDetailsDialogOpen(true);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <LoadingSpinner message="Loading project details..." />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <ErrorAlert message={error} />
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Back to Projects
        </Button>
      </Container>
    );
  }

  if (!project) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Project not found
          </Typography>
          <Button 
            startIcon={<ArrowBackIcon />} 
            onClick={() => navigate('/')}
            sx={{ mt: 2 }}
          >
            Back to Projects
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link 
            underline="hover" 
            color="inherit" 
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            Projects
          </Link>
          <Typography color="text.primary">{project.name}</Typography>
        </Breadcrumbs>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <IconButton 
          aria-label="back" 
          onClick={() => navigate('/')}
          sx={{ mr: 1 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1">
          {project.name}
        </Typography>
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Created: {formatDate(project.createdAt)}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          {statistics && <BugStatisticsCard statistics={statistics} />}
          
          <Box sx={{ mb: 3 }}>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<AddIcon />}
              fullWidth
              onClick={() => setCreateDialogOpen(true)}
            >
              Add New Bug
            </Button>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5">
              Bugs
            </Typography>
          </Box>
          
          <Divider sx={{ mb: 3 }} />
          
          {bugs.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                No bugs found
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Add your first bug to get started.
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<AddIcon />}
                onClick={() => setCreateDialogOpen(true)}
              >
                Add Bug
              </Button>
            </Paper>
          ) : (
            bugs.map((bug) => (
              <BugCard 
                key={bug.id} 
                bug={bug} 
                onClick={() => handleBugClick(bug)}
              />
            ))
          )}
        </Grid>
      </Grid>

      <CreateBugDialog 
        open={createDialogOpen} 
        projectId={id}
        onClose={() => setCreateDialogOpen(false)} 
        onBugCreated={handleBugCreated} 
      />
      
      <BugDetailsDialog 
        open={detailsDialogOpen}
        bug={selectedBug}
        onClose={() => setDetailsDialogOpen(false)}
        onBugUpdated={handleBugUpdated}
      />
    </Container>
  );
};

export default ProjectDetailsPage;