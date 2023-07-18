import type { Session } from "next-auth";

const useSocialLogo = (session: Session | null) => {
  const id = session && session?.user?.id;
  if (id?.includes("GOOGLE")) {
    return "GOOGLE";
  } else if (id?.includes("DISCORD")) {
    return "DISCORD";
  } else if (id?.includes("TWITTER")) {
    return "TWITTER";
  } else if (id?.includes("TWITCH")) {
    return "TWITCH";
  } else if (id?.includes("REDDIT")) {
    return "REDDIT";
  } else if (id?.includes("CHESS")) {
    return "CHESS";
  } 
  else return null;
};

export default useSocialLogo;
