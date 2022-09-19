import {
  Icon,
  Link as ChakraLink,
  LinkProps as ChackraLinkProps,
  Text,
} from "@chakra-ui/react";
import { ElementType } from "react";
import ActiveLink from "../ActiveLink";

interface NavLinkProps extends ChackraLinkProps {
  icon: ElementType;
  href: string;
  children: string;
}

function NavLink({ icon, children, href, ...rest }: NavLinkProps): JSX.Element {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink display="flex" alignItems="center" {...rest}>
        <Icon as={icon} fontSize={20} />
        <Text ml={4} fontWeight="medium">
          {children}
        </Text>
      </ChakraLink>
    </ActiveLink>
  );
}

export default NavLink;
