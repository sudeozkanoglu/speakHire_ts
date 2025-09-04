import React, { useEffect, useState } from "react";
import { Stack, TextField } from "@mui/material";
import { LinkedIn, GitHub } from "@mui/icons-material";
import ModernCard from "./ModernCard";
import { SocialMediaCardProps } from "../types/profile.types";

const SocialMediaCard: React.FC<SocialMediaCardProps> = ({
  userProfile,
  isEditing,
  onToggleEdit,
  onUpdated
}) => {
  const [form, setForm] = useState({
    linkedin: "",
    github: "",
    bio: "",
  });

  useEffect(() => {
    if (!userProfile) return;

    setForm({
      linkedin: userProfile.socialMedia.linkedin || "",
      github: userProfile.socialMedia.github || "",
      bio: userProfile.bio || "",
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
            socialMedia: {
              linkedin: form.linkedin,
              github: form.github,
            },
            bio: form.bio,
          }),
        }
      );
      if (!res.ok) throw new Error("Failed to update user profile");
      const updated = await res.json(); 
      const updatedUser = updated.user ?? updated;

      setForm({
        linkedin: updatedUser.socialMedia?.linkedin || "",
        github: updatedUser.socialMedia?.github || "",
        bio: updatedUser.bio || "",
      });
      onUpdated?.(updatedUser);
      onToggleEdit?.();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <ModernCard
      title="Social Media & Bio"
      editSection="social"
      isEditing={isEditing}
      onToggleEdit={onToggleEdit}
      onSave={handleSubmit}
    >
      <Stack spacing={3}>
        <TextField
          label="LinkedIn"
          onChange={handleChange("linkedin")}
          value={form.linkedin}
          disabled={!isEditing}
          fullWidth
          placeholder="Enter your LinkedIn profile link"
          InputProps={{
            startAdornment: <LinkedIn color="primary" sx={{ mr: 1 }} />,
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
        />
        <TextField
          label="GitHub"
          onChange={handleChange("github")}
          value={form.github}
          disabled={!isEditing}
          fullWidth
          placeholder="Enter your GitHub profile link"
          InputProps={{
            startAdornment: <GitHub sx={{ mr: 1 }} />,
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
        />
        <TextField
          label="Biography"
          onChange={handleChange("bio")}
          value={form.bio}
          disabled={!isEditing}
          fullWidth
          multiline
          rows={4}
          placeholder="Introduce yourself briefly"
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

export default SocialMediaCard;
