import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  TextField,
  Button,
  Stack,
  Box,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  FormHelperText,
  Alert,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { categories } from '../data/mockTools';
import type { Tool } from '../data/mockTools';

interface AddToolModalProps {
  onClose: () => void;
  onAdd: (tool: Omit<Tool, 'id' | 'owner'>) => void;
}

const toolIcons = ['🔨', '🔧', '⚙️', '🪛', '🪚', '⚡', '🔩', '🎨', '💧', '🪜', '📏', '✂️'];

export default function AddToolModal({ onClose, onAdd }: AddToolModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'hand-tools',
    pricePerDay: '',
    address: '',
    image: '🔧',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.pricePerDay || !formData.address) {
      alert('Please fill in all required fields');
      return;
    }

    const newTool: Omit<Tool, 'id' | 'owner'> = {
      name: formData.name,
      category: formData.category,
      pricePerDay: parseFloat(formData.pricePerDay),
      location: {
        lat: 37.7749,
        lng: -122.4194,
        address: formData.address,
      },
      image: formData.image,
      available: true,
    };

    fetch("/api/createtool", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        category: formData.category,
        pricePerDay: parseFloat(formData.pricePerDay),
        address: formData.address,
        latitude: 37.7749, // TODO: Get from geocoding API
        longitude: -122.4194, // TODO: Get from geocoding API
        image: formData.image,
        available: true
      })
    })
      .then(res => res.json())
      .then(data => {
        onAdd({ ...newTool, id: data.id });
        onClose();
      });

    onAdd(newTool);
  };

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Add New Tool
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
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Stack spacing={3}>
            {/* Tool Icon Selection */}
            <Box>
              <InputLabel sx={{ mb: 1.5 }}>Tool Icon</InputLabel>
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {toolIcons.map((icon) => (
                  <ToggleButton
                    key={icon}
                    value={icon}
                    selected={formData.image === icon}
                    onChange={() => setFormData({ ...formData, image: icon })}
                    sx={{
                      fontSize: '1.5rem',
                      width: 56,
                      height: 56,
                      border: 2,
                      '&.Mui-selected': {
                        borderColor: 'primary.main',
                        bgcolor: 'primary.light',
                        '&:hover': {
                          bgcolor: 'primary.light',
                        },
                      },
                    }}
                  >
                    {icon}
                  </ToggleButton>
                ))}
              </Stack>
            </Box>

            {/* Tool Name */}
            <Box>
              <InputLabel required sx={{ mb: 1 }}>
                Tool Name
              </InputLabel>
              <TextField
                fullWidth
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Cordless Drill, Ladder, Paint Sprayer"
                required
              />
            </Box>

            {/* Category */}
            <Box>
              <InputLabel required sx={{ mb: 1 }}>
                Category
              </InputLabel>
              <Select
                fullWidth
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {categories.slice(1).map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.icon} {cat.label}
                  </MenuItem>
                ))}
              </Select>
            </Box>

            {/* Price Per Day */}
            <Box>
              <InputLabel required sx={{ mb: 1 }}>
                Price Per Day
              </InputLabel>
              <TextField
                fullWidth
                type="number"
                value={formData.pricePerDay}
                onChange={(e) =>
                  setFormData({ ...formData, pricePerDay: e.target.value })
                }
                placeholder="0.00"
                inputProps={{ min: 0, step: 0.01 }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                required
              />
              <FormHelperText>
                Set a competitive daily rate for your tool
              </FormHelperText>
            </Box>

            {/* Location */}
            <Box>
              <InputLabel required sx={{ mb: 1 }}>
                Pick-up Location
              </InputLabel>
              <TextField
                fullWidth
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="e.g., San Francisco, CA or 0.5 miles from downtown"
                required
              />
              <FormHelperText>
                Exact address will be shared after rental confirmation
              </FormHelperText>
            </Box>

            {/* Info Box */}
            <Alert severity="info">
              Your tool will be listed as available immediately. You can change
              availability anytime from the My Tools page.
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
                type="submit"
                variant="contained"
                size="large"
                fullWidth
              >
                Add Tool
              </Button>
            </Stack>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
