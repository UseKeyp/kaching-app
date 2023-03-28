// import { Session } from "types/session";
// import type { Session } from "next-auth";

// TODO: fix any type
const useSocialLogo = (session: any) => {
  const id = session && session?.user?.id;
  if (id?.includes("GOOGLE")) {
    return "google";
  } else if (id?.includes("DISCORD")) {
    return "discord";
  } else return null;
};

export default useSocialLogo;
