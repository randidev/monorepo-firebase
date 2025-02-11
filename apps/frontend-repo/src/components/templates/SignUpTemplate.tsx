"use client";
import { Box } from "@mui/material";
import SignUpForm from "../organisms/SignUpForm";

export default function SignUpTemplate() {
  return (
    <Box display={"flex"} alignItems={"center"} height={"100vh"}>
      <Box
        width={"50%"}
        mx={"auto"}
        bgcolor={"white"}
        borderRadius={"5px"}
        height={"auto"}
      >
        <SignUpForm />
      </Box>
    </Box>
  );
}
