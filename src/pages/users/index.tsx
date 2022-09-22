import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { NextPage } from "next";
import Head from "next/head";

import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import Pagination from "../../components/Pagination";
import Link from "next/link";
import { format } from "../../utils/format";

type TUser = {
  id: number;
  name: string;
  email: string;
  created_at: string;
};

type TUsersResponseData = {
  users: Array<TUser>;
};

type TQueryData = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
};

const Users: NextPage = () => {
  // Stale While Revalidate
  // Mostra uma versao obsoleta dos dados enquanto tenta revalidar, buscando novamente na api
  // Também trabalha com revalidate on focus, que revalida os dados ao usuário focar na page novamente
  // 1 param do useQuery é a chave para armazenar em cache
  const { data, isLoading, error } = useQuery<TQueryData[]>(
    "users",
    async () => {
      const response = await fetch("http://localhost:3000/api/users");
      const data: TUsersResponseData = await response.json();

      const users = data.users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: format.date(new Date(user.created_at)),
      }));

      return users;
    },
    {
      staleTime: 1000 * 10, // 5 segundos
    }
  );

  const isWideScreen = useBreakpointValue({ base: false, lg: true });

  // useEffect(() => {
  //   fetch("http://localhost:3000/api/users")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //     });
  // }, []);

  return (
    <>
      <Head>
        <title>Users | Dashgo</title>
      </Head>

      <Flex direction="column" h="100vh">
        <Header />

        <Flex w="100%" my={6} maxW={1480} mx="auto" px={6}>
          <Sidebar />

          <Box flex={1} borderRadius={8} bg="gray.800" p={8}>
            <Flex mb={8} justify="space-between" align="center">
              <Heading size="lg" fontWeight="notmal">
                Usuários
              </Heading>

              <Link href="/users/create" passHref>
                <Button
                  as="a"
                  size="sm"
                  fontSize="small"
                  colorScheme="pink"
                  leftIcon={<Icon as={RiAddLine} fontSize={20} />}
                  cursor="pointer"
                >
                  Criar novo
                </Button>
              </Link>
            </Flex>

            {isLoading ? (
              <Flex justify="center">
                <Spinner />
              </Flex>
            ) : error ? (
              <Flex justify="center">
                <Text>Falha ao obter dados dos usuários</Text>
              </Flex>
            ) : (
              <>
                <Table colorScheme="whiteAlpha">
                  <Thead>
                    <Tr>
                      <Th px={{ base: 4, md: 4, lg: 6 }} color="gray.300" w={8}>
                        <Checkbox colorScheme="pink" />
                      </Th>
                      <Th>Usuário</Th>
                      {isWideScreen && <Th>Data de cadastro</Th>}
                      {isWideScreen && <Th w={8} />}
                    </Tr>
                  </Thead>

                  <Tbody>
                    {data?.map((user) => (
                      <Tr key={user.id}>
                        <Td px={{ base: 4, md: 4, lg: 6 }}>
                          <Checkbox colorScheme="pink" />
                        </Td>
                        <Td>
                          <Box>
                            <Text fontWeight="bold">{user.name}</Text>
                            <Text fontSize="small" color="gray.300">
                              {user.email}
                            </Text>
                          </Box>
                        </Td>
                        {isWideScreen && <Td>{user.createdAt}</Td>}
                        {isWideScreen && (
                          <Td>
                            <Button
                              as="a"
                              size="sm"
                              fontSize="small"
                              colorScheme="purple"
                              leftIcon={
                                <Icon as={RiPencilLine} fontSize={16} />
                              }
                              cursor="pointer"
                            >
                              Editar
                            </Button>
                          </Td>
                        )}
                      </Tr>
                    ))}
                  </Tbody>
                </Table>

                <Pagination />
              </>
            )}
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default Users;
