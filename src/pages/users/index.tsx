import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import Pagination from "../../components/Pagination";
import Link from "next/link";

const Users: NextPage = () => {
  const isWideScreen = useBreakpointValue({ base: false, lg: true });

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
                <Tr>
                  <Td px={{ base: 4, md: 4, lg: 6 }}>
                    <Checkbox colorScheme="pink" />
                  </Td>
                  <Td>
                    <Box>
                      <Text fontWeight="bold">Gabriel Mendes</Text>
                      <Text fontSize="small" color="gray.300">
                        gmendes230@gmail.com
                      </Text>
                    </Box>
                  </Td>
                  {isWideScreen && <Td>14 de Setembro, 2022</Td>}
                  {isWideScreen && (
                    <Td>
                      <Button
                        as="a"
                        size="sm"
                        fontSize="small"
                        colorScheme="purple"
                        leftIcon={<Icon as={RiPencilLine} fontSize={16} />}
                        cursor="pointer"
                      >
                        Editar
                      </Button>
                    </Td>
                  )}
                </Tr>

                <Tr>
                  <Td px={{ base: 4, md: 4, lg: 6 }}>
                    <Checkbox colorScheme="pink" />
                  </Td>
                  <Td>
                    <Box>
                      <Text fontWeight="bold">Gabriel Mendes</Text>
                      <Text fontSize="small" color="gray.300">
                        gmendes230@gmail.com
                      </Text>
                    </Box>
                  </Td>
                  {isWideScreen && <Td>14 de Setembro, 2022</Td>}
                  {isWideScreen && (
                    <Td>
                      <Button
                        as="a"
                        size="sm"
                        fontSize="small"
                        colorScheme="purple"
                        leftIcon={<Icon as={RiPencilLine} fontSize={16} />}
                        cursor="pointer"
                      >
                        Editar
                      </Button>
                    </Td>
                  )}
                </Tr>

                <Tr>
                  <Td px={{ base: 4, md: 4, lg: 6 }}>
                    <Checkbox colorScheme="pink" />
                  </Td>
                  <Td>
                    <Box>
                      <Text fontWeight="bold">Gabriel Mendes</Text>
                      <Text fontSize="small" color="gray.300">
                        gmendes230@gmail.com
                      </Text>
                    </Box>
                  </Td>
                  {isWideScreen && <Td>14 de Setembro, 2022</Td>}
                  {isWideScreen && (
                    <Td>
                      <Button
                        as="a"
                        size="sm"
                        fontSize="small"
                        colorScheme="purple"
                        leftIcon={<Icon as={RiPencilLine} fontSize={16} />}
                        cursor="pointer"
                      >
                        Editar
                      </Button>
                    </Td>
                  )}
                </Tr>
              </Tbody>
            </Table>

            <Pagination />
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default Users;
