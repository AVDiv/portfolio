import type { Metadata } from "next";
import { Sometype_Mono } from "next/font/google";
import "./globals.css";

import Head from "next/head";
import { AmplitudeProvider } from "../context";
import { LoaderProvider } from "../context/LoaderProvider";

const sometype_mono = Sometype_Mono({
  subsets: ["latin"],
  variable: "--font-sometype-mono",
  weight: "variable",
});


export const metadata: Metadata = {
  title: "Welcome | AVDiv's Portfolio",
  description: "Learn about Avin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </Head>
      <body className={` antialiased`}>
        <AmplitudeProvider>
          <LoaderProvider>
            {children}
          </LoaderProvider>
        </AmplitudeProvider>
      </body>
    </html>
  );
}
