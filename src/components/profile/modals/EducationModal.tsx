import React, { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Box, TextField, Grid, Typography, Chip
} from "@mui/material";
import { Add, School } from "@mui/icons-material";
import { Education } from "../types/profile.types";

interface EducationModalProps {
  open: boolean;
  onClose: () => void;
  onAddEducation: (education: Education) => void;
}

const EducationModal: React.FC<EducationModalProps> = ({
  open,
  onClose,
  onAddEducation,
}) => {
  const [formData, setFormData] = useState<Education>({
    school: "",
    fieldOfStudy: "",
    startYear: undefined,
    endYear: undefined,
    gpa: undefined,
  });

  const handleStr = (field: "school" | "fieldOfStudy") => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((p) => ({ ...p, [field]: e.target.value }));
  };

  const handleNum = (field: "startYear" | "endYear" | "gpa") => (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.trim();
    setFormData((p) => ({ ...p, [field]: v === "" ? undefined : Number(v) }));
  };

  const handleAddEducation = () => {
    
    const newEducation: Education = {
      school: formData.school?.trim() || "",
      fieldOfStudy: formData.fieldOfStudy?.trim() || "",
      startYear: formData.startYear,
      endYear: formData.endYear,
      gpa: formData.gpa,
    };
    onAddEducation(newEducation);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      school: "",
      fieldOfStudy: "",
      startYear: undefined,
      endYear: undefined,
      gpa: undefined,
    });
    onClose();
  };

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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <School />
        Add New Education
      </DialogTitle>

      <DialogContent sx={{ p: 4 , mt: 3}}>
        <Grid container spacing={3}>
          <Grid container>
            <TextField
              label="School / University"
              value={formData.school || ""}
              onChange={handleStr("school")}
              placeholder="Enter your school"
              fullWidth
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />
          </Grid>

          <Grid container>
            <TextField
              label="Field of Study"
              value={formData.fieldOfStudy || ""}
              onChange={handleStr("fieldOfStudy")}
              placeholder="e.g., Computer Engineering"
              fullWidth
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />
          </Grid>

          <Grid container>
            <TextField
              label="Start Year"
              value={formData.startYear ?? ""}
              onChange={handleNum("startYear")}
              placeholder="e.g., 2018"
              type="number"
              fullWidth
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              inputProps={{ min: 1900, max: 2100 }}
            />
          </Grid>

          <Grid container>
            <TextField
              label="End Year"
              value={formData.endYear ?? ""}
              onChange={handleNum("endYear")}
              placeholder="e.g., 2022"
              type="number"
              fullWidth
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              inputProps={{ min: 1900, max: 2100 }}
            />
          </Grid>

          <Grid container>
            <TextField
              label="GPA"
              value={formData.gpa ?? ""}
              onChange={handleNum("gpa")}
              placeholder="e.g., 3.4"
              type="number"
              fullWidth
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              inputProps={{ step: "0.01", min: 0, max: 4 }}
            />
          </Grid>
        </Grid>

        {/* Basit önizleme (opsiyonel) */}
        {(formData.school || formData.fieldOfStudy || formData.startYear || formData.endYear || formData.gpa) && (
          <Box sx={{ mt: 3, p: 2, bgcolor: "rgba(102, 126, 234, 0.1)", borderRadius: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, color: "#667eea" }}>
              Preview:
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {formData.school && (
                <Chip
                  label={formData.school}
                  size="small"
                  sx={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white" }}
                />
              )}
              {formData.fieldOfStudy && (
                <Chip label={formData.fieldOfStudy} size="small" variant="outlined" sx={{ borderColor: "#667eea", color: "#667eea" }} />
              )}
              {(formData.startYear || formData.endYear) && (
                <Chip
                  label={`${formData.startYear ?? ""}${formData.endYear ? ` - ${formData.endYear}` : ""}`}
                  size="small"
                  variant="outlined"
                  sx={{ borderColor: "#667eea", color: "#667eea" }}
                />
              )}
              {formData.gpa !== undefined && formData.gpa !== null && formData.gpa !== ("" as any) && (
                <Chip label={`GPA: ${formData.gpa}`} size="small" variant="outlined" sx={{ borderColor: "#667eea", color: "#667eea" }} />
              )}
            </Box>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button onClick={handleClose} sx={{ borderRadius: 2, px: 3, color: "#666" }}>
          Cancel
        </Button>
        <Button
          onClick={handleAddEducation}
          variant="contained"
          startIcon={<Add />}
          sx={{
            borderRadius: 2,
            px: 3,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            "&:hover": { background: "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)" },
          }}
        >
          Add Education
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EducationModal;