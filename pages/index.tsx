import React, { useEffect, useState } from "react";
import TransferForm from "../components/TransferForm";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useFormContext } from "../context/FormContext";
import TransactionSlider from "../components/TransactionSlider";
import Fund from "../components/Fund";
import CashOut from "../components/CashOut";
import { Box, Heading, Spinner, Text } from "@chakra-ui/react";
import ReviewTransfer from "../components/ReviewTransfer";
import Navbar from "components/Navbar";
import { useSizeProvider } from "context/SizeContext";

/**
 * @remarks if user selects "send", render Send component, else render "Request"
 * @returns home page that renders the appropriate component based on user selection
 */

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { type, renderTxPage, renderReviewPage } = useFormContext();
  const { navHeight } = useSizeProvider();
  const session = useSession();
  const router = useRouter();

  console.log(session);

  const componentLogic = () => {
    if (type === "send" || type === "request") {
      if (renderTxPage) {
        return <TransferForm />;
      } else if (renderReviewPage) {
        return <ReviewTransfer />;
      }
    } else if (type === "fund") {
      return <Fund />;
    } else if (type === "cashout") {
      return <CashOut />;
    }
  };

  useEffect(() => {
    console.log(session.status);
    if (session.status === "unauthenticated") {
      router.push("/login");
    } else if (session.status === "loading") {
      setIsLoading(true);
    } else if (session.status === "authenticated") {
      setIsLoading(false);
    }
  }, [session, router]);

  return (
    <Box>
      {isLoading && (
        <Box textAlign="center" h="80vh" py="25vh">
          <Spinner color="pink" emptyColor="gray.100" size="xl" />
          <Box fontSize="3rem" color="pink" fontWeight="normal">
            <Text>Loading...</Text>
          </Box>
        </Box>
      )}
      {!isLoading && (
        <>
          <Navbar />
          <TransactionSlider />
          {componentLogic()}
        </>
      )}
    </Box>
  );
};

export default Home;
