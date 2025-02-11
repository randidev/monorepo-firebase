"use client";
import { useState, FormEvent } from "react";
import useAppDispatch from "@/hooks/useAppDispatch";
import { actions } from "@/redux/utils";
import { useRouter } from "next/navigation";
import URLS from "@/config/urls";
import { Button, Grid2, Stack } from "@mui/material";
import SignInFormFields from "../molecules/SignInFormFields";
import SubmitButton from "../atoms/SubmitButton";
import Title from "../atoms/Title";
import axios from "axios";

export default function SignInForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [signinForm, setSigninForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (value: string, key: string) => {
    setSigninForm({ ...signinForm, [key]: value });
  };

  const handleSignin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!loading) {
      setLoading(true);
      try {
        await axios.post(URLS.API_SIGNIN, {
          email: signinForm.email,
          password: signinForm.password,
        });

        dispatch(
          actions.callSetToast({
            show: true,
            message: "Successfully signed in",
            severity: "success",
          })
        );
        router.push(URLS.HOME);
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
    <form onSubmit={handleSignin}>
      <Grid2 container spacing={5} padding={5}>
        <Title text="Sign In" />
        <SignInFormFields
          email={signinForm.email}
          password={signinForm.password}
          onChange={handleChange}
        />
        <Stack spacing={2} width={"100%"}>
          <SubmitButton label="Sign In" loading={loading} />
          <Button
            onClick={() => router.push(URLS.SIGNUP)}
            fullWidth
            variant="outlined"
          >
            Sign Up
          </Button>
        </Stack>
      </Grid2>
    </form>
  );
}
