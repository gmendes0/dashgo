import { Box, Icon, Link, Stack, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { RiContactsLine, RiDashboardLine } from "react-icons/ri";

interface NavSection {
  title: string;
  children?: ReactNode;
}

function NavSection(props: NavSection): JSX.Element {
  return (
    <Box>
      <Text
        fontWeight="bold"
        color="gray.400"
        fontSize="small"
        textTransform="uppercase"
      >
        {props.title}
      </Text>

      <Stack spacing={4} mt={8} align="stretch">
        {props.children}
      </Stack>
    </Box>
  );
}

export default NavSection;
