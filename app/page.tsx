import MessageList from './MessageList';
import { getServerSession } from 'next-auth/next';
import ChatInput from './ChatInput';

import Providers from './providers';

export default async function HomePage() {
	const session = await getServerSession();

	return (
		<Providers session={session}>
			<main>
				<MessageList />
				<ChatInput session={session} />
			</main>
		</Providers>
	);
}
