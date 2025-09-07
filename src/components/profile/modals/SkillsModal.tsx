import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Chip,
  Grid,
  Divider,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { SearchBar } from "../../SearchBar";
import { FilterButtons } from "../../FilterButtons";
import { skillCategories } from "../types/skills";

interface SkillsModalProps {
  open: boolean;
  onClose: () => void;
  onConfirmAdd: (selectedSkills: string[]) => void;
  existingSkills: string[];
}

const SkillsModal: React.FC<SkillsModalProps> = ({
  open,
  onClose,
  onConfirmAdd,
  existingSkills,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", ...Object.keys(skillCategories)];

  const filterSkills = (skills: string[]) => {
    if (!searchTerm) return skills;
    return skills.filter((skill) =>
      skill.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleAddSkills = () => {
    const unique = selectedSkills.filter((s) => !existingSkills.includes(s));
    if (unique.length > 0) onConfirmAdd(unique);
    setSelectedSkills([]);
    setSearchTerm("");
    onClose();
  };

  const handleClose = () => {
    setSelectedSkills([]);
    setSearchTerm("");
    setActiveFilter("All");
    onClose();
  };

  const getFilteredCategories = () => {
    if (activeFilter === "All") {
      return Object.entries(skillCategories);
    }
    return Object.entries(skillCategories).filter(
      ([category]) => category === activeFilter
    );
  };

  const isSkillExisting = (skill: string) => existingSkills.includes(skill);
  const isSkillSelected = (skill: string) => selectedSkills.includes(skill);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          minHeight: "70vh",
        },
      }}
    >
      <DialogTitle
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          textAlign: "center",
          fontSize: "1.5rem",
          fontWeight: 600,
        }}
      >
        Add New Skills
      </DialogTitle>

      <DialogContent sx={{ p: 3, mt: 3 }}>
        <SearchBar
          placeHolderText="Search skills..."
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <FilterButtons
          filters={filters}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          filterColor="linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)"
          filterHoverColor="linear-gradient(135deg, #d99a7c 0%, #c76c6c 100%)"
        />

        {selectedSkills.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 1, color: "#667eea" }}>
              Selected Skills ({selectedSkills.length})
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {selectedSkills.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  onDelete={() => toggleSkill(skill)}
                  sx={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    "& .MuiChip-deleteIcon": {
                      color: "rgba(255,255,255,0.8)",
                    },
                  }}
                />
              ))}
            </Box>
            <Divider sx={{ mt: 2 }} />
          </Box>
        )}

        {getFilteredCategories().map(([category, skills]) => {
          const filteredSkills = filterSkills(skills);

          if (filteredSkills.length === 0) return null;

          return (
            <Box key={category} sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  mb: 1.5,
                  color: "#667eea",
                  fontWeight: 600,
                  borderBottom: "2px solid #e0e7ff",
                  pb: 0.5,
                }}
              >
                {category}
              </Typography>
              <Grid container spacing={1}>
                {filteredSkills.map((skill) => {
                  const isExisting = isSkillExisting(skill);
                  const isSelected = isSkillSelected(skill);

                  return (
                    <Grid container key={skill}>
                      <Chip
                        label={skill}
                        clickable={!isExisting}
                        onClick={() => !isExisting && toggleSkill(skill)}
                        sx={{
                          background: isSelected
                            ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                            : isExisting
                            ? "#e0e0e0"
                            : "white",
                          color: isSelected || isExisting ? "white" : "#333",
                          border: isSelected ? "none" : "1px solid #e0e0e0",
                          cursor: isExisting ? "not-allowed" : "pointer",
                          opacity: isExisting ? 0.5 : 1,
                          "&:hover": !isExisting
                            ? {
                                background: isSelected
                                  ? "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)"
                                  : "#f5f5f5",
                              }
                            : {},
                        }}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          );
        })}

        {searchTerm &&
          getFilteredCategories().every(
            ([, skills]) => filterSkills(skills).length === 0
          ) && (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                No skills found for "{searchTerm}"
              </Typography>
            </Box>
          )}
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button
          onClick={handleClose}
          sx={{
            borderRadius: 2,
            px: 3,
            color: "#666",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleAddSkills}
          disabled={selectedSkills.length === 0}
          variant="contained"
          startIcon={<Add />}
          sx={{
            borderRadius: 2,
            px: 3,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            "&:hover": {
              background: "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
            },
            "&:disabled": {
              background: "#e0e0e0",
            },
          }}
        >
          Add Selected Skills ({selectedSkills.length})
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SkillsModal;
