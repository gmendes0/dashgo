import { Flex, Icon, Input } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { RiSearchLine } from "react-icons/ri";

// Controlled components
// Uncontrolled components

function SearchBox(): JSX.Element {
  // const [search, setSearch] = useState<string>(""); // Controlled

  const searchInputRef = useRef<HTMLInputElement>(null); // Uncontrolled

  console.log(searchInputRef.current?.value);

  return (
    <Flex
      as="label"
      flex={1}
      py={4}
      px={8}
      ml={6}
      maxW={400}
      alignSelf="center"
      alignItems="center"
      color="gray.200"
      position="relative"
      bg="gray.800"
      borderRadius="full"
    >
      <Input
        color="gray.50"
        variant="unstyled"
        placeholder="Buscar na plataforma"
        px={4}
        mr={4}
        _placeholder={{
          color: "gray.400",
        }}
        // value={search}
        // onChange={(event) => setSearch(event.target.value)}
        ref={searchInputRef}
      />

      <Icon as={RiSearchLine} fontSize={20} />
    </Flex>
  );
}

export default SearchBox;
