import React from 'react';
import { Box, Fade } from '@mui/material';
import { TabPanelProps } from './profile/types/profile.types';

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
  const active = value === index;

  return (
    <Box
      role="tabpanel"
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      hidden={!active}                    
      sx={{ width: '100%' }}
      {...other}
    >
      <Fade
        in={active}
        timeout={200}
        mountOnEnter
        unmountOnExit={false}            
      >
        
        <Box sx={{ py: 3, display: active ? 'block' : 'none' }}>
          {children}                       
        </Box>
      </Fade>
    </Box>
  );
};

export default TabPanel;