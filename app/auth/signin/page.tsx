
import React from 'react';
import SignIn from './SignIn';
import { getProviders } from 'next-auth/react';
import Image from 'next/image';

const SignInPage = async () => {
	const providers = await getProviders();

	return (
		<div className="grid justify-center">
			<div>
				<Image
					className="rounded-full mx-2 object-cover"
					height={700}
					width={700}
					src="https://links.papareact.com/jne"
					alt="Profile Picture"
				/>
			</div>
			<SignIn providers={providers} />
		</div>
	);
};

export default SignInPage;
