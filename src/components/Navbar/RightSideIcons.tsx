import React, { useState } from "react";
import { Stack, Avatar, IconButton, Badge } from "@mui/material";
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";

interface RightSideIconsProps {
  userID: string | null;
  isMobile: boolean;
  handleProfileMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  handleDrawerToggle: () => void;
}

type Person = {
  name: string;
  email?: string;
};


export const RightSideIcons: React.FC<RightSideIconsProps> = ({
  userID,
  isMobile,
  handleProfileMenuOpen,
  handleDrawerToggle
}) => {
  const [personDatas, setPersonDatas] = useState<Person[]>([]);

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      {userID && (
        <IconButton
          size="medium"
          color="inherit"
          sx={{
            color: "#13678A",
            "&:hover": { backgroundColor: "#f0f7ff" },
          }}
        >
          <Badge badgeContent={0} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      )}

      {userID && (
        <IconButton
          size="medium"
          color="inherit"
          sx={{
            color: "#13678A",
            "&:hover": { backgroundColor: "#f0f7ff" },
          }}
        >
          <SettingsIcon />
        </IconButton>
      )}

      <IconButton onClick={handleProfileMenuOpen} size="small" sx={{ ml: 1 }}>
        <Avatar
          sx={{
            width: 40,
            height: 40,
            bgcolor: "linear-gradient(45deg, #13678A 30%, #45a049 90%)",
            color: "white",
            fontWeight: "bold",
            border: "2px solid #e0e0e0",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.1)",
              boxShadow: "0 4px 12px rgba(19, 103, 138, 0.3)",
            },
          }}
        >
          {userID ? personDatas[0]?.name?.charAt(0) : null}
        </Avatar>
      </IconButton>

      {isMobile && (
        <IconButton
          color="inherit"
          onClick={handleDrawerToggle}
          sx={{
            color: "#13678A",
            "&:hover": { backgroundColor: "#f0f7ff" },
          }}
        >
          <MenuIcon />
        </IconButton>
      )}
    </Stack>
  );
};
