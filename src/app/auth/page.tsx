"use client";
import React, { useState } from "react";
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Link,
  Alert,
  Avatar,
  Grid
} from "@mui/material";
import { FaBrain } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import RegisterForm from "@/components/RegisterForm";
import LoginForm,  { type AlertState } from "@/components/LoginForm";

type Page = "login" | "register";

const AuthPages: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>("login");
  const [alert, setAlert] = useState<AlertState | null>(null);
  const router = useRouter();

  const pageVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  const handleLoginSuccess = (userType: string) => {
    if (userType === "user") {
      router.push("/");
    }
  };

  const handleRegistered = () => {
    setCurrentPage("login");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        py: 4,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)",
        }}
      />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={4} alignItems="center" sx={{ minHeight: "80vh" }}>
          {/* Sol taraf / Hero metinleri */}
          <Grid container>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Box sx={{ color: "white", pr: { lg: 4 } }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                  <Avatar
                    sx={{
                      bgcolor: "rgba(255,255,255,0.2)",
                      width: 64,
                      height: 64,
                      mr: 3,
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <FaBrain size={32} color="white" />
                  </Avatar>
                  <Box>
                    <Typography variant="h3" fontWeight="bold">
                      SpeakHire
                    </Typography>
                    <Typography variant="h6" sx={{ opacity: 0.9 }}>
                      AI-Powered Interview Excellence
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
                  {currentPage === "login" ? "Welcome!" : "Join SpeakHire Today"}
                </Typography>

                <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, lineHeight: 1.6 }}>
                  {currentPage === "login"
                    ? "Continue your journey to interview mastery with AI-powered practice sessions."
                    : "Start your journey to interview success with cutting-edge AI technology."}
                </Typography>
              </Box>
            </motion.div>
          </Grid>

          {/* Sağ taraf / Kart ve Form */}
          <Grid container>
            <Box sx={{ display: "flex", justifyContent: "center", pl: { lg: 4 } }}>
              <Card
                sx={{
                  width: "100%",
                  maxWidth: 500,
                  background: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                  borderRadius: 4,
                  overflow: "hidden",
                }}
              >
                {/* Kart başlığı */}
                <Box
                  sx={{
                    background:
                      "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
                    p: 4,
                    textAlign: "center",
                    borderBottom: "1px solid rgba(0,0,0,0.05)",
                  }}
                >
                  <Box
                    sx={{
                      display: { xs: "flex", lg: "none" },
                      justifyContent: "center",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Avatar sx={{ bgcolor: "#667eea", mr: 2 }}>
                      <FaBrain />
                    </Avatar>
                    <Typography variant="h5" fontWeight="bold" color="primary.main">
                      SpeakHire
                    </Typography>
                  </Box>

                  <Typography variant="h4" fontWeight="bold" sx={{ mb: 1, color: "#1a202c" }}>
                    {currentPage === "login" ? "Sign In" : "Create Account"}
                  </Typography>
                  <Typography color="text.secondary">
                    {currentPage === "login"
                      ? "Welcome! Please sign in to your account."
                      : "Join thousands of successful candidates today."}
                  </Typography>
                </Box>

                <CardContent sx={{ p: 4 }}>
                  {/* Üst uyarı alanı */}
                  <AnimatePresence>
                    {alert && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        style={{ marginBottom: "24px" }}
                      >
                        <Alert severity={alert.type} onClose={() => setAlert(null)} sx={{ borderRadius: 2 }}>
                          {alert.message}
                        </Alert>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Formlar */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentPage}
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                    >
                      {currentPage === "login" ? (
                        <LoginForm setAlert={setAlert} onSuccess={handleLoginSuccess} />
                      ) : (
                        <RegisterForm setAlert={setAlert} onRegistered={handleRegistered} />
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Alt geçiş linki */}
                  <Box
                    sx={{
                      textAlign: "center",
                      mt: 4,
                      pt: 3,
                      borderTop: "1px solid #f0f0f0",
                    }}
                  >
                    <Typography color="text.secondary">
                      {currentPage === "login" ? "Don't have an account? " : "Already have an account? "}
                      <Link
                        component="button"
                        type="button"
                        onClick={() => {
                          setCurrentPage(currentPage === "login" ? "register" : "login");
                          setAlert(null);
                        }}
                        sx={{
                          color: "primary.main",
                          fontWeight: "bold",
                          textDecoration: "none",
                          "&:hover": { textDecoration: "underline" },
                        }}
                      >
                        {currentPage === "login" ? "Sign up" : "Sign in"}
                      </Link>
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AuthPages;