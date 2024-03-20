import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col justify-center items-center`}>
        <div className="h-full w-[85%] sm:w-full flex justify-center items-center">
          <div className="h-auto w-auto sm:w-[400px] flex justify-start items-center flex-col pt-[20px] xl:pt-[60px]  2xl:pt-[180px]">

            <Link href="https://cloud.qencode.com/" target="_blank">
              <Image src="/logo.svg" alt="logo" width='178' height='32' className="mb-20" />
            </Link>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
