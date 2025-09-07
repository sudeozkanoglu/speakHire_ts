"use client";

import React from "react";
import { Box, Button } from "@mui/material";

interface FilterButtonsProps {
  filters: string[];
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  filterColor?: string;
  filterHoverColor?: string;
}

export const FilterButtons: React.FC<FilterButtonsProps> = ({
  filters,
  activeFilter,
  setActiveFilter,
  filterColor = "#E4AC9E",
  filterHoverColor = "#D99A7C",
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 1,
        mb: 4,
      }}
    >
      {filters.map((filter) => {
        const isActive = activeFilter === filter;
        return (
          <Button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            variant={isActive ? "contained" : "outlined"}
            size="small"
            sx={{
              borderRadius: 20,
              color: isActive ? "white" : filterColor,
              borderColor: filterColor,
              bgcolor: isActive ? filterColor : "transparent",
              "&:hover": {
                bgcolor: isActive ? filterHoverColor : "transparent",
                borderColor: filterHoverColor,
              },
            }}
          >
            {filter}
          </Button>
        );
      })}
    </Box>
  );
};
