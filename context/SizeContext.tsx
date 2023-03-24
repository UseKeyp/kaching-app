import React, { createContext, ReactNode, useContext, useState } from "react";

/**
 * @remarks - this context is used to store state that holds the height of Navbar and TransactionSlider components
 */
export const SizeContext = createContext<{
  navHeight: number;
  setNavHeight: any;
  txSliderHeight: number;
  setTxSliderHeight: any;
}>({
  navHeight: 0,
  setNavHeight: null,
  txSliderHeight: 0,
  setTxSliderHeight: null,
});

interface SizeProviderProps {
  children: ReactNode;
}

export const SizeProvider: React.FC<SizeProviderProps> = ({ children }) => {
  const [navHeight, setNavHeight] = useState(0);
  const [txSliderHeight, setTxSliderHeight] = useState(0);

  const value = {
    navHeight,
    setNavHeight,
    txSliderHeight,
    setTxSliderHeight,
  };

  return <SizeContext.Provider value={value}>{children}</SizeContext.Provider>;
};

export const useSizeProvider = () => {
  const { navHeight, setNavHeight, txSliderHeight, setTxSliderHeight } =
    useContext(SizeContext);

  return {
    navHeight,
    setNavHeight,
    txSliderHeight,
    setTxSliderHeight,
  };
};
