import React from 'react';
import { LuFolder, LuSquareCheck, LuUser } from 'react-icons/lu';
import { Box, Flex, Heading, Link, Spacer,Tabs } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Header = () => {
  return (
    <Box
      as="footer"
      color="white"
      px={6}
      py={4}
      position="fixed"
    //   top="0"
      width="100%"
      zIndex="10"
    >
      <Flex align="center" mx="auto">
        {/* Logo ou Titre */}
        <Heading as="h2" size="lg" letterSpacing="wider">
            R. Cedric
        </Heading>

        <Spacer />

        {/* Bouton d'action */}
        <Tabs.Root defaultValue="Me"  variant="plain">
        <Tabs.List rounded="lg" p="0">
          <Tabs.Trigger color={"white"} value="members">
            <LuUser />
            Mes Experience
          </Tabs.Trigger>
          <Tabs.Trigger color={"white"} value="projects">
            <LuFolder />
            Mon Parcours
          </Tabs.Trigger>
          <Tabs.Trigger color={"white"} value="Me">
            <LuSquareCheck />
            Moi
          </Tabs.Trigger>
          <Tabs.Indicator rounded="md" bg="teal.500" />
        </Tabs.List>
      </Tabs.Root>
      </Flex>
    </Box>
  );
};

export default Header;
