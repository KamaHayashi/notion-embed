import { LikeButton, LyketProvider } from "@lyket/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Button() {
  const router = useRouter();
  const { namespace, id } = router.query;

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const match = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(match.matches);

    const listener = (e) => setIsDark(e.matches);
    match.addEventListener("change", listener);

    return () => match.removeEventListener("change", listener);
  }, []);

  if (!namespace || !id) return null;

  return (
    <LyketProvider
      apiKey={process.env.NEXT_PUBLIC_LYKET_API_KEY}
      theme={{
        colors: {
          text: isDark ? "#ffffff" : "#333333",
          icon: isDark ? "#ffffff" : "#333333",
        },
        button: {
          background: "transparent",
          border: "none",
        },
      }}
    >
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70px" }}>
        <LikeButton namespace={namespace} id={id} component="icon" />
      </div>
    </LyketProvider>
  );
}
