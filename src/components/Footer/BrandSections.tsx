import React from "react";
import {
  Box,
  Typography,
  Grid,
  Stack,
  Avatar
} from "@mui/material";
import { motion } from "framer-motion";
import {
  Email,
  Phone,
  LocationOn
} from "@mui/icons-material";
import { FaBrain } from "react-icons/fa";

export const BrandSections = () => {
  return (
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
                background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
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
  );
};
