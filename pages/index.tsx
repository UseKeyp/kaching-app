import React, { useEffect, useState } from "react";
import TransferForm from "../components/TransferForm";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useFormContext } from "../context/FormContext";
import TransactionSlider from "../components/TransactionSlider";
import Fund from "../components/Fund";
import CashOut from "../components/CashOut";
import { Box } from "@chakra-ui/react";
import ReviewTransfer from "../components/ReviewTransfer";
import Navbar from "components/Navbar";

// import Request from "../components/Request";

/**
 * @remarks if user selects "send", render Send component, else render "Request"
 * @returns home page that renders the appropriate component based on user selection
 */

const Home = () => {
  // TODO: use navHeight to calculate the height of the page. Subtract navHeight from 100vh to get the height of the page. This will align btn at the bottom
  const [navHeight, setNavHeight] = useState<number>();
  const [txSliderHeight, setTxSliderHeight] = useState<number>(0);
  const { type, renderTxPage, renderReviewPage } = useFormContext();
  const session = useSession();
  const router = useRouter();

  const componentLogic = () => {
    if (type === "send") {
      if (renderTxPage) {
        return (
          <TransferForm navHeight={navHeight} txSliderHeight={txSliderHeight} />
        );
      } else if (renderReviewPage) {
        return <ReviewTransfer navHeight={navHeight} />;
      }
    } else if (type === "request") {
      // TODO: Replace <TransferForm /> with <Request />
      return (
        <TransferForm navHeight={navHeight} txSliderHeight={txSliderHeight} />
      );
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
      <Navbar setNavHeight={setNavHeight} />
      <TransactionSlider setTxSliderHeight={setTxSliderHeight} />
      {componentLogic()}
    </Box>
  );
};

export default Home;
