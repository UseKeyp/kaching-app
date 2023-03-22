import React, { useEffect } from "react";
import TransferForm from "../components/TransferForm";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useFormContext } from "../context/FormContext";
import TransactionSlider from "../components/TransactionSlider";
import Fund from "../components/Fund";
import CashOut from "../components/CashOut";
import { Box } from "@chakra-ui/react";
import ReviewTransfer from "../components/ReviewTransfer";

// import Request from "../components/Request";

/**
 * @remarks if user selects "send", render Send component, else render "Request"
 * @returns home page that renders the appropriate component based on user selection
 */

const Home = () => {
  const { type, renderTxPage, renderReviewPage } = useFormContext();
  const session = useSession();
  const router = useRouter();

  console.log(session);

  const componentLogic = () => {
    if (type === "send") {
      if (renderTxPage) {
        return <TransferForm />;
      } else if (renderReviewPage) {
        return <ReviewTransfer />;
      }
    } else if (type === "request") {
      // TODO: Replace <TransferForm /> with <Request />
      return <TransferForm />;
      // return <Request />;
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
    <Box>
      <TransactionSlider />
      {componentLogic()}
    </Box>
  );
};

export default Home;
