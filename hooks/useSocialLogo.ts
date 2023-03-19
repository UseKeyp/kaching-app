// import { Session } from "types/Session";
// import type { Session } from "next-auth";

// TODO: fix any type
const useSocialLogo = (session: any) => {
  const id = session && session?.user?.id;
  // console.log(id);
  if (id?.includes("GOOGLE")) {
    return "google";
  } else if (id?.includes("DISCORD")) {
    return "discord";
  } else return null;
};

export default useSocialLogo;
