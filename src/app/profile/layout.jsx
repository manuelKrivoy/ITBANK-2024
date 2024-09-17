"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "./style.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import Footer from "@/app/components/Footer";

export default function RootLayout({ children }) {
  return (

      <html lang="es">
            <AppRouterCacheProvider>
        <body suppressHydrationWarning={true}>
        <div >{children}</div>
        <Footer />
        </body>
        </AppRouterCacheProvider>
      </html>

  );
}
