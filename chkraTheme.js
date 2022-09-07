import { extendTheme } from "@chakra-ui/react";

// example theme
const theme = extendTheme({
  initialColorMode: 'dark',
  colors: {
    primary: {
      900: "#13502e",
      800: "#1c6c47",
      700: "#237c53",
      600: "#298c61",
      500: "#2e996d",
      400: "#3da97f",
      300: "#5BB993",
      200: "#88cdb1",
      100: "#b6e0cf",
      50: "#e1f3ec",
    },
  },
  semanticTokens: {
    colors: {
      primary: {
        default: "primary.300",
        _dark: "primary.300",
      },
      secondary: {
        default: "#D9D9D9",
        _dark: "#515151",
      },
      secondaryHover: {
        default: "#F2F9F6",
        _dark: "#424242",
      },
      bg: {
        default: "#FFFFFF",
        _dark: "#1C1C1C",
      },
      // Agents
      civilian: {
        default: "#52D714",
      },
      ambulance: {
        default: "#FFFFF0",
      },
      fire: {
        default: "#D71414",
      },
      police: {
        default: "#1462D7",
      }
    },
  },
  fonts: {
    body: "system-ui, sans-serif",
    heading: "system-ui, sans-serif",
    mono: "Menlo, monospace",
  },
});

export default theme;
