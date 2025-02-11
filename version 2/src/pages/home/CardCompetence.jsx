import React from "react";
import {
  Box,
  Image,
  Stack,
  HStack,
  Icon,
  Text
} from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import {
  HoverCardArrow,
  HoverCardContent,
  HoverCardRoot,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { LuChartLine } from "react-icons/lu";
import "./competence.css";

/**
 * Composant pour afficher une icône avec un HoverCard détaillé.
 * On attend que l'objet icon contienne au moins les clés :
 * - src, alt : pour l'image
 * - tooltipTitle (optionnel) : le titre affiché dans le hover card
 * - tooltipDescription (optionnel) : la description affichée
 * - tooltipDownloads (optionnel) : une info supplémentaire (ex. téléchargements)
 * - tooltipAvatar (optionnel) : source de l'avatar (par défaut on peut réutiliser icon.src)
 */
const IconHoverCard = ({ icon }) => {
  return (
    <HoverCardRoot size="sm" openDelay={0} closeDelay={0}>
      <HoverCardTrigger asChild>
        {/* On enveloppe l'image dans une Box pour le trigger */}
        <Box>
          <Image
            src={icon.src}
            alt={icon.alt}
            boxSize="50px"
            m={2}
          />
        </Box>
      </HoverCardTrigger>
      <HoverCardContent>
        <HoverCardArrow />
        <Stack gap="4" direction="row">
          <Avatar
            name={icon.tooltipTitle || icon.alt}
            src={icon.tooltipAvatar || icon.src}
          />
          <Stack gap="3">
            <Stack gap="1">
              <Text textStyle="sm" fontWeight="semibold">
                {icon.tooltipTitle || "Titre non défini"}
              </Text>
              <Text textStyle="sm" color="fg.muted">
                {icon.tooltipDescription || icon.tooltip || "Description non définie"}
              </Text>
            </Stack>
            {icon.tooltipDownloads && (
              <HStack color="fg.subtle">
                <Icon boxSize="16px">
                  <LuChartLine />
                </Icon>
                <Text textStyle="xs">{icon.tooltipDownloads}</Text>
              </HStack>
            )}
          </Stack>
        </Stack>
      </HoverCardContent>
    </HoverCardRoot>
  );
};

const CardCompetence = ({ frontBg, title, name, icons = [], logo }) => {
  return (
    <div className="card-container">
      <div className="card">
        {/* Face avant */}
        <div
          className="front e-card playing"
          style={{
            backgroundImage: `url(${frontBg})`,
            backgroundSize: "cover",
          }}
        >
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="infotop">
            <center>{logo}</center>
            <br />
            {title}
            <br />
            <div className="name">{name}</div>
          </div>
        </div>
        {/* Face arrière */}
        <Box className="back" bg="bg.muted" p={4}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
          >
            {icons.map((icon, index) => {
              // Si des détails de tooltip sont fournis, on utilise le HoverCard
              if (icon.tooltip || icon.tooltipTitle || icon.tooltipDescription) {
                return <IconHoverCard key={index} icon={icon} />;
              }
              // Sinon, on affiche simplement l'icône
              return (
                <Image
                  key={index}
                  src={icon.src}
                  alt={icon.alt}
                  boxSize="50px"
                  m={2}
                />
              );
            })}
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default CardCompetence;
