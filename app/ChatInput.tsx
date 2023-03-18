'use client';

import React, { useState, useRef } from 'react';
import { v4 as uuid } from 'uuid';
import useSWR from 'swr';
import { Message } from '../typings';
import fetcher from '@/utils/fetchMessages';
import { getServerSession } from 'next-auth/next';

interface ChatInputProps {
	// session: Awaited<ReturnType<typeof getServerSession>>;
	// FIXME
	session: any;
}

const ChatInput: React.FC<ChatInputProps> = ({ session }) => {
	const [input, setInput] = useState('');
	const chatRef = useRef<HTMLDivElement>(null);

	const { data: messages, error, mutate } = useSWR('/api/getMessages', fetcher);

	const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!input || !session) return;
		const messageToSend = input;
		setInput('');

		const message: Message = {
			id: uuid(),
			message: messageToSend,
			created_at: Date.now(),
			username: session?.user?.name,
			profilePic: session?.user?.image,
			email: session?.user?.email,
		};

		const uploadMessageToUpstash = async () => {
			const data = await fetch('/api/addMessage', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					message,
				}),
			}).then((res) => res.json());

			return [data.message, ...messages!];
		};

		await mutate(uploadMessageToUpstash, {
			optimisticData: [message, ...messages!],
			rollbackOnError: true,
		});

		chatRef?.current?.scrollIntoView({
			behavior: 'smooth',
		});
	};

	return (
		<form
			onSubmit={formSubmitHandler}
			className="fixed bottom-0 z-50 w-full flex px-10 py-5 space-x-2 border-t bg-white  border-gray-100"
		>
			<input
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					setInput(e.target.value)
				}
				type="text"
				value={input}
				disabled={!session}
				placeholder="Enter message here..."
				className="flex-1 rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
			/>
			<button
				type="submit"
				disabled={!input}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled: opacity-50 disabled: cursor-not-allowed"
			>
				Send
			</button>
		</form>
	);
};

export default ChatInput;
