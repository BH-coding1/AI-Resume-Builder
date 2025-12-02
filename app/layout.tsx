import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { dark, neobrutalism, shadesOfPurple } from '@clerk/themes'
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ResuBuild",
  description: "Analyse your job resume with ai to improve overall ats score and get hired quicker",
   icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
    appearance={{
       signIn: {
          
          variables: { colorPrimary: 'purple' },
        },
         signUp: {
          
          variables: { colorPrimary: 'purple' },
        },
      }}>
    <html lang="en">
      <body 
      >
        <Navbar/>
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
