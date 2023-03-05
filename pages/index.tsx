import React, { useEffect, useState } from "react";
import TransferForm from "forms/TransferForm";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useFormContext } from "context/FormContext";
import Confirmation from "./confirmation";
import ReviewTransaction from "forms/ReviewForm";

/**
 * @remarks if user selects "send", render Send component, else render "Request"
 * @returns
 */

// TODO: if user is not logged in, redirect to login page
const Home = () => {
  const { inReview } = useFormContext();
  const { data: session } = useSession();
  const router = useRouter();

  console.log(session);

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  return (
    <>
      {!inReview && <TransferForm />}
      {inReview && <ReviewTransaction />}
    </>
  );
};

export default Home;
