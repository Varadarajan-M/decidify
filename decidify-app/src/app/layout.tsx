import { Inter } from 'next/font/google';
import '@/styles/globals.scss';

// Global font
const inter = Inter({
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	style: ['normal'],
	subsets: ['latin'],
	display: 'swap',
});

export const metadata = {
	title: 'Decidify',
	description:
		"Can't Decide? Leave it to the Masses! Create Your Anonymous Poll and Let the Votes Determine Your Choice!",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={inter.className}>{children}</body>
		</html>
	);
}
