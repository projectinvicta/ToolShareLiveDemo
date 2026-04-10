import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Button,
  Stack,
  Box,
  Avatar,
} from '@mui/material';
import { Close } from '@mui/icons-material';

interface IntroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function IntroModal({ isOpen, onClose }: IntroModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          zIndex: 1,
        }}
      >
        <Close />
      </IconButton>

      <DialogContent sx={{ p: 4 }}>
        <Stack spacing={3} alignItems="center" sx={{ mb: 4 }}>
          <Box sx={{ fontSize: '4rem' }}>👋</Box>
          <Stack spacing={1} alignItems="center">
            <Typography variant="h3">Welcome to ToolShare</Typography>
            <Typography variant="body1" color="text.secondary">
              Community tool rental made simple
            </Typography>
          </Stack>
        </Stack>

        <Stack spacing={3} sx={{ mb: 4 }}>
          <Stack direction="row" spacing={2}>
            <Avatar
              sx={{
                bgcolor: 'info.light',
                width: 48,
                height: 48,
                fontSize: '1.5rem',
              }}
            >
              📅
            </Avatar>
            <Box>
              <Typography variant="h6" gutterBottom>
                Daily Rentals
              </Typography>
              <Typography variant="body2" color="text.secondary">
                All tools are rented by the day. Select your start date and optional end date for multi-day rentals.
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={2}>
            <Avatar
              sx={{
                bgcolor: 'success.light',
                width: 48,
                height: 48,
                fontSize: '1.5rem',
              }}
            >
              🕐
            </Avatar>
            <Box>
              <Typography variant="h6" gutterBottom>
                Pick-up & Return
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pick up tools after 7:30 AM and return before 9:00 PM on the scheduled days.
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={2}>
            <Avatar
              sx={{
                bgcolor: 'secondary.light',
                width: 48,
                height: 48,
                fontSize: '1.5rem',
              }}
            >
              🗺️
            </Avatar>
            <Box>
              <Typography variant="h6" gutterBottom>
                Find Nearby Tools
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Browse the map to discover tools in your neighborhood. Filter by category to find exactly what you need.
              </Typography>
            </Box>
          </Stack>
        </Stack>

        <Button variant="contained" fullWidth size="large" onClick={onClose}>
          Get Started
        </Button>
      </DialogContent>
    </Dialog>
  );
}
