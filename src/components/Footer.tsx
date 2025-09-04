"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  Stack,
  Chip,
  Avatar,
  Divider,
} from "@mui/material";
import {
  Email,
  Phone,
  LocationOn,
  Support,
  School,
  Work,
} from "@mui/icons-material";
import { FaBrain } from "react-icons/fa";
import { motion } from "framer-motion";

export const Footer = () => {
  const footerSections = [
    {
      title: "Interview Types",
      icon: <Work fontSize="small" />,
      links: [
        { label: "Frontend Developer", href: "#", tag: "Popular" },
        { label: "Backend Developer", href: "#", tag: "New" },
        { label: "Full Stack", href: "#" },
      ],
    },
    {
      title: "Resources",
      icon: <School fontSize="small" />,
      links: [
        { label: "Interview Guide", href: "#" },
        { label: "Templates", href: "#" },
      ],
    },
    {
      title: "Support",
      icon: <Support fontSize="small" />,
      links: [
        { label: "Help Center", href: "#" },
        { label: "Contact Us", href: "#" },
      ],
    },
  ];

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #1a202c 0%, #2d3748 100%)",
        color: "white",
        mt: 8,
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background:
            "linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
        },
      }}
    >
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          <Grid container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Stack spacing={3}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    sx={{
                      background:
                        "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
                      width: 48,
                      height: 48,
                      mr: 2,
                    }}
                  >
                    <FaBrain size={24} />
                  </Avatar>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 0.5 }}>
                      SpeakHire
                    </Typography>
                    <Typography variant="body2" color="grey.400">
                      AI-Powered Interview Excellence
                    </Typography>
                  </Box>
                </Box>

                <Typography color="grey.300" sx={{ lineHeight: 1.7 }}>
                  Transform your interview skills with cutting-edge AI technology.
                  Practice, learn, and land your dream job with confidence.
                </Typography>

                {/* Contact Info */}
                <Stack spacing={1}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Email sx={{ fontSize: 16, color: "grey.400" }} />
                    <Typography variant="body2" color="grey.300">
                      support@speakhire.ai
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Phone sx={{ fontSize: 16, color: "grey.400" }} />
                    <Typography variant="body2" color="grey.300">
                      +1 (555) 123-4567
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <LocationOn sx={{ fontSize: 16, color: "grey.400" }} />
                    <Typography variant="body2" color="grey.300">
                      San Francisco, CA
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </motion.div>
          </Grid>

          {footerSections.map((section, sectionIndex) => (
            <Grid container key={section.title}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * (sectionIndex + 1) }}
              >
                <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
                  <Box sx={{ color: "#667eea" }}>{section.icon}</Box>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {section.title}
                  </Typography>
                </Box>
                <Stack spacing={1.5}>
                  {section.links.map((link, linkIndex) => (
                    <Box
                      key={`${section.title}-${link.label}-${linkIndex}`}
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <Link
                        href={link.href}
                        color="grey.300"
                        underline="none"
                        sx={{
                          "&:hover": {
                            color: "#667eea",
                            transform: "translateX(4px)",
                          },
                          transition: "all 0.2s ease",
                          fontSize: "0.9rem",
                        }}
                      >
                        {link.label}
                      </Link>
                      {link.tag && (
                        <Chip
                          label={link.tag}
                          size="small"
                          sx={{
                            fontSize: "0.65rem",
                            height: 18,
                            bgcolor:
                              link.tag === "Popular"
                                ? "#ef4444"
                                : link.tag === "New"
                                ? "#10b981"
                                : "#f59e0b",
                            color: "white",
                          }}
                        />
                      )}
                    </Box>
                  ))}
                </Stack>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 6, borderColor: "rgba(255,255,255,0.1)" }} />

        <Grid
          container
          spacing={4}
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >
          <Grid container >
            <Typography color="grey.400">
              © 2025 SpeakHire. All rights reserved.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};