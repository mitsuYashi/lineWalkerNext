import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Oauth2callback() {
  const router = useRouter();
  useEffect(() => {
    const refreshToken = router.query.code as string;
    if (refreshToken != null) {
      sessionStorage.setItem("refresh_token", refreshToken);
      router.push("/");
    }
  }, [router]);

  return <div>そのままお待ちください</div>;
}
