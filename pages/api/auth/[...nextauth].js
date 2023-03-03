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
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        // Comes from the returned JWT from Keyp
        token.accessToken = account.access_token;
      }
      if (profile) {
        // Comes from  the /userinfo endpoint
        token.username = profile.username;
        token.address = profile.address;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      if (token) {
        session.user.accessToken = token.accessToken;
        session.user.username = token.username;
        session.user.address = token.address;
        session.user.id = token.sub;
      }
      return session;
    },
  },
});
