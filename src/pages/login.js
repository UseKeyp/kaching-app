import { useState, useEffect } from "react";
import Router from "next/router";
import Link from "next/link";

import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginPage() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as {session.user.username} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      <h1>Login to Example</h1>
      <div className="form-container">
        <div className="submit">
          <button onClick={() => signIn("keyp", null, "login_provider=google")}>
            Log in with Google
          </button>
          <button
            onClick={() => signIn("keyp", null, "login_provider=discord")}
          >
            Log in with Discord
          </button>
          <button onClick={() => signIn("keyp", null, "login_provider=chess")}>
            Log in with Chess
          </button>
        </div>
      </div>
    </>
  );
}
