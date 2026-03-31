import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar/Navbar";
import SyncfusionLicenceProvider from '../providers/SyncfusionLicenceProvider'
import { ModalProvider } from "@/context/ModalContext";
import CreateEventModal from "@/components/modals/CreateEventModal";
import QueryProvider from "../providers/QueryProvider";
import UpdateEventModal from "@/components/modals/UpdateEventModal"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Planify",
  description: "Planify event manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SyncfusionLicenceProvider>
          <QueryProvider>
            <ModalProvider>
              <div className="flex h-screen overflow-hidden">
                <Navbar></Navbar>
                <main className="flex-1 min-h-screen overflow-y-auto p-4 md:p-10">
                  {children}
                </main>
                <CreateEventModal />
                <UpdateEventModal/>
              </div>
            </ModalProvider>
          </QueryProvider>
        </SyncfusionLicenceProvider>
      </body>
    </html>
  );
}
