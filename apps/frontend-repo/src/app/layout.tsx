"use client";

import localFont from "next/font/local";
import "./globals.css";
import { Provider } from "react-redux";
import { persistor, store } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Alert, Snackbar } from "@mui/material";
import { actions, selectors } from "@/redux/utils";
import useAppDispatch from "@/hooks/useAppDispatch";
import { initialToast } from "@/redux/utils/data";
import useAppSelector from "@/hooks/useAppSelector";
import SignoutButton from "@/components/atoms/SignoutButton";
import URLS from "@/config/urls";
import { usePathname } from "next/navigation";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

function ReduxSnackbar() {
  const dispatch = useAppDispatch();
  const toast = useAppSelector(selectors.toast);

  const handleCloseToast = () => {
    dispatch(actions.callSetToast(initialToast));
  };

  return (
    <Snackbar
      open={toast.show}
      autoHideDuration={6000}
      onClose={handleCloseToast}
    >
      <Alert
        onClose={handleCloseToast}
        severity={toast.severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {toast.message}
      </Alert>
    </Snackbar>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <main>{children}</main>
            {!pathname.includes(URLS.SIGNIN) &&
              !pathname.includes(URLS.SIGNUP) && <SignoutButton />}
            <ReduxSnackbar /> {/* Moved Redux logic inside this component */}
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
