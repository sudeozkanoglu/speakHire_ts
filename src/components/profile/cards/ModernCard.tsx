import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  IconButton,
  Tooltip
} from '@mui/material';
import { Edit, Save } from '@mui/icons-material';
import { ModernCardProps } from '../types/profile.types';

const ModernCard: React.FC<ModernCardProps> = ({ 
  children, 
  title, 
  editSection,
  isEditing = false,
  onToggleEdit,
  onDelete,
  onSave
}) => {
  const handleClick = async () => {
    if (isEditing) {
      await onSave?.();
    } else {
      if (editSection && onToggleEdit) onToggleEdit(editSection);
    }
  };
  return (
    <Card 
      sx={{ 
        width: '100%',
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        cursor: "pointer",
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        border: '1px solid rgba(255,255,255,0.2)',
        background: 'linear-gradient(145deg, #ffffff 0%, #f8f9ff 100%)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 16px 48px rgba(0,0,0,0.15)'
        }
      }}
    >
      {title && (
        <Box sx={{ 
          p: 2.5, 
          pb: 1, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          borderBottom: '1px solid rgba(0,0,0,0.05)'
        }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {title}
          </Typography>
          {editSection && (onToggleEdit || onSave) && (
            <Tooltip title={isEditing ? 'Kaydet' : 'Düzenle'}>
              <IconButton
                onClick={handleClick}
                sx={{
                  background: isEditing 
                    ? 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)'
                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
                  },
                  transition: 'all 0.3s ease'
                }}
                size="small"
              >
                {isEditing ? <Save fontSize="small" /> : <Edit fontSize="small" />}
              </IconButton>
            </Tooltip>
          )}
        </Box>
      )}
      <CardContent sx={{ p: 2.5 }}>
        {children}
      </CardContent>
    </Card>
  );
};

export default ModernCard;