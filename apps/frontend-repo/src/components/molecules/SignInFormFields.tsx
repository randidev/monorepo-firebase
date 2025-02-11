"use client";
import { Stack, TextField } from "@mui/material";

interface SignInFormFieldsProps {
  email: string;
  password: string;
  onChange: (value: string, key: string) => void;
}

export default function SignInFormFields({
  email,
  password,
  onChange,
}: SignInFormFieldsProps) {
  return (
    <Stack spacing={2} width={"100%"}>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => onChange(e.target.value, "email")}
      />
      <TextField
        label="Password"
        value={password}
        type="password"
        onChange={(e) => onChange(e.target.value, "password")}
      />
    </Stack>
  );
}
