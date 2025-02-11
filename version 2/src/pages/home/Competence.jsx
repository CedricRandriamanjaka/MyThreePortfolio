import React from "react";
import "./competence.css";
import { Heading, Stack, Highlight, Text, Center } from "@chakra-ui/react";
import CardCompetence from "./CardCompetence"; // ajustez le chemin si nécessaire
import { FrontEndLogo, BackEndLogo, ToolsLogo } from "./Logos";

const Competence = () => {
  return (
    <>
      <Heading as="h2" size="4xl" mb={8}>
        Mes compétences
      </Heading>
      <Text textStyle="sm">
        En tant que développeur je maîtrise plusieurs langages de programmation backend et frontend.
        <br />
        <Highlight query="vos Projets" styles={{ px: "1.5", bg: "orange.subtle", color: "orange.fg" }}>
          Mais également d’autres atouts qui pourraient être très utiles pour vos Projets.
        </Highlight>
      </Text>
      <Center>
        <br />
        <Stack direction="row" gap={20}>
          <CardCompetence
            // frontBg="https://d15cw65ipctsrr.cloudfront.net/7f/4cd8b5440f47bf97c1ee1b42575bbc/Van-gogh_3.jpg"
            title="UI / UX Designer"
            name="MikeAndrewDesigner"
            icons={[
              {
                src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
                alt: "React",
                tooltip: "This is the tooltip content",
              },
              {
                src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
                alt: "JavaScript",
                tooltip: "This is the tooltip content",
              },
              {
                src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
                alt: "Chakra UI",
                tooltip: "This is the tooltip content",
              },
              {
                src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
                tooltip: "This is the tooltip content",
                alt: "Node.js",
              },
            ]}
            logo={<FrontEndLogo />}
          />
          <CardCompetence
            // frontBg="https://fiches-pratiques.chefdentreprise.com/Assets/Img/FICHEPRATIQUE/2021/12/368385/Tout-que-vous-devez-savoir-metier-developpeur-web-F.jpg"
            title="UI / UX Designer"
            name="MikeAndrewDesigner"
            icons={[
              {
                src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
                tooltip: "This is the tooltip content",
                alt: "React",
              },
              {
                src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
                tooltip: "This is the tooltip content",
                alt: "JavaScript",
              },
              {
                src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
                tooltip: "This is the tooltip content",
                alt: "Chakra UI",
              },
              {
                src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
                tooltip: "This is the tooltip content",
                alt: "Node.js",
              },
            ]}
            logo={<BackEndLogo />}
          />
          <CardCompetence
            // frontBg="https://st.depositphotos.com/1001877/3904/i/450/depositphotos_39046581-stock-photo-online-support-toolbox-with-tools.jpg"
            title="UI / UX Designer"
            name="MikeAndrewDesigner"
            icons={[
              {
                src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
                tooltip: "This is the tooltip content",
                alt: "React",
              },
              {
                src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
                tooltip: "This is the tooltip content",
                alt: "JavaScript",
              },
              {
                src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
                tooltip: "This is the tooltip content",
                alt: "Chakra UI",
              },
              {
                src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
                tooltip: "This is the tooltip content",
                alt: "Node.js",
              },
            ]}
            logo={<ToolsLogo />}
          />
        </Stack>
      </Center>
    </>
  );
};

export default Competence;
