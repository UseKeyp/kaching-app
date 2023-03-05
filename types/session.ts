export type Session = {
  user: {
    accessToken: string;
    address: string;
    id: string;
    username: string;
  };
  expires: string;
};
