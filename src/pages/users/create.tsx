import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as yup from "yup";
import Input from "../../components/Form/Input";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";

type TCreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const CreateUserFormSchema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  password: yup
    .string()
    .min(6, "Mínimo 6 caracteres")
    .required("Senha é obrigatória"),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref("password")], "As senhas devem ser iguais")
    .required("Confirmar senha é obrigatório"),
});

const CreateUser: NextPage = () => {
  const router = useRouter();

  const { mutateAsync } = useMutation(
    async (user: TCreateUserFormData) => {
      const response = await api.post("/users", {
        user: {
          ...user,
          created_at: new Date(),
        },
      });

      return response.data.user;
    },
    {
      onSuccess: () => {
        // Invalida o cache depois de cadastrar um novo user
        // É possivel tbm invalidar somente uma pagina: invalidateQueries(["users", {page: 1}])
        queryClient.invalidateQueries("users");
      },
    }
  );

  const { register, handleSubmit, formState } = useForm<TCreateUserFormData>({
    resolver: yupResolver(CreateUserFormSchema),
  });

  const handleCreate: SubmitHandler<TCreateUserFormData> = async (values) => {
    // console.log(values);
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    await mutateAsync(values);

    router.push("/users");
  };

  console.log(formState.errors); // todo: remover

  return (
    <>
      <Head>
        <title>Users | Dashgo</title>
      </Head>

      <Flex direction="column" h="100vh">
        <Header />

        <Flex w="100%" my={6} maxW={1480} mx="auto" px={6}>
          <Sidebar />

          <Box
            as="form"
            flex={1}
            borderRadius={8}
            bg="gray.800"
            p={{ base: 6, md: 8 }}
            onSubmit={handleSubmit(handleCreate)}
          >
            <Heading size="lg" fontWeight="normal">
              Criar usuário
            </Heading>

            <Divider my={6} borderColor="gray.700" />

            <Stack spacing={8}>
              <SimpleGrid
                minChildWidth="240px"
                spacing={{ base: 6, md: 8 }}
                w="100%"
              >
                <Input
                  label="Nome completo"
                  error={formState.errors.name}
                  {...register("name")}
                />
                <Input
                  type="email"
                  label="E-mail"
                  error={formState.errors.email}
                  {...register("email")}
                />
              </SimpleGrid>

              <SimpleGrid
                minChildWidth="240px"
                spacing={{ base: 6, md: 8 }}
                w="100%"
              >
                <Input
                  type="password"
                  label="Senha"
                  error={formState.errors.password}
                  {...register("password")}
                />
                <Input
                  type="password"
                  label="Confirmar senha"
                  error={formState.errors.password_confirmation}
                  {...register("password_confirmation")}
                />
              </SimpleGrid>
            </Stack>

            <Flex mt={8} justify="flex-end">
              <HStack spacing={4}>
                <Link href="/users" passHref>
                  <Button as="a" colorScheme="whiteAlpha">
                    Cancelar
                  </Button>
                </Link>
                <Button
                  type="submit"
                  colorScheme="pink"
                  isLoading={formState.isSubmitting}
                >
                  Salvar
                </Button>
              </HStack>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default CreateUser;
