/**
 *
 * @param endpoint - value getting passed into Keyp api
 * @param variables
 * @returns
 */
export const endpointLogic = (endpoint: string, variables?: string | null) => {
  let endpointValue: string;
  switch (endpoint) {
    case "onramps":
      endpointValue = `ramps/on/${variables}`;
      break;
    case "offramps":
      endpointValue = `ramps/off/${variables}`;
      break;
    case "users":
      endpointValue = `users/${variables}`;
      break;
    case "usersbalance":
      endpointValue = `users/${variables}/balance`;
      break;
    case "tokenTransfers":
      endpointValue = "tokens/transfers";
      break;
    case "tokensBalance":
      endpointValue = `tokens/balance/${variables}`;
      break;
    default:
      return null;
  }
  return endpointValue;
};

export const requestType = (endpoint: string) => {
  let type: string;
  if (endpoint === "tokenTransfers") {
    type = "POST";
  } else {
    type = "GET";
  }
  return type;
};
