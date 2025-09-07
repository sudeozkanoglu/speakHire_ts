import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

export const LoadingComponent = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "60vh",
      gap: 2,
    }}
  >
    <CircularProgress
      size={40}
      sx={{
        color: "primary.main",
      }}
    />
    <Typography variant="body2" color="text.secondary">
      Profile Knowledge is loading...
    </Typography>
  </Box>
);