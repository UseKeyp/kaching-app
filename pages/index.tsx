import React, { ReactElement, ReactNode, useEffect } from "react";
import TransferForm from "../forms/TransferForm";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useFormContext } from "../context/FormContext";
import ReviewTransaction from "../forms/ReviewForm";
import Navbar from "../components/Navbar";
import TransactionType from "../components/TransactionType";
import Confirmation from "../components/Confirmation";
import Fund from "../components/Fund";
import CashOut from "../components/CashOut";
import { Box } from "@chakra-ui/react";
import Request from "../components/Request";

/**
 * @remarks if user selects "send", render Send component, else render "Request"
 * @returns
 */

// TODO: if user is not logged in, redirect to login page
const Home = () => {
  const { type, inReview, confirmation } = useFormContext();
  const session = useSession();
  const router = useRouter();

  const componentLogic = () => {
    if (type === "send") {
      if (!inReview && !confirmation) {
        return <TransferForm />;
      } else if (inReview) {
        return <ReviewTransaction />;
      } else if (confirmation && !inReview) {
        return <Confirmation />;
      }
    } else if (type === "request") {
      // TODO: build request component. Replace <TransferForm /> with <Request />
      // return <Request />;
      return <TransferForm />;
    } else if (type === "fund") {
      return <Fund />;
    } else if (type === "cashout") {
      return <CashOut />;
    }
  };

  useEffect(() => {
    if (session.status !== "authenticated") {
      router.push("/login");
    }
  }, [session, router]);

  return (
    <>
      <Navbar />
      <Box>
        <TransactionType />
        {componentLogic()}
      </Box>
    </>
  );
};

export default Home;
