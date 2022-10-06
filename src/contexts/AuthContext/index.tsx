import Router, { useRouter } from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, useEffect, useState } from "react";
import { authApi } from "../../services/authApi";
import {
  TAuthContext,
  TAuthProvider,
  TMeResponseData,
  TSignInParams,
  TSignInResponseData,
  TUser,
} from "./types";

export const AuthContext = createContext<TAuthContext>({} as TAuthContext);

export function AuthProvider({ children }: TAuthProvider): JSX.Element {
  const router = useRouter();

  const [user, setUser] = useState<TUser>();

  useEffect(() => {
    console.log("AuthProvider.useEffect");

    const { "dashgo.token": token } = parseCookies(undefined);

    if (token)
      authApi
        .get<TMeResponseData>("/me")
        .then((response) => {
          console.log("AuthProvider.useEffect", response);

          const { email, permissions, roles } = response.data;

          setUser({ email, permissions, roles });
        })
        .catch((error) => {
          console.log("AuthProvider.useEffect.error", error);
        });
  }, []);

  async function signIn({ email, password }: TSignInParams) {
    const response = await authApi.post<TSignInResponseData>("/sessions", {
      email,
      password,
    });

    const { token, refreshToken, permissions, roles } = response.data;

    setCookie(undefined, "dashgo.token", token, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });
    setCookie(undefined, "dashgo.refreshToken", refreshToken, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });

    authApi.defaults.headers.common = {
      ...authApi.defaults.headers.common,
      Authorization: `Bearer ${token}`,
    };

    setUser({ email, permissions, roles });

    router.push("/dashboard");
  }

  return (
    <AuthContext.Provider value={{ signIn, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function signOut() {
  destroyCookie(undefined, "dashgo.token");
  destroyCookie(undefined, "dashgo.refreshToken");

  Router.push("/");
}
