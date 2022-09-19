import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { cloneElement, ReactElement, useEffect, useState } from "react";

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  shouldMatchExactHref?: boolean;
}

function ActiveLink({
  children,
  shouldMatchExactHref = false,
  ...rest
}: ActiveLinkProps): JSX.Element {
  const [isActive, setIsActive] = useState(false);
  const { asPath } = useRouter();

  useEffect(() => {
    if (shouldMatchExactHref && (asPath === rest.href || asPath === rest.as))
      setIsActive(true);

    if (
      !shouldMatchExactHref &&
      (asPath.startsWith(String(rest.href)) ||
        asPath.startsWith(String(rest.as)))
    )
      setIsActive(true);
  }, [asPath]);

  return (
    <Link {...rest}>
      {cloneElement(children, {
        color: isActive ? "pink.400" : "gray.50",
      })}
    </Link>
  );
}

export default ActiveLink;
