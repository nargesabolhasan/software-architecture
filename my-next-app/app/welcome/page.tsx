"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const [username, setUsername] = useState("");

  const router = useRouter();

  useEffect(() => {
    const loadProfile = async () => {
      const response = await fetch("http://localhost:3000/api/profile", {
        credentials: "include",
      });

      if (!response.ok) {
        router.push("/");
        return;
      }

      const data = await response.json();

      setUsername(data.username);
    };

    loadProfile();
  }, [router]);

  const logout = async () => {
    await fetch("http://localhost:3000/api/logout", {
      method: "POST",
      credentials: "include",
    });

    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5">
      <h1 className="text-4xl font-bold">Welcome {username} 🎉</h1>

      <button onClick={logout} className="border p-2 rounded-xl">
        Logout
      </button>
    </div>
  );
}
