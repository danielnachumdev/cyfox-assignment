import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import BugReportIcon from '@mui/icons-material/BugReport';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <BugReportIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Bug Tracker
        </Typography>
        <Box>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/"
          >
            Projects
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;