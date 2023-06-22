import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Tokens from "components/Tokens";

/**
 * @returns home page that renders the appropriate component based on user selection
 */

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const session = useSession();
  const router = useRouter();

  // control flow below is used to prevent flickering of components
  useEffect(() => {
    if (session && session.status === "unauthenticated") {
      router.push("/login");
    } else if (session && session.status === "loading") {
      setIsLoading(true);
    } else if (session && session.status === "authenticated") {
      setIsLoading(false);
    }
  }, [session, router]);

  return (
    <>
      <Tokens />
    </>
  );
};

export default Home;
