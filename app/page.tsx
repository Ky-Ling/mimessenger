'use client';

import { useRef } from 'react';
import ChatInput from './ChatInput';
import MessageList from './MessageList';

export default function HomePage() {
	const chatRef = useRef<HTMLDivElement>(null);

	return (
		<>
			<MessageList chatRef={chatRef} />
			<ChatInput chatRef={chatRef}/>
		</>
	);
}
