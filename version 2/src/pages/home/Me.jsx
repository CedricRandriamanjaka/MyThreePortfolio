import { Float, HStack, Span, Box } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { Blockquote, BlockquoteIcon } from "@/components/ui/blockquote";
import Timeline from "./Timeline";
import Competence from "./Competence";
const Me = () => {
  return (
    <Box as="section" py={16} px={6} maxW="4xl" mx="auto">
      <Blockquote
        // bg="bg.subtle"
        padding="8"
        icon={
          <Float placement="bottom-end" offset="10">
            <BlockquoteIcon opacity="0.4" boxSize="10" rotate="180deg" />
          </Float>
        }
        cite={
          <HStack mt="2" gap="3">
            <Avatar
              size="sm"
              name="R. Cedric"
              src="https://cedricrandriamanjaka.wordpress.com/wp-content/uploads/2024/06/download.gif"
            />
            <Span fontWeight="medium">Cedric Randriamanjaka</Span>
          </HStack>
        }
      >
        Le digital n'est pas juste mon métier, c'est mon terrain de jeu, mon
        espace d’évolution, mon mode de vie.
        <br />
        Mon objectif : allier passion et expertise pour créer des solutions
        innovantes et uniques.
      </Blockquote>
      <Competence />
      <Timeline />
    </Box>
  );
};

export default Me;
