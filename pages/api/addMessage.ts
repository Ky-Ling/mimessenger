import redis from '@/redis';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { Message } from '@/typings';

type Data = {
	message: Message;
};

type ErrorData = {
	body: string;
};

const handler: NextApiHandler = async (
	req: NextApiRequest,
	res: NextApiResponse<Data | ErrorData>
) => {
	if (req.method !== 'POST') {
		res.status(405).json({ body: 'Method not allowed' });

		return;
	}

	const { message } = req.body;

	const newMessage = {
		...message,
		created_at: Date.now(),
	};

	await redis.hset('messages', message.id, JSON.stringify(newMessage));

	res.status(200).json({ message: newMessage });
};

export default handler;
