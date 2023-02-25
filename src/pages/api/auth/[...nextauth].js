import NextAuth from "next-auth";

// const KEYP_APP_DOMAIN = "https://app.usekeyp.com";
const KEYP_APP_DOMAIN = "https://localhost";

const KeypProvider = {
  id: "keyp",
  name: "Keyp",
  type: "oauth",
  version: "2.0",
  authorization: {
    url: `${KEYP_APP_DOMAIN}/oauth/auth`,
    params: { scope: "openid  email", grant_type: "authorization_code" },
  },
  wellKnown: `${KEYP_APP_DOMAIN}/oauth/.well-known/openid-configuration`,
  // idToken: true,
  token: `${KEYP_APP_DOMAIN}/oauth/token`,
  userinfo: `${KEYP_APP_DOMAIN}/oauth/me`,
  checks: ["pkce"],
  issuer: KEYP_APP_DOMAIN,
  client: {
    token_endpoint_auth_method: "none",
    // jwks_uri: "https://api.usekeyp.com/oauth/jwks",
  },
  jwks_uri: "https://api.usekeyp.com/oauth/jwks",
  // jwks_endpoint: `${KEYP_APP_DOMAIN}/oauth/jwks`,
  // jwks: { url: `${KEYP_APP_DOMAIN}/oauth/me/oauth/jwks` },
  clientId: process.env.KEYP_CLIENT_ID,
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
  style: {
    logo: "https://app.usekeyp.com/logo.png",
    logoDark: "https://app.usekeyp.com/logo.png",
    bg: "#fff",
    text: "#07F",
    bgDark: "#07F",
    textDark: "#fff",
  },
};

export default NextAuth({
  secret: process.env.TOKEN_SECRET,
  providers: [KeypProvider],
});
