/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: [
			'links.papareact.com',
			'scontent-nrt1-1.xx.fbcdn.net',
			'1000logos.net',
		],
	},
	experimental: {
		appDir: true,
	},
};

module.exports = nextConfig;
