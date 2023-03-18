import NextAuth from 'next-auth/next';
import FacebookProvider from 'next-auth/providers/facebook';

export const authOptions = {
	providers: [
		FacebookProvider({
			clientId: process.env.FACEBOOK_CLIENT_ID!,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
		}),
	],
	secret: process.env.NEXTAUTH_SECRET!,
	pages: {
		signIn: '/auth/signin',
	},
	callbacks: {
		async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
			if (url.startsWith('/')) return `${baseUrl}${url}`;
			else if (new URL(url).origin === baseUrl) return url;
			return baseUrl;
		},
	},
};

export default NextAuth(authOptions);
