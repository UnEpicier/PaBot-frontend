import { redirect } from 'next/navigation';

export const GET = () => {
	const url =
		process.env.NODE_ENV === 'development'
			? process.env.OAUTH_URL_DEV || '/'
			: process.env.OAUTH_URL_PROD || '/';

	redirect(url);
};
