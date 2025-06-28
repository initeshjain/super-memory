import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// import {
//   ClerkProvider,
//   SignUp,
//   SignedIn,
//   SignedOut,
// } from '@clerk/nextjs'
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Super Memory",
  description: "Chat With Your Memories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <ClerkProvider>
    //   <html lang="en">
    //     <body
    //       className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    //     >
    //       <section>
    //         <SignedOut>
    //           <SignUp />
    //         </SignedOut>
    //       </section>
    //       <SignedIn>
    //         {children}
    //       </SignedIn>
    //     </body>
    //   </html>
    // </ClerkProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
