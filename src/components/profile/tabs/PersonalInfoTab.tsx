import React from "react";
import { Box } from "@mui/material";
import PersonalInfoCard from "../cards/PersonalInfoCard";
import SocialMediaCard from "../cards/SocialMediaCard";
import { PersonalInfoTabProps } from "../types/profile.types";
import TabPanel from "@/components/TabPanel";

const PersonalInfoTab: React.FC<PersonalInfoTabProps> = ({
  userProfile,
  editingSections,
  onToggleEdit,
  value,
  index,
  onUpdated,
}) => {
  return (
    <TabPanel value={value} index={index}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3,
        }}
      >
        <PersonalInfoCard
          userProfile={userProfile}
          isEditing={editingSections.personal}
          onToggleEdit={() => onToggleEdit("personal")}
          onUpdated={onUpdated}
        />
        <SocialMediaCard
          userProfile={userProfile}
          isEditing={editingSections.social}
          onToggleEdit={() => onToggleEdit("social")}
          onUpdated={onUpdated}
        />
      </Box>
    </TabPanel>
  );
};

export default PersonalInfoTab;
