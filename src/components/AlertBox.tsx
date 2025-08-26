"use client";

import React from "react";
import { Alert, Stack, Button, IconButton} from "@mui/material"
import {
  Close,
  PlayArrow,
  AccessTime,
} from "@mui/icons-material";

interface AlertBoxProps { 
    setShowContinueBox: (value: boolean) => void;
    text: string;
    buttonText: string;
}

export const AlertBox: React.FC<AlertBoxProps> = ({setShowContinueBox, text, buttonText}) => {
    return (
        <Alert
            severity="warning"
            sx={{ mb: 4, borderRadius: 2, fontSize:"large", boxShadow:"0 2px 4px rgba(0, 0, 0, 0.1)" }}
            action={
              <Stack direction="row" spacing={1} alignItems="center">
                <Button
                  color="warning"
                  variant="contained"
                  size="medium"
                  sx={{ fontSize: "medium" }}
                  startIcon={<PlayArrow />}
                  onClick={() => setShowContinueBox(false)}
                >
                  {buttonText}
                </Button>
                <IconButton
                  size="small"
                  onClick={() => setShowContinueBox(false)}
                >
                  <Close />
                </IconButton>
              </Stack>
            }
            icon={<AccessTime />}
          >
            {text}
          </Alert>
    );
};