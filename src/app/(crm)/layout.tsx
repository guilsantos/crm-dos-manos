"use client";
import { Children } from "react";
import Document from "next/document";
import { Inter } from "next/font/google";
import { CacheProvider } from "@emotion/react";
import createEmotionServer from "@emotion/server/create-instance";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "simplebar-react/dist/simplebar.min.css";

import { Layout as DashboardLayout } from "@/layouts/dashboard/layout";
import { darkTheme } from "@/theme/themes";
import { createEmotionCache } from "@/utils/create-emotion-cache";
import "../globals.css";

const clientSideEmotionCache = createEmotionCache();

const inter = Inter({ subsets: ["latin"] });

const Favicon = () => (
  <>
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" href="/favicon.ico" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
  </>
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <CacheProvider value={clientSideEmotionCache}>
        <head>
          <title>CRM dos manos</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <Favicon />
        </head>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <body className={inter.className}>
              <DashboardLayout>{children}</DashboardLayout>
            </body>
          </ThemeProvider>
        </LocalizationProvider>
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
