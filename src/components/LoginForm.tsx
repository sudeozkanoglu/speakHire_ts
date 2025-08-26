"use client";
import React, { useState } from "react";
import {
  TextField,
  Stack,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import { Visibility, VisibilityOff, Lock } from "@mui/icons-material";
import BadgeIcon from "@mui/icons-material/Badge";
import axios, { AxiosError } from "axios";

export type AlertSeverity = "success" | "error" | "info" | "warning";
export interface AlertState { type: AlertSeverity; message: string }

interface LoginFormProps {
  setAlert: React.Dispatch<React.SetStateAction<AlertState | null>>;
  onSuccess: (userType: string) => void; // ör: "user" gelirse yönlendirme
}

const LoginForm: React.FC<LoginFormProps> = ({ setAlert, onSuccess }) => {
  const [form, setForm] = useState({ userName: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const isDisabled = !form.userName || !form.password || loading;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isDisabled) return;
    setLoading(true);
    setAlert(null);

    try {
      const url = "http://localhost:4000/api/auth/login";
      const res = await axios.post<{ token: string; user: { _id: string; userType: string } }>(url, {
        userName: form.userName,
        password: form.password,
      });

      if (res.data) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userID", res.data.user._id);
        localStorage.setItem("userType", res.data.user.userType);

        setAlert({ type: "success", message: "Login successful! Redirecting..." });
        onSuccess(res.data.user.userType);
      }
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      console.log(error);
      console.log("2", error.response?.data.message);
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
          {loading ? "Please wait..." : "Sign In"}
        </Button>
      </Stack>
    </form>
  );
};

export default LoginForm;