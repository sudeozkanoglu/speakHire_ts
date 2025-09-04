import React from "react";
import { Box } from "@mui/material";
import CareerInfoCard from "../cards/CareerInfoCard";
import SkillsCard from "../cards/SkillsCard";
import { CareerTabProps } from "../types/profile.types";
import TabPanel from "@/components/TabPanel";

const CareerTab: React.FC<
  CareerTabProps & { value: number; index: number }
> = ({ userProfile, editingSections, onToggleEdit, value, index, onUpdated }) => {
  return (
    <TabPanel value={value} index={index}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3,
        }}
      >
        <CareerInfoCard
          userProfile={userProfile}
          isEditing={editingSections.career}
          onToggleEdit={() => onToggleEdit("career")}
          onUpdated={onUpdated}
        />
        <SkillsCard
          userProfile={userProfile}
          isEditing={editingSections.skills}
          onToggleEdit={() => onToggleEdit("skills")}
          onUpdated={onUpdated}
        />
      </Box>
    </TabPanel>
  );
};

export default CareerTab;
