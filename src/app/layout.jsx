import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import { ThemeProvider } from "../../context/ThemeContext";
import AuthProvider from "../../context/Authcontext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Gallery application",
  description: "Page description",
};

export default function RootLayout({ children , session}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
        <AuthProvider>
          <Navbar />
          {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
