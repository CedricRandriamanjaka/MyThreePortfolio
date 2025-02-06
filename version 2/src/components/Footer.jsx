import { Container, HStack, Icon, Link, Stack } from '@chakra-ui/react';
import { SiGithub, SiLinkedin, SiX } from 'react-icons/si';
import { Copyright } from './copyright';
import { Logo } from './logo';

const socialLinks = [
  { href: 'https://x.com', icon: SiX },
  { href: 'https://github.com', icon: SiGithub },
  { href: 'https://www.linkedin.com', icon: SiLinkedin },
];

const Footer = () => {
  return (
    <Container as="footer" py={{ base: '10', md: '12' }}>
      <Stack gap="6">
        <Stack direction="row" justify="space-between" align="center">
          <Logo height="32" />
          <HStack gap="4">
            {socialLinks.map(({ href, icon: IconComponent }, index) => (
              <Link key={index} href={href} colorPalette="gray">
                <Icon as={IconComponent} boxSize={5} />
              </Link>
            ))}
          </HStack>
        </Stack>
        <Copyright />
      </Stack>
    </Container>
  );
};

export default Footer;