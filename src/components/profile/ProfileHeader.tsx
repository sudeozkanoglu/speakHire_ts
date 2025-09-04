import React from 'react';
import {
  Paper,
  Box,
  Grid,
  Avatar,
  Typography,
  Tabs,
  Tab,
  Stack,
  Badge
} from '@mui/material';
import {
  Person,
  Work,
  School,
  Assessment,
  Settings,
  BusinessCenter
} from '@mui/icons-material';
import { ProfileHeaderProps } from './types/profile.types';

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  userProfile,
  tabValue,
  onTabChange
}) => {
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        mb: 4, 
        overflow: 'hidden',
        borderRadius: 4,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }
      }}
    >
      <Box sx={{ color: 'white', p: 4, position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid container >
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              <Avatar
                sx={{ 
                  width: 130, 
                  height: 130, 
                  border: '4px solid rgba(255,255,255,0.3)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                  fontSize: '3rem',
                  background: 'linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)'
                }}
              >
                {userProfile.firstName?.charAt(0) || 'U'}
              </Avatar>
            </Badge>
            <Typography 
              variant="h3" 
              fontWeight="700" 
              gutterBottom 
              sx={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)', mt:5 }}
            >
              {userProfile.firstName} {userProfile.lastName}
            </Typography>
            <Stack direction="row" sx={{mt: 7}}>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                <BusinessCenter sx={{ fontSize: '1.2rem', opacity: 0.9, mr:1, mb:0.5 }} />
                {userProfile.position || 'No Position'}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ bgcolor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
        <Tabs
          value={tabValue}
          onChange={onTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              color: 'rgba(255,255,255,0.7)',
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '1rem',
              '&.Mui-selected': {
                color: 'white',
              },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: 'white',
              height: 3,
              borderRadius: '3px 3px 0 0'
            }
          }}
        >
          <Tab icon={<Person />} iconPosition="start" label="Profile Knowledge" />
          <Tab icon={<Work />} iconPosition="start" label="Career" />
          <Tab icon={<School />} iconPosition="start" label="Education" />
          <Tab icon={<Assessment />} iconPosition="start" label="Interview Statistics" />
          <Tab icon={<Settings />} iconPosition="start" label="Account Settings" />
        </Tabs>
      </Box>
    </Paper>
  );
};

export default ProfileHeader;