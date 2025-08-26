// "use client";
// import React, { useState } from "react";
// import {
//   Box,
//   Container,
//   Card,
//   CardContent,
//   Typography,
//   TextField,
//   Button,
//   Link,
//   IconButton,
//   InputAdornment,
//   Checkbox,
//   FormControlLabel,
//   Alert,
//   Stack,
//   Avatar,
//   Grid,
// } from "@mui/material";
// import {
//   Visibility,
//   VisibilityOff,
//   Email,
//   Person,
//   Lock,
// } from "@mui/icons-material";
// import { FaBrain } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";
// import BadgeIcon from "@mui/icons-material/Badge";
// import { useRouter } from "next/navigation";
// import axios, { AxiosError } from "axios";

// // -------- Types --------
// type Page = "login" | "register";

// interface FormData {
//   email: string;
//   password: string;
//   confirmPassword: string;
//   firstName: string;
//   lastName: string;
//   userName: string;
//   rememberMe: boolean;
//   agreeToTerms: boolean;
// }

// type AlertSeverity = "success" | "error" | "info" | "warning";

// interface AlertState {
//   type: AlertSeverity;
//   message: string;
// }

// type UserType = "user" | "admin" | string;

// interface ApiUser {
//   _id: string;
//   userType: UserType;
//   // ihtiyaca göre ek alanlar eklenebilir
// }

// interface LoginResponse {
//   token: string;
//   user: ApiUser;
// }

// interface RegisterResponse {
//   message?: string;
//   // backend'in döndürdüğü başka alanlar varsa buraya ekleyebilirsin
// }

// // -------- Component --------
// const AuthPages: React.FC = () => {
//   const [currentPage, setCurrentPage] = useState<Page>("login");
//   const [showPassword, setShowPassword] = useState<boolean>(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
//   const [formData, setFormData] = useState<FormData>({
//     email: "",
//     password: "",
//     confirmPassword: "",
//     firstName: "",
//     lastName: "",
//     userName: "",
//     rememberMe: false,
//     agreeToTerms: false,
//   });
//   const [loading, setLoading] = useState<boolean>(false);
//   const [alert, setAlert] = useState<AlertState | null>(null);
//   const router = useRouter();

//   // Input değişikliği — hem checkbox hem text field destekler
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, checked, type } = e.target;
//     const key = name as keyof FormData;
//     setFormData((prev) => ({
//       ...prev,
//       [key]: type === "checkbox" ? (checked as unknown as FormData[typeof key]) : (value as unknown as FormData[typeof key]),
//     }));
//   };

//   const isRegisterDisabled: boolean =
//     currentPage === "register" &&
//     (!formData.agreeToTerms ||
//       !formData.email ||
//       !formData.confirmPassword ||
//       !formData.firstName ||
//       !formData.lastName ||
//       !formData.password ||
//       !formData.userName);

//   const isLoginDisabled: boolean =
//     currentPage === "login" && (!formData.password || !formData.userName);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);
//     setAlert(null);

//     try {
//       if (currentPage === "register") {
//         // basit bir client-side doğrulama (opsiyonel)
//         if (formData.password !== formData.confirmPassword) {
//           setAlert({ type: "error", message: "Passwords do not match." });
//           return;
//         }

//         const payload = {
//           firstName: formData.firstName,
//           lastName: formData.lastName,
//           email: formData.email,
//           userName: formData.userName,
//           password: formData.password,
//         };

//         const url = "http://localhost:4000/api/auth/register";
//         const response = await axios.post<RegisterResponse>(url, payload);

//         if (response.status === 201) {
//           setAlert({
//             type: "success",
//             message: response.data?.message ?? "Registration successful! Please log in.",
//           });
//           setCurrentPage("login");
//         }
//       } else {
//         const payload = {
//           userName: formData.userName,
//           password: formData.password,
//         };

//         const url = "http://localhost:4000/api/auth/login";
//         const response = await axios.post<LoginResponse>(url, payload);

//         if (response.data) {
//           localStorage.setItem("token", response.data.token);
//           localStorage.setItem("userID", response.data.user._id);
//           localStorage.setItem("userType", response.data.user.userType);

//           setAlert({
//             type: "success",
//             message: "Login successful! Redirecting...",
//           });

//           if (response.data.user.userType === "user") {
//             router.push("/");
//           }
//         }
//       }
//     } catch (err: unknown) {
//       const error = err as AxiosError<{ message?: string }>;
//       const message =
//         error.response?.data?.message ||
//         (error.message || "An error occurred. Please try again.");
//       setAlert({
//         type: "error",
//         message,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const pageVariants = {
//     initial: { opacity: 0, x: 50 },
//     animate: { opacity: 1, x: 0 },
//     exit: { opacity: 0, x: -50 },
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//         display: "flex",
//         alignItems: "center",
//         py: 4,
//         position: "relative",
//         overflow: "hidden",
//       }}
//     >
//       <Box
//         sx={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           background:
//             "radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)",
//         }}
//       />

//       <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
//         <Grid container spacing={4} alignItems="center" sx={{ minHeight: "80vh" }}>
//           <Grid container>
//             <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
//               <Box sx={{ color: "white", pr: { lg: 4 } }}>
//                 <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
//                   <Avatar
//                     sx={{
//                       bgcolor: "rgba(255,255,255,0.2)",
//                       width: 64,
//                       height: 64,
//                       mr: 3,
//                       backdropFilter: "blur(10px)",
//                     }}
//                   >
//                     <FaBrain size={32} color="white" />
//                   </Avatar>
//                   <Box>
//                     <Typography variant="h3" fontWeight="bold">
//                       SpeakHire
//                     </Typography>
//                     <Typography variant="h6" sx={{ opacity: 0.9 }}>
//                       AI-Powered Interview Excellence
//                     </Typography>
//                   </Box>
//                 </Box>

//                 <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
//                   {currentPage === "login" ? "Welcome!" : "Join SpeakHire Today"}
//                 </Typography>

//                 <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, lineHeight: 1.6 }}>
//                   {currentPage === "login"
//                     ? "Continue your journey to interview mastery with AI-powered practice sessions."
//                     : "Start your journey to interview success with cutting-edge AI technology."}
//                 </Typography>
//               </Box>
//             </motion.div>
//           </Grid>

//           <Grid container>
//             <Box sx={{ display: "flex", justifyContent: "center", pl: { lg: 4 } }}>
//               <Card
//                 sx={{
//                   width: "100%",
//                   maxWidth: 500,
//                   background: "rgba(255,255,255,0.95)",
//                   backdropFilter: "blur(20px)",
//                   border: "1px solid rgba(255,255,255,0.2)",
//                   boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
//                   borderRadius: 4,
//                   overflow: "hidden",
//                 }}
//               >
//                 <Box
//                   sx={{
//                     background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
//                     p: 4,
//                     textAlign: "center",
//                     borderBottom: "1px solid rgba(0,0,0,0.05)",
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       display: { xs: "flex", lg: "none" },
//                       justifyContent: "center",
//                       alignItems: "center",
//                       mb: 2,
//                     }}
//                   >
//                     <Avatar sx={{ bgcolor: "#667eea", mr: 2 }}>
//                       <FaBrain />
//                     </Avatar>
//                     <Typography variant="h5" fontWeight="bold" color="primary.main">
//                       SpeakHire
//                     </Typography>
//                   </Box>

//                   <Typography variant="h4" fontWeight="bold" sx={{ mb: 1, color: "#1a202c" }}>
//                     {currentPage === "login" ? "Sign In" : "Create Account"}
//                   </Typography>
//                   <Typography color="text.secondary">
//                     {currentPage === "login"
//                       ? "Welcome! Please sign in to your account."
//                       : "Join thousands of successful candidates today."}
//                   </Typography>
//                 </Box>

//                 <CardContent sx={{ p: 4 }}>
//                   <AnimatePresence>
//                     {alert && (
//                       <motion.div
//                         initial={{ opacity: 0, y: -10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -10 }}
//                         style={{ marginBottom: "24px" }}
//                       >
//                         <Alert severity={alert.type} onClose={() => setAlert(null)} sx={{ borderRadius: 2 }}>
//                           {alert.message}
//                         </Alert>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>

//                   <AnimatePresence mode="wait">
//                     <motion.div
//                       key={currentPage}
//                       variants={pageVariants}
//                       initial="initial"
//                       animate="animate"
//                       exit="exit"
//                       transition={{ duration: 0.3 }}
//                     >
//                       <Box component="form" onSubmit={handleSubmit}>
//                         <Stack spacing={3}>
//                           {currentPage === "register" && (
//                             <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
//                               <TextField
//                                 name="firstName"
//                                 label="First Name"
//                                 variant="outlined"
//                                 fullWidth
//                                 value={formData.firstName}
//                                 onChange={handleInputChange}
//                                 InputProps={{
//                                   startAdornment: (
//                                     <InputAdornment position="start">
//                                       <Person color="action" />
//                                     </InputAdornment>
//                                   ),
//                                 }}
//                                 sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
//                               />
//                               <TextField
//                                 name="lastName"
//                                 label="Last Name"
//                                 variant="outlined"
//                                 fullWidth
//                                 value={formData.lastName}
//                                 onChange={handleInputChange}
//                                 InputProps={{
//                                   startAdornment: (
//                                     <InputAdornment position="start">
//                                       <Person color="action" />
//                                     </InputAdornment>
//                                   ),
//                                 }}
//                                 sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
//                               />
//                             </Stack>
//                           )}

//                           <TextField
//                             name="userName"
//                             label="User Name"
//                             type="text"
//                             variant="outlined"
//                             fullWidth
//                             value={formData.userName}
//                             onChange={handleInputChange}
//                             InputProps={{
//                               startAdornment: (
//                                 <InputAdornment position="start">
//                                   <BadgeIcon color="action" />
//                                 </InputAdornment>
//                               ),
//                             }}
//                             sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
//                           />

//                           {currentPage === "register" && (
//                             <TextField
//                               name="email"
//                               label="Email Address"
//                               type="email"
//                               variant="outlined"
//                               fullWidth
//                               required
//                               value={formData.email}
//                               onChange={handleInputChange}
//                               InputProps={{
//                                 startAdornment: (
//                                   <InputAdornment position="start">
//                                     <Email color="action" />
//                                   </InputAdornment>
//                                 ),
//                               }}
//                               sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
//                             />
//                           )}

//                           <TextField
//                             name="password"
//                             label="Password"
//                             type={showPassword ? "text" : "password"}
//                             variant="outlined"
//                             fullWidth
//                             required
//                             value={formData.password}
//                             onChange={handleInputChange}
//                             InputProps={{
//                               startAdornment: (
//                                 <InputAdornment position="start">
//                                   <Lock color="action" />
//                                 </InputAdornment>
//                               ),
//                               endAdornment: (
//                                 <InputAdornment position="end">
//                                   <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
//                                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                                   </IconButton>
//                                 </InputAdornment>
//                               ),
//                             }}
//                             sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
//                           />

//                           {currentPage === "register" && (
//                             <TextField
//                               name="confirmPassword"
//                               label="Confirm Password"
//                               type={showConfirmPassword ? "text" : "password"}
//                               variant="outlined"
//                               fullWidth
//                               required
//                               value={formData.confirmPassword}
//                               onChange={handleInputChange}
//                               InputProps={{
//                                 startAdornment: (
//                                   <InputAdornment position="start">
//                                     <Lock color="action" />
//                                   </InputAdornment>
//                                 ),
//                                 endAdornment: (
//                                   <InputAdornment position="end">
//                                     <IconButton
//                                       onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                                       edge="end"
//                                     >
//                                       {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
//                                     </IconButton>
//                                   </InputAdornment>
//                                 ),
//                               }}
//                               sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
//                             />
//                           )}

//                           {currentPage === "register" && (
//                             <FormControlLabel
//                               control={
//                                 <Checkbox
//                                   name="agreeToTerms"
//                                   checked={formData.agreeToTerms}
//                                   onChange={handleInputChange}
//                                   color="primary"
//                                 />
//                               }
//                               label={
//                                 <Typography variant="body2">
//                                   I agree to the{" "}
//                                   <Link href="#" color="primary">
//                                     Terms of Service
//                                   </Link>{" "}
//                                   and{" "}
//                                   <Link href="#" color="primary">
//                                     Privacy Policy
//                                   </Link>
//                                 </Typography>
//                               }
//                             />
//                           )}

//                           <Button
//                             type="submit"
//                             variant="contained"
//                             size="large"
//                             fullWidth
//                             disabled={loading || isRegisterDisabled || isLoginDisabled}
//                             sx={{
//                               py: 1.5,
//                               fontSize: "1.1rem",
//                               fontWeight: "bold",
//                               background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
//                               borderRadius: 2,
//                               boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
//                               "&:hover": {
//                                 boxShadow: "0 12px 35px rgba(102, 126, 234, 0.4)",
//                                 transform: "translateY(-2px)",
//                               },
//                               transition: "all 0.3s ease",
//                             }}
//                           >
//                             {loading ? "Please wait..." : currentPage === "login" ? "Sign In" : "Create Account"}
//                           </Button>
//                         </Stack>
//                       </Box>
//                     </motion.div>
//                   </AnimatePresence>

//                   <Box
//                     sx={{
//                       textAlign: "center",
//                       mt: 4,
//                       pt: 3,
//                       borderTop: "1px solid #f0f0f0",
//                     }}
//                   >
//                     <Typography color="text.secondary">
//                       {currentPage === "login" ? "Don't have an account? " : "Already have an account? "}
//                       <Link
//                         component="button"
//                         type="button"
//                         onClick={() => {
//                           setCurrentPage(currentPage === "login" ? "register" : "login");
//                           setAlert(null);
//                           setFormData({
//                             email: "",
//                             password: "",
//                             confirmPassword: "",
//                             firstName: "",
//                             lastName: "",
//                             userName: "",
//                             rememberMe: false,
//                             agreeToTerms: false,
//                           });
//                         }}
//                         sx={{
//                           color: "primary.main",
//                           fontWeight: "bold",
//                           textDecoration: "none",
//                           "&:hover": { textDecoration: "underline" },
//                         }}
//                       >
//                         {currentPage === "login" ? "Sign up" : "Sign in"}
//                       </Link>
//                     </Typography>
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Box>
//           </Grid>
//         </Grid>
//       </Container>
//     </Box>
//   );
// };

// export default AuthPages;

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
  Stack,
  Avatar,
  Grid,
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