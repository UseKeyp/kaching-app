import React, { useEffect } from "react";
import TransferForm from "forms/TransferForm";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useFormContext } from "context/FormContext";
import ReviewTransaction from "forms/ReviewForm";
import Navbar from "components/Navbar";
import Confirmation from "components/Confirmation";
import Fund from "components/Fund";
import CashOut from "components/CashOut";

/**
 * @remarks if user selects "send", render Send component, else render "Request"
 * @returns
 */

// TODO: if user is not logged in, redirect to login page
const Home = () => {
  const { type, inReview, confirmation } = useFormContext();
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
      <Navbar />

      {!inReview && !confirmation && <TransferForm />}
      {inReview && <ReviewTransaction />}
      {confirmation && !inReview && <Confirmation />}
      {type === "fund" && <Fund />}
      {type === "cashOut" && <CashOut />}

      {/* <Fund /> */}
      {/* <CashOut /> */}
    </>
  );
};

export default Home;
