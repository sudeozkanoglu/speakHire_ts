"use client";

import React from "react";
import {
  Avatar,
  Box,
  Divider,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
  Chip,
} from "@mui/material";
import { Star, ArrowForward,AccessTime, } from "@mui/icons-material";
import {
  difficultyColorMap,
  categoryColorMap,
} from "@/components/styles/sytles";

interface CardStructureProps {
  card: {
    title: string;
    description: string;
    duration: string;
    questions: number;
    rating: number;
    category: string;
    difficulty: string;
  };
  IconComponent?: React.ElementType;
}

export const CardStructure = ({ card, IconComponent }: CardStructureProps) => {
  return (
    <Card
      sx={{
        height: "100%",
        width: "400px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        cursor: "pointer",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Avatar
            sx={{
              bgcolor: categoryColorMap[card.category] || "primary.main",
              mr: 2,
              width: 48,
              height: 48,
            }}
          >
            {IconComponent && (
              <IconComponent
                style={{
                  fontSize: 24,
                }}
              />
            )}
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              {card.title}
            </Typography>
            <Chip
              label={card.difficulty}
              sx={{
                bgcolor: difficultyColorMap[card.difficulty],
                color: "white",
                fontSize: "0.75rem",
              }}
              size="small"
            />
          </Box>
        </Box>

        <Typography color="text.secondary" sx={{ mb: 3 }}>
          {card.description}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AccessTime
              sx={{ fontSize: 16, mr: 0.5, color: "text.secondary" }}
            />
            <Typography variant="body2" color="text.secondary">
              {card.duration}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body2" color="text.secondary">
              {card.questions} questions
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Star sx={{ fontSize: 16, mr: 0.5, color: "#FFD700" }} />
            <Typography variant="body2" color="text.secondary">
              {card.rating}
            </Typography>
          </Box>
        </Stack>

        <Button
          variant="contained"
          fullWidth
          endIcon={<ArrowForward />}
          sx={{
            bgcolor: categoryColorMap[card.category] || "primary.main",
            "&:hover": {
              bgcolor: categoryColorMap[card.category] || "primary.dark",
            },
          }}
        >
          Start Interview
        </Button>
      </CardContent>
    </Card>
  );
};
