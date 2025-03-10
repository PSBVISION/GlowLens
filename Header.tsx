"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

function Header() {
  const { data: session } = useSession();
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      throw new Error(`Error signing out ${error}`);
    }
  };
  return (
    <div>
      <button onClick={handleSignOut}>SignOut</button>
      {session ? (
        <div>Welcome </div>
      ) : (
        <div>
          <Link href="/login">LogIn</Link>
          <Link href="/register">LogIn</Link>
        </div>
      )}
    </div>
  );
}

export default Header;
