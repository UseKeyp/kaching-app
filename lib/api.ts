type RequestFundsProps = {
  amount: string | undefined;
  asset: string | undefined;
  fromEmail: string | undefined;
  username: string | undefined;
};

const requestFunds = async ({
  amount,
  asset,
  fromEmail,
  username,
}: RequestFundsProps) => {
  const data = { amount, asset, fromEmail, username };
  console.log(data);
  await fetch("/api/auth/requestFunds", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((res) => {
    console.log(res);
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Failed to send message");
    }
  });
};

export default requestFunds;
