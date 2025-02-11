"use client";
import { Typography } from "@mui/material";

interface TitleProps {
  text: string;
}

export default function Title({ text }: TitleProps) {
  return (
    <Typography variant="h1" align="center" width={"100%"} fontSize={32}>
      {text}
    </Typography>
  );
}
