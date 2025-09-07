import React from "react";
import { Typography, Grid } from "@mui/material";

export const BottomSections = () => {
  return (
    <Grid
      container
      spacing={4}
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <Grid container>
        <Typography color="grey.400">
          © 2025 SpeakHire. All rights reserved.
        </Typography>
      </Grid>
    </Grid>
  );
};
