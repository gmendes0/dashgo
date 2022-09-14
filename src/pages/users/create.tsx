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
import { NextPage } from "next";
import Head from "next/head";
import Input from "../../components/Form/Input";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const CreateUser: NextPage = () => {
  return (
    <>
      <Head>
        <title>Users | Dashgo</title>
      </Head>

      <Flex direction="column" h="100vh">
        <Header />

        <Flex w="100%" my={6} maxW={1480} mx="auto" px={6}>
          <Sidebar />

          <Box flex={1} borderRadius={8} bg="gray.800" p={{ base: 6, md: 8 }}>
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
                <Input name="name" label="Nome completo" />
                <Input type="email" name="email" label="E-mail" />
              </SimpleGrid>

              <SimpleGrid
                minChildWidth="240px"
                spacing={{ base: 6, md: 8 }}
                w="100%"
              >
                <Input type="password" name="password" label="Senha" />
                <Input
                  type="password"
                  name="password_confirmation"
                  label="Confirmar senha"
                />
              </SimpleGrid>
            </Stack>

            <Flex mt={8} justify="flex-end">
              <HStack spacing={4}>
                <Button colorScheme="whiteAlpha">Cancelar</Button>
                <Button colorScheme="pink">Salvar</Button>
              </HStack>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default CreateUser;
