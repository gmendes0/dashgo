import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";
import SidbarNav from "./SidebarNav";

function Sidebar(): JSX.Element {
  const isDrawerSidebar = useBreakpointValue({ base: true, lg: false });
  const { isOpen, onClose } = useSidebarDrawer();

  if (isDrawerSidebar)
    return (
      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerOverlay />
        <DrawerContent bg="gray.800" p={4}>
          <DrawerCloseButton mt={6} fontSize={16} />
          <DrawerHeader>Navegação</DrawerHeader>

          <DrawerBody>
            <SidbarNav />
          </DrawerBody>
        </DrawerContent>
        {/* </DrawerOverlay> */}
      </Drawer>
    );

  return (
    <Box as="aside" w={64} mr={8}>
      <SidbarNav />
    </Box>
  );
}

export default Sidebar;
