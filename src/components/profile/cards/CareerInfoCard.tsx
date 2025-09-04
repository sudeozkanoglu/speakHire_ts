import React, { useEffect, useState } from "react";
import { Stack, TextField } from "@mui/material";
import ModernCard from "./ModernCard";
import { CareerInfoCardProps } from "../types/profile.types";

const CareerInfoCard: React.FC<CareerInfoCardProps> = ({
  userProfile,
  isEditing,
  onToggleEdit,
  onUpdated,
}) => {
  const [form, setForm] = useState({
    currentPosition: "",
    experienceLevel: "",
  });

  useEffect(() => {
    if (!userProfile) return;

    setForm({
      currentPosition: userProfile.careerInfo.currentPosition || "",
      experienceLevel: userProfile.careerInfo.experienceLevel || "",
    });
  }, [userProfile]);

const handleChange =
    (key: keyof typeof form) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({
        ...prev,
        [key]: event.target.value,
      }));
    };

  const handleSubmit = async () => {
    try {
      const res = await fetch(
        `http://localhost:4000/api/users/${userProfile._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            careerInfo: {
              currentPosition: form.currentPosition,
              experienceLevel: form.experienceLevel,
            },
          }),
        }
      );
      if (!res.ok) {
        throw new Error("Failed to update career information");
      }
      const updated = await res.json();
      const updatedUser = updated.user ?? updated;

      setForm({
        currentPosition: updatedUser.careerInfo.currentPosition || "",
        experienceLevel: updatedUser.careerInfo.experienceLevel || "",
      });

      onUpdated?.(updatedUser);
      onToggleEdit?.();
    } catch (error) {
      console.error("Error updating career information:", error);
    }
  };

  return (
    <ModernCard
      title="Career Information"
      editSection="career"
      isEditing={isEditing}
      onToggleEdit={onToggleEdit}
      onSave={handleSubmit}
    >
      <Stack spacing={3}>
        <TextField
          label="Current Position"
          onChange={handleChange("currentPosition")}
          value={form.currentPosition}
          disabled={!isEditing}
          fullWidth
          placeholder="Enter your current position"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
        />
        <TextField
          label="Experience Level"
          onChange={handleChange("experienceLevel")}
          value={form.experienceLevel}
          disabled={!isEditing}
          fullWidth
          placeholder="E.g., Junior (0-2 years), Mid-level (3-5 years)"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
        />
      </Stack>
    </ModernCard>
  );
};

export default CareerInfoCard;
