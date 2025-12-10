import { Deck, Slide, Heading, Text, Box, FlexBox, Grid, UnorderedList, ListItem } from 'spectacle';

// Presentation metadata
export const metadata = {
  id: 'product-launch',
  title: 'Product Launch Event',
  description: 'Marketing presentation for new product announcement',
  slideCount: 8,
  createdAt: '2025-12-10',
  updatedAt: '2025-12-10',
};

// Product launch theme (vibrant and engaging)
const theme = {
  size: {
    width: 1920,
    height: 1080,
  },
  colors: {
    primary: '#f97316',
    secondary: '#fb923c',
    tertiary: '#fdba74',
    background: '#18181b',
    surface: '#27272a',
    text: '#fafafa',
    accent: '#ff6b35',
    success: '#10b981',
  },
  fonts: {
    header: '"Poppins", "Helvetica Neue", Helvetica, Arial, sans-serif',
    text: '"Poppins", "Helvetica Neue", Helvetica, Arial, sans-serif',
  },
  fontSizes: {
    h1: '72px',
    h2: '52px',
    h3: '38px',
    text: '26px',
  },
};

function ProductLaunchPresentation() {
  return (
    <Deck theme={theme}>
      {/* Slide 1: Title */}
      <Slide backgroundColor="background">
        <FlexBox height="100%" flexDirection="column" justifyContent="center">
          <Text fontSize="32px" color="accent" margin="0px 0px 20px" style={{ fontWeight: 'bold', letterSpacing: '3px' }}>
            INTRODUCING
          </Text>
          <Heading margin="0px" fontSize="80px" color="primary" style={{ fontWeight: 'bold' }}>
            Nova X
          </Heading>
          <Heading margin="15px 0px 0px" fontSize="42px" color="secondary">
            The Future of Innovation
          </Heading>
          <Text margin="40px 0px 0px" fontSize="24px" color="text" style={{ opacity: 0.8 }}>
            Launch Event • December 2025
          </Text>
        </FlexBox>
      </Slide>

      {/* Slide 2: The Problem */}
      <Slide backgroundColor="background">
        <Heading margin="0px 0px 50px" fontSize="52px" color="primary">
          The Challenge
        </Heading>
        <FlexBox flexDirection="column" alignItems="stretch" padding="0px 80px">
          <Box
            backgroundColor="surface"
            padding="35px 50px"
            margin="15px 0px"
            style={{
              borderRadius: '16px',
              boxShadow: '0 10px 40px rgba(249, 115, 22, 0.2)',
            }}
          >
            <Text fontSize="32px" color="text" style={{ fontWeight: '600' }}>
              😓 Complexity Overload
            </Text>
            <Text fontSize="24px" color="text" margin="15px 0px 0px" style={{ opacity: 0.8 }}>
              Current solutions are too complicated and hard to use
            </Text>
          </Box>
          <Box
            backgroundColor="surface"
            padding="35px 50px"
            margin="15px 0px"
            style={{
              borderRadius: '16px',
              boxShadow: '0 10px 40px rgba(249, 115, 22, 0.2)',
            }}
          >
            <Text fontSize="32px" color="text" style={{ fontWeight: '600' }}>
              ⏰ Time Consuming
            </Text>
            <Text fontSize="24px" color="text" margin="15px 0px 0px" style={{ opacity: 0.8 }}>
              Tasks that should take minutes take hours
            </Text>
          </Box>
          <Box
            backgroundColor="surface"
            padding="35px 50px"
            margin="15px 0px"
            style={{
              borderRadius: '16px',
              boxShadow: '0 10px 40px rgba(249, 115, 22, 0.2)',
            }}
          >
            <Text fontSize="32px" color="text" style={{ fontWeight: '600' }}>
              💸 Expensive Solutions
            </Text>
            <Text fontSize="24px" color="text" margin="15px 0px 0px" style={{ opacity: 0.8 }}>
              Existing tools cost too much for small teams
            </Text>
          </Box>
        </FlexBox>
      </Slide>

      {/* Slide 3: The Solution */}
      <Slide backgroundColor="background">
        <FlexBox height="100%" flexDirection="column" justifyContent="center">
          <Heading margin="0px 0px 40px" fontSize="56px" color="primary">
            Meet Nova X
          </Heading>
          <Text fontSize="36px" color="text" textAlign="center" lineHeight="1.6" padding="0px 100px">
            A revolutionary platform that combines{' '}
            <span style={{ color: '#f97316', fontWeight: 'bold' }}>simplicity</span>,{' '}
            <span style={{ color: '#fb923c', fontWeight: 'bold' }}>speed</span>, and{' '}
            <span style={{ color: '#fdba74', fontWeight: 'bold' }}>affordability</span>{' '}
            in one beautiful package
          </Text>
        </FlexBox>
      </Slide>

      {/* Slide 4: Features */}
      <Slide backgroundColor="background">
        <Heading margin="0px 0px 40px" fontSize="52px" color="primary">
          Key Features
        </Heading>
        <Grid gridTemplateColumns="1fr 1fr" gridGap="30px" padding="0px 60px">
          <Box
            backgroundColor="surface"
            padding="40px"
            style={{
              borderRadius: '16px',
              border: '3px solid #f97316',
            }}
          >
            <Text fontSize="56px" margin="0px 0px 20px">⚡</Text>
            <Heading fontSize="32px" color="primary" margin="0px 0px 15px">
              Lightning Fast
            </Heading>
            <Text fontSize="22px" color="text" style={{ opacity: 0.9, lineHeight: '1.5' }}>
              10x faster than competitors with instant results
            </Text>
          </Box>
          <Box
            backgroundColor="surface"
            padding="40px"
            style={{
              borderRadius: '16px',
              border: '3px solid #fb923c',
            }}
          >
            <Text fontSize="56px" margin="0px 0px 20px">🎨</Text>
            <Heading fontSize="32px" color="secondary" margin="0px 0px 15px">
              Beautiful Design
            </Heading>
            <Text fontSize="22px" color="text" style={{ opacity: 0.9, lineHeight: '1.5' }}>
              Intuitive interface that everyone loves to use
            </Text>
          </Box>
          <Box
            backgroundColor="surface"
            padding="40px"
            style={{
              borderRadius: '16px',
              border: '3px solid #fdba74',
            }}
          >
            <Text fontSize="56px" margin="0px 0px 20px">🤖</Text>
            <Heading fontSize="32px" color="tertiary" margin="0px 0px 15px">
              AI-Powered
            </Heading>
            <Text fontSize="22px" color="text" style={{ opacity: 0.9, lineHeight: '1.5' }}>
              Smart automation that learns from your workflow
            </Text>
          </Box>
          <Box
            backgroundColor="surface"
            padding="40px"
            style={{
              borderRadius: '16px',
              border: '3px solid #ff6b35',
            }}
          >
            <Text fontSize="56px" margin="0px 0px 20px">🔒</Text>
            <Heading fontSize="32px" color="accent" margin="0px 0px 15px">
              Secure & Private
            </Heading>
            <Text fontSize="22px" color="text" style={{ opacity: 0.9, lineHeight: '1.5' }}>
              Enterprise-grade security for your data
            </Text>
          </Box>
        </Grid>
      </Slide>

      {/* Slide 5: Benefits */}
      <Slide backgroundColor="background">
        <Heading margin="0px 0px 50px" fontSize="52px" color="primary">
          Why Choose Nova X?
        </Heading>
        <FlexBox flexDirection="column" alignItems="flex-start" padding="0px 100px">
          <UnorderedList style={{ fontSize: '30px', lineHeight: '1.8', color: '#fafafa' }}>
            <ListItem margin="20px 0px">
              <span style={{ color: '#10b981', fontWeight: 'bold' }}>Save 80% of your time</span> on repetitive tasks
            </ListItem>
            <ListItem margin="20px 0px">
              <span style={{ color: '#10b981', fontWeight: 'bold' }}>Reduce costs by 60%</span> compared to alternatives
            </ListItem>
            <ListItem margin="20px 0px">
              <span style={{ color: '#10b981', fontWeight: 'bold' }}>Increase productivity by 3x</span> with smart features
            </ListItem>
            <ListItem margin="20px 0px">
              <span style={{ color: '#10b981', fontWeight: 'bold' }}>Scale effortlessly</span> from 1 to 10,000 users
            </ListItem>
          </UnorderedList>
        </FlexBox>
      </Slide>

      {/* Slide 6: Pricing */}
      <Slide backgroundColor="background">
        <Heading margin="0px 0px 50px" fontSize="52px" color="primary">
          Simple Pricing
        </Heading>
        <Grid gridTemplateColumns="repeat(3, 1fr)" gridGap="30px" padding="0px 40px">
          <Box
            backgroundColor="surface"
            padding="40px 30px"
            style={{
              borderRadius: '16px',
              border: '2px solid #52525b',
            }}
          >
            <Heading fontSize="28px" color="text" margin="0px 0px 20px">
              Starter
            </Heading>
            <Text fontSize="56px" color="primary" margin="0px" style={{ fontWeight: 'bold' }}>
              $29
            </Text>
            <Text fontSize="20px" color="text" margin="5px 0px 30px" style={{ opacity: 0.7 }}>
              per month
            </Text>
            <UnorderedList style={{ fontSize: '18px', lineHeight: '1.8' }}>
              <ListItem>5 projects</ListItem>
              <ListItem>10 GB storage</ListItem>
              <ListItem>Email support</ListItem>
            </UnorderedList>
          </Box>
          <Box
            backgroundColor="surface"
            padding="40px 30px"
            style={{
              borderRadius: '16px',
              border: '3px solid #f97316',
              transform: 'scale(1.05)',
              boxShadow: '0 20px 60px rgba(249, 115, 22, 0.3)',
            }}
          >
            <Text
              fontSize="18px"
              color="accent"
              margin="0px 0px 10px"
              style={{ fontWeight: 'bold', letterSpacing: '2px' }}
            >
              POPULAR
            </Text>
            <Heading fontSize="28px" color="primary" margin="0px 0px 20px">
              Professional
            </Heading>
            <Text fontSize="56px" color="primary" margin="0px" style={{ fontWeight: 'bold' }}>
              $99
            </Text>
            <Text fontSize="20px" color="text" margin="5px 0px 30px" style={{ opacity: 0.7 }}>
              per month
            </Text>
            <UnorderedList style={{ fontSize: '18px', lineHeight: '1.8' }}>
              <ListItem>Unlimited projects</ListItem>
              <ListItem>100 GB storage</ListItem>
              <ListItem>Priority support</ListItem>
              <ListItem>Advanced AI</ListItem>
            </UnorderedList>
          </Box>
          <Box
            backgroundColor="surface"
            padding="40px 30px"
            style={{
              borderRadius: '16px',
              border: '2px solid #52525b',
            }}
          >
            <Heading fontSize="28px" color="text" margin="0px 0px 20px">
              Enterprise
            </Heading>
            <Text fontSize="56px" color="primary" margin="0px" style={{ fontWeight: 'bold' }}>
              Custom
            </Text>
            <Text fontSize="20px" color="text" margin="5px 0px 30px" style={{ opacity: 0.7 }}>
              contact us
            </Text>
            <UnorderedList style={{ fontSize: '18px', lineHeight: '1.8' }}>
              <ListItem>Unlimited everything</ListItem>
              <ListItem>Custom storage</ListItem>
              <ListItem>24/7 support</ListItem>
              <ListItem>On-premise option</ListItem>
            </UnorderedList>
          </Box>
        </Grid>
      </Slide>

      {/* Slide 7: Call to Action */}
      <Slide backgroundColor="background">
        <FlexBox height="100%" flexDirection="column" justifyContent="center">
          <Heading margin="0px 0px 40px" fontSize="64px" color="primary">
            Get Started Today
          </Heading>
          <Text fontSize="32px" color="text" margin="0px 0px 50px" style={{ opacity: 0.9 }}>
            Join thousands of happy customers
          </Text>
          <Box
            backgroundColor="primary"
            padding="25px 80px"
            style={{
              borderRadius: '50px',
              cursor: 'pointer',
              boxShadow: '0 20px 60px rgba(249, 115, 22, 0.4)',
            }}
          >
            <Text fontSize="32px" color="background" style={{ fontWeight: 'bold' }}>
              Start Free Trial →
            </Text>
          </Box>
          <Text fontSize="22px" color="text" margin="30px 0px 0px" style={{ opacity: 0.6 }}>
            No credit card required • 14 days free
          </Text>
        </FlexBox>
      </Slide>

      {/* Slide 8: Thank You */}
      <Slide backgroundColor="background">
        <FlexBox height="100%" flexDirection="column" justifyContent="center">
          <Heading margin="0px" fontSize="80px" color="primary">
            Thank You!
          </Heading>
          <Text margin="40px 0px 0px" fontSize="32px" color="text">
            Questions? We're here to help.
          </Text>
          <Text margin="30px 0px 0px" fontSize="26px" color="accent" style={{ fontWeight: 'bold' }}>
            hello@novax.com • @novax
          </Text>
        </FlexBox>
      </Slide>
    </Deck>
  );
}

export default ProductLaunchPresentation;
