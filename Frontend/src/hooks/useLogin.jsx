import { useState } from "react";
import { toast } from "react-hot-toast";

export default function useLogin() {
  const [loading, setLoading] = useState(false);

  const login = async ({ username, password }) => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
}
