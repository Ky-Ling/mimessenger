'use client';

import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

import { Message } from '../typings';

const ChatInput: React.FC = () => {
	const [input, setInput] = useState('');

	const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!input) return;
		const messageToSend = input;
		setInput('');

		const message: Message = {
			id: uuid(),
			message: messageToSend,
			created_at: Date.now(),
			username: 'Torrid',
			profilePic:
				'https://scontent-nrt1-1.xx.fbcdn.net/v/t39.30808-6/320129965_1160752784833145_7000813986385643717_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=L2EUmu9Aiv8AX8nCo6S&tn=vKX-NcxAD7B80kyV&_nc_ht=scontent-nrt1-1.xx&oh=00_AfA7c7pxkgNo4b-MsEnRo2hiVWyDZQIibeL7x_tsMdJ_YQ&oe=63FFCAA9',
			email: 'hhh.com',
		};

		const uploadMessageToUpstash = async () => {
			const res = await fetch('/api/addMessage', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify({
					message,
				}),
			});

			const data = await res.json();
		};

		uploadMessageToUpstash();
	};

	return (
		<form
			onSubmit={formSubmitHandler}
			className="fixed bottom-0 z-50 w-full flex px-10 py-5 space-x-2 border-t border-gray-100"
		>
			<input
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					setInput(e.target.value)
				}
				type="text"
				value={input}
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
