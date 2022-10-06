import { ReactNode } from "react";

export type TAuthContext = {
  signIn: (credentials: TSignInParams) => Promise<void>;
  user: TUser | undefined;
};

export interface TAuthProvider {
  children: ReactNode;
}

export type TUser = {
  email: string;
  permissions: string[];
  roles: string[];
};

export type TSignInResponseData = {
  token: string;
  refreshToken: string;
  permissions: string[];
  roles: string[];
};

export type TMeResponseData = {
  email: string;
  permissions: string[];
  roles: string[];
};

export interface TSignInParams {
  email: string;
  password: string;
}
