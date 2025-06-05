import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Box,
  Container,
  Grid as MuiGrid,
  Paper,
  Typography,
  Avatar,
  Button,
  TextField,
  Divider,
  Stack,
  Chip,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';
import {
  Edit as EditIcon,
  LocationOn,
  Email,
  Phone,
  ShoppingBag,
  Favorite,
  Star,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';

const Grid = MuiGrid as any; 

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    email: '',
    phone: '',
    location: '',
  });

  
  const recentOrders = [
    { id: 1, date: '2024-03-15', status: 'Delivered', total: 299 },
    { id: 2, date: '2024-03-10', status: 'In Transit', total: 149 },
    { id: 3, date: '2024-03-05', status: 'Delivered', total: 199 },
  ];

  const stats = [
    { label: 'Orders', value: 12, icon: <ShoppingBag /> },
    { label: 'Wishlist', value: 5, icon: <Favorite /> },
    { label: 'Reviews', value: 8, icon: <Star /> },
  ];

  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    setProfileData({
      email: user.email || '',
      phone: user.phone || '',
      location: user.location || '',
    });
  }, [user, navigate]);

  const handleEditToggle = () => {
    setEditMode(!editMode);
    if (editMode) {
      setProfileData({
        email: user?.email || '',
        phone: user?.phone || '',
        location: user?.location || '',
      });
    }
  };

  const handleSave = () => {
    if (user) {
      updateUser({
        ...user,
        ...profileData
      });
      setEditMode(false);
    }
  };

  if (!user) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'success';
      case 'In Transit':
        return 'primary';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: { xs: 2, sm: 4 }, mb: { xs: 2, sm: 4 }, px: { xs: 2, sm: 3 } }}>
      {/* Header Section */}
      <Paper 
        elevation={0}
        sx={{ 
          p: { xs: 2, sm: 4 }, 
          mb: { xs: 2, sm: 3 }, 
          background: 'linear-gradient(to right, #2196f3, #1976d2)',
          color: 'white'
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm="auto">
            <Box display="flex" justifyContent={{ xs: "center", sm: "flex-start" }}>
              <Avatar
                sx={{
                  width: { xs: 80, sm: 120 },
                  height: { xs: 80, sm: 120 },
                  bgcolor: 'white',
                  color: 'primary.main',
                  fontSize: { xs: '2rem', sm: '3rem' },
                  border: '4px solid white',
                }}
              >
                {user.firstName[0]}{user.lastName[0]}
              </Avatar>
            </Box>
          </Grid>
          <Grid item xs={12} sm>
            <Box textAlign={{ xs: "center", sm: "left" }}>
              <Typography variant="h4" sx={{ mb: 1, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                {user.firstName} {user.lastName}
              </Typography>
              <Typography variant="subtitle1">
                @{user.username}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Stats Section */}
      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: { xs: 2, sm: 3 } }}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={4} key={stat.label}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, sm: 3 },
                textAlign: 'center',
                bgcolor: 'background.default',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Box sx={{ color: 'primary.main', mb: 1 }}>
                {stat.icon}
              </Box>
              <Typography variant="h4" sx={{ mb: 1, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                {stat.value}
              </Typography>
              <Typography color="textSecondary">
                {stat.label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Profile Info Section */}
      <Paper elevation={0} sx={{ p: { xs: 2, sm: 3 }, mb: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">Profile Information</Typography>
          <Button
            startIcon={editMode ? <CancelIcon /> : <EditIcon />}
            onClick={handleEditToggle}
            color={editMode ? 'error' : 'primary'}
            size="small"
          >
            {editMode ? 'Cancel' : 'Edit'}
          </Button>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              disabled={!editMode}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <Email sx={{ color: 'action.active', mr: 1 }} />
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone"
              value={profileData.phone}
              onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
              disabled={!editMode}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <Phone sx={{ color: 'action.active', mr: 1 }} />
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Location"
              value={profileData.location}
              onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
              disabled={!editMode}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <LocationOn sx={{ color: 'action.active', mr: 1 }} />
                ),
              }}
            />
          </Grid>
        </Grid>

        {editMode && (
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              startIcon={<SaveIcon />}
              onClick={handleSave}
              variant="contained"
              color="primary"
            >
              Save Changes
            </Button>
          </Box>
        )}
      </Paper>

      {/* Recent Orders Section */}
      <Paper elevation={0} sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography variant="h6" sx={{ mb: 3 }}>Recent Orders</Typography>
        <Box sx={{ overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>#{order.id}</TableCell>
                  <TableCell>
                    {new Date(order.date).toLocaleDateString('en-IN')}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={order.status}
                      color={getStatusColor(order.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    {formatPrice(order.total)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Paper>
    </Container>
  );
};

export default Profile; 