"use client";
import React, { useState } from "react";
import {
  TextField,
  Stack,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  Button,
  Link,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff, Email, Person, Lock } from "@mui/icons-material";
import BadgeIcon from "@mui/icons-material/Badge";
import axios, { AxiosError } from "axios";
import type { AlertState } from "./LoginForm";

interface RegisterFormProps {
  setAlert: React.Dispatch<React.SetStateAction<AlertState | null>>;
  onRegistered: () => void; // başarıyla kayıt -> login sayfasına geç
}

const RegisterForm: React.FC<RegisterFormProps> = ({ setAlert, onRegistered }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const isDisabled =
    loading ||
    !form.firstName ||
    !form.lastName ||
    !form.userName ||
    !form.email ||
    !form.password ||
    !form.confirmPassword ||
    !form.agreeToTerms;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isDisabled) return;

    if (form.password !== form.confirmPassword) {
      setAlert({ type: "error", message: "Passwords do not match." });
      return;
    }

    setLoading(true);
    setAlert(null);
    try {
      const url = "http://localhost:4000/api/auth/register";
      const res = await axios.post<{ message?: string }>(url, {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        userName: form.userName,
        password: form.password,
      });

      if (res.status === 201) {
        setAlert({
          type: "success",
          message: res.data?.message ?? "Registration successful! Please log in.",
        });
        onRegistered();
      }
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      setAlert({
        type: "error",
        message: error.response?.data?.message || error.message || "An error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            name="firstName"
            label="First Name"
            value={form.firstName}
            onChange={handleChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
          />
          <TextField
            name="lastName"
            label="Last Name"
            value={form.lastName}
            onChange={handleChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
          />
        </Stack>

        <TextField
          name="userName"
          label="User Name"
          value={form.userName}
          onChange={handleChange}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BadgeIcon color="action" />
              </InputAdornment>
            ),
          }}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
        />

        <TextField
          name="email"
          label="Email Address"
          type="email"
          value={form.email}
          onChange={handleChange}
          fullWidth
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email color="action" />
              </InputAdornment>
            ),
          }}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          value={form.password}
          onChange={handleChange}
          fullWidth
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock color="action" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword((s) => !s)} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
        />

        <TextField
          name="confirmPassword"
          label="Confirm Password"
          type={showConfirm ? "text" : "password"}
          value={form.confirmPassword}
          onChange={handleChange}
          fullWidth
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock color="action" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirm((s) => !s)} edge="end">
                  {showConfirm ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
        />

        <FormControlLabel
          control={
            <Checkbox
              name="agreeToTerms"
              checked={form.agreeToTerms}
              onChange={handleChange}
              color="primary"
            />
          }
          label={
            <Typography variant="body2">
              I agree to the{" "}
              <Link href="#" color="primary">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" color="primary">
                Privacy Policy
              </Link>
            </Typography>
          }
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          disabled={isDisabled}
          sx={{
            py: 1.5,
            fontSize: "1.1rem",
            fontWeight: "bold",
            background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
            borderRadius: 2,
            boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
            "&:hover": {
              boxShadow: "0 12px 35px rgba(102, 126, 234, 0.4)",
              transform: "translateY(-2px)",
            },
            transition: "all 0.3s ease",
          }}
        >
          {loading ? "Please wait..." : "Create Account"}
        </Button>
      </Stack>
    </form>
  );
};

export default RegisterForm;