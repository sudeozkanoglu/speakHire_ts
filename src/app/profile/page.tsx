"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Box } from "@mui/material";
import MyProfilePage from "@/components/profile/MyProfilePage";
import { UserProfile } from "@/components/profile/types/profile.types";
import { LoadingComponent } from "@/components/LoadingComponent";
import { useUserID } from "@/components/hooks/useUserID";
import { Navbar } from "@/components/Navbar/Navbar";

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

export default function ProfilePage() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const userId = useUserID();

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
