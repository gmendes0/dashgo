import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import PaginationItem from "./PaginationItem";

function Pagination(): JSX.Element {
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
          0
        </Text>
        <Text as="span"> - </Text>
        <Text as="strong" fontWeight="bold">
          10
        </Text>
        <Text as="span"> de </Text>
        <Text as="strong" fontWeight="bold">
          100
        </Text>
      </Box>

      <HStack spacing={2}>
        <PaginationItem number={1} isCurrent />
        <PaginationItem number={2} />
        <PaginationItem number={3} />
        <PaginationItem number={4} />
        <PaginationItem number={5} />
      </HStack>
    </Stack>
  );
}

export default Pagination;
