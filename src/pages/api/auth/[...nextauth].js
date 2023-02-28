import NextAuth from "next-auth";

const KEYP_APP_DOMAIN = "https://app.usekeyp.com";
// const KEYP_APP_DOMAIN = "https://localhost";
// const KEYP_APP_DOMAIN = "https://api.staging-env.usekeyp.com";

const KeypProvider = {
  id: "keyp",
  name: "Keyp",
  type: "oauth",
  version: "2.0",
  clientId: process.env.KEYP_CLIENT_ID,
  wellKnown: `${KEYP_APP_DOMAIN}/oauth/.well-known/openid-configuration`,
  checks: ["pkce"],
  authorization: { params: { scope: "openid email" } },
  client: { token_endpoint_auth_method: "none" },
  profile(profile) {
    console.log(profile);
    return {
      id: profile.sub,
      username: profile.username,
      address: profile.address,
      email: profile.email,
      imageSrc: profile.imageSrc,
    };
  },
};

export default NextAuth({
  secret: process.env.TOKEN_SECRET,
  providers: [KeypProvider],
});
