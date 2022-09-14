import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
}

export default function Input({
  name,
  label,
  ...rest
}: InputProps): JSX.Element {
  return (
    <FormControl>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraInput
        id={name}
        name={name}
        type="email"
        focusBorderColor="pink.500"
        bg="gray.900"
        variant="filled"
        _hover={{ bg: "gray.900" }}
        size="lg"
        {...rest}
      />
    </FormControl>
  );
}
