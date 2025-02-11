"use client";
import { useState, FormEvent } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import useAppDispatch from "@/hooks/useAppDispatch";
import { actions } from "@/redux/utils";
import { useRouter } from "next/navigation";
import URLS from "@/config/urls";
import { Button, Grid2, Stack } from "@mui/material";
import SignUpFormFields from "../molecules/SignUpFormFields";
import SubmitButton from "../atoms/SubmitButton";
import Title from "../atoms/Title";

export default function SignUpForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [signupForm, setSignupForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (value: string, key: string) => {
    setSignupForm({ ...signupForm, [key]: value });
  };

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!loading) {
      setLoading(true);
      try {
        await createUserWithEmailAndPassword(
          auth,
          signupForm.email,
          signupForm.password
        );
        dispatch(
          actions.callSetToast({
            show: true,
            message: "Successfully signed up",
            severity: "success",
          })
        );
        router.push(URLS.SIGNIN);
      } catch (error: unknown) {
        if (error instanceof Error) {
          dispatch(
            actions.callSetToast({
              show: true,
              message: error.message,
              severity: "error",
            })
          );
        } else {
          dispatch(
            actions.callSetToast({
              show: true,
              message: "An unknown error occurred",
              severity: "error",
            })
          );
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <Grid2 container spacing={5} padding={5}>
        <Title text="Sign Up" />
        <SignUpFormFields
          email={signupForm.email}
          password={signupForm.password}
          onChange={handleChange}
        />
        <Stack spacing={2} width={"100%"}>
          <SubmitButton label="Sign Up" loading={loading} />
          <Button
            onClick={() => router.push(URLS.SIGNIN)}
            fullWidth
            variant="outlined"
          >
            Sign In
          </Button>
        </Stack>
      </Grid2>
    </form>
  );
}
