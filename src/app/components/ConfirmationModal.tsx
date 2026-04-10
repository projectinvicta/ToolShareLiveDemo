import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Button,
  Stack,
  Box,
  Avatar,
  Divider,
  Alert,
} from '@mui/material';
import { Close, CalendarMonth, AccessTime, LocationOn } from '@mui/icons-material';
import { format, differenceInDays } from 'date-fns';
import type { Tool } from '../data/mockTools';

interface ConfirmationModalProps {
  tool: Tool;
  startDate: string;
  endDate?: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmationModal({
  tool,
  startDate,
  endDate,
  onClose,
  onConfirm,
}: ConfirmationModalProps) {
  const calculateDays = () => {
    if (!endDate) return 1;
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.max(1, differenceInDays(end, start) + 1);
  };

  const days = calculateDays();
  const totalCost = tool.pricePerDay * days;

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Confirm Rental
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3}>
          {/* Tool Summary */}
          <Stack
            direction="row"
            spacing={2}
            sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}
          >
            <Avatar
              sx={{
                width: 64,
                height: 64,
                background: 'linear-gradient(135deg, #dbeafe 0%, #d1fae5 100%)',
                fontSize: '2rem',
              }}
            >
              {tool.image}
            </Avatar>
            <Box>
              <Typography variant="h6">{tool.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                Owned by {tool.owner}
              </Typography>
            </Box>
          </Stack>

          {/* Rental Details */}
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <CalendarMonth color="action" sx={{ mt: 0.5 }} />
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Rental Period
                </Typography>
                <Typography variant="body1">
                  {format(new Date(startDate), 'MMM d, yyyy')}
                  {endDate && ` - ${format(new Date(endDate), 'MMM d, yyyy')}`}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {days} {days === 1 ? 'day' : 'days'}
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={2}>
              <AccessTime color="action" sx={{ mt: 0.5 }} />
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Pick-up & Return
                </Typography>
                <Typography variant="body1">After 7:30 AM · Before 9:00 PM</Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={2}>
              <LocationOn color="action" sx={{ mt: 0.5 }} />
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Location
                </Typography>
                <Typography variant="body1">{tool.location.address}</Typography>
              </Box>
            </Stack>
          </Stack>

          <Divider />

          {/* Cost Breakdown */}
          <Stack spacing={1}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body1" color="text.secondary">
                ${tool.pricePerDay}/day × {days} {days === 1 ? 'day' : 'days'}
              </Typography>
              <Typography variant="body1">${totalCost}</Typography>
            </Stack>
            <Divider />
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6">${totalCost}</Typography>
            </Stack>
          </Stack>

          {/* Important Info */}
          <Alert severity="info">
            <Typography variant="body2">
              <strong>Important:</strong> The owner will be notified and will contact
              you to arrange the exact pick-up time and location details. Payment is
              made directly to the owner upon pick-up.
            </Typography>
          </Alert>

          {/* Actions */}
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              size="large"
              fullWidth
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={onConfirm}
            >
              Confirm Rental
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
