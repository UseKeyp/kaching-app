import { Session } from "types/session";

const useSocialLogo = (session: Session | null) => {
  let url;
  const id = session?.data?.user?.id;
  if (id?.includes("GOOGLE")) {
    url = "google";
  } else if (id?.includes("DISCORD")) {
    url = "discord";
  } else return null;
  return url;
};

export default useSocialLogo;
