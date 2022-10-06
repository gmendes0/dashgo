import { Button, Flex, Stack } from "@chakra-ui/react";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../components/Form/Input";
import { useAuth } from "../hooks/useAuth";
import { parseCookies } from "nookies";
import { withSSRGuest } from "../utils/withSSRGuest";

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object({
  email: yup.string().email("E-mail inválido").required("E-mail obrigatório"),
  password: yup.string().required("Senha obrigatória"),
});

const SignIn: NextPage = () => {
  const { signIn } = useAuth();

  const { register, handleSubmit, formState } = useForm<SignInFormData>({
    resolver: yupResolver(signInFormSchema),
  });

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    const { email, password } = values;

    await signIn({ email, password });

    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  return (
    <>
      <Head>
        <title>Sign in | Dashgo</title>
      </Head>

      <Flex w="100vw" h="100vh" align="center" justify="center">
        <Flex
          as="form"
          w="100%"
          maxW={360}
          bg="gray.800"
          p={8}
          borderRadius={8}
          flexDir="column"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Stack spacing={4}>
            <Input
              label="E-mail"
              type="email"
              error={formState.errors.email}
              {...register("email")}
            />
            <Input
              label="Senha"
              type="password"
              error={formState.errors.password}
              {...register("password")}
            />
          </Stack>

          <Button
            type="submit"
            mt={6}
            colorScheme="pink"
            size="lg"
            isLoading={formState.isSubmitting}
          >
            Entrar
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default SignIn;

export const getServerSideProps: GetServerSideProps = withSSRGuest(async () => {
  return {
    props: {},
  };
});
