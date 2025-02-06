import { useState } from "react";
import { Float, HStack, Span,createListCollection,Box, VStack } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { Blockquote, BlockquoteIcon } from "@/components/ui/blockquote";
import {
  TimelineConnector,
  TimelineContent,
  TimelineItem,
  TimelineRoot,
  TimelineTitle,
} from "@/components/ui/timeline";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";

const Me = () => {
  const frameworks = createListCollection({
    items: [
      { label: "experience", value: "experience" },
      { label: "education", value: "education" },
      { label: "both", value: "both" },
    ],
  });


  const timeline = [
    {
      id: 1,
      type: "pro",
      title: "Développeur Frontend",
      company: "TechCorp",
      year: "2022 - Présent",
    },
    {
      id: 2,
      type: "scool",
      title: "Licence en Informatique",
      company: "Université de Lyon",
      year: "2015 - 2018",
    },
    {
      id: 3,
      type: "pro",
      title: "Développeur Backend",
      company: "CodeWorks",
      year: "2020 - 2022",
    },
    {
      id: 4,
      type: "scool",
      title: "Master en Informatique",
      company: "Université de Paris",
      year: "2018 - 2020",
    },
  ];
  const [view, setView] = useState("both");

  return (

      <Box as="section" py={16} px={6} maxW="6xl" mx="auto">
    <Blockquote
      bg="bg.subtle"
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
    <br />
    <VStack spacing={4} align="stretch">
      <SelectRoot
        collection={frameworks}
        size="sm"
        width="320px"
        onChange={(e) => setView(e.target.value)}
        >
        <SelectLabel>Select framework</SelectLabel>
        <SelectTrigger>
          <SelectValueText placeholder="mode de vue" />
        </SelectTrigger>
        <SelectContent>
          {frameworks.items.map((movie) => (
              <SelectItem item={movie.value} key={movie.value}>
              {movie.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
      <TimelineRoot size="sm" variant="outline">
        {timeline.map((item) => {
          if (
            (view === "experience" && item.type !== "pro") ||
            (view === "education" && item.type !== "scool")
          ) {
            return null;
          }
          return (
            <TimelineItem key={item.id}>
              {item.type === "pro" && (
                  <>
                  <TimelineContent flex="1" />
                  <TimelineConnector />
                </>
              )}
              <TimelineContent
                flex="1"
                alignItems={item.type === "scool" ? "flex-end" : "flex-start"}
                >
                <TimelineTitle>{item.title}</TimelineTitle>
                <Box fontSize="sm">{item.company}</Box>
                <Box fontSize="xs" color="gray.500">
                  {item.year}
                </Box>
              </TimelineContent>
              {item.type === "scool" && (
                  <>
                  <TimelineConnector />
                  <TimelineContent flex="1" />
                </>
              )}
            </TimelineItem>
          );
        })}
      </TimelineRoot>
    </VStack>
    
  </Box>
)
};

export default Me;
