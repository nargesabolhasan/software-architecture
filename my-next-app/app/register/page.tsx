"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    general: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = {
      username: "",
      password: "",
      general: "",
    };

    if (!username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (newErrors.username || newErrors.password) {
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("User registered successfully");
        router.push("/");
      } else {
        setErrors({
          username: data.field === "username" ? data.message : "",
          password: data.field === "password" ? data.message : "",
          general: data.field === "general" ? data.message : "",
        });
      }
    } catch (error) {}
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center flex flex-col items-center gap-y-4">
      <h1 className="text-4xl font-bold text-center">
        {" "}
        Please create a new account
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-blue-100 w-1/2 max-w-md space-y-4 border p-6 rounded-3xl flex flex-col"
      >
        <h2 className="text-2xl font-bold text-center">Register</h2>

        <div>
          <input
            name="Username"
            className="w-full border rounded-2xl p-2"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
          )}
        </div>

        <div>
          <input
            name="Password"
            type="password"
            className="w-full border rounded-2xl p-2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {errors.general && (
          <p className="text-red-500 text-sm">{errors.general}</p>
        )}

        <button
          type="submit"
          className="cursor-pointer w-full bg-blue-700 text-white p-2 rounded-2xl"
        >
          register
        </button>
      </form>
    </div>
  );
}
