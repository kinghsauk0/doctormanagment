"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "primereact/resources/themes/lara-light-cyan/theme.css";

import "./globals.css";

import 'primeicons/primeicons.css';


import { PrimeReactProvider } from 'primereact/api';
import useMobile from "./hooks/isMobileHook";

import TransitionEffect from "./components/TransitionEffect/TransitionEffect";
import { AppProvider } from "./context/AppProvider";
import { AuthProvider } from "./context/AuthProvider";
     

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMobile = useMobile();
  return (
    <html lang="en">
      <body className={inter.className}>
      <PrimeReactProvider>
        <AppProvider>
        <AuthProvider>
        {children}
        </AuthProvider>
        </AppProvider>
        </PrimeReactProvider>
        </body>
    </html>
  );
}
