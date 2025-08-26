"use client";

import React from "react";
import {Box, TextField, InputAdornment} from "@mui/material";
import { Search } from "@mui/icons-material";

interface SearchBarProps {
  placeHolderText: string;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const SearchBar = ({placeHolderText, searchTerm, setSearchTerm}: SearchBarProps) => {
  return (
    <Box sx={{ mb: 4, display: "flex", justifyContent: "center" }}>
      <TextField
        placeholder= {placeHolderText}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        size="medium"
        sx={{ maxWidth: 600, width: "100%" }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search color="action" />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};
