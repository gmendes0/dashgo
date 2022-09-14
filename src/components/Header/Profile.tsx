import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

function Profile({ showProfileData = true }: ProfileProps): JSX.Element {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr={4} textAlign="right">
          <Text>Gabriel Mendes</Text>
          <Text color="gray.300" fontSize="small">
            gmendes230@gmail.com
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Gabriel Mendes"
        src="https://github.com/gmendes0.png"
      />
    </Flex>
  );
}

export default Profile;
