import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import PaginationItem from "./PaginationItem";

interface PaginationProps {
  totalOfRegisters: number;
  perPage?: number;
  currentPage?: number;
  siblingsCount?: number;
  onPageChange: (page: number) => void;
}

function generatePagesArray(from: number, to: number): Array<number> {
  return [...new Array(to - from)] // ex: Array(5 - 2) = [undefined, undefined, undefined]
    .map((_, index) => {
      return 1 + from + index;
      // ex: [1 + 2 + 0, 1 + 2 + 1, 1 + 2 + 2] = [3, 4, 5]
    })
    .filter((page) => page > 0);
}

function Pagination({
  totalOfRegisters,
  perPage = 10,
  currentPage = 1,
  siblingsCount = 1,
  onPageChange,
}: PaginationProps): JSX.Element {
  const lastPage = Math.ceil(totalOfRegisters / perPage);

  useEffect(() => {
    generatePagesArray(5 - 1 - 1, 5 - 1);
  }, [siblingsCount, currentPage]);

  const previousPages: Array<number> =
    currentPage > 1
      ? generatePagesArray(currentPage - siblingsCount - 1, currentPage - 1) // ex: 5 - 2 - 1 (current - qtd de paginas que eu quero até chegar no current - 1) = [3, 4]
      : [];

  const nextPages: Array<number> =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage)
        ) // ex: 5 + 2 = 7 [1 + 5 + 0] <- (generatePagesArray) | min limita o n para q nao seja maior q last page
      : [];

  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      mt={8}
      justify="space-between"
      align="center"
      spacing={6}
    >
      <Box>
        <Text as="strong" fontWeight="bold">
          {(currentPage - 1) * perPage}
        </Text>
        <Text as="span"> - </Text>
        <Text as="strong" fontWeight="bold">
          {currentPage * perPage}
        </Text>
        <Text as="span"> de </Text>
        <Text as="strong" fontWeight="bold">
          {totalOfRegisters}
        </Text>
      </Box>

      <HStack spacing={2}>
        {currentPage > siblingsCount + 1 && (
          <>
            <PaginationItem number={1} />
            <Text color="gray.300" w={8} textAlign="center">
              ...
            </Text>
          </>
        )}

        {previousPages.map((page) => (
          <PaginationItem key={page} number={page} />
        ))}

        <PaginationItem number={currentPage} isCurrent />

        {nextPages.map((page) => (
          <PaginationItem key={page} number={page} />
        ))}

        {currentPage + siblingsCount < lastPage && (
          <>
            <Text color="gray.300" w={8} textAlign="center">
              ...
            </Text>
            <PaginationItem number={lastPage} />
          </>
        )}
      </HStack>
    </Stack>
  );
}

export default Pagination;
