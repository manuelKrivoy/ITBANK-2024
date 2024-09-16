"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "./style.css";
import { UserProvider } from "../context/UserContext";
import React from "react";

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body suppressHydrationWarning={true}>
        <div>
          <UserProvider>{children}</UserProvider>
        </div>
      </body>
    </html>
  );
}
