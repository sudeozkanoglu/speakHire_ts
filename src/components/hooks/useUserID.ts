import { useEffect, useState } from "react";

export const useUserID = (): string | null => {
  const [userID, setUserID] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userID");
      setUserID(storedUserId);
    }
  }, []);

  return userID;
};