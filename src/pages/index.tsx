import { Button, Flex, Stack } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../components/Form/Input";

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object({
  email: yup.string().email("E-mail inválido").required("E-mail obrigatório"),
  password: yup.string().required("Senha obrigatória"),
});

const SignIn: NextPage = () => {
  const { register, handleSubmit, formState } = useForm<SignInFormData>({
    resolver: yupResolver(signInFormSchema),
  });

  console.log(formState.errors);

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    console.log(values);

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
