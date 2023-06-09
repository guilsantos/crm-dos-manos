"use client";
import { Children } from "react";
import Document from "next/document";
import { Inter } from "next/font/google";
import { CacheProvider } from "@emotion/react";
import createEmotionServer from "@emotion/server/create-instance";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import "simplebar-react/dist/simplebar.min.css";

import { darkTheme } from "@/theme/themes";
import { createEmotionCache } from "@/utils/create-emotion-cache";
import "../globals.css";

const clientSideEmotionCache = createEmotionCache();

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <CacheProvider value={clientSideEmotionCache}>
        <head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </head>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <body className={inter.className}>{children}</body>
        </ThemeProvider>
      </CacheProvider>
    </html>
  );
}
RootLayout.getInitialProps = async (ctx: any) => {
  const originalRenderPage = ctx.renderPage;
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) => (props: any) =>
        <App emotionCache={cache} {...props} />,
    });

  const initialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    styles: [...Children.toArray(initialProps.styles), ...emotionStyleTags],
  };
};
