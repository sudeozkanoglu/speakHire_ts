import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";
import { Assessment, TrendingUp } from "@mui/icons-material";
import ModernCard from "../cards/ModernCard";
import TabPanel from "@/components/TabPanel";
import { InterviewStatsTabProps } from "../types/profile.types";

const InterviewStatsTab: React.FC<
  InterviewStatsTabProps & { value: number; index: number }
> = ({ userProfile, value, index }) => {
  return (
    <TabPanel value={value} index={index}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3,
        }}
      >
        <ModernCard>
          <Box sx={{ textAlign: "center" }}>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)",
              }}
            >
              <Assessment sx={{ fontSize: 32, color: "white" }} />
            </Box>
            <Typography variant="h6" gutterBottom color="text.secondary">
              Total Interviews
            </Typography>
            <Typography
              variant="h2"
              fontWeight="bold"
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {userProfile.interviews?.total || 0}
            </Typography>
          </Box>
        </ModernCard>
        <ModernCard>
          <Box sx={{ textAlign: "center" }}>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #4caf50 0%, #45a049 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                boxShadow: "0 8px 32px rgba(76, 175, 80, 0.3)",
              }}
            >
              <TrendingUp sx={{ fontSize: 32, color: "white" }} />
            </Box>
            <Typography variant="h6" gutterBottom color="text.secondary">
              Successful
            </Typography>
            <Typography variant="h2" fontWeight="bold" color="success.main">
              {userProfile.interviews?.passed || 0}
            </Typography>
          </Box>
        </ModernCard>
        <ModernCard>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Typography variant="h6" gutterBottom color="text.secondary">
              Success Rate
            </Typography>
            <Typography
              variant="h2"
              fontWeight="bold"
              color="info.main"
              sx={{ mb: 2 }}
            >
              %{userProfile.interviews?.successRate || 0}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={userProfile.interviews?.successRate || 0}
              sx={{
                height: 12,
                borderRadius: 6,
                backgroundColor: "rgba(102, 126, 234, 0.1)",
                "& .MuiLinearProgress-bar": {
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: 6,
                },
              }}
            />
          </Box>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            {userProfile.interviews?.total
              ? `${userProfile.interviews.total} interviews, ${
                  userProfile.interviews.passed || 0
                } were successful`
              : "No interview history available yet"}
          </Typography>
        </ModernCard>
      </Box>
    </TabPanel>
  );
};

export default InterviewStatsTab;
