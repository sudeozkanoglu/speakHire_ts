"use client";
import React, { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  useTheme,
  Card,
  Stack,
} from "@mui/material";
import {
  Search,
  ChevronRight,
  PlayArrow,
  EmojiEvents,
  Star,
  Person,
} from "@mui/icons-material";
import { FaCode, FaDatabase, FaUsers, FaBrain, FaDocker } from "react-icons/fa";
import { SearchBar } from "@/components/SearchBar";
import { AlertBox } from "@/components/AlertBox";
import { FilterButtons } from "@/components/FilterButtons";
import { CardStructure } from "@/components/CardStructure";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [showContinueBox, setShowContinueBox] = useState(true);
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const filters = ["All", "Frontend", "Backend", "HR", "AI"];

  const interviewCards = [
    {
      id: 1,
      title: "Frontend Developer",
      description: "React, JavaScript, CSS, HTML konularında sorular içerir.",
      difficulty: "Beginner",
      category: "Frontend",
      icon: FaCode,
      duration: "45 min",
      questions: 25,
      rating: 4.8,
    },
    {
      id: 2,
      title: "Backend Developer",
      description: "Node.js, Express.js, SQL konularında sorular içerir.",
      difficulty: "Intermediate",
      category: "Backend",
      icon: FaDatabase,
      duration: "60 min",
      questions: 30,
      rating: 4.7,
    },
    {
      id: 3,
      title: "HR Mülakatı",
      description: "Davranışsal sorular, ekip çalışması ve liderlik.",
      difficulty: "Beginner",
      category: "HR",
      icon: FaUsers,
      duration: "30 min",
      questions: 20,
      rating: 4.9,
    },
    {
      id: 4,
      title: "Full Stack Developer",
      description: "Frontend ve Backend teknolojilerinin tamamı.",
      difficulty: "Advanced",
      category: "FullStack",
      icon: FaCode,
      duration: "90 min",
      questions: 45,
      rating: 4.6,
    },
    {
      id: 5,
      title: "AI/ML Engineer",
      description: "Machine Learning, Deep Learning, Python.",
      difficulty: "Advanced",
      category: "AI",
      icon: FaBrain,
      duration: "75 min",
      questions: 35,
      rating: 4.8,
    },
    {
      id: 6,
      title: "DevOps Engineer",
      description: "Docker, Kubernetes, CI/CD, AWS konuları.",
      difficulty: "Intermediate",
      category: "DevOps",
      icon: FaDocker,
      duration: "50 min",
      questions: 28,
      rating: 4.7,
    },
  ];

  const testimonials = [
    {
      name: "Ahmet K.",
      role: "Frontend Developer",
      text: "SpeakHire sayesinde dream job'ımı aldım! Mülakat pratiği harika.",
      rating: 5,
    },
    {
      name: "Zeynep M.",
      role: "Backend Engineer",
      text: "AI destekli feedback sistemi gerçekten işe yarıyor. Kendimi çok geliştirdim.",
      rating: 5,
    },
    {
      name: "Can S.",
      role: "Full Stack Developer",
      text: "Gerçek mülakat ortamını çok iyi simüle ediyor. Tavsiye ederim!",
      rating: 5,
    },
  ];

  const stats = [
    {
      label: "Active Users",
      value: "50K+",
      icon: <Person sx={{ fontSize: 24 }} />,
    },
    {
      label: "Interview Sessions",
      value: "200K+",
      icon: <PlayArrow sx={{ fontSize: 24 }} />,
    },
    {
      label: "Success Rate",
      value: "85%",
      icon: <EmojiEvents sx={{ fontSize: 24 }} />,
    },
    {
      label: "Avg. Rating",
      value: "4.8★",
      icon: <Star sx={{ fontSize: 24 }} />,
    },
  ];

  const filteredCards = interviewCards.filter((card) => {
    const matchesSearch =
      card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      activeFilter === "All" || card.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const cardsRef = useRef<HTMLDivElement | null>(null);
  const handleScrollToCards = () => {
    cardsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [paletteColors, setPaletteColors] = useState<Record<string, string>>(
    {}
  );
  useEffect(() => {
    setPaletteColors({
      primary: theme.palette.primary.main,
      secondary: theme.palette.secondary.main,
      success: theme.palette.success.main,
      info: theme.palette.info.main,
      warning: theme.palette.warning.main,
      error: theme.palette.error.main,
    });
  }, [theme]);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#F8FAFC" }}>
      <Navbar />

      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          py: { xs: 6, md: 10 },
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)",
          },
        }}
      >
        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid container>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: "bold",
                    mb: 3,
                    fontSize: { xs: "2.5rem", md: "3.5rem" },
                    lineHeight: 1.2,
                  }}
                >
                  Master Your Next Interview with{" "}
                  <Box component="span" sx={{ color: "#FFD700" }}>
                    AI Power
                  </Box>
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 4,
                    opacity: 0.9,
                    fontSize: { xs: "1.1rem", md: "1.3rem" },
                    maxWidth: "600px",
                  }}
                >
                  Practice with realistic scenarios, get instant feedback, and land your dream job with confidence.
                </Typography>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<ChevronRight />}
                    onClick={handleScrollToCards}
                    component={motion.button}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    sx={{
                      bgcolor: "white",
                      color: "#667eea",
                      fontWeight: "bold",
                      px: 4,
                      py: 1.5,
                      fontSize: "1.1rem",
                      boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                      "&:hover": {
                        bgcolor: "grey.100",
                        boxShadow: "0 12px 35px rgba(0,0,0,0.2)",
                      },
                    }}
                  >
                    Start Practicing Now
                  </Button>
                </Stack>
              </motion.div>
            </Grid>

            {/* Stats Cards */}
            <Grid container>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Grid container spacing={2}>
                  {stats.map((stat, index) => (
                    <Grid container key={index}>
                      <Card
                        sx={{
                          background: "rgba(255,255,255,0.15)",
                          backdropFilter: "blur(10px)",
                          border: "1px solid rgba(255,255,255,0.2)",
                          color: "white",
                          textAlign: "center",
                          p: 2,
                        }}
                      >
                        <Box sx={{ color: "#FFD700", mb: 1 }}>{stat.icon}</Box>
                        <Typography variant="h4" fontWeight="bold">
                          {stat.value}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                          {stat.label}
                        </Typography>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Continue Interview Alert */}
        <AnimatePresence>
          {showContinueBox && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <AlertBox
                setShowContinueBox={setShowContinueBox}
                text={
                  "Your last session was a Backend interview. Continue now?"
                }
                buttonText={"Continue"}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search and Filter Section */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ mb: 3, textAlign: "center", color: "#13678A" }}
          >
            Choose Your Interview Path
          </Typography>
          <SearchBar
            placeHolderText={"Type to search: interview or technology…"}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <FilterButtons
            filters={filters}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
        </Box>

        {/* Enhanced Interview Cards */}
        <Box ref={cardsRef}>
          <Grid container spacing={3} columns={3} alignItems={"center"} justifyContent={"center"} >
            {filteredCards.slice(0, 6).map((card, index) => {
              const IconComponent = card.icon;
              return (
                <Grid container key={card.id} >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <CardStructure card={card} IconComponent={IconComponent} />
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 6, mb: 4 }}>
          <Button
            variant="outlined"
            size="large"
            href="/interview-questions"
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            sx={{
              borderColor: "#667eea",
              color: "#667eea",
              fontWeight: "bold",
              px: 6,
              py: 2,
              fontSize: "1.1rem",
              "&:hover": {
                borderColor: "#667eea",
                bgcolor: "rgba(102, 126, 234, 0.05)",
              },
            }}
          >
            View All Interview Types
          </Button>
        </Box>

        {/* No Results */}
        {filteredCards.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Box sx={{ textAlign: "center", py: 8 }}>
              <Search sx={{ fontSize: 80, color: "text.secondary", mb: 2 }} />
              <Typography
                variant="h4"
                sx={{ mb: 2, fontWeight: "medium" }}
                color="text.primary"
              >
                No results found
              </Typography>
              <Typography color="text.secondary" variant="h6">
                Please modify your search criteria and try again.
              </Typography>
            </Box>
          </motion.div>
        )}
      </Container>

      {/* Testimonials Section */}
      <Testimonials
        testimonials={testimonials}
        currentTestimonial={currentTestimonial}
        setCurrentTestimonial={setCurrentTestimonial}
      />

      <Footer />
    </Box>
  );
}

// useMemo ve useCallBack nedir ? Teorik kısmını öğren. Syntax kısmına bak.
