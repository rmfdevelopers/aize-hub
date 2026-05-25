import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';

const heading = Cormorant_Garamond({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700'], 
  variable: '--font-heading' 
});

const body = DM_Sans({ 
  subsets: ['latin'], 
  variable: '--font-body' 
});

export const metadata = {
  title: 'Aize Hub | Original Italian Gold Jewelry',
  description: 'Exquisite Italian gold and fine jewelry curated for investors in Nigeria.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${heading.variable} ${body.variable} font-sans bg-black text-accent`}>
        {children}
      </body>
    </html>
  );
}