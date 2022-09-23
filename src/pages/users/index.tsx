import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";

import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { RiAddLine, RiPencilLine, RiRefreshLine } from "react-icons/ri";
import Pagination from "../../components/Pagination";
import Link from "next/link";
import { useUsers } from "../../hooks/useUsers";
import { useState } from "react";
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/api";

type TUserData = {
  id: string;
  name: string;
  email: string;
  created_at: string;
};

const Users: NextPage = () => {
  const [page, setPage] = useState<number>(1);

  // Stale While Revalidate
  // Mostra uma versao obsoleta dos dados enquanto tenta revalidar, buscando novamente na api
  // Também trabalha com revalidate on focus, que revalida os dados ao usuário focar na page novamente
  // 1 param do useQuery é a chave para armazenar em cache
  // isFatching tbm é chamado quando ainda nao tem dados em cache
  // isRefetching só é true quando isLoading é false e isFatching é true
  const { data, isLoading, isRefetching, refetch, error } = useUsers({ page });

  const isWideScreen = useBreakpointValue({ base: false, lg: true });

  async function handlePrefetchUser(userID: string): Promise<void> {
    await queryClient.prefetchQuery(
      ["user", { id: userID }],
      async () => {
        const response = await api.get<TUserData>(`/users/${userID}`);

        return response.data;
      },
      {
        staleTime: 1000 * 60 * 10, // 10 min
      }
    );
  }

  return (
    <>
      <Head>
        <title>Users | Dashgo</title>
      </Head>

      <Flex direction="column" h="100vh">
        <Header />

        <Flex w="100%" my={6} maxW={1480} mx="auto" px={6}>
          <Sidebar />

          <Box flex={1} borderRadius={8} bg="gray.800" p={8} maxW="100%" mb={8}>
            <Flex mb={8} justify="space-between" align="center">
              <Heading size="lg" fontWeight="normal">
                Usuários
                {isRefetching && <Spinner size="sm" ml={4} color="gray.500" />}
              </Heading>

              <HStack spacing={2}>
                <IconButton
                  aria-label="refresh list"
                  size="sm"
                  fontSize="lg"
                  colorScheme="purple"
                  icon={<RiRefreshLine />}
                  onClick={() => refetch()}
                />
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
              </HStack>
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
                    {data?.users.map((user) => (
                      <Tr key={user.id}>
                        <Td px={{ base: 4, md: 4, lg: 6 }}>
                          <Checkbox colorScheme="pink" />
                        </Td>
                        <Td>
                          <Box>
                            <ChakraLink
                              color="purple.400"
                              onMouseEnter={() => handlePrefetchUser(user.id)}
                            >
                              <Text fontWeight="bold">{user.name}</Text>
                            </ChakraLink>
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

                <Pagination
                  totalOfRegisters={data?.total ?? 0}
                  currentPage={page}
                  siblingsCount={2}
                  onPageChange={setPage}
                />
              </>
            )}
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default Users;
