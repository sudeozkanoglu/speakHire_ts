import React from "react";
import {
  Link,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Settings as SettingsIcon,
  Person as PersonIcon,
  LogoutOutlined as LogoutIcon,
  Login,
} from "@mui/icons-material";

interface ProfileMenuProps {
    anchorEl: null | HTMLElement;
    handleMenuClose: () => void;
    userID: string | null;
    handleLogOut: () => void;
}

export const ProfileMenu: React.FC<ProfileMenuProps> = ({
    anchorEl,
    handleMenuClose,
    userID,
    handleLogOut
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      PaperProps={{
        sx: {
          mt: 1,
          minWidth: 200,
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          borderRadius: 2,
        },
      }}
    >
      <MenuItem onClick={handleMenuClose} sx={{ py: 1.5 }}>
        {userID ? (
          <PersonIcon sx={{ mr: 2, color: "#13678A" }} />
        ) : (
          <Login sx={{ mr: 2, color: "#13678A" }} />
        )}
        {userID ? (
          <Link
            href="/profile"
            sx={{ textDecoration: "none", color: "#13678A" }}
          >
            My Profile
          </Link>
        ) : (
          <Link href="/auth" sx={{ textDecoration: "none", color: "#13678A" }}>
            Login / Register
          </Link>
        )}
      </MenuItem>
      {userID && [
        <MenuItem key="settings" onClick={handleMenuClose} sx={{ py: 1.5 }}>
          <SettingsIcon sx={{ mr: 2, color: "#13678A" }} />
          <Link
            href="/settings"
            sx={{ textDecoration: "none", color: "#13678A" }}
          >
            Settings
          </Link>
        </MenuItem>,
        <MenuItem
          key="logout"
          onClick={handleLogOut}
          sx={{ py: 1.5, color: "#d32f2f" }}
        >
          <LogoutIcon sx={{ mr: 2 }} />
          Logout
        </MenuItem>,
      ]}
    </Menu>
  );
};
