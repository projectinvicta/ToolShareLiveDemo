import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Chip,
} from '@mui/material';
import { Add, Edit, Delete, LocationOn, CheckCircle, Cancel } from '@mui/icons-material';
import Header from '../components/Header';
import AddToolModal from '../components/AddToolModal';
import type { Tool } from '../data/mockTools';

export default function MyToolsPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  /**
   * TODO: fetch from backend
   * e.g., useEffect(() => {
   *   fetch("/api/tools/my-tools")
   *     .then(res => res.json())
   *     .then(data => setMyTools(data.tools));
   * }, []);
   */
  const [myTools, setMyTools] = useState<Tool[]>([
    {
      id: 'my-1',
      name: 'Cordless Impact Driver',
      category: 'power-tools',
      pricePerDay: 12,
      owner: 'You',
      location: { lat: 37.7749, lng: -122.4194, address: 'San Francisco, CA' },
      image: '🔧',
      available: true,
    },
    {
      id: 'my-2',
      name: 'Pressure Washer',
      category: 'power-tools',
      pricePerDay: 35,
      owner: 'You',
      location: { lat: 37.7749, lng: -122.4194, address: 'San Francisco, CA' },
      image: '💧',
      available: true,
    },
  ]);

  const handleAddTool = (tool: Omit<Tool, 'id' | 'owner'>) => {
    const newTool: Tool = {
      ...tool,
      id: `my-${Date.now()}`,
      owner: 'You',
    };
    setMyTools([...myTools, newTool]);
    setShowAddModal(false);
  };

  const handleDeleteTool = (id: string) => {
    if (confirm('Are you sure you want to delete this tool?')) {
      /**
       * TODO: fetch from backend
       * e.g., fetch(`/api/tools/${id}`, { method: "DELETE" })
       *   .then(() => {
       *     setMyTools(myTools.filter((tool) => tool.id !== id));
       *   });
       */
      setMyTools(myTools.filter((tool) => tool.id !== id));
    }
  };

  const toggleAvailability = (id: string) => {
    const tool = myTools.find(t => t.id === id);
    /**
     * TODO: fetch from backend
     * e.g., fetch(`/api/tools/${id}`, {
     *   method: "PATCH",
     *   headers: { "Content-Type": "application/json" },
     *   body: JSON.stringify({ available: !tool?.available })
     * })
     *   .then(res => res.json())
     *   .then(() => {
     *     setMyTools(
     *       myTools.map((tool) =>
     *         tool.id === id ? { ...tool, available: !tool.available } : tool
     *       )
     *     );
     *   });
     */
    setMyTools(
      myTools.map((tool) =>
        tool.id === id ? { ...tool, available: !tool.available } : tool
      )
    );
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header Section */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          sx={{ mb: 4 }}
        >
          <Box>
            <Typography variant="h3" gutterBottom>
              My Tools
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage your tool listings and earn from rentals
            </Typography>
          </Box>
          <Button
            variant="contained"
            size="large"
            startIcon={<Add />}
            onClick={() => setShowAddModal(true)}
          >
            Add Tool
          </Button>
        </Stack>

        {/* Stats */}
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ mb: 4 }}>
          <Card
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            sx={{ flex: 1 }}
          >
            <CardContent>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                Total Tools
              </Typography>
              <Typography variant="h3">{myTools.length}</Typography>
            </CardContent>
          </Card>
          <Card
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            sx={{ flex: 1 }}
          >
            <CardContent>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                Available
              </Typography>
              <Typography variant="h3" color="success.main">
                {myTools.filter((t) => t.available).length}
              </Typography>
            </CardContent>
          </Card>
          <Card
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            sx={{ flex: 1 }}
          >
            <CardContent>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                Potential Earnings
              </Typography>
              <Typography variant="h3" color="primary.main">
                ${myTools.reduce((sum, tool) => sum + tool.pricePerDay, 0)}
                <Typography component="span" variant="h6" color="text.secondary">
                  /day
                </Typography>
              </Typography>
            </CardContent>
          </Card>
        </Stack>

        {/* Tools List */}
        {myTools.length === 0 ? (
          <Card>
            <CardContent>
              <Stack alignItems="center" spacing={3} sx={{ py: 8 }}>
                <Box sx={{ fontSize: '5rem' }}>🛠️</Box>
                <Typography variant="h4">No tools listed yet</Typography>
                <Typography variant="body1" color="text.secondary">
                  Start earning by listing your tools for rent
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => setShowAddModal(true)}
                >
                  Add Your First Tool
                </Button>
              </Stack>
            </CardContent>
          </Card>
        ) : (
          <Stack spacing={2}>
            {myTools.map((tool, index) => (
              <Card
                component={motion.div}
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                sx={{
                  '&:hover': {
                    boxShadow: 3,
                  },
                }}
              >
                <CardContent>
                  <Stack direction="row" spacing={3} alignItems="center">
                    {/* Tool Icon */}
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        background: 'linear-gradient(135deg, #dbeafe 0%, #d1fae5 100%)',
                        fontSize: '2.5rem',
                      }}
                    >
                      {tool.image}
                    </Avatar>

                    {/* Tool Info */}
                    <Stack sx={{ flex: 1 }} spacing={2}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                      >
                        <Box>
                          <Typography variant="h5" gutterBottom>
                            {tool.name}
                          </Typography>
                          <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                            sx={{ color: 'text.secondary' }}
                          >
                            <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                              {tool.category.replace('-', ' ')}
                            </Typography>
                            <Stack direction="row" spacing={0.5} alignItems="center">
                              <LocationOn fontSize="small" />
                              <Typography variant="body2">
                                {tool.location.address}
                              </Typography>
                            </Stack>
                          </Stack>
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography variant="h4">${tool.pricePerDay}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            per day
                          </Typography>
                        </Box>
                      </Stack>

                      <Stack direction="row" spacing={1} alignItems="center">
                        <Chip
                          icon={tool.available ? <CheckCircle /> : <Cancel />}
                          label={tool.available ? 'Available' : 'Unavailable'}
                          color={tool.available ? 'success' : 'default'}
                          variant="outlined"
                          onClick={() => toggleAvailability(tool.id)}
                          sx={{ borderWidth: 2 }}
                        />

                        <IconButton color="primary">
                          <Edit />
                        </IconButton>

                        <IconButton
                          color="error"
                          onClick={() => handleDeleteTool(tool.id)}
                        >
                          <Delete />
                        </IconButton>
                      </Stack>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}
      </Container>

      {showAddModal && (
        <AddToolModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddTool}
        />
      )}
    </Box>
  );
}
