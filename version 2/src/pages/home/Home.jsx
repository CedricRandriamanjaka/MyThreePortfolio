import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Mark,
  Image,
  Em,
  Center,
  Tabs,
} from "@chakra-ui/react";
import { Canvas } from "@react-three/fiber";
import { Scene } from "../../components/three/SceneRuban";
import { ChatGemini } from "./ChatGemini";
import { LuFolder, LuUser } from "react-icons/lu";
import Footer from "../../components/Footer";
import Me from "./Me";

const Home = () => {
  const titles = [
    "Développeur Web",
    "Développeur Fullstack",
    "Ingénieur Logiciel",
    "Freelance Tech",
    "Créateur d’expériences numériques",
  ];

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % titles.length);
        setFade(true);
      }, 500);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Box
        minH="100vh"
        display="flex"
        padding="40"
        flexDirection="column"
        justifyContent="center"
      >
        <Heading as="h1" size="6xl">
          Cedric <br /> Randriamanjaka
        </Heading>

        <Heading as="h2" size="2xl" mt={6} lineHeight="shorter">
          <Text fontSize="xl" mb={2}>
            <Em>À votre service en tant que</Em>
          </Text>
          <Mark
            css={{
              fontStyle: "italic",
              color: "red.500",
              position: "relative",
              opacity: fade ? 1 : 0,
              transition: "opacity 0.5s linear",
            }}
          >
            {titles[index]}
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

      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        minHeight="150vh"
        pointerEvents="none"
      >
        <Canvas
          shadows
          dpr={[1, 1.5]}
          camera={{ position: [5, 15, 7], fov: 60, near: 0.1, far: 100 }}
          style={{ width: "100%", height: "150vh" }}
          onCreated={(state) => {
            state.gl.physicallyCorrectLights = true;
            state.scene.background = null;
          }}
        >
          <Scene />
        </Canvas>
      </Box>

      <Center>
        <Box width="100%">
          <Tabs.Root defaultValue="mon IA" variant="plain">
            <Center
              position="sticky"
              top="10px"
              zIndex={15}
              margin="0 auto"
              width="50%"
            >
              <Tabs.List
                bg="bg.muted"
                rounded="l3"
                p="1"
                justifyContent="center"
              >
                <Tabs.Trigger value="mon IA">
                  <LuUser />
                  Mon IA
                </Tabs.Trigger>
                <Tabs.Trigger value="moi">
                  <LuFolder />
                  Moi
                </Tabs.Trigger>
                <Tabs.Indicator rounded="l2" />
              </Tabs.List>
            </Center>

            <Tabs.Content
              value="mon IA"
              _open={{
                animationName: "fade-in, scale-in",
                animationDuration: "300ms",
              }}
              _closed={{
                animationName: "fade-out, scale-out",
                animationDuration: "120ms",
              }}
            >
              <Center>
                <ChatGemini />
              </Center>
            </Tabs.Content>

            <Tabs.Content
              value="moi"
              _open={{
                animationName: "fade-in, scale-in",
                animationDuration: "300ms",
              }}
              _closed={{
                animationName: "fade-out, scale-out",
                animationDuration: "120ms",
              }}
            >
              <Me />
              <Footer />
            </Tabs.Content>
          </Tabs.Root>
        </Box>

      </Center>
    </>
  );
};

export default Home;
