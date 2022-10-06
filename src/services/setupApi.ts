import axios, { AxiosError } from "axios";
import { GetServerSidePropsContext } from "next";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { signOut } from "../contexts/AuthContext";
import { TSignInResponseData } from "../contexts/AuthContext/types";
import { AuthTokenError } from "./errors/AuthTokenError";

type ErrorResponseData = {
  code?: string;
};

interface RefreshResponseData extends TSignInResponseData {}

type TFailedRequestsQueue = Array<{
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
}>;

let isRefreshing = false;
let failedRequestsQueue: TFailedRequestsQueue = [];

export function setupApi(ctx?: GetServerSidePropsContext) {
  const authApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_AUTH_API_URL,
  });

  authApi.defaults.headers.common = {
    ...authApi.defaults.headers.common,
    Authorization: `Bearer ${parseCookies(ctx)["dashgo.token"]}`,
  };

  authApi.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ErrorResponseData>) => {
      if (error.response?.status === 401) {
        switch (error.response.data.code) {
          case "token.expired":
            const originalConfig = error.config;

            if (!isRefreshing) {
              isRefreshing = true;

              authApi
                .post<RefreshResponseData>("/refresh", {
                  refreshToken: parseCookies(ctx)["dashgo.refreshToken"],
                })
                .then((response) => {
                  const { token, refreshToken } = response.data;

                  setCookie(ctx, "dashgo.token", token, {
                    maxAge: 60 * 60 * 24 * 30, // 30 days
                    path: "/",
                  });

                  setCookie(ctx, "dashgo.refreshToken", refreshToken, {
                    maxAge: 60 * 60 * 24 * 30, // 30 days
                    path: "/",
                  });

                  authApi.defaults.headers.common = {
                    ...authApi.defaults.headers.common,
                    Authorization: `Bearer ${
                      parseCookies(ctx)["dashgo.token"]
                    }`,
                  };

                  failedRequestsQueue.forEach((request) => {
                    request.onSuccess(token);
                  });

                  failedRequestsQueue = [];
                })
                .catch((error) => {
                  console.log("authApi.interceptor.error", error);

                  failedRequestsQueue.forEach((request) => {
                    request.onFailure(error);
                  });

                  failedRequestsQueue = [];

                  if (typeof window !== "undefined") signOut();
                })
                .finally(() => {
                  isRefreshing = false;
                });
            }

            return new Promise((resolve, reject): void => {
              failedRequestsQueue.push({
                onSuccess: (token: string) => {
                  resolve(
                    authApi({
                      ...originalConfig,
                      headers: {
                        ...originalConfig.headers,
                        Authorization: `Bearer ${token}`,
                      },
                    })
                  );
                },
                onFailure: (error: AxiosError) => {
                  reject(error);
                },
              });
            });
          default:
            if (typeof window !== "undefined") {
              signOut();
            } else {
              return Promise.reject(new AuthTokenError());
            }
            break;
        }
      }

      return Promise.reject(error);
    }
  );

  return authApi;
}
