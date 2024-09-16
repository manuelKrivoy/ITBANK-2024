import { UserProvider } from "./context/UserContext";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

export const metadata = {
  title: "ITBANK",
  description: "Aplicación de HomeBanking",
  favicon: "/favicon.ico",
};

export default function RootLayout({ children }) {
  return (
    <AppRouterCacheProvider>
      <html lang="en">
        <head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
          <link rel="icon" href={metadata.favicon} />
        </head>
        <body style={{ margin: 0, padding: 0, height: "100vh" }}>
          <UserProvider>{children}</UserProvider>
        </body>
      </html>
    </AppRouterCacheProvider>
  );
}
