"use client";

import React from "react";
import {Box, Button} from "@mui/material";

interface FilterButtonsProps {
  filters: string[];
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

export const FilterButtons: React.FC<FilterButtonsProps> = ({filters, activeFilter, setActiveFilter}) => {
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
          {filters.map((filter) => (
            <Button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              variant={activeFilter === filter ? "contained" : "outlined"}
              size="small"
              sx={{ borderRadius: 20, color: activeFilter === filter ? "white" : "#E4AC9E", borderColor: "#E4AC9E", bgcolor: activeFilter === filter ? "#E4AC9E" : "transparent", "&:hover": { bgcolor: activeFilter === filter ? "#D99A7C" : "transparent", borderColor: "#D99A7C" }}}
            >
              {filter}
            </Button>
          ))}
        </Box>
    );
};