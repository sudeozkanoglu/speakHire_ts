'use client';

import React from "react";
import { Box, Container, Typography, Card } from "@mui/material";
import { Star } from "@mui/icons-material";
import { AnimatePresence, motion } from "framer-motion";

interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
}

export const Testimonials = ({ testimonials, currentTestimonial, setCurrentTestimonial }: {
  testimonials: Testimonial[];
  currentTestimonial: number;
  setCurrentTestimonial: (index: number) => void;
}) => {
    return(
        <Box sx={{ bgcolor: "#f8fafc", py: 8 }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography variant="h3" fontWeight="bold" sx={{ mb: 2, color: "#13678A" }}>
              What Our Users Say
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Join thousands of successful candidates
            </Typography>
          </Box>
          
          <Box sx={{ maxWidth: "800px", mx: "auto" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <Card sx={{ p: 6, textAlign: "center", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}>
                  <Box sx={{ mb: 3 }}>
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} sx={{ color: "#FFD700", fontSize: 24 }} />
                    ))}
                  </Box>
                  <Typography variant="h5" sx={{ mb: 4, fontStyle: "italic" }}>
                    "{testimonials[currentTestimonial].text}"
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {testimonials[currentTestimonial].name}
                  </Typography>
                  <Typography color="text.secondary">
                    {testimonials[currentTestimonial].role}
                  </Typography>
                </Card>
              </motion.div>
            </AnimatePresence>
            
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              {testimonials.map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    bgcolor: index === currentTestimonial ? "primary.main" : "grey.300",
                    mx: 0.5,
                    cursor: "pointer",
                    transition: "all 0.3s ease"
                  }}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
    );
};