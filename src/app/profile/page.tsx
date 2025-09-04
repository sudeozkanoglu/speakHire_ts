"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Metadata } from "next";
import { Box, CircularProgress, Typography } from "@mui/material";
import MyProfilePage from "@/components/profile/MyProfilePage";
import { Navbar } from "@/components/Navbar";
import { UserProfile } from "@/components/profile/types/profile.types";

// //Why we used that learn !
// export const metadata: Metadata = {
//   title: "Profil | Mülakat Sistemi",
//   description:
//     "Kullanıcı profil sayfası - kişisel bilgiler, kariyer, eğitim ve mülakat istatistikleri",
//   keywords: "profil, kullanıcı, kariyer, eğitim, mülakat, istatistik",
//   authors: [{ name: "Mülakat Sistemi" }],
//   viewport: "width=device-width, initial-scale=1",
//   robots: "index, follow",
// };

// Loading Component

const LoadingComponent = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "60vh",
      gap: 2,
    }}
  >
    <CircularProgress
      size={40}
      sx={{
        color: "primary.main",
      }}
    />
    <Typography variant="body2" color="text.secondary">
      Profile Knowledge is loading...
    </Typography>
  </Box>
);

export default function ProfilePage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userID");
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    const getUserKnowledge = async () => {
      if (!userId) return;

      try {
        const url = await fetch(`http://localhost:4000/api/users/${userId}`);
        const userData = await url.json();

        if (userData) setUserProfile(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getUserKnowledge();
  }, [userId]);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#F8FAFC" }}>
      <Navbar />
      <Suspense fallback={<LoadingComponent />}>
        <MyProfilePage userProfile={userProfile} />
      </Suspense>
    </Box>
  );
}
