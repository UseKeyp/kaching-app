import { Session } from "types/session";
import { FaGoogle, FaDiscord } from "react-icons/fa";

const useSocialLogo = (session: Session | null) => {
  let url;
  const id = session?.user.id;
  if (id?.includes("GOOGLE")) {
    url = "google";
  } else if (id?.includes("DISCORD")) {
    url = "discord";
  } else return null;
  return url;
};

export default useSocialLogo;
