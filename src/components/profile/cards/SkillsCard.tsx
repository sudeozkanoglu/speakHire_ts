import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Chip } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import ModernCard from "./ModernCard";
import { SkillsCardProps } from "../types/profile.types";
import SkillsModal from "../modals/SkillsModal";

const SkillsCard: React.FC<SkillsCardProps> = ({
  userProfile,
  isEditing,
  onToggleEdit,
  onUpdated,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const [skills, setSkills] = useState<string[]>(userProfile.skills || []);
  useEffect(() => {
    setSkills(userProfile.skills || []);
  }, [userProfile.skills]);

  const handleConfirmAddSkills = async (newSkills: string[]) => {
    const current = skills;
    const merged = Array.from(new Set([...current, ...newSkills])); 

    setSkills(merged);
    setModalOpen(false);

    try {
      const res = await fetch(`http://localhost:4000/api/users/${userProfile._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ skills: merged }),
    });
    if (!res.ok) throw new Error("Failed to update skills");

    const updated = await res.json();
    const updatedUser = updated.user ?? updated;
    onUpdated?.(updatedUser);
    onToggleEdit?.();
    setModalOpen(false);
  } catch (error) {
    setSkills(current);
    console.error(error);
  }
};

  const handleDeleteSkill = async (skillToDelete: string) => {
    const current = skills;
    const next = current.filter((s) => s !== skillToDelete);

    setSkills(next);
    try {
      const res = await fetch(`http://localhost:4000/api/users/${userProfile._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills: next }),
      });
      if (!res.ok) throw new Error("Failed to update skills");

      const updated = await res.json();
      const updatedUser = updated.user ?? updated;
      onUpdated?.(updatedUser);
      onToggleEdit?.();
    } catch (error) {
      setSkills(current);
      console.error(error);
    }
  };

  return (
    <>
      <ModernCard
        title="Skills"
        editSection="skills"
        isEditing={isEditing}
        onToggleEdit={onToggleEdit}
      >
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Add your technical skills
          </Typography>
          {isEditing && (
            <Button
              startIcon={<Add />}
              variant="outlined"
              size="small"
              onClick={() => setModalOpen(true)}
              sx={{
                borderRadius: 2,
                mb: 2,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                border: "none",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
                  border: "none",
                },
              }}
            >
              Add New Skill
            </Button>
          )}
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
          {skills.length > 0 ? (
            skills.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                variant="filled"
                sx={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  fontWeight: 500,
                  "& .MuiChip-deleteIcon": {
                    color: "rgba(255,255,255,0.8)",
                    "&:hover": {
                      color: "white",
                    },
                  },
                }}
                deleteIcon={isEditing ? <Delete /> : undefined}
                onDelete={
                  isEditing ? () => handleDeleteSkill(skill) : undefined
                }
              />
            ))
          ) : (
            <Typography
              variant="body2"
              color="text.secondary"
              fontStyle="italic"
            >
              No skills added yet. Click the edit button to add skills.
            </Typography>
          )}
        </Box>
      </ModernCard>

      <SkillsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirmAdd={handleConfirmAddSkills}   
        existingSkills={skills}
      />
    </>
  );
};

export default SkillsCard;
