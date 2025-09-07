import React, { ReactElement } from "react";
import {
  Box,
  Typography,
  Grid,
  Link,
  Stack,
  Chip
} from "@mui/material";
import { motion } from "framer-motion";


export interface FooterLink {
  label: string;
  href: string;
  tag?: "Popular" | "New" | string;
}

export interface FooterSection {
  title: string;
  icon: ReactElement;
  links: FooterLink[];
}

interface FooterSectionsProps {
  section: FooterSection;
  sectionIndex: number;
}

export const FooterSections: React.FC<FooterSectionsProps> = ({ section, sectionIndex }) => {
  return (
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
  );
};
