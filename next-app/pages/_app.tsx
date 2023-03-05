import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

import "../styles/reset.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    if (!sessionStorage.getItem("refresh_token")) {
      router.push("/login");
    }
  }, []);
  return <Component {...pageProps} />;
}
