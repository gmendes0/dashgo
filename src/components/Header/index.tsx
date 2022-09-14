import { Flex, Icon, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { RiMenuLine } from "react-icons/ri";
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";

import Logo from "../Logo";
import NotificationsNav from "./NotificationsNav";
import Profile from "./Profile";
import SearchBox from "./SearchBox";

function Header(): JSX.Element {
  const isWideScreen = useBreakpointValue({ base: false, lg: true });
  const { onOpen } = useSidebarDrawer();

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
      {!isWideScreen && (
        <IconButton
          aria-label="Open navigation"
          icon={<Icon as={RiMenuLine} />}
          variant="unstyled"
          onClick={onOpen}
          mr={2}
          fontSize={24}
          display="flex"
          alignItems="center"
          justifyContent="center"
        ></IconButton>
      )}
      <Logo />

      {isWideScreen && <SearchBox />}

      <Flex align="center" ml="auto">
        <NotificationsNav />

        <Profile showProfileData={isWideScreen} />
      </Flex>
    </Flex>
  );
}

export default Header;
