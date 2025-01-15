import React from 'react';
import { Box, Heading, Text, Mark, Image } from '@chakra-ui/react';

const Home = () => {
  return (
    <Box
      minH="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      {/* Nom principal */}
      <Heading as="h1" size="6xl" color="teal.500" >
        Cedric <br /> Randriamanjaka
      </Heading>

      {/* Slogan */}
      <Heading
        as="h2"
        size="2xl"
        color="teal.100"
        mt={6}
        lineHeight="shorter"
      >
        <Text fontSize="xl" mb={2}>
          À votre service en tant que
        </Text>
        <Mark
          bg="transparent"
          color="red.500"
          fontStyle="italic"
          position="relative"
          display="inline-block"
        >
          Développeur
          <Image
            src="https://uploads-ssl.webflow.com/5fac11c3554384e2baf6481c/61c4dc7572d22f05ba26fd34_hero-underline.svg"
            alt="Soulignement décoratif"
            position="absolute"
            bottom={-1}
            left={0}
            transform="translateY(50%)"
            width="full"
            height="auto"
          />
        </Mark>
      </Heading>
    </Box>
  );
};

export default Home;
