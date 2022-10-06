import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

export function withSSRGuest<P extends { [key: string]: any }>(
  fn: GetServerSideProps<P>
): GetServerSideProps<P> {
  return async (context) => {
    const { "dashgo.token": token } = parseCookies(context);

    if (token)
      return {
        redirect: {
          destination: "/dashboard",
          permanent: false,
        },
      };

    return await fn(context);
  };
}
