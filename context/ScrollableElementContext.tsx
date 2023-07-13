import React, { MutableRefObject } from "react";

const ScrollableElementContext =
  React.createContext<MutableRefObject<HTMLElement | null> | null>(null);

export default ScrollableElementContext;
