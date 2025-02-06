import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  Button, 
  Input,
  VStack,
  HStack,
  Spinner,
  IconButton,
  Grid,
  GridItem
} from '@chakra-ui/react';
import { FaRegComment, FaPalette, FaImage, FaCode, FaMagic } from 'react-icons/fa';
import { Tooltip } from '@/components/ui/tooltip';

export const ChatGemini = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Suggestions rapides avec icônes et descriptions
  const quickSuggestions = [
    { label: 'Color Palette', icon: FaPalette, description: 'Generate a color palette from an image' },
    { label: 'Generate Image', icon: FaImage, description: 'Generate an image from a text prompt' },
    { label: 'React Component', icon: FaCode, description: 'Generate a React code from prompt' },
    { label: 'Voice Magic', icon: FaMagic, description: 'Create a magical UI from voice' },
  ];

  /**
   * Envoi de question à l'API Gemini (fictive).
   */
  const handleSend = async (question) => {
    const userMessage = question || inputValue.trim();
    if (!userMessage) return;
 
    const newMessage = { role: 'user', content: userMessage };
    setMessages((prev) => [...prev, newMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('https://api.gemini.com/mon-endpoint-de-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMessage }),
      });
      const data = await response.json();
      const botAnswer = data.answer || "Désolé, je n'ai pas compris la réponse.";
      const botMessage = { role: 'bot', content: botAnswer };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'bot', content: 'Une erreur est survenue...' }]);
      console.error('Erreur lors de l’appel API Gemini :', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Scroll automatique vers le bas quand un nouveau message est ajouté
  useEffect(() => {
    if (messages.length !== 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <Flex direction="column" height="80vh" width="60%">
      {/* Zone des messages avec défilement */}
      <Box flex="1" maxH="70vh" overflowY="auto" p={4}>
        {messages.length === 0 && (
          <VStack spacing={4} mb={8}>
            <Text fontSize="xl" fontWeight="semibold" textAlign="center">
              Bonjour, je suis Hozaari, l’assistant virtuel de Cedric Randriamanjaka. Comment puis-je vous aider ?
            </Text>

            {/* Zone des suggestions sous forme de grille */}
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4} width="70%">
              {quickSuggestions.map((sug, idx) => (
                <GridItem key={idx}>
                  <Button
                    w="100%"
                    h="60px"
                    justifyContent="flex-start"
                    variant="outline"
                    borderRadius="lg"
                    textAlign="left"
                    p={4}
                    onClick={() => handleSend(sug.label)}
                  >
                    <sug.icon />
                    <Box>
                      <Text fontWeight="bold">{sug.label}</Text>
                      <Text fontSize="sm" color="gray.500">{sug.description}</Text>
                    </Box>
                  </Button>
                </GridItem>
              ))}
            </Grid>
          </VStack>
        )}

        {/* Affichage des messages */}
        <VStack align="stretch" spacing={4}>
          {messages.map((msg, i) => (
            <Flex
              key={i}
              alignSelf={msg.role === 'user' ? 'flex-end' : 'flex-start'}
              maxW="70%"
              bg="bg.muted"
              p={3}
              borderRadius="md"
              boxShadow="sm"
              flexDir="column"
            >
              <Text fontSize="sm" color="gray.500" mb={1}>
                {msg.role === 'user' ? 'You' : 'Gemini'}
              </Text>
              <Text>{msg.content}</Text>
            </Flex>
          ))}

          {isLoading && (
            <HStack>
              <Spinner size="sm" />
              <Text>Le bot réfléchit...</Text>
            </HStack>
          )}

          {/* Ancre pour scroll automatique */}
          <div ref={messagesEndRef} />
        </VStack>
      </Box>

      {/* Zone de saisie */}
      <Box as="form" p={4} onSubmit={(e) => {
        e.preventDefault();
        handleSend(null);
      }}>
        <HStack>
          <Input
            placeholder="Tapez votre message..."
            value={inputValue}
            borderRadius={1000}
            onChange={(e) => setInputValue(e.target.value)}
            flex="1"
          />
          <Tooltip label="Envoyer" placement="top">
            <IconButton
            borderRadius={1000}
              aria-label="Send message"
              colorScheme="blue"
              type="submit"
              isLoading={isLoading}
            >
            <FaRegComment />
          </IconButton>
          </Tooltip>
        </HStack>
      </Box>
    </Flex>
  );
};
