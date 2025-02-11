"use client";
import { Button } from "@mui/material";

interface SubmitButtonProps {
  label: string;
  loading: boolean;
}

export default function SubmitButton({ loading, label }: SubmitButtonProps) {
  return (
    <Button disabled={loading} type="submit" fullWidth variant="contained">
      {loading ? "Please wait ..." : label}
    </Button>
  );
}
