import { LikeButton, LyketProvider } from "@lyket/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Button() {
  const router = useRouter();
  const { namespace, id } = router.query;

  const [isClient, setIsClient] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const match = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(match.matches);
    match.addEventListener("change", e => setIsDark(e.matches));
    return () => match.removeEventListener("change", () => {});
  }, []);

  if (!isClient || !namespace || !id) return null;

  return (
    <LyketProvider
      apiKey={process.env.NEXT_PUBLIC_LYKET_API_KEY}
      theme={{
        colors: {
          icon: isDark ? "#ffffff" : "#000000",  // white in dark mode
          text: isDark ? "#ffffff" : "#000000",  // white text
        },
        button: {
          background: "transparent", // no background
          border: "none",
        },
      }}
    >
      <LikeButton
        namespace={namespace}
        id={id}
        component="icon"
      />
    </LyketProvider>
  );
}
