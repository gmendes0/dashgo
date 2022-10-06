import { GetServerSideProps } from "next";
import { destroyCookie, parseCookies } from "nookies";
import { AuthTokenError } from "../services/errors/AuthTokenError";

export function withSSRAuth<P extends { [key: string]: any }>(
  fn: GetServerSideProps<P>
): GetServerSideProps<P> {
  return async (context) => {
    const { "dashgo.token": token } = parseCookies(context);

    if (!token)
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };

    // validar o token com o /me

    try {
      return await fn(context);
    } catch (error) {
      if (error instanceof AuthTokenError) {
        destroyCookie(context, "dashgo.token");
        destroyCookie(context, "dashgo.refreshToken");

        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }

      throw error;
    }
  };
}
