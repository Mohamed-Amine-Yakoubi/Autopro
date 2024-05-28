import { Inter } from "next/font/google";
import "./globals.scss";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "./api/providers/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Autopro",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  
  return (
    <Providers>
      <html lang="en">
        <Head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
        </Head>
        <body className={inter.className}>
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </Providers>
  );
}
