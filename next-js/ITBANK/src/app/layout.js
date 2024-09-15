import { UserProvider } from "./context/UserContext";

export const metadata = {
  title: "ITBANK",
  description: "Aplicación de HomeBanking",
  favicon: "/favicon.png",
};

export default function RootLayout({ children }) {
  return (
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
  );
}
