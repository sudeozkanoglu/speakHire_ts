"use client";

import React, { useEffect, useState } from "react";
import { Container, Box, Typography } from "@mui/material";
import {
  UserProfile,
  EditingSections,
  TabIndex,
} from "../../components/profile/types/profile.types";
import ProfileHeader from "./ProfileHeader";
import PersonalInfoTab from "./tabs/PersonalInfoTab";
import CareerTab from "./tabs/CareerTab";
import EducationTab from "./tabs/EducationTab";
import InterviewStatsTab from "./tabs/InterviewStatsTab";
import SettingsTab from "./tabs/SettingsTab";
import { useSearchParams, useRouter } from "next/navigation";

const MyProfilePage: React.FC<{ userProfile: UserProfile | null }> = ({
  userProfile,
}) => {
  const [user, setUser] = useState<UserProfile | null>(userProfile);
  const [tabValue, setTabValue] = useState<number>(TabIndex.PERSONAL);
  const [editingSections, setEditingSections] = useState<EditingSections>({
    personal: false,
    social: false,
    career: false,
    skills: false,
    education: false,
  });
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    setUser(userProfile);
  }, [userProfile]);

  useEffect(() => {
    const q = searchParams.get("tab");
    if (!q) return;
    const map: Record<string, number> = {
      personal: TabIndex.PERSONAL,
      career: TabIndex.CAREER,
      education: TabIndex.EDUCATION,
      interviews: TabIndex.INTERVIEWS,
      settings: TabIndex.SETTINGS,
    };
    const next =
      map[q.toLowerCase()] ??
      (Number.isFinite(Number(q)) ? Number(q) : TabIndex.PERSONAL);
    setTabValue(next);
  }, [searchParams]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    const revMap: Record<number, string> = {
      [TabIndex.PERSONAL]: "personal",
      [TabIndex.CAREER]: "career",
      [TabIndex.EDUCATION]: "education",
      [TabIndex.INTERVIEWS]: "interviews",
      [TabIndex.SETTINGS]: "settings",
    };
    const name = revMap[newValue] ?? String(newValue);
    router.replace(`/profile?tab=${name}`, { scroll: false });
  };

  const toggleEdit = (section: keyof EditingSections) => {
    setEditingSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {!userProfile ? (
        // loading state: skeleton / spinner koyabilirsin
        <Box>Loading...</Box>
      ) : (
        <>
          <ProfileHeader
            userProfile={userProfile}
            tabValue={tabValue}
            onTabChange={handleTabChange}
          />

          <Box>
            <PersonalInfoTab
              userProfile={userProfile}
              editingSections={editingSections}
              onToggleEdit={toggleEdit}
              value={tabValue}
              index={TabIndex.PERSONAL}
              onUpdated={(updated) => setUser(updated)}
            />
            <CareerTab
              userProfile={userProfile}
              editingSections={editingSections}
              onToggleEdit={toggleEdit}
              value={tabValue}
              index={TabIndex.CAREER}
              onUpdated={(updated) => setUser(updated)}
            />
            <EducationTab
              userProfile={userProfile}
              editingSections={editingSections}
              onToggleEdit={toggleEdit}
              value={tabValue}
              index={TabIndex.EDUCATION}
              onUpdated={(updated) => setUser(updated)}
            />
            <InterviewStatsTab
              userProfile={userProfile}
              value={tabValue}
              index={TabIndex.INTERVIEWS}
            />
            <SettingsTab
              value={tabValue}
              index={TabIndex.SETTINGS}
              userProfile={userProfile}
              onUpdated={(updated) => setUser(updated)}
            />
          </Box>
        </>
      )}
    </Container>
  );
};

export default MyProfilePage;
