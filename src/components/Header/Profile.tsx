import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { useAuth } from "../../hooks/useAuth";

interface ProfileProps {
  showProfileData?: boolean;
}

function Profile({ showProfileData = true }: ProfileProps): JSX.Element {
  const { user } = useAuth();

  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr={4} textAlign="right">
          <Text>User Name</Text>
          <Text color="gray.300" fontSize="small">
            {user?.email}
          </Text>
        </Box>
      )}

      <Avatar size="md" name="User Name" src={user?.avatar} />
    </Flex>
  );
}

export default Profile;
