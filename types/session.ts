export type Session = {
  data: {
    id: string;
    accessToken: string;
    username: string;
    address: string;
  };
  status: string;
};
