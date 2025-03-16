import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Nav from '@/components/Nav/Nav';
import './globals.css';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Tenancy ',
    description: 'A complete solution for managing tenants, landlords, and properties.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                <Nav />
                {children}
            </body>
        </html>
    );
}
