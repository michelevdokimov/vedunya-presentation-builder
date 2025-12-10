import { Deck, Slide, Heading, Text, Box, FlexBox, CodeSpan, UnorderedList, ListItem } from 'spectacle';

// Presentation metadata
export const metadata = {
  id: 'tech-conference',
  title: 'Modern Web Development',
  description: 'Technical conference presentation about web technologies',
  createdAt: '2025-12-10',
  updatedAt: '2025-12-10',
};

// Tech conference theme (dark mode with code aesthetics)
const theme = {
  size: {
    width: 1920,
    height: 1080,
  },
  colors: {
    primary: '#a78bfa',
    secondary: '#818cf8',
    tertiary: '#c084fc',
    background: '#0f0f23',
    surface: '#1a1a2e',
    text: '#e0e7ff',
    code: '#fbbf24',
    success: '#34d399',
  },
  fonts: {
    header: '"JetBrains Mono", "Fira Code", monospace',
    text: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
    code: '"JetBrains Mono", "Fira Code", "Courier New", monospace',
  },
  fontSizes: {
    h1: '68px',
    h2: '48px',
    h3: '36px',
    text: '24px',
    code: '20px',
  },
};

function TechConferencePresentation() {
  return (
    <Deck theme={theme}>
      {/* Slide 1: Title */}
      <Slide backgroundColor="background">
        <FlexBox height="100%" flexDirection="column" justifyContent="center">
          <Box
            padding="40px 60px"
            style={{ border: '3px solid #a78bfa', borderRadius: '12px' }}
          >
            <Heading margin="0px" fontSize="68px" color="primary" fontFamily="JetBrains Mono, monospace">
              {'<Modern />'}
            </Heading>
            <Heading margin="20px 0px 0px" fontSize="48px" color="secondary" fontFamily="JetBrains Mono, monospace">
              Web Development
            </Heading>
          </Box>
          <Text margin="40px 0px 0px" fontSize="24px" color="text" style={{ opacity: 0.7 }}>
            React • TypeScript • Performance
          </Text>
          <Text margin="10px 0px 0px" fontSize="20px" color="code" fontFamily="JetBrains Mono, monospace">
            TechConf 2025 • @developer
          </Text>
        </FlexBox>
      </Slide>

      {/* Slide 2: Agenda */}
      <Slide backgroundColor="background">
        <Heading margin="0px 0px 50px" fontSize="48px" color="primary" fontFamily="JetBrains Mono, monospace">
          {'// Agenda'}
        </Heading>
        <FlexBox flexDirection="column" alignItems="stretch" padding="0px 100px">
          <Box margin="15px 0px">
            <CodeSpan fontSize="28px" style={{ color: '#fbbf24' }}>
              1.
            </CodeSpan>
            <Text
              fontSize="28px"
              color="text"
              margin="0px 0px 0px 20px"
              style={{ display: 'inline' }}
            >
              Modern React Patterns
            </Text>
          </Box>
          <Box margin="15px 0px">
            <CodeSpan fontSize="28px" style={{ color: '#fbbf24' }}>
              2.
            </CodeSpan>
            <Text
              fontSize="28px"
              color="text"
              margin="0px 0px 0px 20px"
              style={{ display: 'inline' }}
            >
              TypeScript Best Practices
            </Text>
          </Box>
          <Box margin="15px 0px">
            <CodeSpan fontSize="28px" style={{ color: '#fbbf24' }}>
              3.
            </CodeSpan>
            <Text
              fontSize="28px"
              color="text"
              margin="0px 0px 0px 20px"
              style={{ display: 'inline' }}
            >
              Performance Optimization
            </Text>
          </Box>
          <Box margin="15px 0px">
            <CodeSpan fontSize="28px" style={{ color: '#fbbf24' }}>
              4.
            </CodeSpan>
            <Text
              fontSize="28px"
              color="text"
              margin="0px 0px 0px 20px"
              style={{ display: 'inline' }}
            >
              Build Tools & Workflow
            </Text>
          </Box>
        </FlexBox>
      </Slide>

      {/* Slide 3: React Patterns */}
      <Slide backgroundColor="background">
        <Heading margin="0px 0px 40px" fontSize="48px" color="primary" fontFamily="JetBrains Mono, monospace">
          React Patterns
        </Heading>
        <Box
          backgroundColor="surface"
          padding="40px"
          style={{ borderRadius: '12px', border: '2px solid #a78bfa' }}
        >
          <pre style={{ margin: 0, fontSize: '22px', lineHeight: '1.6', color: '#e0e7ff' }}>
            <code>
              {`// Server Components + Hooks
import { use } from 'react';

function DataDisplay({ promise }) {
  const data = use(promise);

  return (
    <div>
      <h2>{data.title}</h2>
      <p>{data.content}</p>
    </div>
  );
}`}
            </code>
          </pre>
        </Box>
        <Text margin="30px 0px 0px" fontSize="22px" color="success" textAlign="center">
          ✓ Server-side rendering • ✓ Suspense boundaries • ✓ Parallel data fetching
        </Text>
      </Slide>

      {/* Slide 4: TypeScript */}
      <Slide backgroundColor="background">
        <Heading margin="0px 0px 40px" fontSize="48px" color="secondary" fontFamily="JetBrains Mono, monospace">
          TypeScript Power
        </Heading>
        <Box
          backgroundColor="surface"
          padding="40px"
          style={{ borderRadius: '12px', border: '2px solid #818cf8' }}
        >
          <pre style={{ margin: 0, fontSize: '22px', lineHeight: '1.6', color: '#e0e7ff' }}>
            <code>
              {`// Type-safe API calls
type ApiResponse<T> = {
  data: T;
  status: number;
  error?: string;
};

async function fetchData<T>(
  url: string
): Promise<ApiResponse<T>> {
  const response = await fetch(url);
  return response.json();
}`}
            </code>
          </pre>
        </Box>
        <Text margin="30px 0px 0px" fontSize="22px" color="success" textAlign="center">
          ✓ Type inference • ✓ Generic constraints • ✓ Compile-time safety
        </Text>
      </Slide>

      {/* Slide 5: Performance Tips */}
      <Slide backgroundColor="background">
        <Heading margin="0px 0px 40px" fontSize="48px" color="tertiary" fontFamily="JetBrains Mono, monospace">
          Performance 101
        </Heading>
        <FlexBox flexDirection="column" alignItems="stretch" padding="0px 80px">
          <Box
            backgroundColor="surface"
            padding="30px 40px"
            margin="12px 0px"
            style={{ borderLeft: '5px solid #a78bfa', borderRadius: '8px' }}
          >
            <Heading fontSize="28px" color="code" margin="0px 0px 10px" fontFamily="JetBrains Mono, monospace">
              Code Splitting
            </Heading>
            <Text fontSize="22px" color="text" style={{ opacity: 0.9 }}>
              <CodeSpan>React.lazy()</CodeSpan> + <CodeSpan>Suspense</CodeSpan> for route-based splitting
            </Text>
          </Box>
          <Box
            backgroundColor="surface"
            padding="30px 40px"
            margin="12px 0px"
            style={{ borderLeft: '5px solid #818cf8', borderRadius: '8px' }}
          >
            <Heading fontSize="28px" color="code" margin="0px 0px 10px" fontFamily="JetBrains Mono, monospace">
              Memoization
            </Heading>
            <Text fontSize="22px" color="text" style={{ opacity: 0.9 }}>
              <CodeSpan>useMemo</CodeSpan> for expensive calculations, <CodeSpan>useCallback</CodeSpan> for stable refs
            </Text>
          </Box>
          <Box
            backgroundColor="surface"
            padding="30px 40px"
            margin="12px 0px"
            style={{ borderLeft: '5px solid #c084fc', borderRadius: '8px' }}
          >
            <Heading fontSize="28px" color="code" margin="0px 0px 10px" fontFamily="JetBrains Mono, monospace">
              Virtual Scrolling
            </Heading>
            <Text fontSize="22px" color="text" style={{ opacity: 0.9 }}>
              Render only visible items for large lists (react-window)
            </Text>
          </Box>
        </FlexBox>
      </Slide>

      {/* Slide 6: Build Tools */}
      <Slide backgroundColor="background">
        <Heading margin="0px 0px 40px" fontSize="48px" color="primary" fontFamily="JetBrains Mono, monospace">
          Modern Build Tools
        </Heading>
        <FlexBox justifyContent="space-around" width="100%" padding="0px 60px">
          <Box textAlign="center">
            <Box
              backgroundColor="surface"
              padding="40px"
              style={{ borderRadius: '12px', border: '3px solid #a78bfa' }}
            >
              <Heading fontSize="48px" color="primary" fontFamily="JetBrains Mono, monospace">
                Vite
              </Heading>
            </Box>
            <Text fontSize="22px" color="text" margin="20px 0px 0px">
              ⚡ Instant HMR
            </Text>
            <Text fontSize="22px" color="text" margin="10px 0px 0px">
              📦 Optimized builds
            </Text>
          </Box>
          <Box textAlign="center">
            <Box
              backgroundColor="surface"
              padding="40px"
              style={{ borderRadius: '12px', border: '3px solid #818cf8' }}
            >
              <Heading fontSize="48px" color="secondary" fontFamily="JetBrains Mono, monospace">
                Turbo
              </Heading>
            </Box>
            <Text fontSize="22px" color="text" margin="20px 0px 0px">
              🚀 Incremental builds
            </Text>
            <Text fontSize="22px" color="text" margin="10px 0px 0px">
              🔄 Smart caching
            </Text>
          </Box>
          <Box textAlign="center">
            <Box
              backgroundColor="surface"
              padding="40px"
              style={{ borderRadius: '12px', border: '3px solid #c084fc' }}
            >
              <Heading fontSize="48px" color="tertiary" fontFamily="JetBrains Mono, monospace">
                esbuild
              </Heading>
            </Box>
            <Text fontSize="22px" color="text" margin="20px 0px 0px">
              ⚡ 100x faster
            </Text>
            <Text fontSize="22px" color="text" margin="10px 0px 0px">
              🎯 Go-powered
            </Text>
          </Box>
        </FlexBox>
      </Slide>

      {/* Slide 7: Key Takeaways */}
      <Slide backgroundColor="background">
        <Heading margin="0px 0px 40px" fontSize="48px" color="primary" fontFamily="JetBrains Mono, monospace">
          {'// Key Takeaways'}
        </Heading>
        <FlexBox flexDirection="column" alignItems="flex-start" padding="0px 100px">
          <UnorderedList style={{ fontSize: '28px', lineHeight: '1.8', color: '#e0e7ff' }}>
            <ListItem margin="15px 0px">
              Embrace server components for better performance
            </ListItem>
            <ListItem margin="15px 0px">
              TypeScript = fewer bugs, better DX
            </ListItem>
            <ListItem margin="15px 0px">
              Measure first, optimize second
            </ListItem>
            <ListItem margin="15px 0px">
              Modern tools make dev experience amazing
            </ListItem>
            <ListItem margin="15px 0px">
              Community and ecosystem matter
            </ListItem>
          </UnorderedList>
        </FlexBox>
      </Slide>

      {/* Slide 8: Thank You */}
      <Slide backgroundColor="background">
        <FlexBox height="100%" flexDirection="column" justifyContent="center">
          <Box
            padding="50px 80px"
            style={{ border: '3px solid #a78bfa', borderRadius: '12px' }}
          >
            <Heading margin="0px" fontSize="72px" color="primary" fontFamily="JetBrains Mono, monospace">
              {'</Thanks>'}
            </Heading>
          </Box>
          <Text margin="40px 0px 20px" fontSize="28px" color="text">
            Questions? Let's discuss!
          </Text>
          <Text fontSize="22px" color="code" fontFamily="JetBrains Mono, monospace">
            github.com/developer • @developer
          </Text>
        </FlexBox>
      </Slide>
    </Deck>
  );
}

export default TechConferencePresentation;
