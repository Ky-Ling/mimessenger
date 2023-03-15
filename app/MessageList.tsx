'use client'

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import fetcher from '@/utils/fetchMessages';
import { Message } from '@/typings';
import MessageItem from './MessageItem';

const MessageList: React.FC = () => {
	const {
		data: messages,
		isLoading,
		error,
	} = useQuery<Message[]>(['messages'], fetcher);

	return (
		<div className="space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto">
			{messages?.map((message: Message) => (
				<MessageItem key={message.id} message={message} />
			))}
		</div>
	);
};

export default MessageList;
