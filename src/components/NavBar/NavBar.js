import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const [user, { mutate }] = useUser();

  const { data: session } = useSession();

  async function handleLogout() {
    await fetch("/api/logout");
    mutate({ user: null });
  }

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/" legacyBehavior>
              Home
            </Link>
          </li>
          {session ? (
            <>
              Signed in as {session.user.username} <br />
              <button onClick={() => signOut()}>Sign out</button>
            </>
          ) : (
            <li>
              <button onClick={() => signIn()}>Login</button>
            </li>
          )}
        </ul>
      </nav>
      <style jsx>{`
        nav {
          max-width: 42rem;
          margin: 0 auto;
          padding: 0.2rem 1.25rem;
        }
        ul {
          display: flex;
          list-style: none;
          margin-left: 0;
          padding-left: 0;
        }
        li {
          margin-right: 1rem;
        }
        li:first-child {
          margin-left: auto;
        }
        a {
          color: #fff;
          text-decoration: none;
          cursor: pointer;
        }
        header {
          color: #fff;
          background-color: #666;
        }
      `}</style>
    </header>
  );
}
