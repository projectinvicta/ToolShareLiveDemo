import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Chip,
  InputAdornment,
  InputLabel,
  Tooltip,
} from '@mui/material';
import { Search, LocationOn, CalendarMonth } from '@mui/icons-material';
import Header from '../components/Header';
import IntroModal from '../components/IntroModal';
import { categories, mockTools } from '../data/mockTools';
import { format } from 'date-fns';

export default function HomePage() {
  const navigate = useNavigate();
  const [availableTools, setAvailableTools] = useState([]);
  const [showIntro, setShowIntro] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSearch = () => {
    if (!startDate) {
      alert('Please select a start date');
      return;
    }
    const params = new URLSearchParams({
      category: selectedCategory,
      query: searchQuery,
      startDate,
      ...(endDate && { endDate }),
    });
    navigate(`/search?${params.toString()}`);
  };

   useEffect(() => {
     fetch("/api/tools?available=true")
       .then(res => res.json())
       .then(data => setAvailableTools(data));
   }, []);
   
  // const availableTools = mockTools.filter(tool => tool.available);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />
      <IntroModal isOpen={showIntro} onClose={() => setShowIntro(false)} />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Search Section */}
        <Paper
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          sx={{ p: 3, mb: 3 }}
        >
          <Typography variant="h4" gutterBottom>
            Find Tools Nearby
          </Typography>

          <Stack spacing={3}>
            {/* Search Bar */}
            <TextField
              fullWidth
              placeholder="Search for tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />

            {/* Category Filters */}
            <Box>
              <InputLabel sx={{ mb: 1.5 }}>Category</InputLabel>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {categories.map((category) => (
                  <Chip
                    key={category.id}
                    label={`${category.icon} ${category.label}`}
                    onClick={() => setSelectedCategory(category.id)}
                    color={selectedCategory === category.id ? 'primary' : 'default'}
                    variant={selectedCategory === category.id ? 'filled' : 'outlined'}
                    sx={{ borderWidth: 2 }}
                  />
                ))}
              </Stack>
            </Box>

            {/* Date Selection */}
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <Box sx={{ flex: 1 }}>
                <InputLabel sx={{ mb: 1 }}>
                  <CalendarMonth sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                  Start Date *
                </InputLabel>
                <TextField
                  fullWidth
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  inputProps={{ min: format(new Date(), 'yyyy-MM-dd') }}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <InputLabel sx={{ mb: 1 }}>
                  <CalendarMonth sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                  End Date (optional)
                </InputLabel>
                <TextField
                  fullWidth
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  disabled={!startDate}
                  inputProps={{ min: startDate || format(new Date(), 'yyyy-MM-dd') }}
                />
              </Box>
            </Stack>

            <Button variant="contained" size="large" fullWidth onClick={handleSearch}>
              Search Tools
            </Button>
          </Stack>
        </Paper>

        {/* Map Section */}
        <Paper
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          sx={{ overflow: 'hidden' }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}
          >
            <LocationOn color="primary" />
            <Typography variant="h6" sx={{ flex: 1 }}>
              Available Tools Near You
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {availableTools.length} tools available
            </Typography>
          </Stack>

          {/* Mock Map */}
          <Box
            sx={{
              position: 'relative',
              height: 400,
              background: 'linear-gradient(135deg, #dbeafe 0%, #d1fae5 50%, #dbeafe 100%)',
            }}
          >
            {/* Your Location */}
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 16,
                height: 16,
                bgcolor: 'primary.main',
                borderRadius: '50%',
                border: '4px solid white',
                boxShadow: 3,
                zIndex: 10,
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 48,
                height: 48,
                bgcolor: 'primary.main',
                opacity: 0.2,
                borderRadius: '50%',
                animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
                '@keyframes ping': {
                  '75%, 100%': {
                    transform: 'translate(-50%, -50%) scale(2)',
                    opacity: 0,
                  },
                },
              }}
            />

            {/* Tool Markers */}
            {availableTools.slice(0, 6).map((tool, index) => {
              const angle = (index / 6) * Math.PI * 2;
              const radius = 100 + Math.random() * 50;
              const x = 50 + Math.cos(angle) * radius;
              const y = 50 + Math.sin(angle) * radius;

              return (
                <Tooltip
                  key={tool.id}
                  title={
                    <Box>
                      <Typography variant="body2">{tool.name}</Typography>
                      <Typography variant="caption">${tool.pricePerDay}/day</Typography>
                    </Box>
                  }
                  arrow
                >
                  <Box
                    component={motion.div}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    sx={{
                      position: 'absolute',
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: 'translate(-50%, -50%)',
                      width: 40,
                      height: 40,
                      bgcolor: 'success.main',
                      borderRadius: '50%',
                      border: '4px solid white',
                      boxShadow: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.25rem',
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translate(-50%, -50%) scale(1.1)',
                      },
                    }}
                  >
                    {tool.image}
                  </Box>
                </Tooltip>
              );
            })}

            {/* Map Legend */}
            <Paper
              sx={{
                position: 'absolute',
                bottom: 16,
                left: 16,
                p: 2,
              }}
            >
              <Stack spacing={1}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      bgcolor: 'primary.main',
                      borderRadius: '50%',
                    }}
                  />
                  <Typography variant="body2">Your location</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      bgcolor: 'success.main',
                      borderRadius: '50%',
                    }}
                  />
                  <Typography variant="body2">Available tool</Typography>
                </Stack>
              </Stack>
            </Paper>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
