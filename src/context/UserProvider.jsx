import supabaseClient from "../api/supabaseClient";
import UserContext from "./UserContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

function UserProvider({ children }) {
  const queryClient = useQueryClient();
  const [sessionChecked, setSessionChecked] = useState(false);

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data }) => {
      queryClient.setQueryData(["user"], data.session?.user ?? null);
      setSessionChecked(true);
    });

    const { data: listener } = supabaseClient.auth.onAuthStateChange(
      (_event, session) => {
        queryClient.setQueryData(["user"], session?.user ?? null);
      },
    );

    return () => listener.subscription.unsubscribe();
  }, [queryClient]);

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await supabaseClient.auth.getUser();
      return res.data.user;
    },
    enabled: sessionChecked,
    initialData: undefined,
    refetchOnWindowFocus: false,
  });

  const authLoading = !sessionChecked || user === undefined;

  return (
    <UserContext.Provider value={{ user, isLoading, isError, authLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
