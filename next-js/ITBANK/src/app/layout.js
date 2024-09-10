export const metadata = {
  title: "ITBANK",
  description: "Aplicación de HomeBanking",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
