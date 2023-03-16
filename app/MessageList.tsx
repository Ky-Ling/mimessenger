'use client';

import React, { useEffect } from 'react';
import fetcher from '@/utils/fetchMessages';
import { Message } from '@/typings';
import MessageItem from './MessageItem';
import { clientPusher } from '@/pusher';
import useSWR from 'swr';

interface MessageListProps {
	initialMessages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ initialMessages }) => {
	const {
		data: messages,
		error,
		mutate,
	} = useSWR<Message[]>('/api/getMessages', fetcher);

	useEffect(() => {
		const channel = clientPusher.subscribe('messages');

		channel.bind('new-message', async (data: Message) => {
			if (messages?.find((message) => message.id === data.id)) return;

			if (!messages) {
				mutate(fetcher);
			} else {
				mutate(fetcher, {
					optimisticData: [data, ...messages!],
					rollbackOnError: true,
				});
			}
		});

		return () => {
			channel.unbind_all();
			channel.unsubscribe();
		};
	}, [messages, clientPusher, mutate]);

	return (
		<div className="space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto">
			{messages?.map((message: Message) => (
				<MessageItem key={message.id} message={message} />
			))}
		</div>
	);
};

export default MessageList;
