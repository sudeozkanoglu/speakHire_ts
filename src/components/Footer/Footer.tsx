import React from "react";
import { Box, Container, Grid, Divider } from "@mui/material";
import { BrandSections } from "./BrandSections";
import { FooterSections } from "./FooterSections";
import { BottomSections } from "./BottomSections";
import { footerSections } from "./footerData";

export const Footer = () => {
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
          <BrandSections />

          {footerSections?.map((section, sectionIndex) => (
            <FooterSections section={section} sectionIndex={sectionIndex} key={sectionIndex} />
          ))}
        </Grid>

        <Divider sx={{ my: 6, borderColor: "rgba(255,255,255,0.1)" }} />

        <BottomSections />
      </Container>
    </Box>
  );
};
