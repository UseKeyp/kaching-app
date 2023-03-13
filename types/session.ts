export type Session = {
  data: {
    expires: string;
    user: {
      id: string;
      accessToken: string;
      username: string;
      address: string;
    };
    status: string;
  };
};
