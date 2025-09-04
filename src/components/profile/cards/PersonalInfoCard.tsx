import React, { useEffect, useState } from "react";
import { Stack, TextField } from "@mui/material";
import ModernCard from "./ModernCard";
import { PersonalInfoCardProps } from "../types/profile.types";

const PersonalInfoCard: React.FC<PersonalInfoCardProps> = ({
  userProfile,
  isEditing,
  onToggleEdit,
  onUpdated
}) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    userName: "",
    position: "",
  });

  useEffect(() => {
    if (!userProfile) return;
    setForm({
      firstName: userProfile.firstName || "",
      lastName: userProfile.lastName || "",
      email: userProfile.email || "",
      phone: (userProfile as any).phone || "",
      location: userProfile.location || "",
      userName: (userProfile as any).userName || "",
      position: (userProfile as any).position || "",
    });
  }, [userProfile]);

  const handleChange =
    (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async () => {
    try {
      const res = await fetch(
        `http://localhost:4000/api/users/${userProfile._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            phone: form.phone,
            location: form.location,
            userName: form.userName,
            position: form.position,
          }),
        }
      );
      if (!res.ok) throw new Error("Failed to update user profile");
      const updated = await res.json();
      const updatedUser = updated.user ?? updated;

      setForm({
        firstName: updatedUser.firstName || "",
        lastName: updatedUser.lastName || "",
        email: updatedUser.email || "",
        phone: updatedUser.phone || "",
        location: updatedUser.location || "",
        userName: updatedUser.userName || "",
        position: updatedUser.position || "",
      });
       onUpdated?.(updatedUser);
      onToggleEdit?.();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <ModernCard
      title="Personal Informations"
      editSection="personal"
      isEditing={isEditing}
      onToggleEdit={onToggleEdit}
      onSave={handleSubmit}
    >
      <Stack spacing={3}>
        <TextField
          label="User Name"
          onChange={handleChange("userName")}
          value={form.userName}
          disabled={!isEditing}
          fullWidth
          variant="outlined"
          placeholder="Enter your user name"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
        />
        <TextField
          label="Name Surname"
          onChange={handleChange("firstName")}
          value={`${form.firstName} ${form.lastName}`}
          disabled={!isEditing}
          fullWidth
          variant="outlined"
          placeholder="Enter your name and surname"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
        />
        <TextField
          label="Email"
          value={form.email}
          onChange={handleChange("email")}
          disabled={!isEditing}
          fullWidth
          placeholder="Enter your email address"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
        />
        <TextField
          label="Phone"
          value={form.phone}
          onChange={handleChange("phone")}
          disabled={!isEditing}
          fullWidth
          placeholder="Enter your phone number"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
        />
        <TextField
          label="Location"
          value={form.location}
          onChange={handleChange("location")}
          disabled={!isEditing}
          fullWidth
          placeholder="Enter your location"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
        />
        {isEditing && (
          <TextField
            label="Position"
            value={form.position}
            onChange={handleChange("position")}
            disabled={!isEditing}
            fullWidth
            placeholder="Enter your position"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
          />
        )}
      </Stack>
    </ModernCard>
  );
};

export default PersonalInfoCard;
