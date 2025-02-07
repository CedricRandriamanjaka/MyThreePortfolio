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
import { createListCollection,Box, VStack } from "@chakra-ui/react";
import { useState } from "react";


const Timeline = () => {
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
    );
}

export default Timeline;