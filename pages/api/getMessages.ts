import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { Message } from '@/typings';
import redis from '@/redis';

type Data = {
	messages: Message[];
};

type ErrorData = {
	body: string;
};

const handler: NextApiHandler = async (
	req: NextApiRequest,
	res: NextApiResponse<Data | ErrorData>
) => {
	if (req.method !== 'GET') {
		res.status(405).json({ body: 'Method not allowed' });
	}

	const messagesRes = await redis.hvals('messages');
	const messages: Message[] = messagesRes
		.map((message) => JSON.parse(message))
		.sort((a, b) => a.created_at - b.created_at);

	res.status(200).json({ messages });
};

export default handler;
