import '../../wdyr';
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import chkraTheme from "../../chkraTheme";
import { appWithTranslation } from 'next-i18next';

const theme = extendTheme(chkraTheme);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default appWithTranslation(MyApp);
