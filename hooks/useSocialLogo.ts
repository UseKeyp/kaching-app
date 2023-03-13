import { Session } from "types/Session";
// import type { Session } from "next-auth";

// TODO: fix any type
const useSocialLogo = (session: Session | any) => {
  const id = session && session?.data?.user?.id;
  if (id?.includes("GOOGLE")) {
    return "google";
  } else if (id?.includes("DISCORD")) {
    return "discord";
  } else return null;
};

export default useSocialLogo;
