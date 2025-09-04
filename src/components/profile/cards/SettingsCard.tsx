"use client";

import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Divider,
  Box,
} from "@mui/material";
import {
  Notifications,
  Assessment,
  Visibility,
  Security,
} from "@mui/icons-material";
import ModernCard from "./ModernCard";
import { SettingsCardProps } from "../types/profile.types";

const SettingsCard: React.FC<SettingsCardProps> = ({
  userProfile,
  onUpdated,
}) => {
  const [emailInvitations, setEmailInvitations] = useState<boolean>(
    userProfile.settings?.notifications?.emailInvitations ?? false
  );
  const [interviewResults, setInterviewResults] = useState<boolean>(
    userProfile.settings?.notifications?.interviewResults ?? false
  );
  const [profileVisibility, setProfileVisibility] = useState<boolean>(
    userProfile.settings?.privacy?.profileVisibility ?? false
  );
  const [twoFactorAuth, setTwoFactorAuth] = useState<boolean>(
    userProfile.settings?.privacy?.twoFactorAuth ?? false
  );

  useEffect(() => {
    setEmailInvitations(
      userProfile.settings?.notifications?.emailInvitations ?? false
    );
    setInterviewResults(
      userProfile.settings?.notifications?.interviewResults ?? false
    );
    setProfileVisibility(
      userProfile.settings?.privacy?.profileVisibility ?? false
    );
    setTwoFactorAuth(userProfile.settings?.privacy?.twoFactorAuth ?? false);
  }, [userProfile]);

  const [saving, setSaving] = useState(false);

  const patchSettings = async (
    next: Partial<NonNullable<typeof userProfile.settings>>
  ) => {
    if (!userProfile._id) return;
    setSaving(true);
    try {
      const res = await fetch(
        `http://localhost:4000/api/users/${userProfile._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ settings: next }),
        }
      );
      if (!res.ok) throw new Error("Failed to update settings");
      const updated = await res.json();
      const updatedUser = updated.user ?? updated;
      onUpdated?.(updatedUser);
    } finally {
      setSaving(false);
    }
  };

  const handleEmailInvitations = async (checked: boolean) => {
    const prev = emailInvitations;
    setEmailInvitations(checked);
    try {
      await patchSettings({
        notifications: {
          emailInvitations: checked,
          interviewResults,
        },
        privacy: {
          profileVisibility,
          twoFactorAuth,
        }
      });
    } catch {
      setEmailInvitations(prev);
    }
  };

  const handleInterviewResults = async (checked: boolean) => {
    const prev = interviewResults;
    setInterviewResults(checked);
    try {
      await patchSettings({
        notifications: {
          emailInvitations,
          interviewResults: checked,
        },
        privacy: {
          profileVisibility,
          twoFactorAuth,
        },
      });
    } catch {
      setInterviewResults(prev);
    }
  };

  const handleProfileVisibility = async (checked: boolean) => {
    const prev = profileVisibility;
    setProfileVisibility(checked);
    try {
      await patchSettings({
        notifications: {
          emailInvitations,
          interviewResults
        },
        privacy: {
          profileVisibility: checked,
          twoFactorAuth,
        }
      });
    } catch {
      setProfileVisibility(prev);
    }
  };

  const handleTwoFactorAuth = async (checked: boolean) => {
    const prev = twoFactorAuth;
    setTwoFactorAuth(checked);
    try {
      await patchSettings({
        notifications: {
          emailInvitations,
          interviewResults
        },
        privacy: {
          profileVisibility,
          twoFactorAuth: checked,
        },
      });
    } catch {
      setTwoFactorAuth(prev);
    }
  };

  return (
    <>
      <ModernCard title="Notification Settings">
        <List sx={{ p: 0 }}>
          <ListItem sx={{ px: 0, py: 2 }}>
            <ListItemIcon>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Notifications sx={{ color: "white", fontSize: 20 }} />
              </Box>
            </ListItemIcon>
            <ListItemText
              primary="Email Notifications"
              secondary="Receive email notifications for new interview invitations"
              sx={{ ml: 2 }}
            />
            <Switch
              checked={emailInvitations}
              onChange={(_, checked) => handleEmailInvitations(checked)}
              disabled={saving}
            />
          </ListItem>

          <Divider />

          <ListItem sx={{ px: 0, py: 2 }}>
            <ListItemIcon>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  background:
                    "linear-gradient(135deg, #4caf50 0%, #45a049 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Assessment sx={{ color: "white", fontSize: 20 }} />
              </Box>
            </ListItemIcon>
            <ListItemText
              primary="Interview Results"
              secondary="Receive notifications for interview results and feedback"
              sx={{ ml: 2 }}
            />
            <Switch
              checked={interviewResults}
              onChange={(_, checked) => handleInterviewResults(checked)}
              disabled={saving}
            />
          </ListItem>
        </List>
      </ModernCard>

      <ModernCard title="Privacy Settings">
        <List sx={{ p: 0 }}>
          <ListItem sx={{ px: 0, py: 2 }}>
            <ListItemIcon>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  background:
                    "linear-gradient(135deg, #ff9800 0%, #f57c00 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Visibility sx={{ color: "white", fontSize: 20 }} />
              </Box>
            </ListItemIcon>
            <ListItemText
              primary="Profile Visibility"
              secondary="Show your profile to employers and other users"
              sx={{ ml: 2 }}
            />
            <Switch
              checked={profileVisibility}
              onChange={(_, checked) => handleProfileVisibility(checked)}
              disabled={saving}
            />
          </ListItem>

          <Divider />

          <ListItem sx={{ px: 0, py: 2 }}>
            <ListItemIcon>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  background:
                    "linear-gradient(135deg, #f44336 0%, #d32f2f 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Security sx={{ color: "white", fontSize: 20 }} />
              </Box>
            </ListItemIcon>
            <ListItemText
              primary="Two-Factor Authentication"
              secondary="Add an extra layer of security to your account"
              sx={{ ml: 2 }}
            />
            <Switch
              checked={twoFactorAuth}
              onChange={(_, checked) => handleTwoFactorAuth(checked)}
              disabled={saving}
            />
          </ListItem>
        </List>
      </ModernCard>
    </>
  );
};

export default SettingsCard;
