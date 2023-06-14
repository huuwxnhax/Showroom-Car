import './globals.css';

import { Footer, Navbar } from '@/components';

export const metadata = {
    title: 'Showroom Car',
    description: 'Discover the best cars for you to choose from',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="relative">
                <Navbar />
                {children}
                <Footer />
            </body>
        </html>
    );
}
