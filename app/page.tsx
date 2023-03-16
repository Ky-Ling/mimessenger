import ChatInput from './ChatInput';
import MessageList from './MessageList';

export default async function HomePage() {
	const { messages } = await fetch(
		`${process.env.VERCEL_URL || 'http://localhost:3000'}/api/getMessages`
	).then((res) => res.json());

	return (
		<>
			<MessageList initialMessages={messages} />
			<ChatInput />
		</>
	);
}
