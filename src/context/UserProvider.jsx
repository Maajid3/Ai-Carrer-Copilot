import supabaseClient from "../api/supabaseClient";
import { useEffect, useMemo } from "react";
import UserContext from "./UserContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";

function UserProvider({ children }) {
  const queryClient = useQueryClient();

  const {
    data: user,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await supabaseClient.auth.getUser();
      return res.data.user;
    },
  });


  useEffect(() => {
    const { data: listener } = supabaseClient.auth.onAuthStateChange(
      (_event, session) => {
        queryClient.setQueryData(["user"], session?.user ?? null);
      },
    );
    return () => listener.subscription.unsubscribe();
  }, [queryClient]);

  return (
    <UserContext.Provider value={{ user, isLoading, isError }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
