"use client";
import React, { useState } from "react";
import {
  AppBar,
  Container,
  Box,
  Link,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  Typography
} from "@mui/material";
import {
  Home as HomeIcon,
  AccountCircle as ProfileIcon,
  Work as InterviewsIcon
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { DesktopNavigation } from "./DesktopNavigation";
import { RightSideIcons } from "./RightSideIcons";
import { ProfileMenu } from "./ProfileMenu";
import { useUserID } from "../hooks/useUserID";

export const Navbar = () => {
const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const userID = useUserID();

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
    router.push("/auth");
  };

  const navItems = [
    { label: "HOME", href: "#", icon: <HomeIcon sx={{ fontSize: 18 }} /> },
    {
      label: "PROFILE",
      href: "#",
      icon: <ProfileIcon sx={{ fontSize: 18 }} />,
    },
    {
      label: "INTERVIEWS",
      href: "#",
      icon: <InterviewsIcon sx={{ fontSize: 18 }} />,
    },
  ];

  const drawer = (
    <Box sx={{ width: 250, pt: 2 }}>
      <Box sx={{ px: 2, pb: 2, borderBottom: "1px solid #e0e0e0" }}>
        <Typography
          variant="h6"
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
            {/* Logo */}
            <Box display="flex" alignItems="center">
              <Typography
                variant="h5"
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
              <DesktopNavigation navItems={navItems} />
            )}

            <RightSideIcons userID={userID} isMobile={isMobile} handleDrawerToggle={handleDrawerToggle} handleProfileMenuOpen={handleProfileMenuOpen} />
          </Box>
        </Container>
      </AppBar>

      {/* Profile Menu */}
      <ProfileMenu anchorEl={anchorEl} handleMenuClose={handleMenuClose} userID={userID} handleLogOut={handleLogOut} />

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
