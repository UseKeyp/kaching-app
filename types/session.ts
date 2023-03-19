import { DefaultSession } from "next-auth";

export interface Session {
  expires: string;
  user: {
    id: string;
    accessToken: string;
    username: string;
    address: string;
  };
  status: string;
}

export interface Profile {
  sub: string;
  username: string;
  address: string;
  email: string;
  imageSrc: string;
}

export interface Account {
  access_token: string;
}
