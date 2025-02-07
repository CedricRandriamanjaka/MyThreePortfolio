import React from "react";
import { Box, Flex, Heading, Spacer, Icon } from "@chakra-ui/react";
import { Switch } from "@/components/ui/switch";
import { FaMoon, FaSun } from "react-icons/fa";


const Header = ({ toggleTheme }) => {

  return (
    <Box px={6} py={4} position="fixed" width="100%" zIndex={12}>
      <Flex align="center" mx="auto">
        <Heading as="h2" size="lg" letterSpacing="wider">
          R. Cedric
        </Heading>

        <Spacer />

        <Switch
          size="lg"
          onChange={toggleTheme}
          trackLabel={{
            on: (
              <Icon color="yellow.400">
                <FaMoon />
              </Icon>
            ),
            off: (
              <Icon color="gray.400">
                <FaSun />
              </Icon>
            ),
          }}
        />
      </Flex>
    </Box>
  );
};

export default Header;
