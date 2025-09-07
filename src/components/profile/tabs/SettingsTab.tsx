import React from "react";
import { Box } from "@mui/material";
import { SettingsTabProps } from "../types/profile.types";
import TabPanel from "@/components/TabPanel";
import SettingsCard from "../cards/SettingsCard";

const SettingsTab: React.FC<SettingsTabProps> = ({
  value,
  index,
  userProfile,
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
        <SettingsCard userProfile={userProfile} onUpdated={onUpdated} />
      </Box>
    </TabPanel>
  );
};

export default SettingsTab;
