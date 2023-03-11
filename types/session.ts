export type Session = {
  data: {
    user: {
      accessToken: string;
      address: string;
      id: string;
      username: string;
    };
    expires: string;
  } | null;
  status: string;
};
