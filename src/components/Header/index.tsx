import { Flex, Icon, Input, HStack, Box, Text, Avatar } from "@chakra-ui/react";
import {
  RiSearchLine,
  RiNotificationLine,
  RiUserAddLine,
} from "react-icons/ri";
import Logo from "../Logo";

function Header(): JSX.Element {
  return (
    <Flex
      as="header"
      w="100%"
      maxW={1480}
      h={20}
      mx="auto"
      mt={4}
      px={6}
      align="center"
    >
      <Logo />

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
        />

        <Icon as={RiSearchLine} fontSize={20} />
      </Flex>

      <Flex align="center" ml="auto">
        <HStack
          spacing={8}
          mx={8}
          pr={8}
          py={1}
          color="gray.300"
          borderRightWidth={1}
          borderColor="gray.700"
        >
          <Icon as={RiNotificationLine} fontSize={20} />
          <Icon as={RiUserAddLine} fontSize={20} />
        </HStack>

        <Flex align="center">
          <Box mr={4} textAlign="right">
            <Text>Gabriel Mendes</Text>
            <Text color="gray.300" fontSize="small">
              gmendes230@gmail.com
            </Text>
          </Box>

          <Avatar
            size="md"
            name="Gabriel Mendes"
            src="https://github.com/gmendes0.png"
          />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Header;