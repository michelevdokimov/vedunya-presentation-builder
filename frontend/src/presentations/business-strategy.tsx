import { Deck, Slide, Heading, Text, Box, FlexBox, UnorderedList, ListItem, Grid } from 'spectacle';

// Presentation metadata
export const metadata = {
  id: 'business-strategy',
  title: 'Business Strategy 2025',
  description: 'Strategic planning presentation with charts and data visualization',
  createdAt: '2025-12-10',
  updatedAt: '2025-12-10',
};

// Professional business theme
const theme = {
  size: {
    width: 1920,
    height: 1080,
  },
  colors: {
    primary: '#0ea5e9',
    secondary: '#0284c7',
    tertiary: '#0369a1',
    background: '#0f172a',
    surface: '#1e293b',
    text: '#f1f5f9',
    accent: '#38bdf8',
  },
  fonts: {
    header: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
    text: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
  },
  fontSizes: {
    h1: '64px',
    h2: '48px',
    h3: '36px',
    text: '24px',
  },
};

function BusinessStrategyPresentation() {
  return (
    <Deck theme={theme}>
      {/* Slide 1: Title */}
      <Slide backgroundColor="background">
        <FlexBox height="100%" flexDirection="column" justifyContent="center">
          <Heading margin="0px" fontSize="64px" color="primary">
            Business Strategy 2025
          </Heading>
          <Heading margin="20px 0px 0px" fontSize="36px" color="secondary">
            Growth & Innovation Roadmap
          </Heading>
          <Text margin="40px 0px 0px" fontSize="20px" color="text" style={{ opacity: 0.7 }}>
            Confidential • Strategic Planning Session
          </Text>
        </FlexBox>
      </Slide>

      {/* Slide 2: Executive Summary */}
      <Slide backgroundColor="background">
        <Heading margin="0px 0px 40px" fontSize="48px" color="primary">
          Executive Summary
        </Heading>
        <Grid
          gridTemplateColumns="1fr 1fr"
          gridGap="40px"
          padding="0px 60px"
        >
          <Box>
            <Heading fontSize="28px" color="accent" margin="0px 0px 20px">
              Revenue Growth
            </Heading>
            <Text fontSize="56px" color="primary" margin="0px 0px 10px" style={{ fontWeight: 'bold' }}>
              +42%
            </Text>
            <Text fontSize="20px" color="text" style={{ opacity: 0.8 }}>
              Year-over-year increase
            </Text>
          </Box>
          <Box>
            <Heading fontSize="28px" color="accent" margin="0px 0px 20px">
              Market Share
            </Heading>
            <Text fontSize="56px" color="primary" margin="0px 0px 10px" style={{ fontWeight: 'bold' }}>
              23%
            </Text>
            <Text fontSize="20px" color="text" style={{ opacity: 0.8 }}>
              Industry leading position
            </Text>
          </Box>
          <Box>
            <Heading fontSize="28px" color="accent" margin="0px 0px 20px">
              Customer Base
            </Heading>
            <Text fontSize="56px" color="primary" margin="0px 0px 10px" style={{ fontWeight: 'bold' }}>
              10K+
            </Text>
            <Text fontSize="20px" color="text" style={{ opacity: 0.8 }}>
              Active enterprise clients
            </Text>
          </Box>
          <Box>
            <Heading fontSize="28px" color="accent" margin="0px 0px 20px">
              Team Size
            </Heading>
            <Text fontSize="56px" color="primary" margin="0px 0px 10px" style={{ fontWeight: 'bold' }}>
              250+
            </Text>
            <Text fontSize="20px" color="text" style={{ opacity: 0.8 }}>
              Global professionals
            </Text>
          </Box>
        </Grid>
      </Slide>

      {/* Slide 3: Strategic Priorities */}
      <Slide backgroundColor="background">
        <Heading margin="0px 0px 50px" fontSize="48px" color="primary">
          Strategic Priorities
        </Heading>
        <FlexBox flexDirection="column" alignItems="stretch" padding="0px 80px">
          <Box
            backgroundColor="surface"
            padding="25px 40px"
            margin="10px 0px"
            style={{ borderLeft: '5px solid #0ea5e9', borderRadius: '8px' }}
          >
            <Heading fontSize="32px" color="accent" margin="0px 0px 10px">
              1. Product Innovation
            </Heading>
            <Text fontSize="22px" color="text" style={{ opacity: 0.9 }}>
              Launch next-generation AI-powered features
            </Text>
          </Box>
          <Box
            backgroundColor="surface"
            padding="25px 40px"
            margin="10px 0px"
            style={{ borderLeft: '5px solid #0284c7', borderRadius: '8px' }}
          >
            <Heading fontSize="32px" color="accent" margin="0px 0px 10px">
              2. Market Expansion
            </Heading>
            <Text fontSize="22px" color="text" style={{ opacity: 0.9 }}>
              Enter 5 new geographic markets
            </Text>
          </Box>
          <Box
            backgroundColor="surface"
            padding="25px 40px"
            margin="10px 0px"
            style={{ borderLeft: '5px solid #0369a1', borderRadius: '8px' }}
          >
            <Heading fontSize="32px" color="accent" margin="0px 0px 10px">
              3. Customer Success
            </Heading>
            <Text fontSize="22px" color="text" style={{ opacity: 0.9 }}>
              Achieve 95%+ customer retention rate
            </Text>
          </Box>
        </FlexBox>
      </Slide>

      {/* Slide 4: Q1-Q4 Roadmap */}
      <Slide backgroundColor="background">
        <Heading margin="0px 0px 40px" fontSize="48px" color="primary">
          2025 Roadmap
        </Heading>
        <Grid
          gridTemplateColumns="repeat(4, 1fr)"
          gridGap="20px"
          padding="0px 40px"
        >
          <Box backgroundColor="surface" padding="30px 20px" style={{ borderRadius: '8px' }}>
            <Heading fontSize="24px" color="primary" margin="0px 0px 20px">
              Q1
            </Heading>
            <UnorderedList style={{ fontSize: '18px', lineHeight: '1.8' }}>
              <ListItem>Product launch</ListItem>
              <ListItem>Team hiring</ListItem>
              <ListItem>Beta testing</ListItem>
            </UnorderedList>
          </Box>
          <Box backgroundColor="surface" padding="30px 20px" style={{ borderRadius: '8px' }}>
            <Heading fontSize="24px" color="secondary" margin="0px 0px 20px">
              Q2
            </Heading>
            <UnorderedList style={{ fontSize: '18px', lineHeight: '1.8' }}>
              <ListItem>Market entry</ListItem>
              <ListItem>Partnership</ListItem>
              <ListItem>Scale ops</ListItem>
            </UnorderedList>
          </Box>
          <Box backgroundColor="surface" padding="30px 20px" style={{ borderRadius: '8px' }}>
            <Heading fontSize="24px" color="tertiary" margin="0px 0px 20px">
              Q3
            </Heading>
            <UnorderedList style={{ fontSize: '18px', lineHeight: '1.8' }}>
              <ListItem>Feature v2.0</ListItem>
              <ListItem>Expansion</ListItem>
              <ListItem>Analytics</ListItem>
            </UnorderedList>
          </Box>
          <Box backgroundColor="surface" padding="30px 20px" style={{ borderRadius: '8px' }}>
            <Heading fontSize="24px" color="accent" margin="0px 0px 20px">
              Q4
            </Heading>
            <UnorderedList style={{ fontSize: '18px', lineHeight: '1.8' }}>
              <ListItem>Year review</ListItem>
              <ListItem>Optimization</ListItem>
              <ListItem>2026 plan</ListItem>
            </UnorderedList>
          </Box>
        </Grid>
      </Slide>

      {/* Slide 5: Investment Areas */}
      <Slide backgroundColor="background">
        <Heading margin="0px 0px 50px" fontSize="48px" color="primary">
          Investment Allocation
        </Heading>
        <FlexBox flexDirection="column" padding="0px 100px">
          <Box margin="20px 0px">
            <FlexBox justifyContent="space-between" margin="0px 0px 10px">
              <Text fontSize="24px" color="text">R&D & Product</Text>
              <Text fontSize="24px" color="primary" style={{ fontWeight: 'bold' }}>
                40%
              </Text>
            </FlexBox>
            <Box
              backgroundColor="surface"
              height="30px"
              style={{ borderRadius: '15px', overflow: 'hidden' }}
            >
              <Box
                backgroundColor="primary"
                height="100%"
                width="40%"
                style={{ transition: 'width 1s' }}
              />
            </Box>
          </Box>
          <Box margin="20px 0px">
            <FlexBox justifyContent="space-between" margin="0px 0px 10px">
              <Text fontSize="24px" color="text">Sales & Marketing</Text>
              <Text fontSize="24px" color="secondary" style={{ fontWeight: 'bold' }}>
                30%
              </Text>
            </FlexBox>
            <Box
              backgroundColor="surface"
              height="30px"
              style={{ borderRadius: '15px', overflow: 'hidden' }}
            >
              <Box
                backgroundColor="secondary"
                height="100%"
                width="30%"
                style={{ transition: 'width 1s' }}
              />
            </Box>
          </Box>
          <Box margin="20px 0px">
            <FlexBox justifyContent="space-between" margin="0px 0px 10px">
              <Text fontSize="24px" color="text">Operations</Text>
              <Text fontSize="24px" color="tertiary" style={{ fontWeight: 'bold' }}>
                20%
              </Text>
            </FlexBox>
            <Box
              backgroundColor="surface"
              height="30px"
              style={{ borderRadius: '15px', overflow: 'hidden' }}
            >
              <Box
                backgroundColor="tertiary"
                height="100%"
                width="20%"
                style={{ transition: 'width 1s' }}
              />
            </Box>
          </Box>
          <Box margin="20px 0px">
            <FlexBox justifyContent="space-between" margin="0px 0px 10px">
              <Text fontSize="24px" color="text">Infrastructure</Text>
              <Text fontSize="24px" color="accent" style={{ fontWeight: 'bold' }}>
                10%
              </Text>
            </FlexBox>
            <Box
              backgroundColor="surface"
              height="30px"
              style={{ borderRadius: '15px', overflow: 'hidden' }}
            >
              <Box
                backgroundColor="accent"
                height="100%"
                width="10%"
                style={{ transition: 'width 1s' }}
              />
            </Box>
          </Box>
        </FlexBox>
      </Slide>

      {/* Slide 6: Next Steps */}
      <Slide backgroundColor="background">
        <FlexBox height="100%" flexDirection="column" justifyContent="center">
          <Heading margin="0px 0px 40px" fontSize="56px" color="primary">
            Next Steps
          </Heading>
          <FlexBox flexDirection="column" alignItems="flex-start" padding="0px 120px">
            <Text fontSize="28px" color="text" margin="15px 0px">
              ✓ Review and approve strategic plan
            </Text>
            <Text fontSize="28px" color="text" margin="15px 0px">
              ✓ Align team on quarterly objectives
            </Text>
            <Text fontSize="28px" color="text" margin="15px 0px">
              ✓ Establish KPIs and tracking metrics
            </Text>
            <Text fontSize="28px" color="text" margin="15px 0px">
              ✓ Initiate Q1 execution planning
            </Text>
          </FlexBox>
        </FlexBox>
      </Slide>

      {/* Slide 7: Thank You */}
      <Slide backgroundColor="background">
        <FlexBox height="100%" flexDirection="column" justifyContent="center">
          <Heading margin="0px" fontSize="72px" color="primary">
            Questions?
          </Heading>
          <Text margin="40px 0px 0px" fontSize="28px" color="text" style={{ opacity: 0.8 }}>
            Strategic Planning Team • 2025
          </Text>
        </FlexBox>
      </Slide>
    </Deck>
  );
}

export default BusinessStrategyPresentation;
