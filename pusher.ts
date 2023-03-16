import Pusher from 'pusher';
import ClientPusher from 'pusher-js';

export const serverPusher = new Pusher({
	appId: '1559946',
	key: 'a96e4895b434b01174e1',
	secret: 'a4b94911ffe747e1110b',
	cluster: 'ap1',
	useTLS: true,
});

export const clientPusher = new ClientPusher('a96e4895b434b01174e1', {
	cluster: 'ap1',
	forceTLS: true,
});
