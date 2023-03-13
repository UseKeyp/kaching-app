// import { Session } from "types/Session";

const useSocialLogo = (
  session: // Session |
  any
) => {
  const id = session && session?.data?.user?.id;
  if (id?.includes("GOOGLE")) {
    return "google";
  } else if (id?.includes("DISCORD")) {
    return "discord";
  } else return null;
};

export default useSocialLogo;
