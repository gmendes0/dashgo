import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useEffect } from "react";

interface SidebarDrawerContextData extends UseDisclosureReturn {}

interface SidebarDrawerProviderProps {
  children: ReactNode;
}

export const SidebarDrawerContext = createContext(
  {} as SidebarDrawerContextData
);

export const useSidebarDrawer = () => useContext(SidebarDrawerContext);

export function SidebarDrawerProvider(
  props: SidebarDrawerProviderProps
): JSX.Element {
  const disclosure = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    disclosure.onClose();
  }, [router.asPath]);

  return (
    <SidebarDrawerContext.Provider value={disclosure}>
      {props.children}
    </SidebarDrawerContext.Provider>
  );
}
