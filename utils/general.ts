export const endpointLogic = (endpoint: string, variables: string) => {
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
    case "tokensTransfers":
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
  if (endpoint === "tokensTransfers") {
    type = "POST";
  } else {
    type = "GET";
  }
  return type;
};
