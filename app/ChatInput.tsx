'use client';

import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Message } from '../typings';
import fetcher from '@/utils/fetchMessages';

const ChatInput: React.FC = () => {
	const queryClient = useQueryClient();

	const [input, setInput] = useState('');
	const { isLoading, error, data } = useQuery({
		queryKey: ['messages'],
		queryFn: fetcher,
	});

	console.log(data);

	const uploadMessageToUpstash = async (message: Message) => {
		const data = await fetch('/api/addMessage', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				message,
			}),
		}).then((res) => res.json());

		return data.messages;
	};

	const addMessageMutation = useMutation({
		mutationFn: uploadMessageToUpstash,
		onMutate: async (newMessage: Message) => {
			await queryClient.cancelQueries({ queryKey: ['messages'] });

			const previousTodos = queryClient.getQueryData(['messages']);

			queryClient.setQueryData(['messages'], (oldMessages: any) => [
				...oldMessages,
				newMessage,
			]);

			return { previousTodos };
		},
		onError: (error, newMessage, context) => {
			console.error(error);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['messages'] });
		},
	});

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
				// 'https://scontent.fhkg10-1.fna.fbcdn.net/v/t39.30808-6/277528122_394444219164533_222561899117725696_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=174925&_nc_ohc=EM8l2f5ROCoAX855d8f&_nc_oc=AQnvgvl2Tk-niHDEXM5dSBnmo58I8WLSGcCWNatK6YyPisZ2VzsHyHjqksApYUeQyZU&_nc_ht=scontent.fhkg10-1.fna&oh=00_AfA5JuU3bFjhd0S1lSVWVfLBrqu7i9ggmD49gSviWWbD-Q&oe=64149927',
				// 'https://links.papareact.com',
				// 'https://links.papareact.com/jne',
				'https://links.papareact.com/jne',
			email: 'hhh.com',
		};

		addMessageMutation.mutate(message);
		queryClient.invalidateQueries({ queryKey: ['messages'] });
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
