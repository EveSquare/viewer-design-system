import { extendTheme } from "@chakra-ui/react";

// example theme
const theme = extendTheme({
  initialColorMode: 'light',
  semanticTokens: {
    colors: {
      primary: {
        default: "#5BB993",
        _dark: "#65CCA3",
      },
      secondary: {
        default: "#D9D9D9",
        _dark: "#515151",
      },
      bg: {
        default: "#FFFFFF",
        _dark: "#1C1C1C",
      },
    },
  },
  fonts: {
    body: "system-ui, sans-serif",
    heading: "Georgia, serif",
    mono: "Menlo, monospace",
  },
});

export default theme;
