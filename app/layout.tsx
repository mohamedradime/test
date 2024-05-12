import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import Footer from "@/components/Footer";
import "./globals.css";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "VEC.VC",
    description: "",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={rubik.className}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        minHeight: "100vh",
                    }}
                >
                    {/* <NavBar /> */}
                    <main
                        style={{
                            flexGrow: "1",
                        }}
                    >
                        {children}
                    </main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
