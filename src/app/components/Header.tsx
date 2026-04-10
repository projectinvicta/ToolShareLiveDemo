import { Link, useLocation } from 'react-router';
import { AppBar, Toolbar, Typography, Stack, Box, Button } from '@mui/material';
import { Home, Build } from '@mui/icons-material';

export default function Header() {
  const location = useLocation();

  return (
    <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
      <Toolbar sx={{ maxWidth: 1280, width: '100%', mx: 'auto', px: 3 }}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          component={Link}
          to="/"
          sx={{ textDecoration: 'none', color: 'inherit', flexGrow: 0, mr: 'auto' }}
        >
          <Box sx={{ fontSize: '2rem' }}>🛠️</Box>
          <Typography variant="h5">ToolShare</Typography>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Button
            component={Link}
            to="/"
            startIcon={<Home />}
            variant={location.pathname === '/' ? 'contained' : 'text'}
            color={location.pathname === '/' ? 'primary' : 'inherit'}
            sx={{
              bgcolor: location.pathname === '/' ? 'primary.main' : 'transparent',
              color: location.pathname === '/' ? 'primary.contrastText' : 'text.secondary',
              '&:hover': {
                bgcolor: location.pathname === '/' ? 'primary.dark' : 'action.hover',
              },
            }}
          >
            Browse
          </Button>
          <Button
            component={Link}
            to="/my-tools"
            startIcon={<Build />}
            variant={location.pathname === '/my-tools' ? 'contained' : 'text'}
            color={location.pathname === '/my-tools' ? 'primary' : 'inherit'}
            sx={{
              bgcolor: location.pathname === '/my-tools' ? 'primary.main' : 'transparent',
              color: location.pathname === '/my-tools' ? 'primary.contrastText' : 'text.secondary',
              '&:hover': {
                bgcolor: location.pathname === '/my-tools' ? 'primary.dark' : 'action.hover',
              },
            }}
          >
            My Tools
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
