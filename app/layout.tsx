import './global.css';
import Header from './Header';

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head />
			<body>
				<Header />
				{children}
			</body>
		</html>
	);
}
