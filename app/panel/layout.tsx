import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { CookiesProvider } from 'next-client-cookies/server';
import '../globals.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Pabot',
	description: 'Disocrd moderation bot',
};

const Layout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<CookiesProvider>
			<html lang='en'>
				<body className={inter.className}>{children}</body>
			</html>
		</CookiesProvider>
	);
};

export default Layout;
