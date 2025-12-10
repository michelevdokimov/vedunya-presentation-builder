import { Deck, Slide, Heading, Text, Box, FlexBox } from 'spectacle';

// Presentation metadata
export const metadata = {
  id: 'welcome',
  title: 'Welcome to Vedunya',
  description: 'Example presentation demonstrating Spectacle components in 16:9 format',
  createdAt: '2025-12-10',
  updatedAt: '2025-12-10',
};

// 16:9 theme configuration
const theme = {
  colors: {
    primary: '#6366f1',
    secondary: '#8b5cf6',
    tertiary: '#ec4899',
    background: '#1e293b',
    text: '#f1f5f9',
  },
  fonts: {
    header: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    text: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  },
  fontSizes: {
    h1: '72px',
    h2: '48px',
    h3: '36px',
    text: '24px',
  },
};

function WelcomePresentation() {
  return (
    <Deck theme={theme}>
      {/* Slide 1: Title */}
      <Slide backgroundColor="background">
        <FlexBox height="100%" flexDirection="column" justifyContent="center">
          <Heading margin="0px" fontSize="72px" color="primary">
            Welcome to Vedunya
          </Heading>
          <Heading margin="20px 0px 0px" fontSize="36px" color="secondary">
            Presentation Builder
          </Heading>
          <Text margin="40px 0px 0px" fontSize="24px" color="text">
            16:9 Format • React + Spectacle
          </Text>
        </FlexBox>
      </Slide>

      {/* Slide 2: Features */}
      <Slide backgroundColor="background">
        <Heading margin="0px 0px 50px" fontSize="48px" color="primary">
          Features
        </Heading>
        <FlexBox flexDirection="column" alignItems="flex-start" padding="0px 100px">
          <Text margin="15px 0px" fontSize="28px" color="text">
            ✓ View presentations in browser
          </Text>
          <Text margin="15px 0px" fontSize="28px" color="text">
            ✓ Export to PDF (1920×1080)
          </Text>
          <Text margin="15px 0px" fontSize="28px" color="text">
            ✓ Keyboard navigation
          </Text>
          <Text margin="15px 0px" fontSize="28px" color="text">
            ✓ Fullscreen mode
          </Text>
        </FlexBox>
      </Slide>

      {/* Slide 3: Technical Stack */}
      <Slide backgroundColor="background">
        <Heading margin="0px 0px 50px" fontSize="48px" color="secondary">
          Technical Stack
        </Heading>
        <FlexBox justifyContent="space-around" width="100%">
          <Box>
            <Heading fontSize="36px" color="primary">Frontend</Heading>
            <Text fontSize="24px" color="text" margin="20px 0px">React</Text>
            <Text fontSize="24px" color="text" margin="10px 0px">Spectacle</Text>
            <Text fontSize="24px" color="text" margin="10px 0px">TypeScript</Text>
            <Text fontSize="24px" color="text" margin="10px 0px">Vite</Text>
          </Box>
          <Box>
            <Heading fontSize="36px" color="tertiary">Backend</Heading>
            <Text fontSize="24px" color="text" margin="20px 0px">FastAPI</Text>
            <Text fontSize="24px" color="text" margin="10px 0px">Python</Text>
            <Text fontSize="24px" color="text" margin="10px 0px">Playwright</Text>
          </Box>
        </FlexBox>
      </Slide>

      {/* Slide 4: Thank You */}
      <Slide backgroundColor="background">
        <FlexBox height="100%" flexDirection="column" justifyContent="center">
          <Heading margin="0px" fontSize="72px" color="primary">
            Thank You!
          </Heading>
          <Text margin="40px 0px 0px" fontSize="28px" color="text">
            Start creating your presentations
          </Text>
        </FlexBox>
      </Slide>
    </Deck>
  );
}

export default WelcomePresentation;
