import React, { useMemo, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  IconButton,
  Stack,
} from "@mui/material";
import { Add, Delete, School } from "@mui/icons-material";
import ModernCard from "./ModernCard";
import { Education, EducationCardProps } from "../types/profile.types";
import EducationModal from "../modals/EducationModal";

const EducationCard: React.FC<EducationCardProps> = ({
  userProfile,
  education,
  isEditing,
  onToggleEdit,
  onDelete,
  onUpdated,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [items, setItems] = useState<Education[]>(() => education ?? []);
  const [newItems, setNewItems] = useState<Education[]>([]);

  const handleAddFromModal = (newEdu: Education) => {
    setItems((prev) => [...prev, newEdu]);
    setNewItems((prev) => [...prev, newEdu]);
    setModalOpen(false);
  };

  const handleLocalDelete = (id?: string) => {
    setItems((prev) =>
      prev.filter((e) => e._id !== id && (e as any).__tmpId !== id)
    );
    setNewItems((prev) =>
      prev.filter((e) => e._id !== id && (e as any).__tmpId !== id)
    );
    onDelete?.(id);
  };

  const handleChange =
    (index: number, key: keyof Education) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setItems((prev) => {
        const next = [...prev];
        if (key === "startYear" || key === "endYear" || key === "gpa") {
          next[index] = {
            ...next[index],
            [key]: val.trim() === "" ? undefined : Number(val),
          };
        } else {
          next[index] = { ...next[index], [key]: val };
        }
        return next;
      });
    };

  const handleSave = async () => {
    if (!userProfile?._id) return;

    const payload = items.map(({ _id, ...rest }) => ({ _id, ...rest }));
    const res = await fetch(
      `http://localhost:4000/api/users/${userProfile._id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ education: payload, mode: "replace" }),
      }
    );
    if (!res.ok) throw new Error("Failed to update education");

    const data = await res.json();
    const updatedUser = data.user ?? data.updatedUser ?? data;

    setItems(updatedUser?.education ?? []);
    setNewItems([]);

    onUpdated?.(updatedUser);
    onToggleEdit?.("education");
  };

  const yearLabel = (e: Education) => {
    const a = e.startYear ?? "";
    const b = e.endYear ?? "";
    if (a || b) return `${a}${b ? ` - ${b}` : ""}`;
    return "";
  };

  const gpaStr = (e: Education) => (e.gpa === 0 || e.gpa ? String(e.gpa) : "");

  const isEmpty = useMemo(() => !items || items.length === 0, [items]);

  return (
    <>
      <ModernCard
        title="Education History"
        onToggleEdit={onToggleEdit}
        isEditing={isEditing}
        editSection="education"
        onSave={handleSave}
      >
        {isEditing && (
          <Button
            startIcon={<Add />}
            variant="outlined"
            onClick={() => setModalOpen(true)}
            sx={{
              mb: 3,
              borderRadius: 2,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              "&:hover": {
                background: "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
                border: "none",
              },
            }}
          >
            Add New Education
          </Button>
        )}

        {!isEmpty ? (
          <Stack spacing={3}>
            {items.map((edu, index) => (
              <Card
                key={edu._id || index}
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  border: "2px solid #f0f2ff",
                  background:
                    "linear-gradient(145deg, #fafbff 0%, #f0f2ff 100%)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "#667eea",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 25px rgba(102, 126, 234, 0.15)",
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Grid container spacing={2}>
                    <Grid container>
                      <TextField
                        label="School / University"
                        value={edu.school || ""}
                        onChange={handleChange(index, "school")}
                        disabled={!isEditing}
                        fullWidth
                        placeholder="Enter school name"
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                      />
                    </Grid>

                    <Grid container>
                      <TextField
                        label="Field of Study"
                        value={edu.fieldOfStudy || ""}
                        onChange={handleChange(index, "fieldOfStudy")}
                        disabled={!isEditing}
                        fullWidth
                        placeholder="Enter your field"
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                      />
                    </Grid>

                    <Grid container>
                      <TextField
                        label="Start Year"
                        value={edu.startYear ?? ""}
                        onChange={handleChange(index, "startYear")}
                        disabled={!isEditing}
                        type="number"
                        fullWidth
                        placeholder="e.g., 2018"
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                        inputProps={{ min: 1900, max: 2100 }}
                      />
                    </Grid>

                    <Grid container>
                      <TextField
                        label="End Year"
                        value={edu.endYear ?? ""}
                        onChange={handleChange(index, "endYear")}
                        disabled={!isEditing}
                        type="number"
                        fullWidth
                        placeholder="e.g., 2022"
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                        inputProps={{ min: 1900, max: 2100 }}
                      />
                    </Grid>

                    <Grid container>
                      <TextField
                        label="GPA"
                        value={gpaStr(edu)}
                        onChange={handleChange(index, "gpa")}
                        disabled={!isEditing}
                        type="number"
                        fullWidth
                        placeholder="e.g., 3.5"
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                        inputProps={{ step: "0.01", min: 0, max: 4 }}
                      />
                    </Grid>

                    <Grid container>
                      <Typography variant="body2" color="text.secondary">
                        {[
                          edu.school,
                          edu.fieldOfStudy,
                          yearLabel(edu),
                          gpaStr(edu) ? `GPA: ${gpaStr(edu)}` : "",
                        ]
                          .filter(Boolean)
                          .join(" • ")}
                      </Typography>
                    </Grid>
                  </Grid>

                  {isEditing && (
                    <Box
                      sx={{
                        mt: 2,
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleLocalDelete(edu._id)}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  )}
                </CardContent>
              </Card>
            ))}
          </Stack>
        ) : (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <School sx={{ fontSize: 48, color: "text.secondary", mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No education information added yet
            </Typography>
            <Typography variant="body2" color="text.secondary">
              You can add your education history by clicking the edit button.
            </Typography>
          </Box>
        )}
      </ModernCard>
      <EducationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddEducation={handleAddFromModal}
      />
    </>
  );
};

export default EducationCard;
