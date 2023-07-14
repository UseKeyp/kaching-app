import type { Session } from "next-auth";

const useSocialLogo = (session: Session | null) => {
  const id = session && session?.user?.id;
  if (id?.includes("GOOGLE")) {
    return "google";
  } else if (id?.includes("DISCORD")) {
    return "discord";
  } else if (id?.includes("TWITTER")) {
    return "twitter";
  } else if (id?.includes("TWITCH")) {
    return "twitch";
  } else if (id?.includes("REDDIT")) {
    return "reddit";
  } else if (id?.includes("CHESS")) {
    return "chess";
  } 
  else return null;
};

export default useSocialLogo;
