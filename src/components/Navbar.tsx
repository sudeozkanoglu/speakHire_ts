"use client";
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Container,
  Box,
  Stack,
  Link,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  Typography,
  Badge,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  LogoutOutlined as LogoutIcon,
  Home as HomeIcon,
  AccountCircle as ProfileIcon,
  Work as InterviewsIcon,
  Login,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

type Person = {
  name: string;
  email?: string;
};

export const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userID, setUserID] = useState<string | null>(null);
  const [personDatas, setPersonDatas] = useState<Person[]>([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userID");
      setUserID(storedUserId);
    }
  }, []);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    localStorage.removeItem("userType");
    setUserID(null);
    router.push("/auth");
  };

  const navItems = [
    { label: "HOME", href: "/", icon: <HomeIcon sx={{ fontSize: 18 }} /> },
    {
      label: "PROFILE",
      href: "/profile",
      icon: <ProfileIcon sx={{ fontSize: 18 }} />,
    },
    {
      label: "INTERVIEWS",
      href: "/interviews",
      icon: <InterviewsIcon sx={{ fontSize: 18 }} />,
    },
  ];

  const drawer = (
    <Box sx={{ width: 250, pt: 2 }}>
      <Box sx={{ px: 2, pb: 2, borderBottom: "1px solid #e0e0e0" }}>
        <Typography
          variant="h6"
          onClick={() => router.push("/")}
          sx={{
            fontFamily: "monospace",
            fontWeight: "bold",
            color: "#13678A",
            textAlign: "center",
          }}
        >
          SpeakHire
        </Typography>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} sx={{ py: 1.5 }}>
            <Link
              href={item.href}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                color: "#13678A",
                textDecoration: "none",
                width: "100%",
                px: 1,
                py: 0.5,
                borderRadius: 1,
                "&:hover": {
                  backgroundColor: "#f0f7ff",
                  color: "#012030",
                },
              }}
            >
              {item.icon}
              <Typography variant="body1" fontWeight="500">
                {item.label}
              </Typography>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: "#FFFFFF",
          borderBottom: "2px solid #f0f0f0",
          color: "text.primary",
        }}
      >
        <Container maxWidth="xl">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            py={1.5}
            px={{ xs: 1, sm: 2 }}
          >
            <Box display="flex" alignItems="center">
              <Typography
                variant="h5"
                onClick={() => router.push("/")}
                sx={{
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  color: "#13678A",
                  background:
                    "linear-gradient(45deg, #13678A 30%, #45a049 90%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                SpeakHire
              </Typography>
            </Box>

            {!isMobile && (
              <Stack direction="row" spacing={1} alignItems="center">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      color: "#13678A",
                      textDecoration: "none",
                      fontFamily: "system-ui",
                      fontSize: "0.9rem",
                      fontWeight: "600",
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        color: "#012030",
                        backgroundColor: "#f0f7ff",
                        transform: "translateY(-1px)",
                      },
                    }}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                ))}
              </Stack>
            )}

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

              <IconButton
                onClick={handleProfileMenuOpen}
                size="small"
                sx={{ ml: 1 }}
              >
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
          </Box>
        </Container>
      </AppBar>

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
            <Link
              href="/auth"
              sx={{ textDecoration: "none", color: "#13678A" }}
            >
              Login / Register
            </Link>
          )}
        </MenuItem>
        {userID && [
          <MenuItem key="settings" onClick={handleMenuClose} sx={{ py: 1.5 }}>
            <SettingsIcon sx={{ mr: 2, color: "#13678A" }} />
            <Link
              href="/profile?tab=settings"
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

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          sx: {
            boxShadow: "-4px 0 20px rgba(0,0,0,0.1)",
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};
