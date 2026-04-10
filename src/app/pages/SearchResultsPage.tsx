import { useState } from 'react';
import { useSearchParams, Link } from 'react-router';
import { motion } from 'motion/react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Stack,
  Card,
  CardContent,
  Avatar,
} from '@mui/material';
import { LocationOn, ArrowBack } from '@mui/icons-material';
import Header from '../components/Header';
import ConfirmationModal from '../components/ConfirmationModal';
import { mockTools, categories } from '../data/mockTools';
import { format } from 'date-fns';

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const category = searchParams.get('category') || 'all';
  const query = searchParams.get('query') || '';
  const startDate = searchParams.get('startDate') || '';
  const endDate = searchParams.get('endDate') || '';

  /**
   * TODO: fetch from backend
   * e.g., useEffect(() => {
   *   const params = new URLSearchParams({ category, query, startDate, endDate, available: 'true' });
   *   fetch(`/api/tools/search?${params.toString()}`)
   *     .then(res => res.json())
   *     .then(data => setFilteredTools(data.tools));
   * }, [category, query, startDate, endDate]);
   */
  const filteredTools = mockTools.filter((tool) => {
    const matchesCategory = category === 'all' || tool.category === category;
    const matchesQuery =
      query === '' ||
      tool.name.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery && tool.available;
  });

  const categoryLabel =
    categories.find((c) => c.id === category)?.label || 'All Tools';

  const formatDateRange = () => {
    if (!startDate) return '';
    const start = format(new Date(startDate), 'MMM d, yyyy');
    if (endDate) {
      const end = format(new Date(endDate), 'MMM d, yyyy');
      return `${start} - ${end}`;
    }
    return start;
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Back Button & Summary */}
        <Stack spacing={3} sx={{ mb: 3 }}>
          <Button
            component={Link}
            to="/"
            startIcon={<ArrowBack />}
            sx={{ alignSelf: 'flex-start' }}
          >
            Back to search
          </Button>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'} found
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {categoryLabel}
              {query && ` · "${query}"`}
              {startDate && ` · ${formatDateRange()}`}
            </Typography>
          </Paper>
        </Stack>

        {/* Results Grid */}
        <Stack spacing={3}>
          {filteredTools.map((tool, index) => (
            <Card
              component={motion.div}
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              sx={{
                '&:hover': {
                  boxShadow: 4,
                },
              }}
            >
              <CardContent>
                <Stack direction="row" spacing={2}>
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
                  <Stack sx={{ flex: 1 }} spacing={1}>
                    <Typography variant="h5">{tool.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Owned by {tool.owner}
                    </Typography>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <LocationOn fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {tool.location.address}
                      </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 'auto' }}>
                      <Box>
                        <Typography variant="h4" component="span">
                          ${tool.pricePerDay}
                        </Typography>
                        <Typography variant="body1" component="span" color="text.secondary">
                          /day
                        </Typography>
                      </Box>
                      <Button
                        variant="contained"
                        size="large"
                        onClick={() => setSelectedTool(tool.id)}
                      >
                        Rent Tool
                      </Button>
                    </Stack>
                  </Stack>
                </Stack>
              </CardContent>

              {/* Mini Map */}
              <Box
                sx={{
                  position: 'relative',
                  height: 128,
                  background: 'linear-gradient(135deg, #dbeafe 0%, #d1fae5 50%, #dbeafe 100%)',
                  borderTop: 1,
                  borderColor: 'divider',
                }}
              >
                {/* Your location */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 16,
                    left: 32,
                    width: 12,
                    height: 12,
                    bgcolor: 'primary.main',
                    borderRadius: '50%',
                    border: '2px solid white',
                    boxShadow: 2,
                    zIndex: 10,
                  }}
                />

                {/* Tool location */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 32,
                    width: 32,
                    height: 32,
                    bgcolor: 'success.main',
                    borderRadius: '50%',
                    border: '2px solid white',
                    boxShadow: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                  }}
                >
                  {tool.image}
                </Box>

                {/* Connecting line */}
                <svg
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                  }}
                >
                  <line
                    x1="15%"
                    y1="75%"
                    x2="85%"
                    y2="25%"
                    stroke="#94a3b8"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                </svg>

                <Paper
                  sx={{
                    position: 'absolute',
                    bottom: 8,
                    right: 8,
                    px: 1,
                    py: 0.5,
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    {tool.location.address}
                  </Typography>
                </Paper>
              </Box>
            </Card>
          ))}
        </Stack>

        {filteredTools.length === 0 && (
          <Stack alignItems="center" spacing={3} sx={{ py: 8 }}>
            <Box sx={{ fontSize: '5rem' }}>🔍</Box>
            <Typography variant="h4">No tools found</Typography>
            <Typography variant="body1" color="text.secondary">
              Try adjusting your filters or search query
            </Typography>
            <Button component={Link} to="/" variant="contained" size="large">
              New Search
            </Button>
          </Stack>
        )}
      </Container>

      {selectedTool && (
        <ConfirmationModal
          tool={filteredTools.find((t) => t.id === selectedTool)!}
          startDate={startDate}
          endDate={endDate}
          onClose={() => setSelectedTool(null)}
          onConfirm={() => {
            /**
             * TODO: fetch from backend
             * e.g., fetch("/api/rentals", {
             *   method: "POST",
             *   headers: { "Content-Type": "application/json" },
             *   body: JSON.stringify({
             *     toolId: selectedTool,
             *     startDate,
             *     endDate,
             *     totalCost: (filteredTools.find(t => t.id === selectedTool)?.pricePerDay || 0) * days
             *   })
             * })
             *   .then(res => res.json())
             *   .then(data => {
             *     setSelectedTool(null);
             *     alert('Rental confirmed! The owner will contact you shortly.');
             *   });
             */
            setSelectedTool(null);
            alert('Rental confirmed! The owner will contact you shortly.');
          }}
        />
      )}
    </Box>
  );
}
