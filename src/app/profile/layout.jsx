"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "./style.css";
import React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

export default function RootLayout({ children }) {
  return (
    <AppRouterCacheProvider>
      <html lang="es">
        <body suppressHydrationWarning={true}>
          <div>{children}</div>
        </body>
      </html>
    </AppRouterCacheProvider>
  );
}
