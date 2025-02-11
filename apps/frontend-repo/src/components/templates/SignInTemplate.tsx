"use client";
import { Box } from "@mui/material";
import SignInForm from "../organisms/SignInForm";

export default function SignInTemplate() {
  return (
    <Box display={"flex"} alignItems={"center"} height={"100vh"}>
      <Box
        width={"50%"}
        mx={"auto"}
        bgcolor={"white"}
        borderRadius={"5px"}
        height={"auto"}
      >
        <SignInForm />
      </Box>
    </Box>
  );
}
