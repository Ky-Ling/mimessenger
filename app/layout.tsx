import './global.css';
import Header from './Header';
import Providers from './providers';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head />
			<body>
				<Header />
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
